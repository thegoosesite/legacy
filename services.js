document.addEventListener("DOMContentLoaded", function(){
  // For gosedevs: Set this manually
  siteRunning = true;
  if (siteRunning === true){
    if (window.location.origin == "https://worshipthegoose.github.io" || window.location.origin == "https://thegoosesite.github.io"){
      console.log("You are viewing an official The Goose Site page. gOoSe.");
    }else{
      document.querySelector("head").innerHTML = "<meta charset='UTF-8'><link rel='stylesheet' href='https://thegoosesite.github.io/lockdown.css' /><title>You're safe now!</title> ";
      document.body.innerHTML = "<p>This site is trying to pirate The Goose Site. <a href='about:blank'>Return to safety</a></p>";
      
    }
  }else{
    window.location.replace("https://worshipthegoose.github.io/cdn4/deactivation.html"); // Server troubles
  }
});
