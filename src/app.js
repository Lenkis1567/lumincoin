import { Router } from "./router.js";

class App {
    constructor() {
        this.router = new Router();
        
        window.addEventListener('DOMContentLoaded', () => {
            this.handleRouteChanging();

            document.querySelectorAll('.nav-item.dropdown').forEach(item => {
                item.addEventListener('show.bs.dropdown', () => {
                    const svg = item.querySelector('svg');
                    if (svg) svg.style.transform = 'rotate(90deg)';
                });
                item.addEventListener('hide.bs.dropdown', () => {
                    const svg = item.querySelector('svg');
                    if (svg) svg.style.transform = 'rotate(0deg)';
                });
            });
        });

        document.addEventListener('DOMContentLoaded', function () {
          const toggleBtn = document.getElementById('sidebarToggle');
          const toolbar = document.querySelector('.toolbar');
      
          toggleBtn.addEventListener('click', function () {
            toolbar.classList.toggle('show');
          });

        const closeBtn = document.getElementById('sidebarClose');
        closeBtn.addEventListener('click', function () {
        toolbar.classList.remove('show');

        });
    })

        window.addEventListener('popstate', this.handleRouteChanging.bind(this));
        
    }

    
    handleRouteChanging() {
        const currentPath = window.location.pathname;
        this.router.openRoute();
        this.highlightActiveNav(currentPath);
    }

   highlightActiveNav(currentPath) {
    const cleanPath = currentPath.replace(/^\/+/, '');
    const navLinks = document.querySelectorAll('.toolbar a.nav-link, .dropdown-menu .dropdown-item');

    navLinks.forEach((link) => {
        const href = link.getAttribute('href').replace(/^\/+/, '');
        if (href === cleanPath) {
            link.classList.add('active');
            link.classList.remove('link-dark');

            // Если это dropdown-item, открыть родительский dropdown
            const dropdown = link.closest('.dropdown');
            if (dropdown) {
                const toggle = dropdown.querySelector('[data-bs-toggle="dropdown"]');
                const dropdownInstance = bootstrap.Dropdown.getOrCreateInstance(toggle);
                dropdownInstance.show();

                // Дополнительно вращаем SVG
                const svg = toggle.querySelector('svg');
                if (svg) svg.style.transform = 'rotate(90deg)';
            }

        } else {
            link.classList.remove('active');
            if (link.classList.contains('nav-link')) {
                link.classList.add('link-dark');
            }
        }
    });
}
}

(new App());