document.addEventListener('DOMContentLoaded', function() {
    const detailsContainer = document.getElementById('project-details-container');
    
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