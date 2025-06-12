document.addEventListener('DOMContentLoaded', function() {
    const detailsContainer = document.getElementById('project-details-container');
    const demoMediaContainer = document.getElementById('demo-media-container');
    
    // 1. Inject the HTML from our variable into the page
    // The 'projectDetailsHTML' variable is created in index.md
    if (typeof projectDetailsHTML !== 'undefined') {
      detailsContainer.innerHTML = projectDetailsHTML;
    }
  
    // 2. Now that the HTML is on the page, find the links and details
    const links = document.querySelectorAll('.project-link');
    const projectDetails = detailsContainer.querySelectorAll('.project-detail');
  
    // Function to switch visible project
    function showProject(targetId) {
      // Hide all project details
      projectDetails.forEach(detail => {
        detail.style.display = 'none';
      });
  
      // Show the target project detail
      const targetDetail = document.getElementById(targetId);
      if (targetDetail) {
        targetDetail.style.display = 'block';
        
        // Move demo media to the middle column
        const demoMedia = targetDetail.querySelector('.demo-media');
        if (demoMedia) {
          demoMediaContainer.innerHTML = demoMedia.outerHTML;
        } else {
          demoMediaContainer.innerHTML = ''; // Clear if no demo media
        }
        
        // Remove demo media from the details container
        const demoMediaInDetails = targetDetail.querySelector('.demo-media');
        if (demoMediaInDetails) {
          demoMediaInDetails.remove();
        }
      }
  
      // Update active link style
      links.forEach(link => {
        if (link.dataset.target === targetId) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  
    // Add click event listeners to all project links
    links.forEach(link => {
      link.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent page from reloading
        const targetId = this.dataset.target;
        showProject(targetId);
      });
    });
  
    // Show the first project by default
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