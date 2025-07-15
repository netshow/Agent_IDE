(() => {
    'use strict'

    const getStoredTheme = () => localStorage.getItem('theme')
    const setStoredTheme = theme => localStorage.setItem('theme', theme)

    const getPreferredTheme = () => {
        const storedTheme = getStoredTheme()
        if (storedTheme) {
            return storedTheme
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }

    const setTheme = theme => {
        if (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.setAttribute('data-bs-theme', 'dark')
        } else {
            document.documentElement.setAttribute('data-bs-theme', theme)
        }
    }

    setTheme(getPreferredTheme())

    const showActiveTheme = (theme) => {
        const themeSwitcher = document.querySelector('#theme-toggler')
        if (!themeSwitcher) {
            return
        }
        
        const themeSwitcherIcon = document.querySelector('#theme-icon');
        const activeTheme = theme === 'auto' ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : theme

        if (activeTheme === 'dark') {
            themeSwitcherIcon.classList.remove('fa-sun');
            themeSwitcherIcon.classList.add('fa-moon');
        } else {
            themeSwitcherIcon.classList.remove('fa-moon');
            themeSwitcherIcon.classList.add('fa-sun');
        }
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        const storedTheme = getStoredTheme()
        if (storedTheme !== 'light' && storedTheme !== 'dark') {
            setTheme(getPreferredTheme())
        }
    })

    window.addEventListener('DOMContentLoaded', () => {
        showActiveTheme(getPreferredTheme())

        const themeToggler = document.getElementById('theme-toggler');
        if(themeToggler) {
            themeToggler.addEventListener('click', () => {
                const currentTheme = getStoredTheme() || getPreferredTheme();
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                setStoredTheme(newTheme);
                setTheme(newTheme);
                showActiveTheme(newTheme);
            });
        }
    })
})()