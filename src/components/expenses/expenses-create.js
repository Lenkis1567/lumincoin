import {AuthUtils} from "../../utils/auth-utils";
import {HttpUtils} from "../../utils/http-utils";

export class CreateExpensesCategory {
    constructor() {
        const authInfo = AuthUtils.getAuthInfo();
        if (!authInfo.accessToken){
            window.location.href = 'login'; 
        } 

        this.createCategoryButton = document.getElementById('expenses-category-create-button');
        console.log(this.createCategoryButton);
        this.createCategoryInputElement = document.getElementById('expenses-category-name')
        this.createCategoryButton.addEventListener('click', this.createExpenceCategory.bind(this));
    }

    validateForm() {
        let isValid = true;
        if (this.createCategoryInputElement.value) {
            
            this.createCategoryInputElement.classList.remove('is-invalid'); 
        } else {
            this.createCategoryInputElement.classList.add('is-invalid'); 
            isValid = false;
        }

    }

    async createExpenceCategory() {
        if (this.validateForm) {
            console.log(this.createCategoryInputElement.value);
            let result = await HttpUtils.request('categories/expense', 'POST', true, {
                title: this.createCategoryInputElement.value,

             });
            if (result.error ||!result.response){
                alert("Can't create category, check the existing")
            } else {
                window.location.href='expenses-list'
            }
        }
    }
}