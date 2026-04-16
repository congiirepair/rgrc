// Copy this file to `client-config.js` for a new client workspace.
// Then replace the values below without editing `index.html`.

window.RC_DRIFT_CLIENT_CONFIG = {
  platform: {
    productName: "RCDriftSync",
    buildLabel: "RGRC Build 2026.04.15.1",
    browserTitle: "RGRC | RCDriftSync Competition Control",
    demoWindowName: "rgrc-live-demo-window",
  },
  branding: {
    venueName: "RGRC",
    venueLabelPlaceholder: "RGRC Drift Arena",
    eventNamePlaceholder: "RGRC Night Tandem Series",
    logoPrimary: "./assets/rcdriftsync-logo-transparent.png",
    logoInverted: "./assets/rcdriftsync-logo-transparent.png",
    logoAlt: "RCDriftSync logo",
    backgroundImage: "./assets/track-background.png",
    homeHeroImage: "./assets/track-background.png",
    shopUrl: "",
    shopLabel: "Explore Event Access",
    pdfHeaderTitle: "RGRC",
    demoVenueLabel: "RGRC Demo Arena",
    demoShowcaseName: "RGRC Showcase",
  },
  typography: {
    displayFont: "'Ethnocentric', 'Orbitron', 'Inter', sans-serif",
    bodyFont: "'Inter', sans-serif",
  },
  theme: {
    light: {
      accent: "#d91f26",
      accentDark: "#3f4654",
      accentCyan: "#bec9d9",
      accentGreen: "#27a85e",
      accentGreenDark: "#176b3d",
      accentWarm: "#f08a32",
      wordmarkColor: "#12161d",
    },
    dark: {
      accent: "#ff3b30",
      accentDark: "#7a8598",
      accentCyan: "#d8e0ea",
      accentGreen: "#30c769",
      accentGreenDark: "#1b7d49",
      accentWarm: "#ffa144",
      wordmarkColor: "#f7f8fb",
    },
  },
  landing: {
    whySectionKicker: "Why RCDriftSync",
    heroCopy:
      "Track {eventName}, follow live qualifying, head-to-head battles, and results from the same RGRC event hub.",
    emptyHeroCopy:
      "Open registration, standings, live event coverage, and archived results from one RGRC control center.",
    whySectionCopy:
      "RCDriftSync gives RGRC one branded system for driver check-in, judge scoring, bracket control, and spectator-friendly live updates on event day.",
    benefits: [
      ["Live Judge Sync", "Judge phones and tablets write to the same scoring state so the RGRC floor, admin table, and public screens stay aligned."],
      ["Venue Check-In", "Drivers can pre-register before they travel, then validate arrival at the venue before event admin moves them into the active roster."],
      ["Public Standings", "Qualifying averages, current drivers, and the live queue stay easy to follow for spectators in the room and online."],
      ["Broadcast-Ready Brackets", "Fullscreen qualifying and tandem views are built for TVs, projectors, and streamed event coverage."],
      ["Results Archive", "Completed events save automatically and can be reopened later as podium summaries and exportable PDFs."],
      ["One White-Label System", "RGRC can keep the same event workflow across future client launches without rebuilding the app or the live sync flow."],
    ],
  },
  routing: {
    spectatorHost: "rgrccomp.com",
    spectatorAliases: ["www.rgrccomp.com", "rgrc-f9d56.web.app", "rgrc-f9d56.firebaseapp.com"],
    websiteAdminHost: "websiteadmin.rgrccomp.com",
    adminHost: "eventadmin.rgrccomp.com",
    judgeHosts: {
      j1: "judge1.rgrccomp.com",
      j2: "judge2.rgrccomp.com",
      j3: "judge3.rgrccomp.com",
    },
  },
  firebase: {
    appId: "1:90778458671:web:23fccd26df247559f084da",
    config: {
      apiKey: "AIzaSyACfDge2lrj_R6xZxHMZcO39IBztJ6Gwns",
      authDomain: "rgrc-f9d56.firebaseapp.com",
      projectId: "rgrc-f9d56",
      storageBucket: "rgrc-f9d56.firebasestorage.app",
      messagingSenderId: "90778458671",
      appId: "1:90778458671:web:23fccd26df247559f084da",
    },
    spectatorAliases: ["rgrccomp.com", "www.rgrccomp.com", "rgrc-f9d56.web.app", "rgrc-f9d56.firebaseapp.com"],
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
