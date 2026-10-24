# Lunar Cloud — Multi-page website (Termux-friendly)

## Run on Android with Termux

1. Extract this ZIP into Downloads.
2. In Termux, enable shared-storage access if needed:
   ```sh
   termux-setup-storage
   ```
3. Copy the project from shared storage into Termux's private home directory (recommended because Android shared storage can cause permission/symlink errors):
   ```sh
   cp -r ~/storage/shared/Download/lunar-cloud-multipage-fixed ~/lunar-cloud
   cd ~/lunar-cloud
   ```
   Adjust the source folder name if you extracted the ZIP under a different name.
4. Check that Node.js is installed:
   ```sh
   node --version
   ```
   If it isn't, install it with:
   ```sh
   pkg update
   pkg install nodejs
   ```
5. Start the server:
   ```sh
   npm start
   ```
   No `npm install` is required. The server uses only built-in Node.js modules.
6. Open `http://localhost:3000` in your phone browser.

## Pages
Home, game servers, Minecraft, Hytale, Palworld, VPS, RDP, dedicated servers, website hosting, Discord bot hosting, support, knowledge base, FAQ, about, infrastructure, legal policies, and blacklist registry.

## Notes
- Static HTML/CSS/JS pages are served by a small dependency-free Node.js server.
- Update content and pricing placeholders in the HTML before publishing.
- Do not use this development server as a production-grade public hosting stack without adding appropriate security, TLS, and deployment configuration.
