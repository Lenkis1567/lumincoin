import {AuthUtils} from "../../utils/auth-utils";
import {HttpUtils} from "../../utils/http-utils";
import {UrlManager} from "../../utils/url-manager";

export class EditExpensesCategory {
    constructor() {        
        const authInfo = AuthUtils.getAuthInfo();
            if (!authInfo.accessToken){
                window.location.href = 'login'; 
            } 

        this.id = UrlManager.getQueryParams().id;

        this.createCategoryButton = document.getElementById('expenses-category-edit-button');
        this.createCategoryInputElement = document.getElementById('expenses-category-name');
        this.createCategoryButton.addEventListener('click', this.editExpenceCategory.bind(this));
    
        this.init()
    }

        async init() {
            const categoryName = await this.getCategoryName(this.id); // ✅ await the async call
            console.log(categoryName, 'categoryName in init');
            if (categoryName) {
                this.createCategoryInputElement.value = categoryName;
            }
        }


    async getCategoryName(id) {
        const result = await HttpUtils.request('categories/expense/'+id, 'GET', true);    
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

    async editExpenceCategory() {
        if (this.validateForm()) {
            console.log(this.id, 'id in edit');

            let result = await HttpUtils.request('categories/expense/'+this.id , 'PUT', true, {
                title: this.createCategoryInputElement.value,

             });
            if (result.error ||!result.response){
                alert("Can't change category")
            } else {
                window.location.href='expenses-list'
            }
        }
    }
}