// Simulated folder structure (replace with dynamic logic if possible)
const albums = [
  { name: "travel", photos: ["eagle.png"] },
  { name: "work", photos: ["w.jpg"]},
];

// Function to generate the albums grid
function generateAlbumsGrid() {
  const albumsGrid = document.getElementById("albums-grid");

  albums.forEach(album => {
    // Create album container
    const albumDiv = document.createElement("div");
    albumDiv.classList.add("album");

    // Add album preview image
    const img = document.createElement("img");
    img.src = `photos/${album.name}/${album.photos[0]}`;
    img.alt = `${album.name} preview`;
    albumDiv.appendChild(img);

    // Add album title
    const title = document.createElement("div");
    title.classList.add("album-title");
    title.textContent = album.name;
    albumDiv.appendChild(title);

    // Append album to the grid
    albumsGrid.appendChild(albumDiv);
  });
}

// Run the function when the page loads
document.addEventListener("DOMContentLoaded", generateAlbumsGrid);
