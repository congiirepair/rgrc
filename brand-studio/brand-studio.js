(function () {
  const STORAGE_KEY = "rc-drift-brand-studio-draft-v1";
  const form = document.getElementById("brandStudioForm");
  const formSections = document.getElementById("formSections");
  const outputConfig = document.getElementById("outputConfig");
  const routePreview = document.getElementById("routePreview");
  const studioStatus = document.getElementById("studioStatus");

  const previewCard = document.getElementById("previewCard");
  const previewVenuePill = document.getElementById("previewVenuePill");
  const previewLogoImage = document.getElementById("previewLogoImage");
  const previewWordmark = document.getElementById("previewWordmark");
  const previewTitle = document.getElementById("previewTitle");
  const previewText = document.getElementById("previewText");

  const templatePreset = deepClone(window.RC_DRIFT_TEMPLATE_PRESET || {});
  const currentPreset = deepClone(window.RC_DRIFT_CURRENT_PRESET || templatePreset);

  const lightAccentSwatch = document.getElementById("lightAccentSwatch");
  const lightAccentDarkSwatch = document.getElementById("lightAccentDarkSwatch");
  const lightAccentCyanSwatch = document.getElementById("lightAccentCyanSwatch");
  const lightAccentGreenSwatch = document.getElementById("lightAccentGreenSwatch");
  const darkAccentSwatch = document.getElementById("darkAccentSwatch");
  const darkAccentDarkSwatch = document.getElementById("darkAccentDarkSwatch");
  const darkAccentCyanSwatch = document.getElementById("darkAccentCyanSwatch");
  const darkAccentGreenSwatch = document.getElementById("darkAccentGreenSwatch");

  const fields = [
    {
      title: "Platform Identity",
      copy: "Name the product and set the app labels shown around the experience.",
      items: [
        field("platform.productName", "Product Name"),
        field("platform.browserTitle", "Browser Title"),
        field("platform.buildLabel", "Build Label"),
        field("platform.demoWindowName", "Demo Window Name"),
      ],
    },
    {
      title: "Brand Assets",
      copy: "Point the app to the logos and background photos you place in assets.",
      items: [
        field("branding.venueName", "Venue Name"),
        field("branding.logoAlt", "Logo Alt Text"),
        field("branding.venueLabelPlaceholder", "Venue Placeholder"),
        field("branding.eventNamePlaceholder", "Event Placeholder"),
        field("branding.logoPrimary", "Primary Logo Path", "text", 2),
        field("branding.logoInverted", "Watermark Logo Path", "text", 2),
        field("branding.backgroundImage", "Site Background Image", "text", 2),
        field("branding.homeHeroImage", "Home Hero Image", "text", 2),
        field("branding.shopLabel", "Store Button Label"),
        field("branding.shopUrl", "Store URL"),
        field("branding.pdfHeaderTitle", "PDF Header Title"),
        field("branding.demoVenueLabel", "Demo Venue Label"),
        field("branding.demoShowcaseName", "Demo Showcase Name", "text", 2),
      ],
    },
    {
      title: "Theme Colors",
      copy: "Separate light and dark palettes let each client keep the same event engine with their own look.",
      items: [
        field("theme.light.accent", "Light Accent"),
        field("theme.light.accentDark", "Light Accent Dark"),
        field("theme.light.accentCyan", "Light Accent Cyan"),
        field("theme.light.accentGreen", "Light Accent Green"),
        field("theme.light.accentGreenDark", "Light Green Dark"),
        field("theme.light.accentWarm", "Light Accent Warm"),
        field("theme.light.wordmarkColor", "Light Wordmark Color", "text", 2),
        field("theme.dark.accent", "Dark Accent"),
        field("theme.dark.accentDark", "Dark Accent Dark"),
        field("theme.dark.accentCyan", "Dark Accent Cyan"),
        field("theme.dark.accentGreen", "Dark Accent Green"),
        field("theme.dark.accentGreenDark", "Dark Green Dark"),
        field("theme.dark.accentWarm", "Dark Accent Warm"),
        field("theme.dark.wordmarkColor", "Dark Wordmark Color", "text", 2),
      ],
    },
    {
      title: "Landing Copy",
      copy: "Adjust the public homepage copy for each new venue.",
      items: [
        field("landing.whySectionKicker", "Why Section Kicker", "text", 2),
        field("landing.heroCopy", "Live Hero Copy", "textarea", 2),
        field("landing.emptyHeroCopy", "Empty Hero Copy", "textarea", 2),
        field("landing.whySectionCopy", "Why Section Copy", "textarea", 2),
        field("landing.benefitsText", "Benefits", "textarea", 2, "Use one line per item in this format: Title | Description"),
      ],
    },
    {
      title: "Routing",
      copy: "Give each client their own spectator, admin, website-admin, and judge domains.",
      items: [
        field("routing.spectatorHost", "Spectator Host"),
        field("routing.websiteAdminHost", "Website Admin Host"),
        field("routing.adminHost", "Event Admin Host"),
        field("routing.spectatorAliasesText", "Spectator Aliases", "textarea"),
        field("routing.judgeHosts.j1", "Judge 1 Host"),
        field("routing.judgeHosts.j2", "Judge 2 Host"),
        field("routing.judgeHosts.j3", "Judge 3 Host", "text", 2),
      ],
    },
    {
      title: "Firebase Cloud",
      copy: "Every client should have a separate Firebase project and hosting aliases.",
      items: [
        field("firebase.appId", "Firebase App Id"),
        field("firebase.config.projectId", "Project Id"),
        field("firebase.config.apiKey", "API Key", "text", 2),
        field("firebase.config.authDomain", "Auth Domain"),
        field("firebase.config.storageBucket", "Storage Bucket"),
        field("firebase.config.messagingSenderId", "Messaging Sender Id"),
        field("firebase.config.appId", "Firebase Config App Id"),
        field("firebase.spectatorAliasesText", "Firebase Hosting Aliases", "textarea", 2),
      ],
    },
    {
      title: "Default Access",
      copy: "These become the initial role passwords inside the generated config.",
      items: [
        field("security.legacyPasswords.admin", "Admin Password"),
        field("security.legacyPasswords.j1", "Judge 1 Password"),
        field("security.legacyPasswords.j2", "Judge 2 Password"),
        field("security.legacyPasswords.j3", "Judge 3 Password"),
      ],
    },
  ];

  buildForm();

  const draft = loadDraft();
  loadConfigIntoForm(draft || currentPreset);
  refreshStudio({ skipSave: Boolean(draft) });
  setStatus(draft ? "Loaded your saved Brand Studio draft." : "Loaded the current project config.");

  document.getElementById("loadTemplateBtn").addEventListener("click", () => {
    loadConfigIntoForm(templatePreset);
    refreshStudio();
    setStatus("Loaded the neutral template starter.");
  });

  document.getElementById("loadCurrentBtn").addEventListener("click", () => {
    loadConfigIntoForm(currentPreset);
    refreshStudio();
    setStatus("Loaded the current client config.");
  });

  document.getElementById("clearDraftBtn").addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEY);
    loadConfigIntoForm(templatePreset);
    refreshStudio({ skipSave: true });
    setStatus("Cleared the saved draft.");
  });

  document.getElementById("copyConfigBtn").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(outputConfig.value);
      setStatus("Copied client-config.js to your clipboard.");
    } catch (error) {
      outputConfig.focus();
      outputConfig.select();
      setStatus("Clipboard access was blocked. The generated config is selected so you can copy it manually.");
    }
  });

  document.getElementById("downloadConfigBtn").addEventListener("click", () => {
    const blob = new Blob([outputConfig.value], { type: "text/javascript;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "client-config.js";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1200);
    setStatus("Downloaded client-config.js.");
  });

  form.addEventListener("input", () => {
    refreshStudio();
    setStatus("Draft saved locally on this browser.");
  });

  function field(name, label, type = "text", span = 1, note = "") {
    return { name, label, type, span, note };
  }

  function deepClone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function buildForm() {
    formSections.innerHTML = fields.map((section) => `
      <section class="studio-section">
        <div class="studio-section-head">
          <p class="studio-eyebrow">${escapeHtml(section.title)}</p>
          <p class="studio-section-copy">${escapeHtml(section.copy)}</p>
        </div>
        <div class="studio-fields">
          ${section.items.map((item) => renderField(item)).join("")}
        </div>
      </section>
    `).join("");
  }

  function renderField(item) {
    const tag = item.type === "textarea" ? "textarea" : "input";
    const closeTag = item.type === "textarea" ? "</textarea>" : "";
    const inputHtml = item.type === "textarea"
      ? `<textarea id="${item.name}" name="${item.name}"></textarea>`
      : `<input id="${item.name}" name="${item.name}" type="text" />`;
    return `
      <div class="studio-field" data-span="${item.span}">
        <label for="${item.name}">${escapeHtml(item.label)}</label>
        ${inputHtml}
        ${item.note ? `<div class="studio-note">${escapeHtml(item.note)}</div>` : ""}
      </div>
    `;
  }

  function getByPath(source, path) {
    return path.split(".").reduce((current, key) => current?.[key], source);
  }

  function setByPath(target, path, value) {
    const parts = path.split(".");
    let pointer = target;
    parts.forEach((part, index) => {
      if (index === parts.length - 1) {
        pointer[part] = value;
        return;
      }
      if (!pointer[part] || typeof pointer[part] !== "object" || Array.isArray(pointer[part])) {
        pointer[part] = {};
      }
      pointer = pointer[part];
    });
  }

  function loadConfigIntoForm(config) {
    form.querySelectorAll("[name]").forEach((fieldEl) => {
      const name = fieldEl.name;
      let value = "";
      if (name === "routing.spectatorAliasesText") {
        value = (config.routing?.spectatorAliases || []).join("\n");
      } else if (name === "firebase.spectatorAliasesText") {
        value = (config.firebase?.spectatorAliases || []).join("\n");
      } else if (name === "landing.benefitsText") {
        value = (config.landing?.benefits || [])
          .filter((item) => Array.isArray(item) && item[0] && item[1])
          .map(([title, copy]) => `${title} | ${copy}`)
          .join("\n");
      } else {
        value = getByPath(config, name) ?? "";
      }
      fieldEl.value = String(value);
    });
  }

  function splitLines(value) {
    return String(value || "")
      .split(/\r?\n/)
      .map((entry) => entry.trim())
      .filter(Boolean);
  }

  function buildConfigFromForm() {
    const config = deepClone(templatePreset);
    const formData = new FormData(form);

    for (const [name, raw] of formData.entries()) {
      const value = String(raw || "");
      if (name === "routing.spectatorAliasesText") {
        config.routing.spectatorAliases = splitLines(value);
        continue;
      }
      if (name === "firebase.spectatorAliasesText") {
        config.firebase.spectatorAliases = splitLines(value);
        continue;
      }
      if (name === "landing.benefitsText") {
        config.landing.benefits = splitLines(value)
          .map((line) => line.split("|"))
          .map(([title, ...copyParts]) => [String(title || "").trim(), copyParts.join("|").trim()])
          .filter(([title, copy]) => title && copy);
        continue;
      }
      setByPath(config, name, value);
    }

    return config;
  }

  function refreshStudio(options = {}) {
    const config = buildConfigFromForm();
    outputConfig.value = "window.RC_DRIFT_CLIENT_CONFIG = " + JSON.stringify(config, null, 2) + ";\n";
    syncPreview(config);
    if (!options.skipSave) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    }
  }

  function syncPreview(config) {
    const productName = config.platform?.productName || "Your Track Sync";
    const venueName = config.branding?.venueName || "Your Track";
    const copy = config.landing?.emptyHeroCopy || config.landing?.heroCopy || "Your generated config preview appears here.";
    const logo = resolvePreviewAssetPath(config.branding?.logoPrimary || "");
    const heroImage = resolvePreviewAssetPath(config.branding?.homeHeroImage || config.branding?.backgroundImage || "");
    const light = config.theme?.light || {};
    const dark = config.theme?.dark || {};

    previewVenuePill.textContent = venueName;
    previewTitle.textContent = productName;
    previewText.textContent = copy;
    previewWordmark.textContent = productName;
    previewCard.style.setProperty("--preview-image", heroImage ? `url("${heroImage}")` : "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))");
    previewCard.style.setProperty("--preview-accent", dark.accent || "#ff4f9f");
    previewCard.style.setProperty("--preview-accent-dark", dark.accentDark || "#8f40ff");
    previewCard.style.setProperty("--preview-wordmark-color", dark.wordmarkColor || "#f7f7f7");

    if (logo) {
      previewLogoImage.src = logo;
      previewLogoImage.hidden = false;
      previewWordmark.hidden = true;
    } else {
      previewLogoImage.hidden = true;
      previewWordmark.hidden = false;
    }

    applySwatch(lightAccentSwatch, light.accent);
    applySwatch(lightAccentDarkSwatch, light.accentDark);
    applySwatch(lightAccentCyanSwatch, light.accentCyan);
    applySwatch(lightAccentGreenSwatch, light.accentGreen);
    applySwatch(darkAccentSwatch, dark.accent);
    applySwatch(darkAccentDarkSwatch, dark.accentDark);
    applySwatch(darkAccentCyanSwatch, dark.accentCyan);
    applySwatch(darkAccentGreenSwatch, dark.accentGreen);

    const routes = [
      ["Spectator", config.routing?.spectatorHost || "Not set"],
      ["Website Admin", config.routing?.websiteAdminHost || "Not set"],
      ["Event Admin", config.routing?.adminHost || "Not set"],
      ["Judge 1", config.routing?.judgeHosts?.j1 || "Not set"],
      ["Judge 2", config.routing?.judgeHosts?.j2 || "Not set"],
      ["Judge 3", config.routing?.judgeHosts?.j3 || "Not set"],
    ];
    routePreview.innerHTML = routes.map(([label, value]) => `
      <article class="route-item">
        <span>${escapeHtml(label)}</span>
        <code>${escapeHtml(value)}</code>
      </article>
    `).join("");
  }

  function applySwatch(node, value) {
    node.style.background = value || "#666";
  }

  function resolvePreviewAssetPath(value) {
    const assetPath = String(value || "").trim();
    if (!assetPath) {
      return "";
    }
    if (
      assetPath.startsWith("../") ||
      assetPath.startsWith("/") ||
      assetPath.startsWith("#") ||
      /^(?:[a-z]+:)?\/\//i.test(assetPath) ||
      /^[a-z]+:/i.test(assetPath)
    ) {
      return assetPath;
    }
    if (assetPath.startsWith("./")) {
      return `../${assetPath.slice(2)}`;
    }
    return `../${assetPath}`;
  }

  function loadDraft() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      return parsed && typeof parsed === "object" ? parsed : null;
    } catch (error) {
      return null;
    }
  }

  function setStatus(message) {
    studioStatus.textContent = message || "";
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
})();
