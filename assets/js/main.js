document.addEventListener('DOMContentLoaded', function() {
    const detailsContainer = document.getElementById('project-details-container');
    const demoMediaContainer = document.getElementById('demo-media-container');
    const projectHeader = document.getElementById('project-header');
    
    // Create a DocumentFragment to hold the project details
    let projectDetailsStore = null;
    if (typeof projectDetailsHTML !== 'undefined') {
        const template = document.createElement('template');
        template.innerHTML = projectDetailsHTML.trim();
        projectDetailsStore = template.content;
    }
    
    const links = document.querySelectorAll('.project-link');
    const defaultProjectId = links.length > 0 ? links[0].dataset.target : null;
    
    console.log('Found project links:', links.length);
    
    function showProject(targetId) {
        console.log('Showing project:', targetId);
        
        // Remove active states from all links
        links.forEach(link => link.classList.remove('active'));
        
        // Get selected project from our store
        const targetDetail = projectDetailsStore ? projectDetailsStore.querySelector(`#${targetId}`) : null;
        if (!targetDetail) {
            console.error('Target project not found:', targetId);
            return;
        }
        
        console.log('Found target detail:', targetDetail);
        
        // Update header
        const headerContent = targetDetail.querySelector('.project-header');
        if (headerContent) {
            projectHeader.innerHTML = headerContent.innerHTML;
        } else {
            projectHeader.innerHTML = '';
        }
        
        // Update demo media
        const demoContent = targetDetail.querySelector('.project-demo');
        if (demoContent) {
            demoMediaContainer.innerHTML = demoContent.innerHTML;
        } else {
            demoMediaContainer.innerHTML = '';
        }
        
        // Update main content
        const mainContent = targetDetail.querySelector('.project-content');
        if (mainContent) {
            detailsContainer.innerHTML = mainContent.innerHTML;
        } else {
            detailsContainer.innerHTML = '';
        }
        
        // Set active state on the clicked link
        const activeLink = document.querySelector(`[data-target="${targetId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
    
    function updateURL(targetId) {
        // We don't want to clutter the URL for the default project.
        // Let's keep the URL clean.
        // However, if we're on another project page, we need to be able to get back.
        if (targetId === defaultProjectId) {
            history.pushState({ targetId }, '', window.location.pathname);
        } else {
            history.pushState({ targetId }, '', '#' + targetId);
        }
    }
    
    // Add click handlers
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.dataset.target;

            // If we're already on this page, don't do anything.
            const currentHash = window.location.hash.substring(1);
            if (currentHash === targetId) return;

            // Also, if we're on the default page and click the default link, do nothing.
            if (!currentHash && targetId === defaultProjectId) return;

            console.log('Link clicked:', targetId);
            showProject(targetId);
            updateURL(targetId);
        });
    });
    
    const loadProjectFromURL = () => {
        const targetId = window.location.hash.substring(1);
        // If a project is specified in the URL, show it.
        // Otherwise, show the first project.
        if (targetId && projectDetailsStore.querySelector(`#${targetId}`)) {
            showProject(targetId);
        } else if (defaultProjectId) {
            showProject(defaultProjectId);
        }
    }

    loadProjectFromURL();

    // Re-load content when the user uses the back/forward buttons.
    window.addEventListener('popstate', (e) => {
        loadProjectFromURL();
    });
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