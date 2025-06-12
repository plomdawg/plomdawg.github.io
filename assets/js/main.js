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
    
    // Add click handlers
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Link clicked:', link.dataset.target);
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