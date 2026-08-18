// Wrap inside a DOMContentLoaded listener to guarantee the button exists
document.addEventListener('DOMContentLoaded', () => {
  const opener = document.querySelector("#appOpener");
  
  if (!opener) return; // Safeguard if element is missing

  opener.addEventListener('click', () => {
    // Standardized width/height params without arbitrary 'popup=true' string
    const popup = window.open('https://thegoosesite.github.io/legacy/?appopen', 'popup', 'width=600,height=400');
    
    // Hide the body visually
    document.body.style.opacity = "0"; 
    document.body.style.pointerEvents = "none"; 

    const checkClosed = setInterval(() => {
      try {
        // Safe check logic: if popup is blocked, missing, or confirmed closed
        if (!popup || popup.closed) {
            clearInterval(checkClosed);
            console.log('Popup window is closed. Reloading ammo!');
            window.location.reload();
        }
      } catch (crossOriginError) {
        // Fallback: If a cross-origin error occurs, the window is still open.
        // We catch the error silently so the execution doesn't crash.
      }
    }, 500); 
  });
});
