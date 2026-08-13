(() => {
  "use strict";

  if (window.__coachRaphHomeV181) return;
  window.__coachRaphHomeV181 = true;

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
      const description = embedded || sibling?.textContent.replace(/\s+/g, " ").trim() || remainder || "";

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

  function upgradeAfter(section) {
    if (!section) return;
    section.querySelector('[data-coach-home-heading="after"]')?.setAttribute("id", "coach-after");

    const columnLists = [...section.querySelectorAll(".notion-column-list")];
    columnLists.slice(0, 2).forEach((list) => list.classList.add("coach-v18-followup-grid"));
    section.querySelectorAll(".coach-v18-followup-grid .notion-callout").forEach((card, index) => {
      card.classList.add("coach-v18-followup-card");
      card.dataset.coachV18Plan = String(index + 1);
    });

    [...section.querySelectorAll("details, .notion-toggle")].forEach((toggle) => {
      const text = normalize(toggle.textContent);
      if (/commencer a deux|formule duo/.test(text)) toggle.classList.add("coach-v18-duo");
      if (/paiement securise/.test(text)) toggle.classList.add("coach-v18-payment");
    });

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
