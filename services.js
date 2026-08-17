document.addEventListener("DOMContentLoaded", function () {
  // Constants and Nonstants
  const manitarget = "https://worshipthegoose.github.io/cdn4/deactivation.html";
  let siteRunning = false; // For gosedevs: Set this manually

  if (siteRunning) {
    if (window.location.href === manitarget) {
      window.location.replace("https://thegoosesite.github.io");
    }
  } else {
    if (window.location.href !== manitarget) {
      window.location.replace(manitarget);
    }
  }
});
