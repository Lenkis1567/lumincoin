import {AuthUtils} from "../../utils/auth-utils";
import {HttpUtils} from "../../utils/http-utils";

export class ListIncomesCategory {
    constructor() {
        const authInfo = AuthUtils.getAuthInfo();
        if (!authInfo.accessToken){
            window.location.href = 'login'; 
        } 
        this.init();
        this.cardsContainerElement=document.getElementById('cards-income') 
        this.deleteConfirmButton = document.getElementById('delete-confirm');
    
        this.bindDeleteConfirm();
    }


    async init() {
        const data = await this.getIncomeCategories();
        console.log(data, 'data in init');
        this.categoriesRender(data.response)
    }
    async getIncomeCategories() {
            const result = await HttpUtils.request('categories/income', 'GET', true);
            if (!result||result.error||!result.response) {
                return 
            } else {
            return result   
            }
        }

    categoriesRender(categories) {
        this.cardsContainerElement.innerHTML = '';

        categories.forEach(category => {
            const card = document.createElement('div');
            card.className = 'card card-fin me-3';

            card.innerHTML = `
                <div class="card-title">${category.title}</div>
                <div class="card-buttons">
                    <a href="incomes-edit?id=${category.id}" class="btn btn-primary me-2">Редактировать</a>
                    <button class="btn btn-danger" data-id="${category.id}" data-bs-toggle="modal" data-bs-target="#modalDelete">Удалить</button>
                </div>
            `;

            const deleteButton = card.querySelector('button.btn-danger');
            deleteButton.addEventListener('click', () => {
                this.currentDeleteId = category.id;
            });

            this.cardsContainerElement.appendChild(card);
        });

        const cardAddCategory = document.createElement('a');
        cardAddCategory.href = 'incomes-create';
        cardAddCategory.id = 'add-income';

        cardAddCategory.innerHTML = `
            <div class="card d-flex card-fin me-3 text-center justify-center">
                <div class="card-fin-add">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.5469 6.08984V9.05664H0.902344V6.08984H14.5469ZM9.32422 0.511719V15.0039H6.13867V0.511719H9.32422Z" fill="#CED4DA"/>
                    </svg>
                </div>
            </div>
        `;
        this.cardsContainerElement.appendChild(cardAddCategory);
    }

    currentDeleteId = null;
    bindDeleteConfirm() {
        console.log(this.deleteConfirmButton);
        this.deleteConfirmButton.addEventListener('click', async () => {
            if (!this.currentDeleteId) return;

            const response = await HttpUtils.request(`categories/income/${this.currentDeleteId}`, 'DELETE', true);
            
            if (response && !response.error) {
                // Refresh the category list
                this.init();
            } else {
                console.log(response.error)
            }

            this.currentDeleteId = null; // clear stored id
            const modalElement = bootstrap.Modal.getInstance(document.getElementById('modalDelete'));
            modalElement.hide();
        });
    }

}