(()=>{"use strict";const e=["block-eec8b2e3ff0449fba655b093f2f1aafe","block-8b029bcc7a254855b151dfabe893f297","block-6f8587bc689948d5b374401a74938339","block-76220e2efe71487b89ec94ec07318cd1"],t=["coach-theme-ngnp","coach-theme-vitalite","coach-theme-default"],a=["coach-session-strength","coach-session-cardio","coach-session-mobility","coach-session-recovery","coach-session-assessment","coach-session-default"],n=["coach-client-page",...t,...a],o=[{key:"ngnp",className:"coach-theme-ngnp",pattern:/no gain no pause|\bngnp\b|\bcrossfit\b/},{key:"vitalite",className:"coach-theme-vitalite",pattern:/\bvitalite\b|\benergie douce\b|\breprise\b/},{key:"sculpture",className:"coach-theme-default",pattern:/sculpture sur mesure|\bbodybuilding\b|\bhypertrophie\b/},{key:"running",className:"coach-theme-default",pattern:/course a pied|\brunning\b|\bmarathon\b/}],r=[{key:"assessment",className:"coach-session-assessment",pattern:/\bbilan\b|\btest\b|\bevaluation\b|\bdiagnostic\b/},{key:"recovery",className:"coach-session-recovery",pattern:/\brecuperation\b|\brespiration\b|\brelaxation\b|\bretour au calme\b|\brepos\b/},{key:"mobility",className:"coach-session-mobility",pattern:/\bmobilite\b|\bsouplesse\b|\betirement|\bamplitude\b/},{key:"cardio",className:"coach-session-cardio",pattern:/\bcardio\b|\bendurance\b|\bhiit\b|\binterval|\bconditioning\b|\bcourse\b|\bvelo\b/},{key:"strength",className:"coach-session-strength",pattern:/\brenforcement\b|\bforce\b|\bmusculation\b|\bcrossfit\b|\bwod\b|\bkettlebell\b|\bhaltere|\bsquat\b|\bgainage\b/}],s={destroyed:!1,observer:null,interval:null,timer:null,popup:null,popupContent:null,popupTrigger:null,formulaPage:null,formulaClickHandler:null,keyHandler:null},c=(e="")=>String(e).replace(/\u00a0/g," ").replace(/\s+/g," ").trim(),i=(e="")=>c(e).normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase(),l=(e,t,a)=>Math.min(a,Math.max(t,e));function d(e){const t=Number.parseFloat(c(e).replace(/\s/g,"").replace(",",".").replace(/[^0-9.+-]/g,""));return Number.isFinite(t)?t:Number.NaN}function u(e,t){const a=c(e),n=d(a);return Number.isFinite(n)?l(a.includes("%")||n>1?n/100:n,0,1):l(t,0,1)}function p(e){const t=i(e);return o.find(e=>e.pattern.test(t))||null}function h(e,t="p, h1, h2, h3, .notion-heading"){return[...e.querySelectorAll(t)].filter(e=>c(e.textContent))}function m(e,t,a){return h(e,a).find(e=>t.test(i(e.textContent)))||null}function b(e,t){const a=document.createElement(e);return t&&(a.className=t),a}function f(e,t){document.documentElement.classList.remove(...e),document.documentElement.classList.add(t)}function g(){if(!s.popup)return;s.popup.classList.remove("show"),s.popup.setAttribute("aria-hidden","true"),document.body.classList.remove("coach-popup-open");const e=s.popupTrigger;s.popupTrigger=null,e?.isConnected&&e.focus({preventScroll:!0})}function v(e){if(!s.popup?.classList.contains("show"))return;if("Escape"===e.key)return e.preventDefault(),void g();if("Tab"!==e.key)return;const t=[...s.popup.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])')].filter(e=>e.getClientRects().length);if(!t.length)return;const a=t[0],n=t[t.length-1];e.shiftKey&&document.activeElement===a?(e.preventDefault(),n.focus()):e.shiftKey||document.activeElement!==n||(e.preventDefault(),a.focus())}function y(){const t=document.querySelector("#page-index");if(!t)return;const a=e.map(e=>t.querySelector(`#${e}`)).filter(Boolean);if(a.length===e.length){if(!s.popup){const e=b("div","coach-popup");e.setAttribute("role","dialog"),e.setAttribute("aria-modal","true"),e.setAttribute("aria-label","Présentation de la formule"),e.setAttribute("aria-hidden","true"),e.innerHTML='\n        <div class="coach-popup-bg" aria-hidden="true"></div>\n        <div class="coach-popup-box" role="document">\n          <button class="coach-popup-close" type="button" aria-label="Fermer la fenêtre">Fermer ×</button>\n          <div class="coach-popup-content"></div>\n        </div>',document.body.append(e),s.popup=e,s.popupContent=e.querySelector(".coach-popup-content"),e.querySelector(".coach-popup-close").addEventListener("click",g),e.querySelector(".coach-popup-bg").addEventListener("click",g),s.keyHandler=v,document.addEventListener("keydown",s.keyHandler)}a.forEach(e=>{const t=e.querySelector(".notion-toggle__summary");t&&(t.classList.add("coach-formula-summary"),t.setAttribute("role","button"),t.setAttribute("tabindex","0"),t.setAttribute("aria-haspopup","dialog"))}),s.formulaPage!==t&&(s.formulaPage&&s.formulaClickHandler&&(s.formulaPage.removeEventListener("click",s.formulaClickHandler,!0),s.formulaPage.removeEventListener("keydown",s.formulaClickHandler,!0)),s.formulaPage=t,s.formulaClickHandler=a=>{const n=a.target.closest(".coach-formula-summary");if(!n||!t.contains(n))return;if("keydown"===a.type&&"Enter"!==a.key&&" "!==a.key)return;const o=n.closest("[id^='block-']");if(!e.includes(o?.id))return;const r=o.querySelector(".notion-toggle__content");r&&(a.preventDefault(),a.stopPropagation(),function(e,t){s.popup&&s.popupContent&&(s.popupContent.replaceChildren(...[...t.childNodes].map(e=>e.cloneNode(!0))),s.popupTrigger=e,s.popup.classList.add("show"),s.popup.setAttribute("aria-hidden","false"),document.body.classList.add("coach-popup-open"),s.popup.querySelector(".coach-popup-close")?.focus({preventScroll:!0}))}(n,r))},t.addEventListener("click",s.formulaClickHandler,!0),t.addEventListener("keydown",s.formulaClickHandler,!0))}}function C(e){return e.querySelector('a[href*="calendly"], a[href*="calendar"], a[href*="booking"]')?.href||"#"}function k(){window.clearTimeout(s.timer),s.timer=window.setTimeout(()=>{try{!function(){if(s.destroyed)return!1;!function(){const e=document.querySelector("#page-index");if(!e)return;e.classList.add("coach-home-page");const t=e.querySelector(".notion-root, .notion-page-content");if(!t)return;!function(e){const t=[];[...e.querySelectorAll("h1, h2, h3, .notion-heading")].forEach(a=>{const n=function(e){const t=i(e);return/confort du distant/.test(t)?"remote":/methode simple/.test(t)?"method":/4 semaines pour decouvrir/.test(t)?"discovery":/quel est ton objectif/.test(t)?"formulas":/qui va t.?accompagner/.test(t)?"coach":/ils parlent de leur experience/.test(t)?"testimonials":/deroule detaille/.test(t)?"details":/apres les 4 semaines/.test(t)?"after":""}(a.textContent);if(n){a.dataset.coachHomeHeading=n,a.closest("[id^='block-']")?.setAttribute("data-coach-home-block",n);let o=a;for(;o.parentElement&&o.parentElement!==e;)o=o.parentElement;o.parentElement===e&&t.push({role:n,block:o})}}),t.forEach(({role:e,block:a},n)=>{const o=t[n+1]?.block||null;let r=a;for(;r&&r!==o;)r.dataset.coachHomeSection=e,r=r.nextElementSibling})}(t);let a=e.querySelector(".coach-home-nav");if(!a){a=b("nav","coach-home-nav"),a.setAttribute("aria-label","Navigation principale"),a.innerHTML='\n        <a class="coach-home-brand" href="#page-index" aria-label="Coach Raph — accueil"><span class="coach-home-brand-mark"><b>CR</b><em>Coach Raph</em></span></a>\n        <div class="coach-home-links">\n          <a href="#coach-method">Méthode</a>\n          <a href="#coach-formulas">Programmes</a>\n          <a href="#coach-coach">À propos</a>\n          <a href="#coach-testimonials">Témoignages</a>\n        </div>\n        <button class="coach-home-menu" type="button" aria-label="Afficher le menu" aria-expanded="false"><span></span><span></span><span></span></button>',e.prepend(a);const t=a.querySelector(".coach-home-menu");t.addEventListener("click",()=>{const e=a.classList.toggle("is-open");t.setAttribute("aria-expanded",String(e))}),a.querySelectorAll("a").forEach(e=>e.addEventListener("click",()=>{a.classList.remove("is-open"),t.setAttribute("aria-expanded","false")}))}let n=e.querySelector(".coach-home-hero");if(n){const t=n.querySelector(".coach-home-primary");t&&"#"===t.getAttribute("href")&&(t.href=C(e))}else n=b("section","coach-home-hero"),n.setAttribute("aria-labelledby","coach-home-title"),n.innerHTML=`\n        <div class="coach-home-hero-copy">\n          <p class="coach-home-eyebrow">Coaching sportif personnalisé</p>\n          <h1 id="coach-home-title">Un coaching à distance,<br>conçu pour vous<br>faire avancer.</h1>\n          <p class="coach-home-lead">Un programme sur mesure, adapté à votre quotidien, votre niveau et vos objectifs. Un espace personnel clair et un suivi humain, pour des résultats durables.</p>\n          <a class="coach-home-primary" href="${C(e)}">Réserver mon échange gratuit <span aria-hidden="true">→</span></a>\n        </div>\n        <div class="coach-home-visual" aria-hidden="true">\n          <img class="coach-home-athlete" src="https://images.pexels.com/photos/20240039/pexels-photo-20240039/free-photo-of-a-muscular-tattooed-man-using-his-phone-at-the-gym.jpeg?auto=compress&fit=crop&w=900&q=82" alt="">\n          <div class="coach-home-metric coach-home-metric-progress"><small>Aperçu du suivi</small><strong>Progression visible</strong><span><i></i></span><em>Des repères simples et motivants</em></div>\n          <div class="coach-home-metric coach-home-metric-session"><small>Prochaine séance</small><strong>Dans ton espace</strong><em>Claire, adaptée et prête</em></div>\n        </div>\n        <div class="coach-home-benefits" aria-label="Les avantages du coaching">\n          <span><b>✓</b> Programme sur mesure</span>\n          <span><b>⌁</b> Suivi à distance</span>\n          <span><b>♢</b> Cadre clair</span>\n        </div>`,a.insertAdjacentElement("afterend",n);if(Object.entries({method:"coach-method",formulas:"coach-formulas",coach:"coach-coach",testimonials:"coach-testimonials"}).forEach(([e,a])=>{const n=t.querySelector(`[data-coach-home-heading="${e}"]`);n&&(n.id=a)}),!t.querySelector(".coach-home-bottom-cta")){const a=b("aside","coach-home-bottom-cta");a.innerHTML=`\n        <div class="coach-home-bottom-icon" aria-hidden="true">✓</div>\n        <div><strong>Prêt à passer à l’action ?</strong><span>Réserve ton échange gratuit et faisons le point sur tes objectifs.</span></div>\n        <a href="${C(e)}">Réserver mon échange gratuit <span aria-hidden="true">→</span></a>`;const n=t.querySelector('[data-coach-home-section="details"]');t.insertBefore(a,n||null)}}(),function(){const e=[...document.querySelectorAll("[id^='page-']")].find(e=>/coaching sportif personnalise/.test(i(e.querySelector(".notion-header__title")?.textContent)));e&&[...e.querySelectorAll("a.notion-page")].forEach(e=>{if(!/^(test\s*[—-]\s*)?.+\s+[—-]\s+(no gain no pause|vitalit[eé]|sculpture sur mesure|course [aà] pied|cardio|cardiotraining)$/i.test(c(e.textContent)))return;const t=e.closest("[id^='block-']")||e.parentElement;t&&!t.dataset.coachHiddenClientLink&&(t.dataset.coachPreviousDisplay=t.style.getPropertyValue("display"),t.dataset.coachPreviousDisplayPriority=t.style.getPropertyPriority("display"),t.style.setProperty("display","none","important"),t.dataset.coachHiddenClientLink="true")})}(),y();const e=function(){const e=[...document.querySelectorAll("[id^='page-']")].find(e=>{const t=i(e.querySelector(".notion-header__title")?.textContent);return Boolean(p(t))&&/bienvenue|ta prochaine seance|ma progression/.test(i(e.textContent))});if(!e)return null;const t=m(e,/^ta prochaine seance$/,"h1, h2, h3, .notion-heading"),a=function(e,t){let a=t?.parentElement||e.querySelector(".notion-page-content");for(;a&&a!==e;){const e=i(a.textContent);if(/ta prochaine seance/.test(e)&&/ma progression/.test(e)&&/ton espace/.test(e))return a;a=a.parentElement}return e.querySelector(".notion-page-content")||t?.parentElement||null}(e,t);if(!a)return null;const n=h(a,"h1, h2, h3, .notion-heading"),o=e=>n.find(t=>e.test(i(t.textContent)))||null,r=[...e.querySelectorAll(".notion-callout")],s=[...a.querySelectorAll(".notion-callout")],l=e=>s.find(t=>e.test(i(t.textContent)))||null,d=[...a.querySelectorAll("a.notion-page")],u=e=>d.find(t=>e.test(i(t.textContent)))?.closest(".notion-callout")||null,b=e.querySelector(".notion-header__title"),f=c(b?.textContent),g=f.split(/\s+[—-]\s+/),v=g.findIndex(e=>Boolean(p(e))),y=(v>=0?g.slice(0,v).join(" — "):f).replace(/^test\s*[—-]\s*/i,"").trim(),C=y.split(/\s+/)[0]||"",k=r.find(e=>Boolean(p(e.textContent)))||null,S=s.find(e=>e!==k&&/phase decouverte.*semaine/.test(i(e.textContent)))||null,x=[...a.querySelectorAll("table")].find(e=>{const t=i(e.textContent);return/seances terminees/.test(t)&&/temps prevu/.test(t)})||null;return{page:e,root:a,title:b,clientName:y,firstName:/^(test|modele|espace)$/i.test(C)?"":C,welcome:m(e,/^bienvenue\b/,"p, h1, h2, h3, .notion-heading"),intro:m(e,/ton espace coach raph/,"p"),program:k,nextHeading:t,session:l(/seance\s*\d+|commencer ma seance/),sessionTitle:m(a,/^seance\s*\d+/,"p, h1, h2, h3"),sessionLink:[...a.querySelectorAll("a")].find(e=>/commencer ma seance/.test(i(e.textContent)))||null,explanation:m(a,/comment ca marche/,"p"),progressionHeading:o(/^ma progression$/),phase:S,sessionStat:l(/tes seances cette semaine/),timeStat:l(/ton temps d.?entrainement/),spaceHeading:o(/^ton espace$/),programCard:u(/^mon programme/),followCard:u(/^mon suivi/),reportCard:u(/^mes bilans/),adjustmentCard:u(/^mes ajustements/),resourceCard:u(/^mes ressources/),helpHeading:o(/^besoin de moi/),help:l(/ecrire a coach raph|une question.*besoin d.?adapter/),contactLink:[...a.querySelectorAll("a")].find(e=>/ecrire a coach raph/.test(i(e.textContent)))||null,progressTitle:m(a,/^ui progression.*test$/,"h1, h2, h3, p, .notion-heading"),progressSource:x}}();e?"coach-native-v16"!==getComputedStyle(document.documentElement).getPropertyValue("--coach-native-build").trim()?document.documentElement.classList.remove("coach-native-ready",...n):(function(e){let t=e.sessionStat?.parentElement||null;for(;t&&t!==e.root&&e.timeStat&&!t.contains(e.timeStat);)t=t.parentElement;const a={welcome:e.welcome,intro:e.intro,program:e.program,nextHeading:e.nextHeading,session:e.session,sessionTitle:e.sessionTitle,sessionAction:e.sessionLink?.closest("[id^='block-']")||e.sessionLink,explanation:e.explanation,progressionHeading:e.progressionHeading,phase:e.phase,statsGrid:t,spaceHeading:e.spaceHeading,programCard:e.programCard,followCard:e.followCard,reportCard:e.reportCard,adjustmentCard:e.adjustmentCard,resourceCard:e.resourceCard,helpHeading:e.helpHeading,help:e.help,contactAction:e.contactLink?.closest("[id^='block-']")||e.contactLink,progressTitle:e.progressTitle,progressSource:e.progressSource?.closest("[id^='block-']")||e.progressSource};Object.entries(a).forEach(([e,t])=>{t&&(t.dataset.coachRole=e)}),e.page.classList.add("coach-client-shell"),e.root.classList.add("coach-client-root"),e.session?.classList.add("coach-session-card"),e.help?.classList.add("coach-help-card"),e.resourceCard?.classList.add("coach-resource-card"),t?.classList.add("coach-stats-grid"),[e.programCard,e.followCard,e.reportCard,e.adjustmentCard,e.resourceCard].filter(Boolean).forEach(e=>e.classList.add("coach-space-card"))}(e),function(e){if(!e.welcome||!e.firstName)return;if(!/^bienvenue\b/i.test(c(e.welcome.textContent)))return;const t=`Bienvenue ${e.firstName}`;c(e.welcome.textContent)!==t&&(e.welcome.textContent=t)}(e),function(e){const n=p(e.program?.textContent)||p(e.title?.textContent)||{key:"default",className:"coach-theme-default"},o=i(`${e.sessionTitle?.textContent||""} ${e.session?.textContent||""}`),s=r.map(e=>({rule:e,index:o.search(e.pattern)})).filter(e=>e.index>=0).sort((e,t)=>e.index-t.index),c=s[0]?.rule||{key:"default",className:"coach-session-default"};document.documentElement.classList.add("coach-client-page"),f(t,n.className),f(a,c.className),e.page.dataset.coachTheme=n.key,e.page.dataset.coachFormula=n.key,e.root.dataset.coachSessionType=c.key}(e),function(e){const t=e.page.querySelector(".notion-header__content");if(!t)return;let a=t.querySelector(".coach-hero-details");a||(a=b("div","coach-hero-details"),t.append(a)),[e.welcome,e.intro,e.program].forEach(e=>{e&&e.parentElement!==a&&a.append(e)}),e.page.querySelector(".notion-header")?.classList.add("coach-hero"),e.root.classList.add("coach-dashboard")}(e),function(e){const{root:t,phase:a,sessionStat:n,timeStat:o}=e;if(!a||!n||!o)return;const r=function(e){const t=e.progressSource;if(!t)return null;const a=[...t.querySelectorAll("thead th")].map(e=>c(e.textContent)),n=[...t.querySelectorAll("tbody tr")];if(!a.length||!n.length)return null;const o=i(e.clientName),r=o?n.find(e=>i(e.querySelector("td")?.textContent)===o):n[0];if(!r)return e.root.dataset.coachProgressSource="client-not-found",null;const s=[...r.querySelectorAll("td")].map(e=>c(e.textContent)),l={};a.forEach((e,t)=>{l[i(e)]=s[t]??""});const p=e=>Object.entries(l).find(([t])=>e.test(t))?.[1]??"",h=d(p(/seances terminees$/)),m=d(p(/seances prevues$/)),b=d(p(/temps realise$/)),f=d(p(/temps prevu$/));if([h,m,b,f].some(Number.isNaN))return e.root.dataset.coachProgressSource="invalid-values",null;const g={done:Math.max(0,Math.round(h)),planned:Math.max(0,Math.round(m)),timeDone:Math.max(0,Math.round(b)),timePlanned:Math.max(0,Math.round(f))},v=u(p(/progression seances$/),g.planned?g.done/g.planned:0),y=u(p(/progression temps$/),g.timePlanned?g.timeDone/g.timePlanned:0);return e.root.dataset.coachProgressSource="matched",{...g,sessionPercent:Math.round(100*v),timePercent:Math.round(100*y),globalPercent:Math.round(50*(v+y))}}(e);if(!r)return;const s=function(e){const t=Number(e.dataset.coachWeekCurrent),a=Number(e.dataset.coachWeekTotal);if(t&&a)return{current:t,total:a};const n=c(e.textContent).match(/semaine\s*(\d+)\s*(?:sur|\/)\s*(\d+)/i),o=l(Number(n?.[2])||4,1,8),r=l(Number(n?.[1])||1,1,o);return e.dataset.coachWeekCurrent=String(r),e.dataset.coachWeekTotal=String(o),{current:r,total:o}}(a),p=JSON.stringify({...r,...s});if(t.dataset.coachProgressSignature===p)return;t.dataset.coachProgressSignature=p;const h=a.querySelector(".notion-callout__content"),m=n.querySelector(".notion-callout__content"),b=o.querySelector(".notion-callout__content");if(!h||!m||!b)return;const f=Array.from({length:s.total},(e,t)=>{const a=t+1;return`<span class="coach-week${a<s.current?" is-done":a===s.current?" is-current":""}"><span class="coach-week-circle" aria-hidden="true">${a<s.current?"✓":a===s.current?"✦":""}</span><span class="coach-week-label">S${a}</span></span>`}).join("");a.classList.add("coach-phase-card"),h.innerHTML=`\n      <div class="coach-phase-copy">\n        <strong>Phase découverte — semaine ${s.current} sur ${s.total}</strong>\n        <div class="coach-week-track" aria-label="Semaine ${s.current} sur ${s.total}">${f}</div>\n      </div>\n      <div class="coach-global-progress" role="progressbar" aria-label="Progression globale" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${r.globalPercent}" style="--coach-global:${r.globalPercent}%">\n        <strong>${r.globalPercent}%</strong><span>Progression<br>globale</span>\n      </div>`;const g=Array.from({length:r.planned},(e,t)=>`<span class="coach-session-dot${t<r.done?" is-done":""}" aria-hidden="true"></span>`).join("");n.classList.add("coach-stat-card","coach-session-stat"),m.innerHTML=`\n      <h3>Tes séances cette semaine</h3>\n      <strong>${r.done} sur ${r.planned} validées</strong>\n      <div class="coach-session-dots" aria-label="${r.done} séance(s) validée(s) sur ${r.planned}">${g}</div>\n      <p>Chaque pastille se remplit<br>à chaque séance validée.</p>`,o.classList.add("coach-stat-card","coach-time-stat"),b.innerHTML=`\n      <h3>Ton temps d’entraînement</h3>\n      <strong>${r.timeDone} min réalisées sur ${function(e){const t=Math.max(0,Math.round(e)),a=Math.floor(t/60),n=t%60;return a&&n?`${a} h ${n}`:a?`${a} h`:`${n} min`}(r.timePlanned)} prévues</strong>\n      <div class="coach-time-progress" role="progressbar" aria-label="Progression du temps" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${r.timePercent}"><span style="width:${r.timePercent}%"></span></div>\n      <div class="coach-time-labels"><span>0%</span><span>100%</span></div>\n      <p>La progression suit ton temps<br>réellement effectué.</p>`}(e),function(e){if(!e.spaceHeading)return;let t=e.root.querySelector(".coach-space-grid");t||(t=b("div","coach-space-grid"),e.spaceHeading.insertAdjacentElement("afterend",t));const a=[e.programCard,e.followCard,e.reportCard,e.adjustmentCard,e.resourceCard].filter(Boolean),n=a.map(e=>e.closest(".notion-column")).filter(Boolean),o=n.map(e=>e.parentElement).filter(t=>t&&t!==e.root);a.forEach(e=>{e.parentElement!==t&&t.append(e)}),[...n,...o].forEach(e=>{e.querySelector(".notion-callout")||e.classList.add("coach-empty-layout")})}(e),document.documentElement.classList.add("coach-native-ready")):document.documentElement.classList.remove("coach-native-ready",...n)}()}catch(e){console.error("[Coach Raph UI] Échec du rafraîchissement",e)}},180)}window.__coachRaphUI?.destroy?.(),window.__coachNativeUI?.destroy?.(),document.querySelectorAll("#coach-raph-app,#coach-raph-static-app,.coach-popup").forEach(e=>e.remove()),document.documentElement.classList.remove("coach-raph-ui","coach-native-ready",...n),s.observer=new MutationObserver(k),s.observer.observe(document.documentElement,{childList:!0,subtree:!0,characterData:!0}),s.interval=window.setInterval(k,2500),window.__coachNativeUI={refresh:k,destroy:function(){s.destroyed=!0,window.clearTimeout(s.timer),window.clearInterval(s.interval),s.observer?.disconnect(),g(),s.formulaPage&&s.formulaClickHandler&&(s.formulaPage.removeEventListener("click",s.formulaClickHandler,!0),s.formulaPage.removeEventListener("keydown",s.formulaClickHandler,!0)),s.keyHandler&&document.removeEventListener("keydown",s.keyHandler),s.popup?.remove(),document.querySelectorAll("[data-coach-hidden-client-link]").forEach(e=>{const t=e.dataset.coachPreviousDisplay||"",a=e.dataset.coachPreviousDisplayPriority||"";t?e.style.setProperty("display",t,a):e.style.removeProperty("display"),delete e.dataset.coachHiddenClientLink,delete e.dataset.coachPreviousDisplay,delete e.dataset.coachPreviousDisplayPriority}),document.documentElement.classList.remove("coach-native-ready",...n)}},k()})();
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
(() => {
  "use strict";

  if (window.__coachRaphHomeV1844) return;
  window.__coachRaphHomeV1844 = true;

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

  function hideLegacyTestimonialGrid(root) {
    const signatures = [
      /avec coach raph.*plus qu.*a/,
      /super motivant.*tres competent/,
      /effets se sont fait ressentir.*saison/
    ];
    root.querySelectorAll(".notion-column-list").forEach((list) => {
      if (list.closest(".coach-v17-testimonials-shell")) return;
      const text = normalize(list.textContent);
      const matches = signatures.filter((pattern) => pattern.test(text)).length;
      if (matches >= 2) hideSource(list, "coach-v184-testimonials-source");
    });
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
    if (!section) return;
    const existing = section.querySelector(".coach-v18-timeline");
    if (existing) {
      existing.querySelectorAll(".coach-v18-timeline-step p").forEach((paragraph, index) => {
        const text = normalize(paragraph.textContent);
        if (!text || /une etape personnalisee/.test(text)) paragraph.textContent = detailDescriptions[index] || "";
      });
      return;
    }
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
    ["✓", "Continuer seul", "0 €", "Autonomie", "Ton programme reste à toi", "Tu conserves ton programme et avances à ton rythme."],
    ["↻", "Suivi 1 mois", "50 €", "Coup de pouce", "1 point personnalisé", "Mise à jour du programme et point personnalisé."],
    ["↗", "Suivi 3 mois", "135 €", "Suivi régulier", "Le plus équilibré", "Réajustements réguliers et accompagnement renforcé."],
    ["✦", "Suivi 6 mois", "240 €", "Progression durable", "Un suivi tous les 15 jours", "Programme évolutif et suivi toutes les deux semaines."]
  ];

  function buildAfterCommercial(root, anchor) {
    const existingPanels = [...document.querySelectorAll("#coach-after-v184, .coach-v184-after-commercial")];
    const panel = existingPanels.find((candidate) => root.contains(candidate));
    existingPanels.filter((candidate) => candidate !== panel).forEach((duplicate) => duplicate.remove());
    const existingDuo = [...document.querySelectorAll("#coach-duo-v184, .coach-v184-duo-card")];
    const duoPanel = existingDuo.find((candidate) => root.contains(candidate));
    existingDuo.filter((candidate) => candidate !== duoPanel).forEach((duplicate) => duplicate.remove());
    if (panel && duoPanel) return panel;
    panel?.remove();
    duoPanel?.remove();
    const duoSource = [...root.querySelectorAll("details, .notion-toggle")]
      .find((node) => /commencer a deux|formule duo/.test(normalize(node.textContent)));
    const duoLink = duoSource?.querySelector("a[href]");
    const newPanel = create("section", "coach-v184-after-commercial");
    newPanel.id = "coach-after-v184";
    newPanel.dataset.coachGenerated = "after-commercial";
    newPanel.innerHTML = `
      <div class="coach-v184-after-heading"><span>Libre de choisir</span><h2>Et après les 4 semaines ?</h2><p>Ton programme reste à toi, sans abonnement automatique. Tu choisis simplement la suite qui te ressemble.</p></div>
      <div class="coach-v184-plan-grid">${followupPlans.map(([icon,title,price,label,highlight,copy], index) => `
        <article class="coach-v184-plan${index === 2 ? " is-featured" : ""}">${index === 2 ? '<span class="coach-v184-plan-badge">Recommandé</span>' : ""}<div class="coach-v184-plan-top"><span class="coach-v184-plan-icon" aria-hidden="true">${icon}</span><small>${label}</small></div><h3>${title}</h3><strong>${price}</strong><b>${highlight}</b><p>${copy}</p></article>`).join("")}</div>`;
    const newDuo = create("aside", "coach-v184-duo-card");
    newDuo.id = "coach-duo-v184";
    newDuo.dataset.coachGenerated = "duo-offer";
    newDuo.innerHTML = `<div class="coach-v184-duo-icon" aria-hidden="true"><span>2</span></div><div><span>Une autre façon de commencer</span><h3>La formule Duo</h3><p><strong>150 € pour deux personnes pendant 4 semaines</strong>, soit 75 € par personne.</p><ul><li>Deux bilans individuels</li><li>Un programme adapté à chacun</li><li>Des défis communs</li><li>Des conseils pour s’entraîner ensemble</li></ul></div>${duoLink ? `<a href="${duoLink.href}">Découvrir la formule Duo <span aria-hidden="true">→</span></a>` : ""}`;
    anchor.insertAdjacentElement("beforebegin", newPanel);
    newPanel.insertAdjacentElement("afterend", newDuo);
    return newPanel;
  }

  function buildPayment(root, source) {
    if (!source || root.querySelector(".coach-v184-payment")) return;
    const links = [...source.querySelectorAll("a[href]")].slice(0, 4);
    const labels = ["Sculpture sur mesure", "Cardio", "No gain, no pause", "Vitalité"];
    const details = create("details", "coach-v184-payment");
    details.dataset.coachGenerated = "secure-payment";
    details.innerHTML = `<summary><span class="coach-v184-lock" aria-hidden="true"><svg viewBox="0 0 32 32"><rect x="7" y="14" width="18" height="13" rx="3"/><path d="M11 14V10a5 5 0 0 1 10 0v4M16 19v3"/></svg></span><span><small>Après notre échange</small><strong>Accéder au paiement sécurisé</strong><em>Choisis uniquement la formule validée ensemble.</em></span><b aria-hidden="true">＋</b></summary><div class="coach-v184-payment-content"><div><strong>Ton programme validé</strong><p>Paiement unique de la formule Découverte.</p></div><div class="coach-v184-payment-grid">${labels.map((label,index) => links[index] ? `<a href="${links[index].href}"><span>${label}</span><strong>90 €</strong><i aria-hidden="true">→</i></a>` : "").join("")}</div><small><span aria-hidden="true">✓</span> Paiement en ligne sécurisé par Stripe.</small></div>`;
    source.insertAdjacentElement("beforebegin", details);
    hideSource(source, "coach-v184-payment-source");
  }

  function upgradeAfterSafely(root, section) {
    const scope = section || root;
    root.querySelectorAll(".coach-v182-after-commercial, .coach-v182-payment")
      .forEach((node) => hideSource(node, "coach-v184-retired"));

    const generatedPanels = [...document.querySelectorAll("#coach-after-v184, .coach-v184-after-commercial")];
    const currentPanel = generatedPanels.find((candidate) => root.contains(candidate));
    generatedPanels.filter((candidate) => candidate !== currentPanel).forEach((duplicate) => duplicate.remove());
    const generatedDuos = [...document.querySelectorAll("#coach-duo-v184, .coach-v184-duo-card")];
    const currentDuo = generatedDuos.find((candidate) => root.contains(candidate));
    generatedDuos.filter((candidate) => candidate !== currentDuo).forEach((duplicate) => duplicate.remove());

    const afterHeading = root.querySelector('[data-coach-home-heading="after"]') || [...root.querySelectorAll("h1,h2,h3,.notion-heading")]
      .find((node) => /^et apres les 4 semaines/.test(normalize(node.textContent)));
    const anchor = afterHeading?.closest("[id^='block-']") || afterHeading;
    if (anchor) {
      buildAfterCommercial(root, anchor);
      const headingTarget = normalize(anchor.textContent).length < 140 ? anchor : afterHeading;
      hideSource(headingTarget, "coach-v184-after-heading-source");
      const subtitle = anchor.nextElementSibling;
      if (subtitle && /aucune obligation de poursuivre/.test(normalize(subtitle.textContent)) && normalize(subtitle.textContent).length < 180) {
        hideSource(subtitle, "coach-v184-after-heading-source");
      }
    }

    root.querySelectorAll(".notion-column-list").forEach((list) => {
      const text = normalize(list.textContent);
      const planMatches = [/continuer seul/, /suivi 1 mois/, /suivi 3 mois/, /suivi 6 mois/]
        .filter((pattern) => pattern.test(text)).length;
      if (planMatches >= 3) hideSource(list, "coach-v184-after-source");
    });

    [...root.querySelectorAll("details, .notion-toggle")].forEach((toggle) => {
      const text = normalize(toggle.textContent);
      if (/commencer a deux|formule duo/.test(text)) hideSource(toggle, "coach-v184-after-source");
      if (/deja echange avec coach raph/.test(text) && /paiement securise/.test(text)) buildPayment(root, toggle);
    });

    scope.querySelectorAll(".notion-callout").forEach((callout) => {
      if (/le premier pas ne t.engage a rien/.test(normalize(callout.textContent))) {
        callout.classList.add("coach-v18-final-cta");
      }
    });
    [...scope.children].forEach((node) => {
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

  function upgradeMotivationStory(root) {
    if (root.querySelector(".coach-v192-motivation")) return;

    const heading = [...root.querySelectorAll("h1,h2,h3,.notion-heading")]
      .find((node) => /envie est la.*plus dur.*durer/.test(normalize(node.textContent)));
    if (!heading) return;

    const headingBlock = directChildContaining(root, heading);
    if (!headingBlock) return;

    const sourceNodes = [];
    let current = headingBlock;
    while (current) {
      if (current !== headingBlock && (
        current.querySelector?.('[data-coach-home-heading="remote"], .coach-v17-manifesto') ||
        current.matches?.('[data-coach-home-section="remote"], .coach-v17-manifesto')
      )) break;
      sourceNodes.push(current);
      current = current.nextElementSibling;
    }

    const sourceLinks = sourceNodes.flatMap((node) => [...node.querySelectorAll("a[href]")]);
    const sourceMarkup = sourceLinks.length
      ? sourceLinks.map((link) => `<a href="${link.href}">${link.textContent.trim()}</a>`).join("")
      : "";

    const story = create("section", "coach-v192-motivation");
    story.dataset.coachGenerated = "motivation-story";
    story.setAttribute("aria-labelledby", "coach-v192-motivation-title");
    story.innerHTML = `
      <header class="coach-v192-motivation-heading">
        <span>Le vrai défi</span>
        <h2 id="coach-v192-motivation-title">L’envie est là.<br>Le plus dur, c’est de durer.</h2>
        <p>Commencer demande une impulsion. Progresser demande surtout un cadre capable de tenir quand le quotidien s’en mêle.</p>
      </header>
      <div class="coach-v192-stat-grid" aria-label="Trois constats sur la régularité sportive">
        <article class="coach-v192-stat coach-v192-stat-primary" style="--stat-color:#1764e8;--stat-soft:#eaf2ff">
          <strong>50<small>%</small></strong>
          <h3>veulent bouger davantage</h3>
        </article>
        <article class="coach-v192-stat" style="--stat-color:#7f5bda;--stat-soft:#f2edff">
          <strong>33<small>%</small></strong>
          <h3>sont moins actifs qu’avant</h3>
        </article>
        <article class="coach-v192-stat" style="--stat-color:#08a775;--stat-soft:#e8fbf4">
          <strong>1<small>sur</small>2</strong>
          <h3>pratique principalement seul</h3>
        </article>
      </div>
      ${sourceMarkup ? `<details class="coach-v192-sources"><summary>Sources des chiffres</summary><div>${sourceMarkup}</div></details>` : ""}`;

    const manifesto = root.querySelector(".coach-v17-manifesto");
    (manifesto || headingBlock).insertAdjacentElement("beforebegin", story);
    sourceNodes.forEach((node) => hideSource(node, "coach-v192-motivation-source"));
  }

  function removeRemoteDuplicate(root) {
    if (!root.querySelector(".coach-v17-manifesto")) return;
    root.querySelectorAll('[data-coach-home-section="remote"], [data-coach-home-heading="remote"]')
      .forEach((node) => {
        if (!node.closest(".coach-v17-manifesto")) hideSource(node, "coach-v192-remote-duplicate");
      });
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
    upgradeAfterSafely(root, shells.after);
    upgradeGuidance(root);
    upgradeMethodNumbers(root);
    consolidateTestimonials(root, shells.testimonials, shells.after);
    hideLegacyTestimonialGrid(root);
    updateNavigation(page);
    upgradeMotivationStory(root);
    removeRemoteDuplicate(root);

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

  const observer = new MutationObserver((mutations) => {
    const externalChange = mutations.some((mutation) => [...mutation.addedNodes, ...mutation.removedNodes]
      .some((node) => node.nodeType === 1 && !node.closest?.("[data-coach-generated], .coach-v184-payment")));
    if (externalChange) refresh();
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
  window.addEventListener("load", refresh, { once: true });
  refresh();
})();
