// Inject external script immediately so its DOMContentLoaded listener triggers properly
document.head.insertAdjacentHTML("beforeend", "<script src='https://thegoosesite.github.io/legacy/settings.js'></script>");

// Global scope popup toggle
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
  const html = document.documentElement;
  const loginPage = 'https://thegoosesite.github.io/legacy/pages/welcome/';
  const footer = document.querySelector("footer");

  function getCookie(name) {
    let match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
  }

  // FIXED: Value changed to "on" to match Script 2
  if (getCookie("duck_mode") === "on") {
    html.style.filter = "grayscale(67%)";
  }

  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('access_token');
  const hasAccessCookie = getCookie('site_access') === 'granted';

  // 1. Access Verification Logic
  if (!hasAccessCookie) {
    if (token) {
      verifyToken(token);
    } else {
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

    const maxAgeSeconds = Math.max(0, Math.floor((tokenData.expiry - Date.now()) / 1000));
    document.cookie = `site_access=granted; Max-Age=${maxAgeSeconds}; SameSite=Strict; path=/;`;
    localStorage.removeItem(`token_${tokenVal}`);

    const cleanUrl = new URL(window.location.href);
    cleanUrl.searchParams.delete('access_token');
    window.history.replaceState({}, document.title, cleanUrl.pathname + cleanUrl.search);
  }

  function injectAndShowBanner(htmlContent) {
    if (document.getElementById('popupOverlay')) return;

    document.body.insertAdjacentHTML('beforeend', htmlContent);
    togglePopup(true);
  }

  // Secret Easter Egg Detection
  let cycle = true;
  const targetPhrases = ["indi", "gose"];
  const maxLength = Math.max(...targetPhrases.map(p => p.length));
  let inputBuffer = "";

  window.addEventListener("keydown", (event) => {
    if (event.key.length > 1) return;

    inputBuffer += event.key.toLowerCase();

    if (inputBuffer.length > maxLength) {
      inputBuffer = inputBuffer.slice(-maxLength);
    }

    if (targetPhrases.some(phrase => inputBuffer.endsWith(phrase))) {
      console.log("Phrase detected!");
      sayChez();
      inputBuffer = "";
    }
  });

  function sayChez() {
    const degree = cycle ? 180 : 0;
    cycle = !cycle;

    html.style.transformOrigin = "center center";
    html.style.transition = "transform 0.5s ease";
    html.style.transform = `rotate(${degree}deg)`;
  }
});