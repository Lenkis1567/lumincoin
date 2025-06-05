
import {AuthUtils} from "../../utils/auth-utils";
import {HttpUtils} from "../../utils/http-utils";

export class CreateIncomeExpense {
    constructor() {
        const authInfo = AuthUtils.getAuthInfo();
        if (!authInfo.accessToken){
            window.location.href = 'login'; 
        } 

        this.createFinanceButton = document.getElementById('income-expence-create-button');
        this.selectTypeElement = document.getElementById('income-expence-select-type');
        this.selectCategoryElement = document.getElementById('income-expence-select-category');
        this.inputAmountElement = document.getElementById('income-expence-input-amount');
        this.inputDateElement = document.getElementById('income-expence-input-date');
        this.inputCommentElement = document.getElementById('income-expence-input-comment');
        
        Inputmask("9999-99-99").mask(this.inputDateElement);

        this.selectTypeElement.addEventListener('change', async (event) => {
            const selectedType = event.target.value;
            const categories = await this.populateCategories(selectedType);
            this.fillCategorySelect(categories.response || []);
        });


    this.createFinanceButton.addEventListener('click', this.createNewFinance.bind(this));
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
        // Clear previous options
        this.selectCategoryElement.innerHTML = '';

        //  default option
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
        if (this.selectTypeElement.value) {
            this.selectTypeElement.classList.remove('is-invalid'); 
        } else {
            this.selectTypeElement.classList.add('is-invalid'); 
            isValid = false;
        }

        if (this.selectCategoryElement.value) {
            this.selectCategoryElement.classList.remove('is-invalid'); 
        } else {
            this.selectCategoryElement.classList.add('is-invalid'); 
            isValid = false;
        }

        if (this.inputCommentElement.value) {
            this.inputCommentElement.classList.remove('is-invalid'); 
        } else {
            this.inputCommentElement.classList.add('is-invalid'); 
            isValid = false;
        }

        if (this.inputAmountElement.value&&this.inputAmountElement.value>=0) {
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

        // Проверяем формат с помощью регулярного выражения
        const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
        if (!regex.test(dateStr)) {
            return false; // Формат не подходит
        }

        
        let date = new Date(dateStr);
        if (isNaN(date.getTime())) {
            return false; // Некорректная дата
        }

    
        const [year, month, day] = dateStr.split('-');
        if (date.getUTCFullYear() !== Number(year) ||
            (date.getUTCMonth() + 1) !== Number(month) ||
            date.getUTCDate() !== Number(day)) {
            return false; // Дата не существует в календаре
        }

    return true; // Дата валидна
    }

    async createNewFinance(e) {
         e.preventDefault();
        if (this.validateForm()) {

            const body= {
                type: this.selectTypeElement.value,
                amount: parseFloat(this.inputAmountElement.value),
                date: this.inputDateElement.value, 
                comment: this.inputCommentElement.value,
                category_id: Number(this.selectCategoryElement.value)
             };
            let result = await HttpUtils.request('operations', 'POST', true, body);
            if (result.error ||!result.response){
                alert("can't create new line")
            } else {
                window.location.href = 'incomes-expenses-list'
            }
        }
    }
}