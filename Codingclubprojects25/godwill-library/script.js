// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference or respect system preference
const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    document.body.classList.add('dark-mode');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }
});

// Login Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // Simple validation (in a real app, this would be server-side)
            if (username === 'admin' && password === 'admin123') {
                // Save login status
                localStorage.setItem('isAdmin', 'true');
                // Redirect to admin panel
                window.location.href = 'admin.html';
            } else {
                alert('Invalid credentials. Please try again.');
            }
        });
    }
    
    // Check if user is logged in for admin pages
    const isAdminPage = window.location.pathname.includes('admin');
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    
    if (isAdminPage && !isAdmin) {
        window.location.href = 'login.html';
    }
    
    // Logout functionality
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            localStorage.removeItem('isAdmin');
            window.location.href = 'index.html';
        });
    }
    
    // Profile page theme toggle
    const themeSwitch = document.getElementById('theme-switch');
    if (themeSwitch) {
        themeSwitch.checked = document.body.classList.contains('dark-mode');
        
        themeSwitch.addEventListener('change', function() {
            document.body.classList.toggle('dark-mode');
            
            if (document.body.classList.contains('dark-mode')) {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
                localStorage.setItem('theme', 'dark');
            } else {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
                localStorage.setItem('theme', 'light');
            }
        });
    }
});

// Book Management System
let books = JSON.parse(localStorage.getItem('books')) || [
    { id: 1, title: 'Attack on Titan', author: 'Hajime Isayama', genre: 'Action', year: 2010, image: '', volumes: 34 },
    { id: 2, title: 'Demon Slayer', author: 'Koyoharu Gotouge', genre: 'Supernatural', year: 2016, image: '', volumes: 23 },
    { id: 3, title: 'My Hero Academia', author: 'Kohei Horikoshi', genre: 'Superhero', year: 2014, image: '', volumes: 42 }
];

function saveBooks() {
    localStorage.setItem('books', JSON.stringify(books));
}

function displayBooks() {
    const booksContainer = document.getElementById('books-container');
    if (!booksContainer) return;
    
    booksContainer.innerHTML = '';
    
    books.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        bookCard.innerHTML = `
            <div class="book-cover">
                ${book.image ? 
                `<img src="${book.image}" alt="${book.title}" style="width:100%;height:100%;object-fit:cover;">` : 
                `<i class="fas fa-book"></i>`}
            </div>
            <div class="book-info">
                <h3>${book.title}</h3>
                <p><strong>Author:</strong> ${book.author}</p>
                <p><strong>Genre:</strong> ${book.genre}</p>
                <p><strong>Year:</strong> ${book.year}</p>
                ${book.volumes ? `<p><strong>Volumes:</strong> ${book.volumes}</p>` : ''}
                ${localStorage.getItem('isAdmin') === 'true' ? 
                `<button class="action-btn delete-btn" onclick="deleteBook(${book.id})">Delete</button>` : ''}
            </div>
        `;
        booksContainer.appendChild(bookCard);
    });
}

function addBook(event) {
    event.preventDefault();
    
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const genre = document.getElementById('genre').value;
    const year = document.getElementById('year').value;
    const volumes = document.getElementById('volumes').value;
    const imageInput = document.getElementById('image');
    
    if (title && author && genre && year) {
        // Handle image upload
        let image = '';
        if (imageInput && imageInput.files && imageInput.files[0]) {
            const file = imageInput.files[0];
            const reader = new FileReader();
            
            reader.onload = function(e) {
                image = e.target.result;
                finishAddingBook(title, author, genre, parseInt(year), parseInt(volumes) || 0, image);
            };
            
            reader.readAsDataURL(file);
        } else {
            finishAddingBook(title, author, genre, parseInt(year), parseInt(volumes) || 0, image);
        }
    }
}

function finishAddingBook(title, author, genre, year, volumes, image) {
    const newBook = {
        id: books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1,
        title,
        author,
        genre,
        year,
        volumes: volumes || 0,
        image
    };
    
    books.push(newBook);
    saveBooks();
    displayBooks();
    refreshAdminTable();
    
    // Reset form
    document.getElementById('add-book-form').reset();
    
    // Show success message
    alert('Manga added successfully!');
}

function deleteBook(id) {
    if (confirm('Are you sure you want to delete this book?')) {
        books = books.filter(book => book.id !== id);
        saveBooks();
        displayBooks();
        
        // Also update admin table if on admin page
        if (window.location.pathname.includes('admin')) {
            const tbody = document.getElementById('books-table-body');
            if (tbody) {
                const rows = tbody.querySelectorAll('tr');
                rows.forEach(row => {
                    const deleteBtn = row.querySelector('.delete-btn');
                    if (deleteBtn && deleteBtn.getAttribute('onclick').includes(`(${id})`)) {
                        row.remove();
                    }
                });
            }
        }
    }
}

// Function to refresh admin table
function refreshAdminTable() {
    if (window.location.pathname.includes('admin')) {
        const tbody = document.getElementById('books-table-body');
        if (tbody) {
            tbody.innerHTML = '';
            books.forEach(book => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.genre}</td>
                    <td>${book.year}</td>
                    <td>${book.volumes || 0}</td>
                    <td>${book.image ? '<i class="fas fa-check"></i> Yes' : 'No'}</td>
                    <td>
                        <button class="action-btn delete-btn" onclick="deleteBook(${book.id})">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </td>
                `;
                tbody.appendChild(row);
            });
        }
    }
}

// Initialize books display
document.addEventListener('DOMContentLoaded', function() {
    displayBooks();
    refreshAdminTable();
    
    // Handle add book form submission
    const addBookForm = document.getElementById('add-book-form');
    if (addBookForm) {
        addBookForm.addEventListener('submit', function(e) {
            addBook(e);
            setTimeout(refreshAdminTable, 100);
        });
    }
});