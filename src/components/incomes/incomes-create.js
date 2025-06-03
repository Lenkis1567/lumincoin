import {AuthUtils} from "../../utils/auth-utils";
import {HttpUtils} from "../../utils/http-utils";

export class CreateIncomesCategory {
    constructor() {
        const authInfo = AuthUtils.getAuthInfo();
        if (!authInfo.accessToken){
            window.location.href = 'login'; 
        } 
        this.incomeCategory = '';

        this.createCategoryButton = document.getElementById('incomes-category-create-button');
        this.createCategoryInputElement = document.getElementById('incomes-category-name')
        this.createCategoryButton.addEventListener('click', this.createIncomeCategory.bind(this));
    }

    validateForm() {
        let isValid = true;
        if (this.createCategoryInputElement.value) {
            
            this.createCategoryInputElement.classList.remove('is-invalid'); 
        } else {
            this.createCategoryInputElement.classList.add('is-invalid'); 
            isValid = false;
        }
        return isValid
    }

    async createIncomeCategory() {
        if (this.validateForm()) {
            let result = await HttpUtils.request('categories/income', 'POST', true, {
                title: this.createCategoryInputElement.value,

             });
            if (result.error ||!result.response){
                alert("can't create category")
            } else {
                window.location.href='incomes-list'
            }
        }
    }
}