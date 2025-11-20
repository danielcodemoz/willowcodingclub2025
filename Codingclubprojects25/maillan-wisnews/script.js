// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference or respect OS preference
const savedTheme = localStorage.getItem('theme');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Apply saved theme or OS preference
if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
  body.setAttribute('data-theme', 'dark');
  themeToggle.textContent = '☀️';
} else {
  body.setAttribute('data-theme', 'light');
  themeToggle.textContent = '🌙';
}

// Toggle theme when button is clicked
themeToggle.addEventListener('click', () => {
  const currentTheme = body.getAttribute('data-theme');
  
  if (currentTheme === 'dark') {
    body.setAttribute('data-theme', 'light');
    themeToggle.textContent = '🌙';
    localStorage.setItem('theme', 'light');
  } else {
    body.setAttribute('data-theme', 'dark');
    themeToggle.textContent = '☀️';
    localStorage.setItem('theme', 'dark');
  }
});

// Read more toggle functionality
const readMoreButtons = document.querySelectorAll('.read-more-btn');

readMoreButtons.forEach(button => {
  button.addEventListener('click', () => {
    const card = button.closest('.news-card');
    const extraContent = card.querySelector('.extra-content');
    const isExpanded = extraContent.style.display === 'block';
    
    if (isExpanded) {
      // Collapse content
      extraContent.style.display = 'none';
      button.textContent = 'Leia mais';
    } else {
      // Expand content
      extraContent.style.display = 'block';
      button.textContent = 'Leia menos';
    }
  });
});