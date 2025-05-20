import {AuthUtils} from "./utils/auth-utils.js";
import {HttpUtils} from "./utils/http-utils.js";
import {Form} from "./components/auth/login.js";
import {SignIn} from "./components/auth/sign-in.js";
import {Logout} from "./components/auth/logout.js";


import {Main} from "./components/main.js";
import {CreateExpensesCategory} from "./components/expenses/expenses-create.js";
import {EditExpensesCategory} from "./components/expenses/expenses-edit.js";
import {ListExpensesCategory} from "./components/expenses/expenses-list.js";

import {CreateIncomesCategory} from "./components/incomes/incomes-create.js";
import {EditIncomesCategory} from "./components/incomes/incomes-edit.js";
import {ListIncomesCategory} from "./components/incomes/incomes-list.js";

import {CreateIncomeExpense} from "./components/incomes-expenses/income-expense-create.js";
import {EditIncomeExpense} from "./components/incomes-expenses/income-expense-edit.js";
import {ListIncomeExpense} from "./components/incomes-expenses/incomes-expenses-list.js";

export class Router {
    constructor() {
        this.contentElement = document.getElementById('content');
        this.stylesElement = document.getElementById('styles');
        this.titleElement = document.getElementById('page-title');
        this.profileElement = document.getElementById('toolbar-profile');
        this.balanceElement = document.getElementById('toolbar-balance-value');
        this.profileFullNameElement = document.getElementById('toolbar-profile-login');
        this.layoutElement = document.getElementById('layout');
        this.routes = [
            {
                route: '/',
                title: 'Main',
                template: './templates/index.html',
                styles: './styles/style.css',
                layout: true,
                load: () => new Main()
            },
            {
                route: '/login',
                title: 'Login',
                template: './templates/pages/auth/login.html',
                styles: './styles/auth.css',
                layout: false,
                load: () => new Form('login')
            },
            {
                route: '/sign-in',
                title: 'Sign in',
                template: './templates/pages/auth/sign-in.html',
                styles: './styles/auth.css',
                layout: false,
                load: () => new SignIn()
            },
            {
                route: '/logout',
                layout: false,
                load: () => new Logout()
            },
            {
                route: '/expenses-create',
                title: 'Create expenses category',
                template: './templates/pages/expenses/expenses-create.html',
                styles: './styles/style.css',
                layout: true,
                load: () => new CreateExpensesCategory()
            },
           
            {
                route: '/expenses-edit',
                title: 'Edit expenses category',
                template: './templates/pages/expenses/expenses-edit.html',
                styles: './styles/style.css',
                layout: true,
                load: () => new EditExpensesCategory()
            },
                        {
                route: '/expenses-list',
                title: 'List of expenses categories',
                template: './templates/pages/expenses/expenses-list.html',
                styles: './styles/style.css',
                layout: true,
                load: () => new ListExpensesCategory()
            },

            {
                route: '/incomes-create',
                title: 'Create incomes category',
                template: './templates/pages/incomes/incomes-create.html',
                styles: './styles/style.css',
                layout: true,
                load: () => new CreateIncomesCategory()
            },

            {
                route: '/incomes-edit',
                title: 'Edit incomes category',
                template: './templates/pages/incomes/incomes-edit.html',
                styles: './styles/style.css',
                layout: true,
                load: () => new EditIncomesCategory()
            },

            {
                route: '/incomes-list',
                title: 'List of incomes categories',
                template: './templates/pages/incomes/incomes-list.html',
                styles: './styles/style.css',
                layout: true,
                load: () => new ListIncomesCategory()
            },

            {
                route: '/income-expense-create',
                title: 'Create income or expense',
                template: './templates/pages/incomes-expenses/income-expense-create.html',
                styles: './styles/style.css',
                layout: true,
                load: () => new CreateIncomeExpense()
            },

            {
                route: '/income-expense-edit',
                title: 'Edit income or expense',
                template: './templates/pages/incomes-expenses/income-expense-edit.html',
                styles: './styles/style.css',
                layout: true,
                load: () => new EditIncomeExpense()
            },

            {
                route: '/incomes-expenses-list',
                title: 'List of incomes and expenses',
                template: './templates/pages/incomes-expenses/incomes-expenses-list.html',
                styles: './styles/style.css',
                layout: true,
                load: () => new ListIncomeExpense()
            },
        ]

 }

   async openRoute() {
        const urlRoute = window.location.pathname;

        const newRoute = this.routes.find(route => route.route === urlRoute);
        
        if (!newRoute) {
            history.replaceState(null, '', '/');
            return this.openRoute();
        }

        const html = await fetch(newRoute.template).then(res => res.text());
        this.stylesElement.setAttribute('href', newRoute.styles);
        document.title = newRoute.title;

        if (newRoute.layout) {
            if (this.titleElement) {
                this.titleElement.innerText = newRoute.title;
                this.layoutElement.style.display='flex';
                this.contentElement.innerHTML = html;
            }
        } else {
            document.body.innerHTML = html;
        }

        const authInfo = AuthUtils.getAuthInfo();
        let accessToken = authInfo.accessToken;
        const name = authInfo.userInfo?.name || null;
        const lastName = authInfo.userInfo?.lastName || null;

        if (authInfo && accessToken) {
            this.profileElement.style.display = 'flex';
            this.profileElement.style.flexDirection = 'column';
            this.profileFullNameElement.style.fontSize = '12px';
            this.profileFullNameElement.innerText = name +' '+lastName;

            const result = await HttpUtils.request('balance', 'GET',
                true);

            if (result&&result.response) {
                 const balance = result.response.balance;
                   console.log(result.response, 'balance res');
                if (balance){
                    this.balanceElement.innerText = balance+'$'
                }
            }
        } else {
            this.profileElement.style.display ='none';
        }
        newRoute.load();
        
    }
}