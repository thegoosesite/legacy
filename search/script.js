document.addEventListener("DOMContentLoaded", function () {
    const PAGES = [
        {
            title: "Home Page",
            url: "https://thegoosesite.github.io",
            content: "Welcome to everyone except Saam! Repent your goosins at St. Duck's Church, view our great bulletin board, and gooseling.",
            keywords: "home, welcome, main, index, goose, goosism, repent, worship"
        },
        {
            title: "The Unity Videos",
            url: "https://thegoosesite.github.io/videos",
            content: "Worship, pray, and repent with the unity videos.",
            keywords: "goosevideos, quiteholy, channel, videos, unity"
        },
        {
            title: "The Trinity Slideshows",
            url: "https://thegoosesite.github.io/powerpoint",
            content: "Pray with the trinity slideshows...",
            keywords: "slides, powerpoint, microsoft, trinity, slideshow, slideshows"
        },
        {
            title: "The Holy Goose Bible",
            url: "https://thegoosesite.github.io/bible",
            content: "Read the holy goose bible and cherish it for dear life.",
            keywords: "quran, bible, book, gooseling, holy"
        },
        {
            title: "Dancing Monster",
            url: "https://thegoosesite.github.io/saint-rainbowhairs",
            content: "A goose page dedicated to Saint Duck's nephew *twice removed*.",
            keywords: "canon, dancingmonster, monster, rainbowhairs"
        },
        {
            title: "Interactives",
            url: "https://thegoosesite.github.io/interactives",
            content: "Goose games coded in HTML5!",
            keywords: "interactives, games, goosegames, breakout, brickbreaker, pong"
        },
        {
            title: "Youtube Channel",
            url: "https://thegoosesite.github.io/youtube",
            content: "The great Youtube channel.... subscribe or die.",
            keywords: "unity, youtube, channel, videos"
        }
    ];

    
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');


    function performSearch(query) {
        searchResults.style.display="flex";
        searchResults.innerHTML = '';
        
        const cleanQuery = query.toLowerCase().trim();
        
        if (cleanQuery === '') {
            return; 
        }
        
        const filteredPages = PAGES.filter(page => {
            return page.title.toLowerCase().includes(cleanQuery) || 
                   page.content.toLowerCase().includes(cleanQuery) || 
                   page.keywords.toLowerCase().includes(cleanQuery);
        });
        
        if (filteredPages.length === 0) {
            searchResults.innerHTML = '<li class="no-results">No pages found matching your search.</li>';
        } else {
            filteredPages.forEach(page => {
                const li = document.createElement('li');
                li.className = 'result-item';
                
                // Create standard snippet from content
                let snippet = page.content;
                if (snippet.length > 120) {
                    snippet = snippet.substring(0, 120) + '...';
                }

                li.innerHTML = `
                    <h2><a href="${page.url}">${page.title}</a></h2>
                    <p>${snippet}</p>
                `;
                searchResults.appendChild(li);
            });
        }
    } 
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            performSearch(e.target.value);
        });
    }
}); 
