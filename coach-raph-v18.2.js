(() => {
  "use strict";

  if (window.__coachRaphHomeV182) return;
  window.__coachRaphHomeV182 = true;

  let refreshTimer = 0;

  const normalize = (value = "") => String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\u00a0/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();

  const create = (tag, className) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    return node;
  };

  function wrapRole(root, role, className) {
    let shell = root.querySelector(`:scope > .coach-v18-section[data-coach-v18-role="${role}"]`);
    if (shell) return shell;

    const nodes = [...root.children].filter((node) =>
      node.dataset.coachHomeSection === role &&
      !node.classList.contains("coach-v17-manifesto")
    );
    if (!nodes.length) return null;

    shell = create("section", `coach-v18-section ${className}`);
    shell.dataset.coachV18Role = role;
    nodes[0].insertAdjacentElement("beforebegin", shell);
    nodes.forEach((node) => shell.append(node));
    return shell;
  }

  function placeAfter(root, node, anchor) {
    if (!node || !anchor || node === anchor) return;
    if (anchor.nextElementSibling !== node) anchor.insertAdjacentElement("afterend", node);
  }

  function hideSource(node, className) {
    if (!node) return;
    node.classList.add(className);
    node.setAttribute("aria-hidden", "true");
    node.style.setProperty("display", "none", "important");
  }

  function directChildContaining(section, node) {
    let current = node;
    while (current?.parentElement && current.parentElement !== section) current = current.parentElement;
    return current?.parentElement === section ? current : null;
  }

  function orderSections(root, shells) {
    const methodBlocks = [...root.children].filter((node) => node.dataset.coachHomeSection === "method");
    let anchor = methodBlocks.at(-1) || root.querySelector(".coach-v17-method");
    [shells.formulas, shells.discovery, shells.details, shells.coach, shells.testimonials, shells.after]
      .filter(Boolean)
      .forEach((section) => {
        placeAfter(root, section, anchor);
        anchor = section;
      });
  }

  function consolidateTestimonials(root, testimonials, after) {
    if (!testimonials || !after) return;

    const source = testimonials.querySelector('.notion-column-list[data-coach-home-section="testimonials"], .notion-column-list');
    if (source) hideSource(source, "coach-v18-testimonials-source");

    const generated = [...root.querySelectorAll(".coach-v17-testimonials-shell")]
      .find((shell) => shell.querySelector(".coach-v17-testimonial-card") && !shell.classList.contains("coach-v17-legacy-slider"));
    if (generated && generated.parentElement !== testimonials) testimonials.append(generated);

    root.querySelectorAll(".coach-v17-legacy-slider, .coach-v17-testimonials-source")
      .forEach((node) => hideSource(node, "coach-v18-testimonials-source"));

    [...testimonials.children].forEach((node) => {
      const isHeading = Boolean(node.querySelector?.('[data-coach-home-heading="testimonials"]')) || node.dataset.coachHomeHeading === "testimonials";
      const isNewSlider = node.classList.contains("coach-v17-testimonials-shell") && node.querySelector(".coach-v17-testimonial-card");
      if (!isHeading && !isNewSlider) hideSource(node, "coach-v182-testimonial-source");
    });

    const finalCta = after.querySelector(".coach-v18-final-cta");
    if (!finalCta || finalCta.previousElementSibling === testimonials) return;
    finalCta.insertAdjacentElement("beforebegin", testimonials);
  }

  const inclusionIcons = [
    '<svg viewBox="0 0 32 32"><path d="M8 5h16v22H8zM12 11h8M12 16h8M12 21h5"/></svg>',
    '<svg viewBox="0 0 32 32"><path d="M6 25V10l10-5 10 5v15M11 14h10M11 19h10"/></svg>',
    '<svg viewBox="0 0 32 32"><rect x="5" y="7" width="22" height="18" rx="3"/><path d="M9 12h14M9 17h8"/></svg>',
    '<svg viewBox="0 0 32 32"><path d="M7 24 21 10l4 4-14 14H7zM18 13l4 4M6 8h7"/></svg>',
    '<svg viewBox="0 0 32 32"><path d="M5 20c3-8 7-10 11-6s8 2 11-6M22 7h5v5"/></svg>',
    '<svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="11"/><path d="m10 16 4 4 8-9"/></svg>'
  ];

  function uniqueListItems(section) {
    const candidates = [...section.querySelectorAll("li, .notion-list-item")];
    return candidates.filter((item, index) => {
      const text = normalize(item.textContent);
      if (!text || candidates.some((parent, parentIndex) => parentIndex !== index && parent.contains(item))) return false;
      return candidates.findIndex((candidate) => normalize(candidate.textContent) === text) === index;
    });
  }

  function upgradeDiscovery(section) {
    if (!section) return;
    section.querySelector('[data-coach-home-heading="discovery"]')?.setAttribute("id", "coach-offer");

    [...section.children].forEach((node) => {
      const text = normalize(node.textContent);
      if (/formule decouverte/.test(text)) node.classList.add("coach-v18-offer-card");
      if (/ce que tu recois concretement/.test(text)) node.classList.add("coach-v18-inclusions-title");
      if (/72 heures suivant/.test(text)) node.classList.add("coach-v18-delivery-note");
    });

    const items = uniqueListItems(section).filter((item) => {
      const text = normalize(item.textContent);
      return !/^(on echange|j'evalue|on fait|je construis|tu avances)/.test(text);
    }).slice(0, 6);
    if (items.length && !section.querySelector(".coach-v18-inclusions")) {
      const grid = create("div", "coach-v18-inclusions");
      grid.setAttribute("aria-label", "Contenu de la formule Découverte");
      items.forEach((item, index) => {
        const article = create("article", "coach-v18-inclusion");
        const icon = create("span", "coach-v18-inclusion-icon");
        icon.setAttribute("aria-hidden", "true");
        icon.innerHTML = inclusionIcons[index] || inclusionIcons.at(-1);
        const copy = create("p");
        copy.textContent = item.textContent.replace(/^\s*[•*-]?\s*/, "").trim();
        article.append(icon, copy);
        grid.append(article);
      });

      const title = section.querySelector(".coach-v18-inclusions-title");
      (title || section.querySelector(".coach-v18-offer-card"))?.insertAdjacentElement("afterend", grid);
    }

    items.forEach((item) => hideSource(item, "coach-v18-list-source-item"));
    [...section.querySelectorAll("ul, ol, .notion-bulleted-list, .notion-numbered-list")]
      .filter((list) => list.querySelector(".coach-v18-list-source-item"))
      .forEach((list) => hideSource(list, "coach-v18-list-source"));
  }

  const detailTitles = [
    "On échange pendant 15 minutes",
    "J’évalue ton point de départ",
    "On fait le bilan post-test",
    "Je construis ton programme",
    "Tu avances avec un vrai suivi",
    "On fait le bilan final"
  ];

  const detailDescriptions = [
    "Tu m’expliques ton objectif, ton parcours et tes principales contraintes. Cet échange est gratuit et sans engagement.",
    "Tu complètes un questionnaire et quelques tests adaptés à ton niveau et à ta situation.",
    "Une fois le questionnaire et les tests terminés, nous faisons ensemble un point de 15 minutes.",
    "Tu reçois ton plan personnalisé dans les 72 heures suivant la fin de notre bilan post-test.",
    "Ton accompagnement commence à la livraison du programme, puis je l’ajuste selon ton ressenti et tes progrès.",
    "Au terme des quatre semaines, tu mesures tes progrès et choisis librement la suite qui te convient."
  ];

  function upgradeDetails(section) {
    if (!section || section.querySelector(".coach-v18-timeline")) return;
    section.querySelector('[data-coach-home-heading="details"]')?.setAttribute("id", "coach-details");
    const sourceList = section.querySelector(":scope > ol, :scope > .notion-numbered-list");
    if (!sourceList) return;
    const children = [...sourceList.children];
    const items = children.filter((node) => node.matches("li, .notion-list-item")).slice(0, 6);
    if (items.length < 6) return;

    const timeline = create("div", "coach-v18-timeline");
    items.forEach((item, index) => {
      const position = children.indexOf(item);
      const titleText = item.querySelector("strong")?.textContent.replace(/\s+/g, " ").trim() || detailTitles[index];
      const embedded = [...item.querySelectorAll("p, .notion-text, .notion-list-item__content")]
        .map((node) => node.textContent.replace(/\s+/g, " ").trim())
        .find((text) => text && normalize(text) !== normalize(titleText) && !normalize(text).startsWith(normalize(titleText)));
      const sibling = children.slice(position + 1).find((node) => node.matches("p, .notion-text"));
      const fullText = item.textContent.replace(/\s+/g, " ").trim();
      const remainder = fullText.slice(fullText.toLowerCase().indexOf(titleText.toLowerCase()) + titleText.length).trim();
      const description = embedded || sibling?.textContent.replace(/\s+/g, " ").trim() || remainder || detailDescriptions[index];

      const article = create("article", "coach-v18-timeline-step");
      article.innerHTML = `<span class="coach-v18-step-number" aria-hidden="true">${String(index + 1).padStart(2, "0")}</span>`;
      const copy = create("div");
      const heading = create("h3");
      heading.textContent = titleText;
      const paragraph = create("p");
      paragraph.textContent = description;
      copy.append(heading, paragraph);
      article.append(copy);
      timeline.append(article);

    });
    hideSource(sourceList, "coach-v18-details-source");
    const heading = section.querySelector('[data-coach-home-heading="details"]');
    heading?.insertAdjacentElement("afterend", timeline);

    const headingBlock = directChildContaining(section, heading);
    [...section.children].forEach((node) => {
      if (node !== headingBlock && node !== timeline) hideSource(node, "coach-v18-details-source");
    });
  }

  function upgradeGuidance(root) {
    const source = root.querySelector(".coach-v17-guidance");
    if (!source) return;
    let panel = root.querySelector(".coach-v182-guidance");
    if (!panel) {
      const link = source.querySelector("a[href]");
      panel = create("aside", "coach-v182-guidance");
      panel.innerHTML = `
        <span class="coach-v182-guidance-icon" aria-hidden="true">?</span>
        <div><strong>Tu hésites entre plusieurs programmes ?</strong><p>Réserve simplement ton échange gratuit. Nous déterminerons ensemble la formule la plus cohérente pour toi.</p></div>
        <a href="${link?.href || "#"}">Choisir un créneau <span aria-hidden="true">→</span></a>`;
      source.insertAdjacentElement("afterend", panel);
    }
    hideSource(source, "coach-v182-guidance-source");
  }

  function upgradeMethodNumbers(root) {
    root.querySelectorAll(".coach-v17-method .notion-callout").forEach((card, index) => {
      const icon = card.querySelector(".coach-v17-method-icon");
      if (!icon || icon.querySelector(".coach-v182-method-number")) return;
      const number = create("span", "coach-v182-method-number");
      number.textContent = String(index + 1);
      icon.append(number);
    });
  }

  const followupPlans = [
    ["✓", "Continuer seul", "0 €", "Tu conserves ton programme et avances à ton rythme."],
    ["↻", "Suivi 1 mois", "50 €", "Mise à jour du programme et point personnalisé."],
    ["↗", "Suivi 3 mois", "135 €", "Réajustements réguliers et accompagnement renforcé."],
    ["✦", "Suivi 6 mois", "240 €", "Programme évolutif et suivi toutes les deux semaines."]
  ];

  function buildAfterCommercial(section) {
    let panel = section.querySelector(".coach-v182-after-commercial");
    if (panel) return panel;
    const duoSource = [...section.querySelectorAll("details, .notion-toggle")]
      .find((node) => /commencer a deux|formule duo/.test(normalize(node.textContent)));
    const duoLink = duoSource?.querySelector("a[href]");
    panel = create("section", "coach-v182-after-commercial");
    panel.innerHTML = `
      <div class="coach-v182-after-heading"><span>La suite reste ton choix</span><h2>Et après les 4 semaines ?</h2><p>Ton programme reste à toi. Tu peux continuer seul ou choisir le niveau de suivi qui correspond à ton objectif.</p></div>
      <div class="coach-v182-plan-grid">${followupPlans.map(([icon,title,price,copy], index) => `
        <article class="coach-v182-plan${index === 1 ? " is-featured" : ""}"><span class="coach-v182-plan-icon" aria-hidden="true">${icon}</span><div><small>${index ? "Accompagnement" : "Autonomie"}</small><h3>${title}</h3><strong>${price}</strong><p>${copy}</p></div></article>`).join("")}</div>
      <div class="coach-v182-duo-card"><div class="coach-v182-duo-icon" aria-hidden="true">2</div><div><span>Formule Duo</span><h3>Plus motivant à deux</h3><p><strong>150 € pour deux personnes pendant 4 semaines</strong>, soit 75 € par personne.</p><ul><li>Deux bilans individuels</li><li>Un programme adapté à chacun</li><li>Des défis communs</li><li>Des conseils pour s’entraîner ensemble</li></ul></div>${duoLink ? `<a href="${duoLink.href}">Découvrir la formule Duo <span aria-hidden="true">→</span></a>` : ""}</div>`;
    section.prepend(panel);
    return panel;
  }

  function buildPayment(section, source) {
    if (!source || section.querySelector(".coach-v182-payment")) return;
    const links = [...source.querySelectorAll("a[href]")].slice(0, 4);
    const labels = ["Sculpture sur mesure", "Cardio", "No gain, no pause", "Vitalité"];
    const details = create("details", "coach-v182-payment");
    details.innerHTML = `<summary><span class="coach-v182-lock" aria-hidden="true">✓</span><span><strong>Accéder au paiement sécurisé</strong><small>Uniquement après validation de ton programme avec Coach Raph</small></span><b aria-hidden="true">⌄</b></summary><div class="coach-v182-payment-content"><p>Choisis le programme que nous avons validé ensemble :</p><div class="coach-v182-payment-grid">${labels.map((label,index) => links[index] ? `<a href="${links[index].href}"><span>${label}</span><strong>90 €</strong><i aria-hidden="true">→</i></a>` : "").join("")}</div><small>Paiement en ligne sécurisé par Stripe.</small></div>`;
    source.insertAdjacentElement("beforebegin", details);
    hideSource(source, "coach-v182-payment-source");
  }

  function upgradeAfter(section) {
    if (!section) return;
    section.querySelector('[data-coach-home-heading="after"]')?.setAttribute("id", "coach-after");

    const commercial = buildAfterCommercial(section);
    const columnLists = [...section.querySelectorAll(".notion-column-list")];
    columnLists.slice(0, 2).forEach((list) => list.classList.add("coach-v18-followup-grid"));
    section.querySelectorAll(".coach-v18-followup-grid .notion-callout").forEach((card, index) => {
      card.classList.add("coach-v18-followup-card");
      card.dataset.coachV18Plan = String(index + 1);
    });

    [...section.querySelectorAll("details, .notion-toggle")].forEach((toggle) => {
      const text = normalize(toggle.textContent);
      if (/commencer a deux|formule duo/.test(text)) {
        toggle.classList.add("coach-v18-duo");
        hideSource(toggle, "coach-v182-after-source");
      }
      if (/paiement securise/.test(text)) {
        toggle.classList.add("coach-v18-payment");
        buildPayment(section, toggle);
      }
    });

    const afterHeading = section.querySelector('[data-coach-home-heading="after"]');
    const afterHeadingBlock = directChildContaining(section, afterHeading);
    if (afterHeadingBlock && !afterHeadingBlock.contains(commercial)) hideSource(afterHeadingBlock, "coach-v182-after-source");
    columnLists.slice(0, 2).forEach((list) => hideSource(list, "coach-v182-after-source"));

    section.querySelectorAll(".notion-callout").forEach((callout) => {
      if (/le premier pas ne t.engage a rien/.test(normalize(callout.textContent))) {
        callout.classList.add("coach-v18-final-cta");
      }
    });
    [...section.children].forEach((node) => {
      const text = normalize(node.textContent);
      if (/une question avant de reserver/.test(text)) node.classList.add("coach-v18-contact");
      if (/informations legales/.test(text)) node.classList.add("coach-v18-legal-title");
      if (/mentions legales/.test(text) && /politique de confidentialite/.test(text)) node.classList.add("coach-v18-legal-links");
    });
  }

  function updateNavigation(page) {
    const links = page.querySelector(".coach-home-links");
    if (!links || links.querySelector('[href="#coach-offer"]')) return;
    const programLink = links.querySelector('[href="#coach-formulas"]');
    const offerLink = document.createElement("a");
    offerLink.href = "#coach-offer";
    offerLink.textContent = "L’offre";
    programLink?.insertAdjacentElement("afterend", offerLink);
  }

  function upgradeHome() {
    const page = document.querySelector("#page-index.coach-home-page");
    const root = page?.querySelector(".notion-root");
    if (!page || !root || !root.querySelector('[data-coach-home-heading="discovery"]')) return;

    document.documentElement.classList.add("coach-v18-ready");
    const shells = {
      formulas: wrapRole(root, "formulas", "coach-v18-formulas-shell"),
      discovery: wrapRole(root, "discovery", "coach-v18-offer"),
      details: wrapRole(root, "details", "coach-v18-details"),
      coach: wrapRole(root, "coach", "coach-v18-coach-shell"),
      testimonials: wrapRole(root, "testimonials", "coach-v18-testimonials-shell-section"),
      after: wrapRole(root, "after", "coach-v18-after")
    };

    orderSections(root, shells);
    upgradeDiscovery(shells.discovery);
    upgradeDetails(shells.details);
    upgradeAfter(shells.after);
    upgradeGuidance(root);
    upgradeMethodNumbers(root);
    consolidateTestimonials(root, shells.testimonials, shells.after);
    updateNavigation(page);

    root.querySelectorAll(".coach-home-bottom-cta").forEach((cta) => {
      cta.dataset.coachV18Retired = "true";
      hideSource(cta, "coach-v18-legacy-cta");
    });

    root.querySelectorAll(":scope > .notion-link.notion-page, :scope > [data-coach-home-section='after'] > .notion-link.notion-page")
      .forEach((link) => {
        const text = normalize(link.textContent);
        if (/jean dupont|paul martin|no gain no pause|sculpture sur mesure|vitalite|cardio/.test(text)) {
          const block = link.closest("[id^='block-']") || link;
          block.classList.add("coach-v18-private-link");
          block.setAttribute("aria-hidden", "true");
          block.setAttribute("tabindex", "-1");
        }
      });
  }

  function refresh() {
    window.clearTimeout(refreshTimer);
    refreshTimer = window.setTimeout(upgradeHome, 180);
  }

  const observer = new MutationObserver(refresh);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  window.addEventListener("load", refresh, { once: true });
  refresh();
})();
