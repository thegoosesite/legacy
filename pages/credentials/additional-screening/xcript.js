document.addEventListener("DOMContentLoaded", function() {
  function getCookie(name) {
    let match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return match[2];
    return null;
  }
  
  if ((getCookie('site_access') === 'granted' && window.location.pathname !== '/') || getCookie('need_additional_screening') !== 'true') {
    window.location.href = 'https://thegoosesite.github.io/pages/welcome'; 
  }
  const BUTTON = document.querySelector(".sq-btn");
  if (BUTTON) {
        BUTTON.addEventListener("click", ()=>{
            const STATUS = document.querySelector(".sq-status");
            const QUESTION = document.querySelector("#sq");
            const VALUE = QUESTION.value;
            console.log(VALUE); // to check with it
            if (VALUE === "great-grandnephew"){
                setTimeout(() => {
                    STATUS.textContent = "Status: Passed. Redirecting...";
                    document.cookie = "site_access=granted; max-age=" + (60 * 60 * 24 * 7) + "; path=/; SameSite=Strict";
                    window.location.replace('https://thegoosesite.github.io')
                },300)
            } else {
                STATUS.textContent = "Status: Failed. Please try again."
            }
        });
  }
});