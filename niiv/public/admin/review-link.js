// Adds a "Review changes" button to the editor, with the number of changes waiting.
// The review page (review.html) lists every change sent for review, including ones
// from lab members' own copies, which the editor's Workflow tab can't show.
(function () {
  const button = document.createElement("a");
  button.href = "review.html";
  button.className = "niiv-review-link";
  button.hidden = true;
  button.innerHTML = '<span>Review changes</span><span class="niiv-review-count" hidden></span>';
  document.body.appendChild(button);

  const signedIn = () => {
    try {
      return Boolean(localStorage.getItem("decap-cms-user"));
    } catch {
      return false;
    }
  };

  async function refresh() {
    button.hidden = !signedIn();
    if (button.hidden) return;
    try {
      const config = await (await fetch("config.yml", { cache: "no-store" })).text();
      const repo = (config.match(/^\s*repo:\s*(\S+)/m) || [])[1];
      const branch = (config.match(/^\s*branch:\s*(\S+)/m) || [])[1];
      if (!repo || !branch) return;
      let token = "";
      try {
        token = (JSON.parse(localStorage.getItem("decap-cms-user")) || {}).token || "";
      } catch {}
      const headers = { Accept: "application/vnd.github+json" };
      if (token.length > 20) headers.Authorization = `Bearer ${token}`;
      const response = await fetch(
        `https://api.github.com/repos/${repo}/pulls?state=open&base=${encodeURIComponent(branch)}&per_page=50`,
        { headers },
      );
      if (!response.ok) return;
      const count = (await response.json()).length;
      const badge = button.querySelector(".niiv-review-count");
      badge.textContent = String(count);
      badge.hidden = count === 0;
      button.setAttribute("aria-label", `Review changes, ${count} waiting`);
    } catch {
      // The button still works without a count.
    }
  }

  refresh();
  window.addEventListener("hashchange", () => { button.hidden = !signedIn(); });
  setInterval(refresh, 120000);
})();
