document.addEventListener("DOMContentLoaded", function(){
  // For gosedevs: Set this manually
  const manitarget = "https://worshipthegoose.github.io/cdn4/deactivation.html";
  const siteRunning = false;
  if (siteRunning === true){
     if (window.location.href === manitarget){
       window.location.replace("https://thegoosesite.github.io")
     }
  }else{
    window.location.replace(manitarget); // Server troubles
  }
});
