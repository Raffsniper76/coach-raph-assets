(() => {
  "use strict";

  const runtimeKey = "__coachRaphChallengeStory";
  window[runtimeKey]?.destroy?.();

  const timers = [];
  const escapeHtml = (value = "") => String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

  const iconChart = `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 19V10h4v9M10 19V6h4v13M16 19V3h4v16M3 21h18"/>
    </svg>`;

  const iconTrend = `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 5l6 6 4-4 6 8"/>
      <path d="M16 15h4v-4"/>
    </svg>`;

  const iconPerson = `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="7" r="3"/>
      <path d="M5 21v-3.5A5.5 5.5 0 0 1 10.5 12h3A5.5 5.5 0 0 1 19 17.5V21"/>
      <path d="M8 21v-3M16 21v-3"/>
    </svg>`;

  function ensureValidatedCtaClass() {
    document.querySelectorAll("#page-index.coach-home-page .notion-callout").forEach((callout) => {
      const text = (callout.textContent || "").replace(/\s+/g, " ").trim().toLowerCase();
      if (text.includes("parlons de ton objectif") && callout.querySelector('a[href*="calendly"]')) {
        callout.classList.add("coach-v18-final-cta");
      }
    });
  }

  function applyChallengeStory() {
    ensureValidatedCtaClass();
    const story = document.querySelector("#page-index.coach-home-page .coach-v192-motivation");
    if (!story || story.dataset.coachChallengeStory === "final") return false;

    const sourceLinks = [...story.querySelectorAll(".coach-v192-sources a[href]")]
      .map((link) => ({ href: link.href, text: link.textContent.trim() }))
      .filter((item) => item.href && item.text);

    const sourceMarkup = sourceLinks.length
      ? sourceLinks.map((item, index) => `${index ? '<span class="coach-v50-source-separator" aria-hidden="true">·</span>' : ''}<a href="${escapeHtml(item.href)}">${escapeHtml(item.text)}</a>`).join("")
      : "";

    story.innerHTML = `
      <header class="coach-v192-motivation-heading coach-v50-challenge-heading">
        <span>Le vrai défi</span>
        <h2 id="coach-v192-motivation-title">
          <span class="coach-v50-challenge-line coach-v50-challenge-line-one">L’envie est là.</span>
          <span class="coach-v50-challenge-line coach-v50-challenge-line-two">Le plus dur, ce n’est pas de commencer.</span>
          <span class="coach-v50-challenge-line coach-v50-challenge-line-three">C’est de <em>continuer</em>.</span>
        </h2>
      </header>

      <div class="coach-v50-challenge-journey" aria-label="De l’envie à la régularité">
        <div class="coach-v50-challenge-step is-active">
          <span class="coach-v50-challenge-dot" aria-hidden="true"></span>
          <div><strong>Envie</strong><small>Le déclic.</small></div>
        </div>
        <div class="coach-v50-challenge-step">
          <span class="coach-v50-challenge-dot" aria-hidden="true"></span>
          <div><strong>Départ</strong><small>Le premier pas.</small></div>
        </div>
        <div class="coach-v50-challenge-step">
          <span class="coach-v50-challenge-dot" aria-hidden="true"></span>
          <div><strong>Régularité</strong><small>La transformation.</small></div>
        </div>
      </div>

      <div class="coach-v192-stat-grid coach-v50-challenge-stats" aria-label="Trois constats sur la régularité sportive">
        <article class="coach-v192-stat coach-v50-challenge-stat" style="--stat-color:#1764e8;--stat-soft:#eaf2ff">
          <span class="coach-v50-stat-icon">${iconChart}</span>
          <strong><span>50<em>%</em></span><small>des Français</small></strong>
          <p>veulent faire davantage d’exercice</p>
        </article>
        <article class="coach-v192-stat coach-v50-challenge-stat" style="--stat-color:#7f5bda;--stat-soft:#f2edff">
          <span class="coach-v50-stat-icon">${iconTrend}</span>
          <strong><span>33<em>%</em></span><small>des Français</small></strong>
          <p>se disent moins actifs qu’avant</p>
        </article>
        <article class="coach-v192-stat coach-v50-challenge-stat" style="--stat-color:#079f70;--stat-soft:#e8fbf4">
          <span class="coach-v50-stat-icon">${iconPerson}</span>
          <strong><span>1</span><small>sportif<br>sur 2</small></strong>
          <p>pratique principalement seul</p>
        </article>
      </div>

      ${sourceMarkup ? `<div class="coach-v50-challenge-sources"><strong>Sources statistiques :</strong><div>${sourceMarkup}</div></div>` : ""}
    `;

    story.dataset.coachChallengeStory = "final";
    return true;
  }

  [0, 220, 520, 900, 1500, 2600, 4200, 6500].forEach((delay) => {
    timers.push(window.setTimeout(applyChallengeStory, delay));
  });

  window[runtimeKey] = {
    refresh: applyChallengeStory,
    destroy() {
      timers.forEach((timer) => window.clearTimeout(timer));
      timers.length = 0;
    }
  };
})();
