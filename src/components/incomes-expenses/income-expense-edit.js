import {AuthUtils} from "../../utils/auth-utils";
import {HttpUtils} from "../../utils/http-utils";
import {UrlManager} from "../../utils/url-manager";

export class EditIncomeExpense {
    constructor() {
        const authInfo = AuthUtils.getAuthInfo();
        if (!authInfo.accessToken){
            window.location.href = 'login'; 
        } 
        this.createFinanceButton = document.getElementById('income-expence-create-button');
        this.selectTypeElement = document.getElementById('income-expence-type');
        this.selectCategoryElement = document.getElementById('income-expence-category');
        this.inputAmountElement = document.getElementById('income-expence-amount');
        this.inputDateElement = document.getElementById('income-expence-date');
        this.inputCommentElement = document.getElementById('income-expence-comment');
        this.id = UrlManager.getQueryParams().id;

        this.init();

        this.selectTypeElement.addEventListener('change', async (event) => {
            const selectedType = event.target.value;
            const categories = await this.populateCategories(selectedType);
            this.fillCategorySelect(categories.response || []);
        });

            this.createFinanceButton.addEventListener('click', this.editFinance.bind(this));

    }

    async getInfo(id) {
        const result = await HttpUtils.request('operations/'+id, 'GET', true);    
        if (!result||result.error||!result.response||!result.response.id|| !result.response.amount ||!result.response.type ||!result.response.category ||!result.response.date) {
                return 
            } else {
                console.log(result.response)
                return result.response  
            }
    }

    async init() {
        const resp = await this.getInfo(this.id);
        if (resp) {
            this.populateForm(resp);
        }
        Inputmask("9999-99-99").mask(this.inputDateElement);
    }

    async populateForm(info) {
        this.populateSelectOptions(
            this.selectTypeElement,
            [
                { value: 'income', label: 'Доход' },
                { value: 'expense', label: 'Расход' }
            ],
            info.type
        );

        const categoryResult = await this.populateCategories(info.type);
    if (categoryResult && Array.isArray(categoryResult.response)) {
        this.fillCategorySelect(categoryResult.response);
        const selectedCategory = categoryResult.response.find(cat => cat.title === info.category);
        if (selectedCategory) {
            this.selectCategoryElement.value = selectedCategory.id;
}
    }
        this.inputAmountElement.value = info.amount;
        this.inputDateElement.value = info.date;
        this.inputCommentElement.value = info.comment;
    }


    populateSelectOptions(selectElement, options, selectedValue = '') {
        selectElement.innerHTML = '';

        const placeholderOption = document.createElement('option');
        placeholderOption.textContent = 'Выберите...';
        placeholderOption.disabled = true;
        placeholderOption.value = '';
        selectElement.appendChild(placeholderOption);

        options.forEach(opt => {
            const option = document.createElement('option');
            option.value = opt.value;
            option.textContent = opt.label;
            selectElement.appendChild(option);
        });

        selectElement.value = selectedValue || '';
    }

    async populateCategories(type){
        {
            const result = await HttpUtils.request('categories/'+type, 'GET', true);
            if (!result||result.error||!result.response) {
                return 
            } else {
            return result   
            }
        }
    }

    fillCategorySelect(categories) {
        this.selectCategoryElement.innerHTML = '';

        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.disabled = true;
        defaultOption.selected = true;
        defaultOption.textContent = 'Категория...';
        this.selectCategoryElement.appendChild(defaultOption);

        categories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat.id;
            option.textContent = cat.title;
            this.selectCategoryElement.appendChild(option);
        });
    }

    validateForm() {
        let isValid = true;

        if (this.inputCommentElement.value) {
            this.inputCommentElement.classList.remove('is-invalid'); 
        } else {
            this.inputCommentElement.classList.add('is-invalid'); 
            isValid = false;
        }

        if (this.inputAmountElement.value) {
            this.inputAmountElement.classList.remove('is-invalid'); 
        } else {
            this.inputAmountElement.classList.add('is-invalid'); 
            isValid = false;
        }
 
        if (this.inputDateElement.value&&this.validateDate(this.inputDateElement.value)) {
            this.inputDateElement.classList.remove('is-invalid'); 
        } else {
            this.inputDateElement.classList.add('is-invalid'); 
            isValid = false;
        }
        return isValid
    }

    validateDate(inputDate) {
        const dateStr = inputDate;

        const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
        if (!regex.test(dateStr)) {
            return false; 
        }
      
        let date = new Date(dateStr);
        if (isNaN(date.getTime())) {
            return false; 
        }
  
        const [year, month, day] = dateStr.split('-');
        if (date.getUTCFullYear() !== Number(year) ||
            (date.getUTCMonth() + 1) !== Number(month) ||
            date.getUTCDate() !== Number(day)) {
            return false; 
        }

    return true; 
    }
    async editFinance(e) {
         e.preventDefault();
        if (this.validateForm()) {
            console.log('send is ready');
            
            const body= {
                type: this.selectTypeElement.value,
                amount: parseFloat(this.inputAmountElement.value),
                date: this.inputDateElement.value, 
                comment: this.inputCommentElement.value,
                category_id: Number(this.selectCategoryElement.value)
             };

            console.log('amount:', body.amount, 'typeof:', typeof body.amount);
console.log('category_id:', body.category_id, 'typeof:', typeof body.category_id);
            let result = await HttpUtils.request('operations/'+this.id, 'PUT', true, body);
            if (result.error ||!result.response){
                alert("can't create new line")
            } else {
                window.location.href = 'incomes-expenses-list'
            }
        }
    }

}