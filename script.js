// Sample Books
const sampleBooks = [
  { id: 1, title: 'Book 1', author: 'Author 1', genre: 'Genre 1', publishDate: '2022-01-01', availability: true, copies: 5 },
  { id: 2, title: 'Book 2', author: 'Author 2', genre: 'Genre 2', publishDate: '2021-05-15', availability: true, copies: 2 },
  // Add more sample books here
];

// Function to fetch books from API
function fetchBooks(page) {
  // Replace 'API_ENDPOINT' with your actual API endpoint for fetching books
  const API_ENDPOINT = `https://example.com/api/books?page=${page}`;

  // Make an API request to fetch books
  fetch(API_ENDPOINT)
    .then(response => response.json())
    .then(data => {
      // Process the received data
      const books = data.books; // Assuming the API response has a 'books' property containing the book data
      displayBooks(books);
    })
    .catch(error => {
      console.error('Error fetching books:', error);
    });
}

// Function to display books on the page
function displayBooks(books) {
  const booksContainer = document.getElementById('book-items');
  booksContainer.innerHTML = '';

  books.forEach(book => {
    const bookItem = document.createElement('div');
    bookItem.classList.add('book-item');
    bookItem.innerHTML = `
      <h3>${book.title}</h3>
      <p>Author: ${book.author}</p>
      <p>Genre: ${book.genre}</p>
      <p>Publish Date: ${book.publishDate}</p>
      <p>Availability: ${book.availability ? 'Available' : 'Not Available'}</p>
      <p>Copies: ${book.copies}</p>
      <button class="add-to-cart-btn" data-book-id="${book.id}">Add to Cart</button>
    `;

    booksContainer.appendChild(bookItem);
  });
}

// Function to handle search suggestions
function handleSearchSuggestions() {
  const searchInput = document.getElementById('search-input');
  const searchQuery = searchInput.value.trim();

  if (searchQuery === '') {
    clearSearchSuggestions();
    return;
  }

  // Implement your search suggestion logic here
  // You can make API requests to get search suggestions based on the searchQuery

  // Simulating search suggestions
  const suggestions = [
    'Book 1',
    'Book 2',
    'Book 3',
    // Add more suggestions here
  ];

  const searchSuggestions = document.getElementById('search-suggestions');
  searchSuggestions.innerHTML = '';

  suggestions.forEach(suggestion => {
    const suggestionItem = document.createElement('li');
    suggestionItem.textContent = suggestion;

    suggestionItem.addEventListener('click', function() {
      searchInput.value = suggestion;
      clearSearchSuggestions();
      performSearch();
    });

    searchSuggestions.appendChild(suggestionItem);
  });
}

// Function to clear search suggestions
function clearSearchSuggestions() {
  const searchSuggestions = document.getElementById('search-suggestions');
  searchSuggestions.innerHTML = '';
}

// Function to perform search based on the search query
// Function to perform search based on the search query
function performSearch() {
  const searchInput = document.getElementById('search-input');
  const searchQuery = searchInput.value.trim().toLowerCase();

  // Implement your search logic here
  // You can make API requests to get search results based on the searchQuery

  // Simulating search results
  const searchResults = sampleBooks.filter(book => {
    const { title, author, genre, publishDate } = book;
    const lowerCaseTitle = title.toLowerCase();
    const lowerCaseAuthor = author.toLowerCase();
    const lowerCaseGenre = genre.toLowerCase();
    const lowerCasePublishDate = publishDate.toLowerCase();

    return (
      lowerCaseTitle.includes(searchQuery) ||
      lowerCaseAuthor.includes(searchQuery) ||
      lowerCaseGenre.includes(searchQuery) ||
      lowerCasePublishDate.includes(searchQuery)
    );
  });

  displayBooks(searchResults);
}


// Function to handle filter selection
function handleFilters() {
  const filterSelect = document.getElementById('filter-select');
  const selectedFilter = filterSelect.value;

  // Implement your filter logic here
  // You can make API requests to get filtered results based on the selected filter

  // Simulating filtered results
  const filteredResults = sampleBooks.filter(book => {
    // Implement your filtering logic based on the selectedFilter value
    // Example filtering by title
    return book.title.toLowerCase().includes(selectedFilter.toLowerCase());
  });

  displayBooks(filteredResults);
}

// Function to add a book to the cart
function addToCart(bookId) {
  // Implement your add to cart logic here
  // You can store the cart items in an array or use a shopping cart library

  // Simulating adding to cart
  const cartItems = document.getElementById('cart-items');
  const book = document.querySelector(`[data-book-id="${bookId}"]`).parentNode;
  const bookTitle = book.querySelector('h3').textContent;
  const cartItem = document.createElement('div');
  cartItem.classList.add('cart-item');
  cartItem.textContent = bookTitle;
  cartItems.appendChild(cartItem);
}

// Function to handle checkout
function handleCheckout() {
  // Implement your checkout logic here
  // You can clear the cart items and update the book availability and copies

  const cartItems = document.getElementById('cart-items');
  cartItems.innerHTML = '';
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
  // Fetch books on page load
  fetchBooks(1);
});

document.getElementById('search-input').addEventListener('input', function() {
  handleSearchSuggestions();
});

document.getElementById('search-input').addEventListener('keyup', function(event) {
  if (event.key === 'Enter') {
    clearSearchSuggestions();
    performSearch();
  }
});

document.getElementById('filter-select').addEventListener('change', function() {
  handleFilters();
});

document.addEventListener('click', function(event) {
  if (event.target.classList.contains('add-to-cart-btn')) {
    const bookId = event.target.dataset.bookId;
    addToCart(bookId);
  }
});

document.getElementById('checkout-btn').addEventListener('click', function() {
  handleCheckout();
});
