# NIIV editor sign-in helper

`worker.js` handles "Login with GitHub" for the website editor at `/admin`, and only lets in
GitHub users on your access list. It runs on Cloudflare Workers (free plan).

It is needed because GitHub requires the OAuth App's secret to stay on a server, never in a web page.

## Managing who can edit

Cloudflare dashboard → **Workers & Pages** → `niiv-cms-auth` → **Settings** → **Variables and Secrets**
→ edit **`ALLOWED_USERS`** → **Deploy**.

It is a comma-separated list of GitHub usernames (capitalization doesn't matter), for example:

```
meghanabangari, avinanakarmi, saikiran2002, vkoli
```

People not on the list see "@username is not on the NIIV editor list" and can't open the editor.
Changes take effect immediately; nobody needs to touch the website code.

## One-time setup (about 20 minutes)

### 1. Create the worker

1. Sign in at [dash.cloudflare.com](https://dash.cloudflare.com) (a free account is fine).
2. **Workers & Pages** → **Create** → **Create Worker**. Name it `niiv-cms-auth` → **Deploy**.
3. **Edit code**, replace everything with the contents of `worker.js`, then **Deploy**.
4. Note the worker's address, e.g. `https://niiv-cms-auth.<your-account>.workers.dev`.

If you already deployed a sign-in worker earlier (e.g. `sveltia-cms-auth`), you can paste the code into
that worker instead; its address and the OAuth App's callback URL stay the same.

### 2. Point the GitHub OAuth App at it

Create the app under the **`njitvis` organization** so it doesn't depend on one person's account: an organization
owner goes to github.com/organizations/njitvis/settings/applications → **New OAuth App**. (An app on a personal
account also works, but needs the organization approval in step 5 and goes away if that account does.)

- **Homepage URL:** the website address
- **Authorization callback URL:** `https://niiv-cms-auth.<your-account>.workers.dev/callback`

Copy the **Client ID**, and generate a **Client secret**.

### 3. Add the settings to the worker

Worker → **Settings** → **Variables and Secrets** → **Add**:

| Name | Type | Value |
| --- | --- | --- |
| `GITHUB_CLIENT_ID` | Text | the Client ID |
| `GITHUB_CLIENT_SECRET` | **Secret** | the Client secret |
| `ALLOWED_USERS` | Text | GitHub usernames, comma-separated |
| `ALLOWED_ORIGINS` | Text | the website address(es) the editor runs on, comma-separated, no trailing slash, e.g. `https://main.d1234.amplifyapp.com,https://niiv.njit.edu` |

Click **Deploy**.

### 4. Connect the editor to it

In `niiv/public/admin/config.yml`, set `base_url` to the worker address (no trailing slash):

```yaml
  base_url: https://niiv-cms-auth.<your-account>.workers.dev
```

### 5. Organization approval

Only needed if the OAuth App is on a personal account, or if saving fails with "the `njitvis` organization has
enabled OAuth App access restrictions": an owner of the `njitvis` organization approves the app once at
github.com/organizations/njitvis/settings/oauth_application_policy.

## Troubleshooting

- **The login popup says "Signed in" but the editor doesn't continue:** the website's address is missing
  from `ALLOWED_ORIGINS` (it must match exactly, including `https://` and `www.` if used).
- **"This sign-in link expired":** close the popup and click Login again.
- **GitHub shows "redirect_uri is not associated with this application":** the callback URL in the
  OAuth App doesn't match the worker address + `/callback`.
