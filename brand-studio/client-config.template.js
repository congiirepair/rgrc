// Copy this file to `client-config.js` for a new client workspace.
// Then replace the values below without editing `index.html`.

window.RC_DRIFT_CLIENT_CONFIG = {
  platform: {
    productName: "Your Track Sync",
    buildLabel: "Template Build 2026.04.15.1",
    browserTitle: "Your Track Competition Control",
    demoWindowName: "yourtrack-live-demo-window",
  },
  branding: {
    venueName: "Your Track",
    venueLabelPlaceholder: "Your Track",
    eventNamePlaceholder: "Your Track Championship",
    logoPrimary: "./assets/template-track-logo-primary.png",
    logoInverted: "./assets/template-track-logo-inverted.png",
    logoAlt: "Your Track logo",
    backgroundImage: "./assets/template-track-background.png",
    homeHeroImage: "./assets/template-track-background.png",
    shopUrl: "",
    shopLabel: "Visit Track Store",
    pdfHeaderTitle: "YOUR TRACK",
    demoVenueLabel: "Your Track Demo Arena",
    demoShowcaseName: "Your Track Showcase",
  },
  typography: {
    displayFont: "'Ethnocentric', 'Orbitron', 'Inter', sans-serif",
    bodyFont: "'Inter', sans-serif",
  },
  theme: {
    light: {
      accent: "#e34d8e",
      accentDark: "#7b47ff",
      accentCyan: "#1cb9b2",
      accentGreen: "#23bb67",
      accentGreenDark: "#0f6e40",
      accentWarm: "#ffb148",
      wordmarkColor: "#1b2127",
    },
    dark: {
      accent: "#ff5ca9",
      accentDark: "#9242ff",
      accentCyan: "#37e0d3",
      accentGreen: "#2ad36e",
      accentGreenDark: "#0d6b3d",
      accentWarm: "#ffb64f",
      wordmarkColor: "#f7f7f7",
    },
  },
  landing: {
    whySectionKicker: "Why Your Track Sync",
    heroCopy:
      "Track {eventName}, jump into live standings and competition, and keep drivers, judges, and spectators synced from one event hub.",
    emptyHeroCopy:
      "Jump into registration, standings, results, and competition from one branded front door.",
    whySectionCopy:
      "Your Track Sync keeps registration, live qualifying, bracket control, and results in one place so event days run smoother without juggling separate tools.",
    benefits: [
      ["3-Judge Cloud Sync", "Judge phones and tablets feed the same live scoring state without needing separate systems."],
      ["QR Check-In", "Drivers can scan a venue QR code and jump straight into the public registration flow."],
      ["Geofenced Registration", "Pre-register from home, then validate arrival at the venue before event admin approves the roster."],
      ["Live Qualifying Boards", "Show current driver, run averages, and standings in a clear public display."],
      ["Fullscreen Bracket Displays", "Broadcast-friendly qualifying and competition screens work for TVs, projectors, and venue monitors."],
      ["Archive And PDF Exports", "Completed events save into the results archive and can be exported as shareable PDF summaries."],
    ],
  },
  routing: {
    spectatorHost: "comp.yourtrack.com",
    spectatorAliases: ["www.comp.yourtrack.com"],
    websiteAdminHost: "websiteadmin.yourtrack.com",
    adminHost: "eventadmin.yourtrack.com",
    judgeHosts: {
      j1: "judge1.yourtrack.com",
      j2: "judge2.yourtrack.com",
      j3: "judge3.yourtrack.com",
    },
  },
  firebase: {
    appId: "",
    config: {
      apiKey: "",
      authDomain: "",
      projectId: "",
      storageBucket: "",
      messagingSenderId: "",
      appId: "",
    },
    spectatorAliases: [],
  },
  security: {
    legacyPasswords: {
      admin: "cheersray",
      j1: "cheersray",
      j2: "cheersray",
      j3: "cheersray",
    },
  },
};
