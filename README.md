# SmartCheck – Android APK wrapper

Your attendance app is a client + Express/tRPC + MySQL system, so it cannot run
"offline inside" an APK. This project makes a native Android app (Capacitor)
that opens your **deployed** site full-screen, with camera (QR scan) and
location (geofencing) permissions enabled.

## Step 1 – Deploy the web app (once)
Host the original project on any Node host with a MySQL database
(`pnpm install && pnpm build && pnpm start`, set `DATABASE_URL`, `JWT_SECRET`).
Current deployment: https://zsh-nmt-attendance.manus.space (already the default in this project).

## Step 2 – Build the APK (easiest: GitHub, no Android Studio)
1. Create a GitHub repo and upload the contents of this folder.
2. Repo > Actions > "Build Android APK" > Run workflow > enter your https URL.
3. Download `smartcheck-debug-apk` from the finished run, unzip, install
   `app-debug.apk` on the phone (allow "install unknown apps").

## Or build locally (Android Studio / JDK 17 + Android SDK)
```
npm install
APP_URL=https://your-site npm run add:android
APP_URL=https://your-site npx capacitor-assets generate --android
cd android && ./gradlew assembleDebug
# APK: android/app/build/outputs/apk/debug/app-debug.apk
```
To change the URL later: `APP_URL=https://new-url npm run sync`, then rebuild.

## Notes
- Package id: `tz.ac.zsh.smartcheck` (edit `capacitor.config.js`).
- Replace `resources/icon.png` (1024x1024) with a sharper logo before release.
- For Play Store / sharing widely, sign a release build (`assembleRelease`).
- WebAuthn fingerprint enrolment may not work in Android WebView; QR check-in,
  geolocation and login do. If fingerprint is essential, a Chrome-based
  Trusted Web Activity (Bubblewrap) is the alternative.
