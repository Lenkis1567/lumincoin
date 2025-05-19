import { Router } from "./router.js";

class App {
    constructor() {
        this.router = new Router();
        window.addEventListener('DOMContentLoaded', () => {
            this.handleRouteChanging();

            // Add your toolbar dropdown behavior here
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

        window.addEventListener('popstate', this.handleRouteChanging.bind(this));
    }

    handleRouteChanging() {
        this.router.openRoute();
    }
}

(new App());