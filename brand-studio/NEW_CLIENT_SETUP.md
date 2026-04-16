# New Client Setup

This project can now be reused as a white-label RC drift event system without editing the bracket logic or the core app flow.

## Fastest Path

Open:

- `brand-studio/index.html`

That page lets you fill out the client branding, domains, theme colors, and Firebase values, then copy or download a ready-to-use `client-config.js`.

## Goal

For a new track, you should only need to:

1. Duplicate this workspace into a new client folder.
2. Drop in the new logos and background photos.
3. Update `client-config.js`.
4. Connect a new Firebase project.
5. Point the new domains at that hosting project.

## Files You Edit

- `client-config.js`
- `assets/` for client-specific logos and photos
- `.firebaserc` for the new Firebase project id

You should not need to edit `index.html` for normal client launches.

## Quick Start

1. Open `brand-studio/index.html`.
2. Load either the neutral template starter or the current project config.
3. Fill out the branding, routing, Firebase, and theme fields.
4. Copy or download the generated `client-config.js`.
5. Replace the existing `client-config.js` in the new client workspace.
6. Replace the branding values if needed:
   - `productName`
   - `venueName`
   - `logoPrimary`
   - `logoInverted`
   - `backgroundImage`
   - `homeHeroImage`
   - `shopUrl`
   - `shopLabel`
7. Replace the theme colors in:
   - `theme.light`
   - `theme.dark`
8. Set the new domains in:
   - `routing.spectatorHost`
   - `routing.websiteAdminHost`
   - `routing.adminHost`
   - `routing.judgeHosts`
9. Create a fresh Firebase project for that client and fill in:
   - `firebase.appId`
   - `firebase.config`
   - `firebase.spectatorAliases`
10. Update `.firebaserc` so deploys target the new Firebase project.

## Branding Notes

The config now controls:

- browser title
- event platform name
- main logos across home, admin, and brackets
- full-site background image
- home hero photo
- light and dark brand colors
- landing page copy
- store button label and URL
- PDF header title

## Recommended Asset Pack

For each new client, prepare:

- one primary wide logo
- one inverted or watermark logo
- one general background image
- one home hero image

These can all live in `assets/`, and the config can point to them with relative paths.

## Recommended Folder Pattern

- `RCDriftSync-Template`
- `RCDriftSync-ClientA`
- `RCDriftSync-TrackName`

## Deployment Notes

Use one Firebase project per client.

Do not reuse:

- another client's Firebase project
- another client's subdomains
- another client's passwords

For the live domain setup, follow the existing guides in:

- `FIREBASE_SETUP.md`
- `DEPLOY_SUBDOMAINS.md`

## Brand Studio Folder

The white-label builder now lives in its own folder:

- `brand-studio/`

That folder contains:

- `index.html`
- `brand-studio.css`
- `brand-studio.js`
- `client-config.template.js`
- `NEW_CLIENT_SETUP.md`

The generated output is still meant to replace the root-level `client-config.js` used by the live site.

## Best Workflow

The fastest scalable workflow is:

1. Keep one clean template repo.
2. Start each client from that template.
3. Only customize `client-config.js`, assets, Firebase, and domains.
4. Leave the bracket logic, judging flow, and event-state logic untouched.

That gives you a repeatable white-label system instead of rebuilding the site every time.
