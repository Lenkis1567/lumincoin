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
        const navLinks = document.querySelectorAll('.toolbar a.nav-link');

        navLinks.forEach((link) => {
            const href = link.getAttribute('href').replace(/^\/+/, '');
            if (href === cleanPath || (cleanPath === '' && href === 'index')) {
            link.classList.add('active');
            link.classList.remove('link-dark');
            } else {
            link.classList.remove('active');
            link.classList.add('link-dark');
            }
        });
    }
}

(new App());