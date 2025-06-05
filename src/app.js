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

        // clean all active
        navLinks.forEach((link) => {
            link.classList.remove('active');
            if (link.classList.contains('nav-link')) {
                link.classList.add('link-dark');
            }
        });

        let matchedLink = null;

        navLinks.forEach((link) => {
            const href = link.getAttribute('href').replace(/^\/+/, '');

            // exact route
            if (href === cleanPath) {
                matchedLink = link;
                return;
            }

            // for edit
            if (!matchedLink) {
                const isExpensesEdit = cleanPath.startsWith('expenses-edit') && href === 'expenses-list';
                const isIncomesEdit = cleanPath.startsWith('incomes-edit') && href === 'incomes-list';
                const isIncomeExpensePage = cleanPath.startsWith('income-expense') && href === 'incomes-expenses-list';

                if (isExpensesEdit || isIncomesEdit || isIncomeExpensePage) {
                    matchedLink = link;
                }
            }
        });

        // active apply
        if (matchedLink) {
            matchedLink.classList.add('active');
            matchedLink.classList.remove('link-dark');

            const dropdown = matchedLink.closest('.dropdown');
            if (dropdown) {
                const toggle = dropdown.querySelector('[data-bs-toggle="dropdown"]');
                const dropdownInstance = bootstrap.Dropdown.getOrCreateInstance(toggle);
                dropdownInstance.show();

                const svg = toggle.querySelector('svg');
                if (svg) svg.style.transform = 'rotate(90deg)';
            }
        }
    }


}

(new App());