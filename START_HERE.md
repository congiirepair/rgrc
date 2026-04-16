# RCDriftSync Template Starter

This is the separate white-label starter project for future client sites.

It is meant to be copied into a new folder for each track, for example:

- `RCDriftSync-ClientA`
- `RCDriftSync-TrackName`

## Fastest Setup

1. Duplicate this folder into a new client workspace.
2. Open `brand-studio/index.html`.
3. Fill out the branding, domains, theme colors, and Firebase values.
4. Copy or download the generated `client-config.js`.
5. Replace the root `client-config.js` in the new client workspace.
6. Replace the assets in `assets/` with the client logo and photos.
7. Update `.firebaserc` to the client's Firebase project id.
8. Deploy that client workspace.

## Most Important Files

- `index.html`
- `client-config.js`
- `brand-studio/index.html`
- `FIREBASE_SETUP.md`
- `DEPLOY_SUBDOMAINS.md`

## Important Safety Rule

Do not point two clients at the same Firebase project or the same live domains.

Each client should have:

- its own Firebase project
- its own domains or subdomains
- its own assets
- its own `client-config.js`
