document.addEventListener("DOMContentLoaded", function() {
    runSettingsScript();
});

// Safety check: executes immediately if DOMContentLoaded already passed
if (document.readyState === "interactive" || document.readyState === "complete") {
    runSettingsScript();
}

function runSettingsScript() {
    // Avoid double-execution
    if (window.settingsInitialized) return;
    window.settingsInitialized = true;

    document.head.insertAdjacentHTML("beforeend", "<link class='settings-css' rel='stylesheet' href='https://thegoosesite.github.io/legacy/settings.css'>");
    
    const gooset = document.querySelector(".gooset");
    const style = document.querySelector(".settings-css");
    const footer = document.querySelector("footer");

    function closeOrInit() {
        if (gooset) gooset.style.display = "none";
        if (style) style.disabled = true;
    }

    // Initialize overlay state
    closeOrInit();

    if (footer) {
        footer.insertAdjacentHTML("beforeend", "<center><a style='user-select:none;text-decoration:underline;cursor:pointer;' title='Toggle goosettings' class='eyecare'>Open Goosettings</a></center>");
    }

    const settings = document.querySelector('.settings');
    const general = document.querySelector(".gooset-general-li");
    const accessibility = document.querySelector(".gooset-accessibility-li");
    const about = document.querySelector(".gooset-about-li");
    const themes = document.querySelector(".gooset-themes-li");
    const toggle = document.querySelector(".eyecare");

    // Toggle button handler with open/close state check
    if (toggle) {
        toggle.addEventListener("click", function() {
            // FIXED: Optional chaining prevents null error if .gooset isn't in DOM
            if (gooset?.style.display === "block") {
                closeOrInit();
                toggle.textContent = "Open Goosettings";
            } else {
                if (style) style.disabled = false;
                if (gooset) gooset.style.display = "block";
                toggle.textContent = "Close Goosettings";
            }
        });
    }

    // State object to remember settings values across tab switches
    const state = {
        duckMode: false,
        homepage: "standard",
        trackers: true,
        secureconn: true
    };

    const generalScript = `<h2>General</h2>
            <strong>Default Start Page</strong>
            <label for="gooset-gen-homepage">Homepage:
            <select name="gooset-gen-homepage" id="gooset-gen-homepage">
                <option value="standard">Default (index.html)</option>
                <option value="rainbowhairs">Search Page (search/index.html)</option>
                <option value="wiki">Wiki Page (wiki/index.html)</option>
            </select>
            </label>
            <strong>Trackers</strong>
            <label for="trackers"><input id="trackers" name="trackers" type="checkbox" />Block known trackers from The Goose Site</label>
            <label for="secureconn"><input id="secureconn" name="secureconn" type="checkbox" />Enforce a secure (https) connection</label>
            <strong>Cookies</strong>
            <label for="cookies"><input name="cookies" type="checkbox" disabled checked />Use cookies</label>
            <span>(!) This cannot be disabled :[</span>`;

    const aboutScript = "<h2>About</h2><p>The Goose Site is a project launched in May 2026 in a video game creation class. It has since led to this monstrosity of a website, with new content coming soon (including a comic!) in The Goose Site: Relaunch.</p>";
    const themeScript = `<h2>Themes</h2><p><i>Nothing here yet</i></p><p>You can find "Duck Mode" in "Accessibility"</p>`;
    const accessibilityScript = `<h2>Accessibility</h2><p><label><input id="duck-mode-check" type="checkbox" /> Enable Duck Mode</label></p>`;

    function renderGeneral() {
        if (!settings) return;
        settings.innerHTML = generalScript;
        
        const homepageSelect = document.getElementById("gooset-gen-homepage");
        const trackersCheck = document.getElementById("trackers");
        const secureCheck = document.getElementById("secureconn");

        if (homepageSelect) homepageSelect.value = state.homepage;
        if (trackersCheck) trackersCheck.checked = state.trackers;
        if (secureCheck) secureCheck.checked = state.secureconn;

        if (homepageSelect) homepageSelect.addEventListener("change", (e) => { state.homepage = e.target.value; });
        if (trackersCheck) trackersCheck.addEventListener("change", (e) => { state.trackers = e.target.checked; });
        if (secureCheck) secureCheck.addEventListener("change", (e) => { state.secureconn = e.target.checked; });
    }

    function renderAccessibility() {
        if (!settings) return;
        settings.innerHTML = accessibilityScript;
        
        const duckCheck = document.getElementById("duck-mode-check");
        if (duckCheck) {
            duckCheck.checked = state.duckMode;
            duckCheck.addEventListener("change", (e) => {
                state.duckMode = e.target.checked;
            });
        }
    }

    // Default view
    renderGeneral();

    // Event listeners for tabs
    if (general) general.addEventListener("click", renderGeneral);
    if (accessibility) accessibility.addEventListener("click", renderAccessibility);
    if (about && settings) about.addEventListener("click", () => { settings.innerHTML = aboutScript; });
    if (themes && settings) themes.addEventListener("click", () => { settings.innerHTML = themeScript; });

    const closeBtn = document.querySelector(".textex");
    if (closeBtn) {
        closeBtn.addEventListener("click", function() {
            if (toggle) toggle.textContent = "Open Goosettings";

            if (state.duckMode) {
                document.cookie = "duck_mode=on; path=/";
            } else {
                document.cookie = "duck_mode=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            }

            if (state.homepage === "wiki") {
                localStorage.setItem("homepage", "https://thegoosesite.github.io/legacy/wiki/index.html");
            } else if (state.homepage === "rainbowhairs") {
                localStorage.setItem("homepage", "https://thegoosesite.github.io/legacy/search/index.html");
            } else {
                localStorage.removeItem("homepage");
            }

            closeOrInit();
            setTimeout(function() { window.location.reload(); }, 500);
        });
    }
}