
// Fetch the JSON configuration file
async function loadConfig() {
    return {
        "work": ["1.avif","2.avif","3.avif","5.avif","12.avif"],
        "animals": ["4.avif","8.avif","10.avif","13.avif"],
        "people": ["6.avif","9.avif","11.avif","14.avif","15.avif","16.avif","17.avif"]
      }
  }
  
  // Generate filter buttons dynamically
  function generateFilters(categories) {
    const filtersContainer = document.getElementById('filters');
    filtersContainer.innerHTML = ''; // Clear existing filters
  
    // Add "All" filter
    const allButton = document.createElement('button');
    allButton.classList.add('filter-btn', 'active');
    allButton.dataset.filter = 'all';
    allButton.textContent = 'All';
    filtersContainer.appendChild(allButton);
  
    // Add category filters
    categories.forEach(category => {
      const button = document.createElement('button');
      button.classList.add('filter-btn');
      button.dataset.filter = category;
      button.textContent = category.charAt(0).toUpperCase() + category.slice(1); // Capitalize first letter
      filtersContainer.appendChild(button);
    });
  }
  
// Load images into the gallery
function loadGallery(galleryData, filter = 'all') {
    const galleryGrid = document.getElementById('gallery-grid');
    galleryGrid.innerHTML = ''; // Clear existing images
  
    // Determine which images to display
    let imagesToDisplay = [];
    if (filter === 'all') {
      imagesToDisplay = Object.entries(galleryData).flatMap(([category, filenames]) =>
        filenames.map(filename => `photos/${category}/${filename}`)
      );
    } else {
      imagesToDisplay = galleryData[filter]?.map(filename => `photos/${filter}/${filename}`) || [];
    }
  
    // Append images to the gallery
    imagesToDisplay.forEach((src, index) => {
      const item = document.createElement('li'); // Use <li> instead of <div>
  
      const img = document.createElement('img');
      img.src = src;
      img.alt = src.split('/').pop(); // Use filename as alt text
  
      item.appendChild(img);
      galleryGrid.appendChild(item);
    });
  }
  
  // Initialize the gallery
  (async function init() {
    const galleryData = await loadConfig();
    const categories = Object.keys(galleryData);
  
    // Generate filters
    generateFilters(categories);
  
    // Filter buttons functionality
    document.querySelectorAll('.filter-btn').forEach(button => {
      button.addEventListener('click', () => {
        document.querySelector('.filter-btn.active').classList.remove('active');
        button.classList.add('active');
  
        const filter = button.dataset.filter;
        loadGallery(galleryData, filter);
      });
    });
  
    // Fullscreen Modal
    const modal = document.getElementById('fullscreen-modal');
    const modalImg = document.querySelector('.fullscreen-img');
    const closeBtn = document.querySelector('.close-btn');
  
    document.getElementById('gallery-grid').addEventListener('click', (e) => {
      if (e.target.tagName === 'IMG') {
        modalImg.src = e.target.src;
        modal.classList.remove('hidden');
      }
    });
  
    closeBtn.addEventListener('click', () => {
      modal.classList.add('hidden');
    });
  
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden');
      }
    });
  
    // Initialize gallery with all images
    loadGallery(galleryData, 'all');
  })();
