function addToWishlist(event, button) {
    const movieItem = button.closest('.grid-item');
    const movieId = movieItem.getAttribute('data-movie-id');
    const movieTitle = movieItem.getAttribute('data-movie-title');
  
    fetch('/myWishlist/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Include credentials if your API requires authentication
        'Credentials': 'include'
      },
      body: JSON.stringify({ movieId: movieId }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      if(data.success) {
        addToWishlistTable(movieTitle);
      } else {
        alert('Could not add to wishlist: ' + data.message);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}
  
function addToWishlistTable(movieTitle) {
    const tableBody = document.getElementById('wishlistTable').querySelector('tbody');
    const newRow = tableBody.insertRow();
    const titleCell = newRow.insertCell(0);
    titleCell.textContent = movieTitle;
}
  