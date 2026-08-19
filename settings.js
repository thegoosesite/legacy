document.addEventListener("DOMContentLoaded", function() {
    const gooset = document.querySelector(".gooset");
    const style = document.querySelector(".settings-css");

    function closeOrInit() {
        gooset.style.display = "none";
        style.disabled = true;
    }

    // Initialize overlay state
    closeOrInit();

    document.querySelector("button").onclick = function() {
        style.disabled = false;
        gooset.style.display = "block";
    };

    const settings = document.querySelector('.settings');
    const general = document.querySelector(".gooset-general-li");
    const accessibility = document.querySelector(".gooset-accessibility-li");
    const about = document.querySelector(".gooset-about-li");
    const themes = document.querySelector(".gooset-themes-li");
    const toggle = document.querySelector(".eyecare");

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

    // Functions to render views and bind input listeners
    function renderGeneral() {
        settings.innerHTML = generalScript;
        
        const homepageSelect = document.getElementById("gooset-gen-homepage");
        const trackersCheck = document.getElementById("trackers");
        const secureCheck = document.getElementById("secureconn");

        // Restore values from state
        homepageSelect.value = state.homepage;
        trackersCheck.checked = state.trackers;
        secureCheck.checked = state.secureconn;

        // Save values on change
        homepageSelect.addEventListener("change", (e) => { state.homepage = e.target.value; });
        trackersCheck.addEventListener("change", (e) => { state.trackers = e.target.checked; });
        secureCheck.addEventListener("change", (e) => { state.secureconn = e.target.checked; });
    }

    function renderAccessibility() {
        settings.innerHTML = accessibilityScript;
        
        const duckCheck = document.getElementById("duck-mode-check");
        
        // Restore saved state
        duckCheck.checked = state.duckMode;

        // Update state when checkbox is toggled
        duckCheck.addEventListener("change", (e) => {
            state.duckMode = e.target.checked;
        });
    }

    // Default view
    renderGeneral();

    // Event listeners for tabs
    general.addEventListener("click", renderGeneral);
    accessibility.addEventListener("click", renderAccessibility);
    about.addEventListener("click", () => { settings.innerHTML = aboutScript; });
    themes.addEventListener("click", () => { settings.innerHTML = themeScript; });

  
    document.querySelector(".textex").addEventListener("click", function(){
        if (state.duckMode){
            document.cookie ="duck_mode=on";
        }
        if (state.homepage !== "standard"){
            if (state.homepage === "wiki"){
                localStorage.setItem("homepage", "https://thegoosesite.github.io/legacy/wiki/index.html")
            }else{
                localStorage.setItem("homepage", "https://thegoosesite.github.io/legacy/search/index.html")
            }
        }
    });
});
