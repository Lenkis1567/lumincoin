import {AuthUtils} from "../../utils/auth-utils";
import {HttpUtils} from "../../utils/http-utils";
import {UrlManager} from "../../utils/url-manager";


export class EditIncomesCategory {
    constructor() {        
        const authInfo = AuthUtils.getAuthInfo();
            if (!authInfo.accessToken){
                window.location.href = 'login'; 
            } 

        this.id = UrlManager.getQueryParams().id;

        this.createCategoryButton = document.getElementById('incomes-category-edit-button');
        this.createCategoryInputElement = document.getElementById('incomes-category-name');
        this.createCategoryButton.addEventListener('click', this.editIncomeCategory.bind(this));
    
        this.init()
    }

        async init() {
            const categoryName = await this.getCategoryName(this.id); 
            if (categoryName) {
                this.createCategoryInputElement.value = categoryName;
            }
        }


    async getCategoryName(id) {
        const result = await HttpUtils.request('categories/income/'+id, 'GET', true);    
        if (!result||result.error||!result.response||!result.response.title) {
                return 
            } else {
                return result.response.title   
            }
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

    async editIncomeCategory() {
        if (this.validateForm()) {

            let result = await HttpUtils.request('categories/income/'+this.id , 'PUT', true, {
                title: this.createCategoryInputElement.value,

             });
            if (result.error ||!result.response){
                alert("Can't change category")
            } else {
                window.location.href='incomes-list'
            }
        }
    }
}