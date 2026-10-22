// GitHub sign-in helper for the NIIV website editor (Decap CMS at /admin).
//
// Runs as a Cloudflare Worker. It does the GitHub OAuth login for Decap and
// only lets in GitHub users listed in ALLOWED_USERS. Setup: cms-auth/README.md
//
// Settings (Cloudflare → Worker → Settings → Variables and Secrets):
//   GITHUB_CLIENT_ID      OAuth App client ID
//   GITHUB_CLIENT_SECRET  OAuth App client secret (add as a Secret)
//   ALLOWED_USERS         GitHub usernames allowed to edit, comma-separated
//   ALLOWED_ORIGINS       Website addresses allowed to use this helper, comma-separated,
//                         e.g. https://main.d1234.amplifyapp.com,https://niiv.njit.edu

const STATE_COOKIE = "__Host-niiv_cms_state";
const ALLOWED_SCOPES = new Set(["repo", "public_repo"]);

const splitList = (value) =>
  String(value ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

const escapeHtml = (text) =>
  String(text).replace(/[&<>"']/g, (char) => `&#${char.charCodeAt(0)};`);

// JSON that is safe to place inside a <script> tag.
const scriptJson = (value) => JSON.stringify(value).replace(/</g, "\\u003c");

/**
 * The page shown in the sign-in popup. It follows Decap's popup handshake:
 * announce itself, wait for the editor window to answer, then hand over the
 * result, but only to a website listed in ALLOWED_ORIGINS.
 */
function popupPage(env, outcome, content, heading, detail) {
  const allowedOrigins = splitList(env.ALLOWED_ORIGINS);
  const message = `authorization:github:${outcome}:${JSON.stringify(content)}`;
  const html = `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><title>NIIV editor sign-in</title>
<style>body{font-family:system-ui,sans-serif;max-width:28rem;margin:4rem auto;padding:0 1rem;color:#222;line-height:1.5}</style>
</head>
<body>
<h1 style="font-size:1.25rem">${escapeHtml(heading)}</h1>
<p>${escapeHtml(detail)}</p>
<script>
(function () {
  var allowed = ${scriptJson(allowedOrigins)};
  var message = ${scriptJson(message)};
  if (!window.opener) return;
  window.addEventListener("message", function (event) {
    if (allowed.indexOf(event.origin) === -1) return;
    window.opener.postMessage(message, event.origin);
  });
  window.opener.postMessage("authorizing:github", "*");
})();
</script>
</body>
</html>`;

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      // Clear the one-time login state.
      "Set-Cookie": `${STATE_COOKIE}=; Path=/; Secure; HttpOnly; SameSite=Lax; Max-Age=0`,
    },
  });
}

const failure = (env, reason) =>
  popupPage(env, "error", { message: reason }, "Sign-in failed", reason);

function startLogin(request, env) {
  const url = new URL(request.url);
  const requestedScope = url.searchParams.get("scope");
  const scope = ALLOWED_SCOPES.has(requestedScope) ? requestedScope : "repo";
  const state = crypto.randomUUID();

  const github = new URL("https://github.com/login/oauth/authorize");
  github.searchParams.set("client_id", env.GITHUB_CLIENT_ID);
  github.searchParams.set("redirect_uri", `${url.origin}/callback`);
  github.searchParams.set("scope", scope);
  github.searchParams.set("state", state);

  return new Response(null, {
    status: 302,
    headers: {
      Location: github.toString(),
      "Set-Cookie": `${STATE_COOKIE}=${state}; Path=/; Secure; HttpOnly; SameSite=Lax; Max-Age=600`,
    },
  });
}

async function revokeToken(env, token) {
  // Best effort: a refused user shouldn't keep a working token.
  try {
    await fetch(`https://api.github.com/applications/${env.GITHUB_CLIENT_ID}/token`, {
      method: "DELETE",
      headers: {
        Authorization: `Basic ${btoa(`${env.GITHUB_CLIENT_ID}:${env.GITHUB_CLIENT_SECRET}`)}`,
        Accept: "application/vnd.github+json",
        "User-Agent": "niiv-cms-auth",
      },
      body: JSON.stringify({ access_token: token }),
    });
  } catch {
    // Ignore; the user is refused either way.
  }
}

async function finishLogin(request, env) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const cookies = request.headers.get("Cookie") ?? "";
  const savedState = cookies.match(new RegExp(`${STATE_COOKIE}=([^;]+)`))?.[1];

  if (url.searchParams.get("error")) {
    return failure(env, "GitHub sign-in was cancelled.");
  }
  if (!code || !state || state !== savedState) {
    return failure(env, "This sign-in link expired. Close this window and click Login again.");
  }

  const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json", "User-Agent": "niiv-cms-auth" },
    body: JSON.stringify({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code,
      redirect_uri: `${url.origin}/callback`,
    }),
  });
  const { access_token: token } = await tokenResponse.json().catch(() => ({}));
  if (!token) {
    return failure(env, "GitHub did not complete the sign-in. Close this window and try again.");
  }

  const userResponse = await fetch("https://api.github.com/user", {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json", "User-Agent": "niiv-cms-auth" },
  });
  const { login } = await userResponse.json().catch(() => ({}));
  const allowedUsers = splitList(env.ALLOWED_USERS).map((user) => user.toLowerCase());

  if (!login || !allowedUsers.includes(login.toLowerCase())) {
    await revokeToken(env, token);
    return failure(
      env,
      `${login ? `@${login} is` : "You are"} not on the NIIV editor list. Ask the website maintainer to add your GitHub username.`,
    );
  }

  return popupPage(
    env,
    "success",
    { token, provider: "github" },
    "Signed in",
    `Welcome, @${login}. You can close this window if it doesn't close itself.`,
  );
}

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);
    if (pathname === "/auth" || pathname === "/auth/") return startLogin(request, env);
    if (pathname === "/callback" || pathname === "/callback/") return finishLogin(request, env);
    return new Response("NIIV editor sign-in helper. Open the editor at /admin on the website.", {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  },
};
