document.addEventListener('DOMContentLoaded', () => {
    // --- Theme Switcher Logic ---
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    let themeToSet = 'light'; // Default to light

    if (currentTheme) {
        themeToSet = currentTheme;
    } else if (prefersDark) {
        themeToSet = 'dark';
    }

    document.documentElement.setAttribute('data-theme', themeToSet);

    if (themeToggle) {
        // Set initial icon
        if (themeToSet === 'dark') {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }

        themeToggle.addEventListener('click', () => {
            let newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);

            // Update icon
            if (newTheme === 'dark') {
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            }
        });
    }

    // --- Active Navbar Link Logic ---
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link, .navbar-nav .dropdown-item');
    let currentPath = window.location.pathname.split("/").pop() || 'index.html';

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href').split("/").pop();
        if (linkPath === currentPath) {
            // Remove active from all first
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active to the current link
            link.classList.add('active');

            // If it's a dropdown item, also activate its parent dropdown toggle
            if (link.classList.contains('dropdown-item')) {
                const parentDropdown = link.closest('.nav-item.dropdown');
                if (parentDropdown) {
                    const toggleLink = parentDropdown.querySelector('.nav-link.dropdown-toggle');
                    if (toggleLink) {
                        toggleLink.classList.add('active');
                    }
                }
            }
        }
    });
     // Special case for index.html when path is empty
    if (currentPath === "" || currentPath === "index.html") {
        const homeLink = document.querySelector('.navbar-nav .nav-link[href="index.html"]');
        if (homeLink) homeLink.classList.add('active');
    }

    // --- Footer Year Logic ---
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});