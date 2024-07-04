document.addEventListener('DOMContentLoaded', () => {
    const toolGrid = document.getElementById('tool-grid');
    const filterContainer = document.querySelector('.filter-container');
    const leftArrow = document.createElement('i');
    const rightArrow = document.createElement('i');

    var icon = document.getElementById("icon");

    icon.onclick = function () {
        document.body.classList.toggle("dark-theme");
        if (document.body.classList.contains("dark-theme")) {
            icon.src = "assets/images/logo/moon.png";
        } else {
            icon.src = "assets/images/logo/sun.png";
        }
    }

    // Définir une map pour les icônes FontAwesome en fonction des catégories
    const iconMap = {
        'Text': 'fa-solid fa-file-alt',
        'Image': 'fa-solid fa-image',
        'Video': 'fa-solid fa-video',
        'Chatbot': 'fa-solid fa-comments',
        'Productivity': 'fa-solid fa-tasks',
        'Design': 'fa-solid fa-paint-brush',
        'Marketing': 'fa-solid fa-bullhorn',
        'Audio': 'fa-solid fa-microphone-alt',
        'Transcription': 'fa-solid fa-keyboard',
        'Development': 'fa-solid fa-laptop-code',
        'Code': 'fa-solid fa-code',
        'Data': 'fa-solid fa-database',
        'Automation': 'fa-solid fa-robot',
        'Artificial Intelligence': 'fa-solid fa-brain',
        'Analytics': 'fa-solid fa-chart-column',
        'Website': 'fa-solid fa-globe',
        'Resume': 'fa-solid fa-file',
        'Maths': 'fa-solid fa-calculator',
        'SEO': 'fa-solid fa-timeline',
        'Logo': 'fa-solid fa-font-awesome',
        'Ads': 'fa-solid fa-rectangle-ad',
    };

    let selectedFilters = [];

    fetch('data/tools.json')
        .then(response => response.json())
        .then(tools => {
            const allCategories = new Set();
            tools.forEach(tool => {
                tool.category.forEach(cat => allCategories.add(cat));
            });

            // Générer les filtres
            filterContainer.innerHTML = Array.from(allCategories).map(cat => `
                <div class="filter" data-category="${cat}">
                    <i class="${iconMap[cat] || 'fa-solid fa-tag'}"></i>
                    <span>${cat}</span>
                </div>
            `).join('');

            // Ajouter des écouteurs d'événements aux filtres
            document.querySelectorAll('.filter').forEach(filter => {
                filter.addEventListener('click', () => {
                    const category = filter.dataset.category;
                    if (selectedFilters.includes(category)) {
                        selectedFilters = selectedFilters.filter(c => c !== category);
                        filter.classList.remove('selected');
                    } else {
                        selectedFilters.push(category);
                        filter.classList.add('selected');
                    }
                    renderTools(tools);
                });
            });

            renderTools(tools);

            function renderTools(tools) {
                const filteredTools = tools.filter(tool => {
                    if (selectedFilters.length === 0) return true;
                    return tool.category.some(cat => selectedFilters.includes(cat));
                });

                toolGrid.innerHTML = filteredTools.map(tool => `
                    <div class="tool-card" data-tool-id="${tool.id}">
                        <div class="logo-container">
                            <img src="assets/images/tools/${tool.image}" alt="${tool.name}">
                            <h3>${tool.name}</h3>
                        </div>
                        <p>${tool.description}</p>
                        <div class="categories">
                            ${tool.category.map(cat => `
                                <div class="category">
                                    <i class="${iconMap[cat] || 'fa-solid fa-tag'}"></i>
                                    <span>${cat.replace('-', ' ')}</span>
                                </div>
                            `).join('')}
                        </div>
                        <a href="${tool.link}" target="_blank">Discover</a>
                    </div>
                `).join('');

            }

            // Ajouter les flèches de défilement
            leftArrow.classList.add('scroll-arrow', 'fa', 'fa-chevron-left');
            rightArrow.classList.add('scroll-arrow', 'fa', 'fa-chevron-right');
            filterContainer.parentNode.insertBefore(leftArrow, filterContainer);
            filterContainer.parentNode.insertBefore(rightArrow, filterContainer.nextSibling);

            leftArrow.addEventListener('click', () => {
                filterContainer.scrollBy({ left: -200, behavior: 'smooth' });
            });

            rightArrow.addEventListener('click', () => {
                filterContainer.scrollBy({ left: 200, behavior: 'smooth' });
            });

            // Afficher ou masquer les flèches de défilement
            function updateArrows() {
                if (filterContainer.scrollLeft > 0) {
                    leftArrow.style.display = 'block';
                } else {
                    leftArrow.style.display = 'none';
                }

                if (filterContainer.scrollLeft + filterContainer.clientWidth < filterContainer.scrollWidth) {
                    rightArrow.style.display = 'block';
                } else {
                    rightArrow.style.display = 'none';
                }
            }

            filterContainer.addEventListener('scroll', updateArrows);
            window.addEventListener('resize', updateArrows);
            updateArrows();
        })
        .catch(error => console.error('Error loading tools:', error));
});

document.addEventListener('DOMContentLoaded', () => {
    const shareBtn = document.getElementById('share-btn');
    const shareCards = document.getElementById('share-cards');

    shareBtn.addEventListener('click', () => {
        if (shareCards.classList.contains('show')) {
            shareCards.classList.remove('show');
            setTimeout(() => {
                shareCards.style.display = 'none';
            }, 300); // Duration should match CSS transition duration
        } else {
            shareCards.style.display = 'flex';
            setTimeout(() => {
                shareCards.classList.add('show');
            }, 10); // Small delay to trigger transition
        }
    });
});

const cursorDot =  document.querySelector("[data-cursor-dot]");
const cursorOutline =  document.querySelector("[data-cursor-outline]");

window.addEventListener("mousemove", function (e) {

    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    cursorOutline.style.left = `${posX}px`;
    cursorOutline.style.top = `${posY}px`;

    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`,
    }, { duration: 500, fill: "forwards"})
})

