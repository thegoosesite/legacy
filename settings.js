(function initSettings() {
    // Pre: cookie
    function getCookie(name) {
        let match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        return match ? match[2] : null;
    }

    // 1. Inject Stylesheet
    if (!document.querySelector(".settings-css")) {
        document.head.insertAdjacentHTML("beforeend", "<link class='settings-css' rel='stylesheet' href='https://thegoosesite.github.io/legacy/settings.css'>");
    }

    // 2. Inject missing HTML container elements if they don't exist
    let gooset = document.querySelector(".gooset");
    if (!gooset) {
        document.body.insertAdjacentHTML("beforeend", `
            <div class="gooset" style="display:none;flex-direction:row !important;margin:7px !important;">
                <a class="textex" style="position:absolute;top:0;right:0;margin-right:6px;margin-top:5px;font-weight:bold;font-size:25px;cursor:pointer;">X</a>
                <ul>
                    <li class="gooset-general-li">General</li>
                    <li class="gooset-accessibility-li">Accessibility</li>
                    <li class="gooset-themes-li">Themes</li>
                    <li class="gooset-about-li">About</li>
                </ul>
                <div class="settings" style="display:flex;flex-direction:column !important; margin:10px !important"></div>
            </div>
        `);
        gooset = document.querySelector(".gooset");
    }
    const style = document.querySelector(".settings-css");
    const footer = document.querySelector("footer");

    // Call elements (Scoped properly)
    const genEl = document.querySelector('.gooset ul li:nth-child(1)');
    const assEl = document.querySelector('.gooset ul li:nth-child(2)');
    const themEl = document.querySelector('.gooset ul li:nth-child(3)');
    const aboEl = document.querySelector('.gooset ul li:nth-child(4)');

    function closeOrInit() {
        if (gooset) gooset.style.display = "none";
        if (style) style.disabled = true;
    }

    closeOrInit();

    // 3. Inject Link into Footer
    if (footer && !document.querySelector(".eyecare")) {
        footer.insertAdjacentHTML("beforeend", "<center><a style='user-select:none;text-decoration:underline;cursor:pointer;' title='Toggle goosettings' class='eyecare'>Open Goosettings</a></center>");
    }

    const state = {
        contrastMode: false,
        duckMode: false,
        homepage: "standard",
        trackers: true,
        secureconn: true,
        fontGlobal: true
    };
    
    if (localStorage.getItem("homepage") !== null){
        state.homepage = "search";
    }
    if (localStorage.getItem("fontGlobal") !== null) {
        state.fontGlobal = true;
    }

    const settings = document.querySelector('.settings');
    const general = document.querySelector(".gooset-general-li");
    const accessibility = document.querySelector(".gooset-accessibility-li");
    const about = document.querySelector(".gooset-about-li");
    const themes = document.querySelector(".gooset-themes-li");
    const toggle = document.querySelector(".eyecare");

    // 4. Toggle Button Handler
    if (toggle) {
        toggle.addEventListener("click", function() {
            if (gooset.style.display === "flex") {
                closeOrInit();
                toggle.textContent = "Open Goosettings";
            } else {
                if (style) style.disabled = false;
                gooset.style.display = "flex";
                toggle.style.display = "none";
                if (getCookie("duck_mode") === "on"){
                    state.duckMode = true;
                }
                if (getCookie("high_contrast") === "on"){
                    state.contrastMode = true;
                }
            }
        });
    }

    const generalScript = `<h2>General</h2>
            <strong>Default Start Page</strong>
            <label for="gooset-gen-homepage">Homepage:
            <select name="gooset-gen-homepage" id="gooset-gen-homepage">
                <option value="standard">Default (index.html)</option>
                <option value="search">Search Page (search/index.html)</option>
            </select>
            </label>
            <strong>Trackers</strong>
            <label for="trackers"><input id="trackers" name="trackers" type="checkbox" />Block known trackers from The Goose Site</label>
            <label for="secureconn"><input id="secureconn" name="secureconn" type="checkbox" />Enforce a secure (https) connection</label>
            <strong>Cookies</strong>
            <label for="cookies"><input name="cookies" type="checkbox" disabled checked />Use cookies</label>
            <span>(!) This cannot be disabled :[</span>`;

    const aboutScript = "<h2>About</h2><p>The Goose Site is a project launched in May 2026 in a video game creation class. It has since led to this monstrosity of a website, with new content coming soon (including a comic!) in The Goose Site: Relaunch.</p>";
    const themeScript = `<h2>Themes</h2><p><i>Nothing here yet</i></p><p>You can find "Duck Mode" in "Accessibility"</p><p><b><a class="click-tigre">→ Go to accessibility ←</a></b></p>`;
    
    // Fixed closing tag on <i>
    const accessibilityScript = `<h2>Accessibility</h2><strong>Color Filters</strong><label><input class="ass-check" id="duck-mode-check" name="assCheck" type="checkbox" /> Enable Duck Mode</label><i>Best for gooselings who like dark mode...</i><label><input id="hi-co-check" name="assCheck" class="ass-check" type="checkbox" />Enable Vision Support</label><i>Great for gooselings who experience color blindness. Tested and proven.</i>`;

    function renderGeneral() {
        if (genEl) genEl.style.textDecoration = "underline";
        if (assEl) assEl.style.textDecoration = "none";
        if (themEl) themEl.style.textDecoration = "none";
        if (aboEl) aboEl.style.textDecoration = "none";

        if (!settings) return;
        settings.innerHTML = generalScript;
        
        const homepageSelect = document.getElementById("gooset-gen-homepage");
        const fontCheck = document.getElementById("gooset-font-check")
        const trackersCheck = document.getElementById("trackers");
        const secureCheck = document.getElementById("secureconn");

        if (homepageSelect) homepageSelect.value = state.homepage;
        if (trackersCheck) trackersCheck.checked = state.trackers;
        if (secureCheck) secureCheck.checked = state.secureconn;
        if (fontCheck) fontCheck.checked = state.fontGlobal

        if (fontCheck) fontCheck.addEventListener("change", (e) => { state.fontGlobal = e.target.value; });
        if (homepageSelect) homepageSelect.addEventListener("change", (e) => { state.homepage = e.target.value; });
        if (trackersCheck) trackersCheck.addEventListener("change", (e) => { state.trackers = e.target.checked; });
        // Fixed listener
        if (secureCheck) secureCheck.addEventListener("change", (e) => { state.secureconn = e.target.checked; });
    }

    function renderAccessibility() {
        if (genEl) genEl.style.textDecoration = "none";
        if (assEl) assEl.style.textDecoration = "underline";
        if (themEl) themEl.style.textDecoration = "none";
        if (aboEl) aboEl.style.textDecoration = "none";

        if (!settings) return;
        settings.innerHTML = accessibilityScript;
        
        const duckCheck = document.getElementById("duck-mode-check");
        const hiCoCheck = document.getElementById("hi-co-check"); 
        
        if (duckCheck) {
            duckCheck.checked = state.duckMode;
            duckCheck.addEventListener("change", (e) => {
                state.duckMode = e.target.checked;
            });
        }
        if (hiCoCheck){
            hiCoCheck.checked = state.contrastMode;
            hiCoCheck.addEventListener("change", (e) => { 
                state.contrastMode = e.target.checked;
            });
        }

        // Attached single-choice radio behavior safely inside render logic
        const assChecks = document.querySelectorAll('.ass-check');
        assChecks.forEach(assCheck => {
            assCheck.addEventListener('change', function() {
                if (this.checked) {
                    assChecks.forEach(aC => {
                        if (aC !== this) {
                            aC.checked = false;
                            if (aC.id === "duck-mode-check") state.duckMode = false;
                            if (aC.id === "hi-co-check") state.contrastMode = false;
                        }
                    });
                }
            });
        });
    }

    renderGeneral();

    if (general) general.addEventListener("click", renderGeneral);
    if (accessibility) accessibility.addEventListener("click", renderAccessibility);
    if (about && settings) about.addEventListener("click", () => {
        if (genEl) genEl.style.textDecoration = "none";
        if (assEl) assEl.style.textDecoration = "none";
        if (themEl) themEl.style.textDecoration = "none";
        if (aboEl) aboEl.style.textDecoration = "underline";
        settings.innerHTML = aboutScript; 
    });
    if (themes && settings) themes.addEventListener("click", () => {
        if (genEl) genEl.style.textDecoration = "none";
        if (assEl) assEl.style.textDecoration = "none";
        if (themEl) themEl.style.textDecoration = "underline";
        if (aboEl) aboEl.style.textDecoration = "none";
        settings.innerHTML = themeScript;
        const assLnk = document.querySelector(".click-tigre");
        if (assLnk) assLnk.addEventListener('click', renderAccessibility);
    });

    const closeBtn = document.querySelector(".textex");
    if (closeBtn) {
        closeBtn.addEventListener("click", function() {
            if (toggle) toggle.textContent = "Open Goosettings";

            if (state.duckMode) {
                document.cookie = "duck_mode=on; path=/";
            } else {
                document.cookie = "duck_mode=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            }
            if (state.contrastMode){
                document.cookie = "high_contrast=on;path=/";
            } else {
                document.cookie = "high_contrast=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            }

            if (state.homepage === "search") {
                localStorage.setItem("homepage", "search");
            } else {
                localStorage.removeItem("homepage");
            }
            if (state.fontGlobal === true) {
                localStorage.setItem("fontGlobal", "on");
            } else {
                localStorage.removeItem("fontGlobal");
            }

            closeOrInit();
            setTimeout(function() { window.location.reload(); }, 500);
        });
    }
})();
