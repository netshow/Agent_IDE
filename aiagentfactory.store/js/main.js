document.addEventListener('DOMContentLoaded', function () {
    const themeSwitch = document.getElementById('theme-switch-checkbox');
    const currentTheme = localStorage.getItem('theme');

    function setTheme(theme) {
        if (theme === 'dark') {
            document.body.classList.remove('light-mode');
            document.body.classList.add('dark-mode');
            if (themeSwitch) {
                themeSwitch.checked = true;
            }
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark-mode');
            document.body.classList.add('light-mode');
            if (themeSwitch) {
                themeSwitch.checked = false;
            }
            localStorage.setItem('theme', 'light');
        }
    }

    if (currentTheme) {
        setTheme(currentTheme);
    } else {
        // Default to light mode if no theme is set
        setTheme('light');
    }

    if (themeSwitch) {
        themeSwitch.addEventListener('change', function (event) {
            if (event.target.checked) {
                setTheme('dark');
            } else {
                setTheme('light');
            }
        });
    }

    // Set active class on nav link
    const currentPath = window.location.pathname.split("/").pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link, .navbar-nav .dropdown-item');
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath) {
            link.classList.add('active');
            // If it's a dropdown item, also activate the dropdown toggle
            const dropdownToggle = link.closest('.dropdown')?.querySelector('.dropdown-toggle');
            if (dropdownToggle) {
                dropdownToggle.classList.add('active');
            }
        }
    });
});