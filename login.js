// Global scope popup toggle

//// import { pirate } from 'https://thegoosesite.github.io/legacy/services.js';
function togglePopup(show) {
  const overlay = document.getElementById('popupOverlay');
  const popup = document.getElementById('bottomPopup');

  if (!overlay || !popup) return;

  if (show) {
    overlay.classList.add('active');
    popup.classList.add('active');
  } else {
    overlay.classList.remove('active');
    popup.classList.remove('active');
  }
}

document.addEventListener("DOMContentLoaded", function() {
  const loginPage = 'https://thegoosesite.github.io/legacy/pages/welcome/';

  function getCookie(name) {
    let match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
  }

  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('access_token');
  const hasAccessCookie = getCookie('site_access') === 'granted';

  // 1. Access Verification Logic
  if (!hasAccessCookie) {
    if (token) {
      verifyToken(token);
    } else {
      // No valid cookie and no access token -> send to welcome/login page
      window.location.replace(loginPage);
      return;
    }
  }

  // 2. Handle 'servermove' Banner Notice
  if (urlParams.has('servermove')) {
    injectAndShowBanner(`
      <div class="popup-overlay" id="popupOverlay" onclick="togglePopup(false)"></div>
      <div class="bottom-popup" id="bottomPopup">
        <div class="popup-content">
          <button class="close-btn" onclick="togglePopup(false)">&times;</button>
          <h2>🪿 Important GOOSE Notice 🪿</h2>
          <h4>We have recently moved our <em>legacy</em> website domain name.</h4>
          <p>Our developers moved The Goose Site from "worshipthegoose.github.io" to "thegoosesite.github.io/legacy" for the original site. The new site is permanently at "thegoosesite.github.io".</p>
          <p>We believe this will help gooselings find our site easier.</p>
          <center><button class='ok-btn-popup' onclick='togglePopup(false)'>Goose (Dismiss)</button></center>
        </div>
      </div>
    `);
  }

  // Verification Function
  function verifyToken(tokenVal) {
    const rawData = localStorage.getItem(`token_${tokenVal}`);

    if (!rawData) {
      console.warn(`Token "token_${tokenVal}" not found in localStorage.`);
      window.location.replace(loginPage);
      return;
    }

    let tokenData;
    try {
      tokenData = JSON.parse(rawData);
    } catch (e) {
      console.error("Malformed token data.");
      window.location.replace(loginPage);
      return;
    }

    if (Date.now() > tokenData.expiry) {
      console.warn(`Token "token_${tokenVal}" has expired.`);
      localStorage.removeItem(`token_${tokenVal}`);
      window.location.replace(loginPage);
      return;
    }

    // Grant Access & Clean Up
    // Calculate remaining seconds based on token expiry instead of hardcoded 600s
    const maxAgeSeconds = Math.max(0, Math.floor((tokenData.expiry - Date.now()) / 1000));
    document.cookie = `site_access=granted; Max-Age=${maxAgeSeconds}; SameSite=Strict; path=/;`;
    localStorage.removeItem(`token_${tokenVal}`);

    // Cleanly remove ?access_token from URL without malformed query string residue
    const cleanUrl = new URL(window.location.href);
    cleanUrl.searchParams.delete('access_token');
    window.history.replaceState({}, document.title, cleanUrl.pathname + cleanUrl.search);
  }

  // Helper to inject HTML and display popup safely
  function injectAndShowBanner(htmlContent) {
    if (document.getElementById('popupOverlay')) return;

    document.body.insertAdjacentHTML('beforeend', htmlContent);
    togglePopup(true);
  }
  // Secret Easter Egg Detection
  let cycle = true;
  const targetPhrase = "indi";
  let inputBuffer = "";

  window.addEventListener("keydown", (event) => {
    // Ignore modifier keys like Shift, Control, or Alt
    if (event.key.length > 1) return;

    // Add the new character to your buffer
    inputBuffer += event.key.toLowerCase();

    // Keep the buffer short (only as long as the target phrase)
    if (inputBuffer.length > targetPhrase.length) {
      inputBuffer = inputBuffer.slice(-targetPhrase.length);
    }

    // Check for a match
    if ((inputBuffer === targetPhrase) or (inputBuffer === "gose")) {
      console.log("Phrase detected!");
      sayChez();
      inputBuffer = ""; // Clear buffer after match
    }
  });

  function sayChez() {
    const html = document.documentElement;
    let sums;
    if (cycle){
      sums = 180;
      cycle = false;
    }else{
      sums =  360;
      cycle = true;
    }
    html.style.setProperty("transition", "transform 0.5s ease");
    html.style.setProperty("transform", "rotate("+sums+"deg)", "important");
  }
});