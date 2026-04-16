# Firebase + Cloudflare Multi-Subdomain Rollout

This RGRC app is already built to run from a single Firebase Hosting site with role-locked hostnames.

The same deployed `index.html` is served to every domain. The app reads `window.location.hostname` and forces the correct role workflow for that hostname.

## Current Project State

- Firebase project: `rgrc-f9d56`
- Default Hosting site: `rgrc-f9d56`
- Default Hosting URL: `https://rgrc-f9d56.web.app`
- Current live channel: `https://rgrc-f9d56.web.app`

## Recommended Domain Pattern

- `https://rgrccomp.com` -> spectator/public home
- `https://www.rgrccomp.com` -> spectator/public alias
- `https://websiteadmin.rgrccomp.com` -> website admin workflow
- `https://eventadmin.rgrccomp.com` -> event admin workflow
- `https://judge1.rgrccomp.com` -> Judge 1
- `https://judge2.rgrccomp.com` -> Judge 2
- `https://judge3.rgrccomp.com` -> Judge 3

This is the same structure used by the `driftpdx`-style rollout: one Firebase Hosting site, multiple custom domains, front-end role lock by hostname.

## Step 1: Update `client-config.js`

The routing block in `client-config.js` should be:

```js
routing: {
  spectatorHost: "rgrccomp.com",
  spectatorAliases: ["www.rgrccomp.com"],
  websiteAdminHost: "websiteadmin.rgrccomp.com",
  adminHost: "eventadmin.rgrccomp.com",
  judgeHosts: {
    j1: "judge1.rgrccomp.com",
    j2: "judge2.rgrccomp.com",
    j3: "judge3.rgrccomp.com",
  },
},
```

## Step 2: Deploy the Site to Firebase Hosting

From this folder:

```powershell
firebase deploy --only hosting
```

Important notes:

- `firebase.json` rewrites all routes to `index.html`
- `index.html` and `client-config.js` are sent with `no-cache` headers
- static assets are cached aggressively

## Step 3: Add the Custom Domains in Firebase Hosting

In the Firebase console for project `rgrc-f9d56`:

1. Open `Hosting`
2. Open the default site `rgrc-f9d56`
3. Add each custom domain to the same Hosting site:
   - `rgrccomp.com`
   - `www.rgrccomp.com`
   - `websiteadmin.rgrccomp.com`
   - `eventadmin.rgrccomp.com`
   - `judge1.rgrccomp.com`
   - `judge2.rgrccomp.com`
   - `judge3.rgrccomp.com`

Firebase will give you the DNS records required for each hostname.

## Step 4: Add the DNS Records in Cloudflare

Use the exact DNS records Firebase shows for each domain.

Typical mapping for `rgrccomp.com`:

- apex/root domain (`rgrccomp.com`):
  - Firebase usually gives A records
  - Firebase may also require TXT verification records
- subdomains (`www`, `websiteadmin`, `eventadmin`, `judge1`, `judge2`, `judge3`):
  - Firebase usually gives CNAME records

### Cloudflare Rules During Setup

For every Firebase verification record:

- set `Proxy status` to `DNS only`
- do not enable orange-cloud proxy during initial verification

This is the safest rollout because Firebase needs to see the real DNS targets while it verifies ownership and provisions SSL certificates.

## Step 5: Wait for Firebase SSL Provisioning

After the DNS records are in place, Firebase will verify the domains and provision certificates.

Do not switch Cloudflare to proxied mode until Firebase shows the domain as connected and SSL is active.

## Step 6: Cloudflare SSL/TLS Settings

Once Firebase has issued certificates for the custom domains, use these Cloudflare settings:

- SSL/TLS encryption mode: `Full (strict)`
- Always Use HTTPS: optional, but usually fine after Firebase is healthy
- Automatic HTTPS Rewrites: optional

`Full (strict)` is the safest Cloudflare mode because Firebase Hosting serves valid HTTPS certificates for your connected custom domains.

## Step 7: Decide Whether to Keep Cloudflare Proxied or DNS Only

Recommended starting point:

- keep all Firebase records as `DNS only`

Reasons:

- Firebase Hosting already provides CDN + SSL
- the setup is simpler
- custom domain verification is more predictable
- fewer chances of SSL or caching confusion

Only switch a hostname to proxied mode later if you specifically want Cloudflare features like:

- WAF rules
- bot protection
- Cloudflare Access
- rate limiting
- extra analytics

If you do switch to proxied mode later:

- do it only after Firebase shows the domain healthy
- leave SSL/TLS on `Full (strict)`
- test each hostname in a private window after the change

## Step 8: Verify Each Subdomain

After the domains are active, test these exact flows in private/incognito windows:

- `https://rgrccomp.com`
  - should open as spectator/public
- `https://www.rgrccomp.com`
  - should behave the same as the public site
- `https://websiteadmin.rgrccomp.com`
  - should only show website admin workflow
- `https://eventadmin.rgrccomp.com`
  - should only show event admin workflow
- `https://judge1.rgrccomp.com`
  - should lock to Judge 1
- `https://judge2.rgrccomp.com`
  - should lock to Judge 2
- `https://judge3.rgrccomp.com`
  - should lock to Judge 3

## Safe Verification Checklist

1. Open each hostname in a private/incognito window.
2. Confirm the wrong panels are hidden on that hostname.
3. Confirm the matching password is still required.
4. Confirm live state still syncs between public, admin, and judge views.
5. Confirm a judge hostname cannot switch to another judge role.
6. Confirm `websiteadmin` cannot accidentally land on event admin tools.
7. Confirm `eventadmin` cannot open the website admin panel.

## Notes About Firebase Hosting Sites

For this app, you do not need separate Firebase Hosting sites for each subdomain.

The recommended setup is:

- one Firebase project
- one Firebase Hosting site
- multiple custom domains on that site
- hostname-based routing inside the app

Create multiple Hosting sites only if you later want different deploy pipelines or completely different content per hostname.

## Current Limitation

This hostname-based rollout locks the front-end workflow by hostname, but it is not the final backend security layer by itself.

The next hardening step should be:

- Firestore rules or server-backed auth that enforce:
  - website admin can manage site-level settings
  - event admin can manage event data
  - each judge can only write their own judging fields

That backend lock is what prevents a technical user from bypassing client-side restrictions.
