(() => {
  "use strict";

  if (window.__coachRaphHomeV172) return;
  window.__coachRaphHomeV172 = true;

  const LOGO = "https://assets.super.so/73b7f317-8b6e-4596-9516-fb32a3230106/uploads/logo/e919f3cd-93a8-414a-bb60-0c0596239f70.png";
  const MARK = "https://images.spr.so/cdn-cgi/imagedelivery/j42No7y-dcokJuNgXeA0ig/953b0f48-3093-49c4-9bee-84e516b5a1e1/coach-raph-favicon/public";
  const sliders = new WeakMap();
  let timer = 0;

  const create = (tag, className) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    return node;
  };

  function upgradeBrand(page) {
    const brand = page.querySelector(".coach-home-brand-mark");
    if (brand && !brand.querySelector("img")) {
      brand.innerHTML = `<img src="${LOGO}" alt="Coach Raph">`;
    }

    const bottomIcon = page.querySelector(".coach-home-bottom-icon");
    if (bottomIcon && !bottomIcon.querySelector("img")) {
      bottomIcon.textContent = "";
      bottomIcon.append(Object.assign(new Image(), { src: MARK, alt: "" }));
    }
  }

  function buildManifesto(page, root) {
    const methodHeading = root.querySelector('[data-coach-home-heading="method"]');
    if (!methodHeading) return;

    root.querySelectorAll('[data-coach-home-section="remote"]').forEach((node) => {
      node.classList.add("coach-v17-source-hidden");
    });

    let section = root.querySelector(".coach-v17-manifesto");
    if (!section) {
      section = create("section", "coach-v17-manifesto");
      section.setAttribute("aria-labelledby", "coach-v17-manifesto-title");
      section.innerHTML = `
        <div class="coach-v17-manifesto-main">
          <div class="coach-v17-manifesto-brand">
            <span>La mission</span>
            <img src="${LOGO}" alt="Coach Raph">
          </div>
          <p class="coach-v17-kicker">Présent à distance. Concret au quotidien.</p>
          <h2 id="coach-v17-manifesto-title">Le confort du distant,<br>avec un vrai accompagnement humain.</h2>
          <p class="coach-v17-manifesto-lead">Ton programme reste accessible partout, mais tu n’avances jamais seul. Je suis ta progression, je réponds à tes questions et j’ajuste le cadre selon tes retours.</p>
          <p class="coach-v17-manifesto-note"><strong>Mon objectif :</strong> te rendre progressivement autonome, sans jamais te laisser sans repères.</p>
        </div>
        <div class="coach-v17-manifesto-proofs" aria-label="Les engagements Coach Raph">
          <article>
            <span class="coach-v17-proof-icon" aria-hidden="true">
              <svg viewBox="0 0 32 32"><rect x="7" y="4" width="18" height="24" rx="3"/><path d="M11 10h10M11 15h10M11 20h6"/></svg>
            </span>
            <div><strong>Ton espace personnel</strong><p>Séances, repères et ressources disponibles quand tu en as besoin.</p></div>
          </article>
          <article>
            <span class="coach-v17-proof-icon" aria-hidden="true">
              <svg viewBox="0 0 32 32"><path d="M5 8h22v15H15l-6 5v-5H5z"/><path d="M10 14h12M10 18h8"/></svg>
            </span>
            <div><strong>Un suivi qui s’adapte</strong><p>Des échanges réguliers et des ajustements concrets selon tes progrès.</p></div>
          </article>
          <article>
            <span class="coach-v17-proof-icon" aria-hidden="true">
              <svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="11"/><path d="m11 16 3 3 7-8"/></svg>
            </span>
            <div><strong>À distance, mais proche</strong><p>Des rendez-vous locaux ponctuels restent possibles selon tes besoins.</p></div>
          </article>
        </div>`;
      methodHeading.insertAdjacentElement("beforebegin", section);
    }
  }

  function upgradeMethod(root) {
    const list = root.querySelector('.notion-column-list:has(#block-501e914c976847f8976954d4323159a4)');
    if (!list) return;
    list.classList.add("coach-v17-method");
    const icons = [
      '<svg viewBox="0 0 40 40"><path d="M6 8h28v20H20l-8 7v-7H6z"/><path d="M13 18h1m6 0h1m6 0h1"/></svg>',
      '<svg viewBox="0 0 40 40"><rect x="10" y="7" width="20" height="28" rx="3"/><path d="M15 7V5h10v2M15 16h10M15 22h10M15 28h6"/></svg>',
      '<svg viewBox="0 0 40 40"><path d="M7 33h27M10 29v-8m8 8V14m8 15V19m8 10V7"/><path d="m10 16 8-7 8 4 8-9"/></svg>'
    ];
    list.querySelectorAll(".notion-callout").forEach((card, index) => {
      card.dataset.coachV17Step = String(index + 1);
      if (!card.querySelector(".coach-v17-method-icon")) {
        const icon = create("span", "coach-v17-method-icon");
        icon.setAttribute("aria-hidden", "true");
        icon.innerHTML = icons[index] || icons[0];
        card.prepend(icon);
      }
    });
  }

  function upgradeFormulas(root) {
    const mapping = [
      ["eec8b2e3ff0449fba655b093f2f1aafe", "sculpture"],
      ["8b029bcc7a254855b151dfabe893f297", "cardio"],
      ["6f8587bc689948d5b374401a74938339", "ngnp"],
      ["76220e2efe71487b89ec94ec07318cd1", "vitalite"]
    ];
    mapping.forEach(([id, type]) => {
      root.querySelector(`#block-${id}`)?.setAttribute("data-coach-v17-formula", type);
    });
    root.querySelector("#block-483066904b1f45159faca5ac7b20f9d9")?.classList.add("coach-v17-guidance");
  }

  function upgradeCoach(root) {
    const panel = root.querySelector('.notion-column-list[data-coach-home-section="coach"]');
    if (!panel || panel.querySelector(".coach-v17-coach-badge")) return;
    const badge = create("div", "coach-v17-coach-badge");
    badge.innerHTML = `<img src="${MARK}" alt=""><span><strong>Coach Raph</strong><small>Licence STAPS</small></span>`;
    panel.append(badge);
  }

  function setupTestimonials(root) {
    if (root.querySelector(".coach-v17-testimonial-card")) return;
    const legacyShells = [...root.querySelectorAll(".coach-v17-testimonials-shell")];
    const source = root.querySelector('.notion-column-list[data-coach-home-section="testimonials"]');
    if (!source || source.children.length < 2) return;
    const testimonials = [...source.querySelectorAll(":scope > .notion-column")].map((column) => {
      const card = column.querySelector(".notion-callout") || column;
      const paragraphs = [...card.querySelectorAll("p")].map((paragraph) => paragraph.textContent.trim()).filter(Boolean);
      return {
        image: card.querySelector(".notion-image img")?.currentSrc || card.querySelector(".notion-image img")?.src || "",
        title: paragraphs[0] || "Un accompagnement qui fait la différence",
        quote: paragraphs[1] || "",
        author: paragraphs[2] || ""
      };
    });
    source.classList.add("coach-v17-testimonials-source");
    const shell = create("div", "coach-v17-testimonials-shell");
    const track = create("div", "coach-v17-testimonials-track");
    track.setAttribute("role", "region");
    track.setAttribute("aria-label", "Témoignages clients");
    testimonials.forEach((testimonial) => {
      const article = create("article", "coach-v17-testimonial-card");
      const avatar = create("div", "coach-v17-testimonial-avatar");
      if (testimonial.image) {
        const image = new Image();
        image.src = testimonial.image;
        image.alt = "";
        image.loading = "lazy";
        avatar.append(image);
      }
      const content = create("div", "coach-v17-testimonial-content");
      const stars = create("div", "coach-v17-testimonial-stars");
      stars.setAttribute("aria-label", "5 étoiles sur 5");
      stars.textContent = "★★★★★";
      const title = create("h3");
      title.textContent = testimonial.title;
      const quote = create("blockquote");
      quote.textContent = testimonial.quote;
      const author = create("p", "coach-v17-testimonial-author");
      author.textContent = testimonial.author.replace(/^—\s*/, "");
      content.append(stars, title, quote, author);
      article.append(avatar, content);
      track.append(article);
    });
    const insertionTarget = legacyShells[0] || source;
    insertionTarget.insertAdjacentElement("beforebegin", shell);
    shell.append(track);
    legacyShells.forEach((legacy) => legacy.classList.add("coach-v17-legacy-slider"));
    const controls = create("div", "coach-v17-testimonials-controls");
    controls.innerHTML = `
      <div class="coach-v17-slider-dots" aria-hidden="true"></div>
      <div class="coach-v17-slider-buttons">
        <button type="button" data-dir="-1" aria-label="Témoignage précédent">←</button>
        <button type="button" data-dir="1" aria-label="Témoignage suivant">→</button>
      </div>`;
    shell.append(controls);

    const cards = [...track.children];
    const dots = controls.querySelector(".coach-v17-slider-dots");
    cards.forEach((_, index) => {
      const dot = create("span");
      if (index === 0) dot.classList.add("is-active");
      dots.append(dot);
    });

    let index = 0;
    let paused = false;
    let autoplay = 0;
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const render = () => {
      const card = cards[index];
      track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: reducedMotion ? "auto" : "smooth" });
      [...dots.children].forEach((dot, dotIndex) => dot.classList.toggle("is-active", dotIndex === index));
    };
    const move = (direction) => {
      index = (index + direction + cards.length) % cards.length;
      render();
    };
    controls.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-dir]");
      if (button) move(Number(button.dataset.dir));
    });
    shell.addEventListener("mouseenter", () => { paused = true; });
    shell.addEventListener("mouseleave", () => { paused = false; });
    shell.addEventListener("focusin", () => { paused = true; });
    shell.addEventListener("focusout", () => { paused = false; });
    if (!reducedMotion) autoplay = window.setInterval(() => {
      if (!paused && !document.hidden) move(1);
    }, 5200);
    sliders.set(track, { autoplay });
  }

  function upgradeHome() {
    const page = document.querySelector("#page-index.coach-home-page");
    const root = page?.querySelector(".notion-root");
    if (!page || !root) return;
    document.documentElement.classList.add("coach-v17-ready");
    upgradeBrand(page);
    buildManifesto(page, root);
    upgradeMethod(root);
    upgradeFormulas(root);
    upgradeCoach(root);
    setupTestimonials(root);
  }

  function refresh() {
    clearTimeout(timer);
    timer = window.setTimeout(upgradeHome, 120);
  }

  const observer = new MutationObserver(refresh);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  window.addEventListener("load", refresh, { once: true });
  refresh();
})();
