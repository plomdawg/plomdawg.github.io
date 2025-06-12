document.addEventListener('DOMContentLoaded', function() {
    const detailsContainer = document.getElementById('project-details-container');
    const demoMediaContainer = document.getElementById('demo-media-container');
    const projectHeader = document.getElementById('project-header');
    
    console.log('Initial projectDetailsHTML:', projectDetailsHTML);
    
    // Initialize project details
    if (typeof projectDetailsHTML !== 'undefined') {
        detailsContainer.innerHTML = projectDetailsHTML;
    }
    
    const links = document.querySelectorAll('.project-link');
    const projectDetails = document.querySelectorAll('.project-detail');
    
    console.log('Found project links:', links.length);
    console.log('Found project details:', projectDetails.length);
    
    function showProject(targetId) {
        console.log('Showing project:', targetId);
        
        // Hide all projects and remove active states
        projectDetails.forEach(detail => detail.style.display = 'none');
        links.forEach(link => link.classList.remove('active'));
        
        // Show selected project
        const targetDetail = document.getElementById(targetId);
        if (!targetDetail) {
            console.error('Target project not found:', targetId);
            return;
        }
        
        console.log('Found target detail:', targetDetail);
        targetDetail.style.display = 'block';
        
        // Update header
        const headerContent = targetDetail.querySelector('.project-header');
        if (headerContent) {
            projectHeader.innerHTML = headerContent.innerHTML;
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
        }
        
        // Set active state
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