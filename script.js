// Load albums from albums.json
fetch('albums.json')
  .then(response => response.json())
  .then(albums => {
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

      // Make the album clickable
      albumDiv.addEventListener("click", () => {
        window.location.href = `album.html?album=${encodeURIComponent(album.name)}`;
      });

      // Append album to the grid
      albumsGrid.appendChild(albumDiv);
    });
  })
  .catch(error => console.error('Error loading albums:', error));
