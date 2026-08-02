document.addEventListener("DOMContentLoaded", function () {
    const PAGES = [
        {
            title: "Goosism",
            url: "https://thegoosesite.github.io/wiki/Goosism",
            content: "The religion of The Goose.",
            keywords: "deity, piety, religion, goose, goosism, gooseism"
        },
        {
            title: "List of Important Figures in Goose Lore",
            url: "https://thegoosesite.github.io/wiki/List_of_important_figures_in_goose_lore",
            content: "Important beings from the Goose Bible or Lore.",
            keywords: "saints, goose, canon, lore, deity, god"
        },
        {
            title: "The Goose",
            url: "https://thegoosesite.github.io/wiki/The_Goose",
            content: "The great leader of all...",
            keywords: "goose, leader, god, thegoose, worshipthegoose"
        },
        {
            title: "Saint Duck",
            url: "https://thegoosesite.github.io/wiki/Saint_Duck",
            content: "Information about Saint Duck",
            keywords: "stduck, duck, saint, saints, successor, holy"
        },
        {
            title: "Saint Rainbowhairs \"Dancing Monster\"",
            url: "https://thegoosesite.github.io/wiki/Dancing_Monster",
            content: "A goose page dedicated to Saint Duck's nephew *twice removed*.",
            keywords: "canon, dancingmonster, monster, rainbowhairs, saint, saints"
        },
        {
            title: "The Goose Site",
            url: "https://thegoosesite.github.io/wiki/Site",
            content: "A whole Wiki article on The Goose Site",
            keywords: "site, website, gooseweb, web, thegoosesite, worshipthegoose, worshipthegoosesite"
        },
        {
            title: "Saint Swan",
            url: "https://thegoosesite.github.io/wiki/Saint_Swan",
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
