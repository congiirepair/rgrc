## Firebase Setup

Set up a separate Firebase project for each client deployment.

### 1. Create or choose a Firebase project

In Firebase Console:

1. Create a new project for the track, or open the client project you already made.
2. Copy the Firebase project id.
3. Update `.firebaserc` so the `default` project matches that id.

### 2. Enable Authentication

Inside the client Firebase project:

1. Go to `Build` -> `Authentication`
2. Click `Get started`
3. Open `Sign-in method`
4. Enable `Anonymous`

The app uses anonymous auth so spectators, judges, and admins can sync live state without exposing a public sign-in flow.

### 3. Create Firestore Database

1. Go to `Build` -> `Firestore Database`
2. Click `Create database`
3. Choose a region close to the event audience
4. Start in production mode

### 4. Deploy Firestore Rules

This project includes:

- `firestore.rules`

Deploy with:

```powershell
firebase deploy --only firestore:rules
```

### 5. Deploy Hosting

Deploy the site with:

```powershell
firebase deploy --only hosting
```

Or deploy both hosting and rules together:

```powershell
firebase deploy
```

### 6. Confirm the local project selection

Check which Firebase project this folder points to:

```powershell
firebase use
```

If needed, switch it:

```powershell
firebase use your-client-project-id
```

### 7. Fill in the app config

Use `brand-studio/index.html` or edit `client-config.js` directly and update:

- `firebase.appId`
- `firebase.config.apiKey`
- `firebase.config.authDomain`
- `firebase.config.projectId`
- `firebase.config.storageBucket`
- `firebase.config.messagingSenderId`
- `firebase.config.appId`

### 8. First live sync test

After deploy:

1. Open the site
2. Create a test event
3. Open qualifying on one device
4. Open a judge role on another device
5. Submit a score
6. Confirm the standings update live
