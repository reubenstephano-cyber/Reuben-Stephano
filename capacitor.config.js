// The attendance app needs its Express/tRPC + MySQL backend, so the APK loads
// your DEPLOYED site inside a native WebView (cookies, sessions and /api/trpc
// keep working because the page origin is your real server).
//
// Set APP_URL (https only) when syncing/building, e.g.
//   APP_URL=https://attendance.yourschool.ac.tz npx cap sync android
const APP_URL = (process.env.APP_URL || "https://zsh-nmt-attendance.manus.space").replace(/\/+$/, "");
const host = new URL(APP_URL).hostname;

module.exports = {
  appId: process.env.APP_ID || "tz.ac.zsh.smartcheck",
  appName: process.env.APP_NAME || "SmartCheck",
  webDir: "www",
  server: {
    url: APP_URL,
    cleartext: false,
    // Hosts the WebView may navigate to inside the app (login portals etc.)
    allowNavigation: [host, "*.manus.im", "*.manus.space", "*.manus.computer"],
  },
  android: {
    allowMixedContent: false,
    backgroundColor: "#ffffff",
  },
};
