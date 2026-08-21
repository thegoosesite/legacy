document.addEventListener("DOMContentLoaded", () => {
  const logout = document.getElementById("logout");
  
  // Guard clause to prevent errors if the button is missing
  if (!logout) return; 

  logout.addEventListener("click", () => {
    // Clear the authentication cookie
    document.cookie = "site_access=; need_additional_screening=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict"; 
    
    // Clear storage mechanisms
    window.localStorage.clear();
    window.sessionStorage.clear();
    
    // Modern way to force a fresh reload from the server
    // RIP window.location.reload() --> WE WILL MISS YOU DEEPLY
    window.location.href = window.location.href;
  });
});
