document.addEventListener("DOMContentLoaded", function() {
    // 1. Select ALL wikilink elements
    const wikilinks = document.querySelectorAll("wikilink");
    
    // 2. Loop through each element and attach an event listener
    wikilinks.forEach(function(link) {
        link.addEventListener("click", function() {
            // Get the 'article' attribute from the clicked element
            const article = link.getAttribute('article');
            
            if (article) {
                const target = "https://thegoosesite.github.io/wiki/" + article;
                window.open(target, "_blank");
            }
        });
    });
});