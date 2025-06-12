document.addEventListener('DOMContentLoaded', function() {
    const detailsContainer = document.getElementById('project-details-container');
    const demoMediaContainer = document.getElementById('demo-media-container');
    const projectHeader = document.getElementById('project-header');
    
    // Initialize project details
    if (typeof projectDetailsHTML !== 'undefined') {
        detailsContainer.innerHTML = projectDetailsHTML;
    }
    
    const links = document.querySelectorAll('.project-link');
    const projectDetails = detailsContainer.querySelectorAll('.project-detail');
    
    function showProject(targetId) {
        // Hide all projects and remove active states
        projectDetails.forEach(detail => detail.style.display = 'none');
        links.forEach(link => link.classList.remove('active'));
        
        // Show selected project
        const targetDetail = document.getElementById(targetId);
        if (!targetDetail) return;
        
        targetDetail.style.display = 'block';
        
        // Update header
        const projectName = targetDetail.querySelector('h2');
        const shortDescription = targetDetail.querySelector('.lead');
        if (projectName && shortDescription) {
            projectHeader.innerHTML = `
                <h2 class="mb-2">${projectName.textContent}</h2>
                <p class="lead mb-0">${shortDescription.textContent}</p>
                <hr>
            `;
        }
        
        // Update demo media
        const demoMedia = targetDetail.querySelector('.demo-media');
        demoMediaContainer.innerHTML = demoMedia ? demoMedia.outerHTML : '';
        
        // Set active state
        document.querySelector(`[data-target="${targetId}"]`)?.classList.add('active');
    }
    
    // Add click handlers
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showProject(link.dataset.target);
        });
    });
    
    // Show first project by default
    if (links.length > 0) {
        showProject(links[0].dataset.target);
    }
});

// Theme switching functionality
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('.theme-icon');
    const html = document.documentElement;
    
    // Set initial theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
    
    function updateThemeIcon(theme) {
        themeIcon.setAttribute('name', theme === 'dark' ? 'sunny' : 'moon');
    }
});