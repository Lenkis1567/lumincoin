import {AuthUtils} from "../../utils/auth-utils";
import {HttpUtils} from "../../utils/http-utils";

export class ListIncomeExpense {
    constructor() {
        const authInfo = AuthUtils.getAuthInfo();
        if (!authInfo.accessToken){
            window.location.href = 'login'; 
        } 
        
        this.yearBtn = document.querySelector('[data-range="year"]');
        this.allBtn = document.querySelector('[data-range="all"]');
        this.deleteConfirmButton = document.getElementById('delete-confirm');
        this.modalDelete = new bootstrap.Modal(document.getElementById('modalDelete'));
        this.startDateElement = document.getElementById('start-date');
        this.endDateElement = document.getElementById('end-date');

         this.bindDeleteButtons();
         this.bindDeleteConfirm();

        this.tableContainerElement = document.getElementById('responsive-table-wrapper')
        this.init();
    }


    async getAllOperations() {
        const dayToday = new Date().toISOString().split('T')[0];
        const result = await HttpUtils.request('operations?period=interval&dateFrom=1930-01-01&dateTo='+dayToday, 'GET', true);
        if (!result||result.error||!result.response) {
            return []
        } else {
        return result.response
        }

    }

    bindEvents() {
        document.querySelectorAll('.btn-pagination').forEach(button => {
            button.addEventListener('click', async () => {
                const range = button.dataset.range;

                this.clearValidation(this.startDateElement, 'start-dateFeedback');
                this.clearValidation(this.endDateElement, 'end-dateFeedback');

                document.querySelectorAll('.btn-pagination').forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                let startDate, endDate;
                const today = new Date();
                const todayStr = today.toISOString().split('T')[0];

                if (range === 'today') {
                    startDate = endDate = todayStr;
                }  else if (range === 'week') {
                    const weekAgo = new Date(today);
                    weekAgo.setDate(today.getDate() - 7);
                    startDate = weekAgo.toISOString().split('T')[0];
                    endDate = todayStr;
                } else if (range === 'month') {
                    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
                    startDate = firstDay.toISOString().split('T')[0];
                    endDate = todayStr;
                } else if (range === 'year') {
                    const firstDay = new Date(today.getFullYear(), 0, 1);
                    startDate = firstDay.toISOString().split('T')[0];
                    endDate = todayStr;
                } else if (range === 'all') {
                    startDate = '1900-01-01';
                    endDate = todayStr;
                } else if (range==='interval')  {
                    const isStartValid = this.validateDate(this.startDateElement, 'start-dateFeedback');
                    const isEndValid = this.validateDate(this.endDateElement, 'end-dateFeedback');

                    if (isStartValid && isEndValid) {
                        startDate = this.startDateElement.value;
                        endDate = this.endDateElement.value;
                    } else {
                        return; // Don't continue if dates are invalid
                    }
                }

                const operations = await this.getOperations(startDate, endDate);
                const sortedData = operations.sort((a, b) => {
                    return new Date(a.date) - new Date(b.date);
                });
                this.populateTable(sortedData);
            });
        });
    }

    bindDeleteButtons() {
        document.addEventListener('click', (event) => {
        if (event.target.closest('#income-delete')) {
            const button = event.target.closest('#income-delete');
            const operationId = button.getAttribute('data-id');
            this.currentDeleteId = operationId;
        }
    });
  }

    bindDeleteConfirm() {
        this.deleteConfirmButton.addEventListener('click', async () => {
        if (!this.currentDeleteId) return;

        const response = await HttpUtils.request(`operations/${this.currentDeleteId}`, 'DELETE', true);
        if (response && !response.error) {
            this.modalDelete.hide(); // Close modal
            this.init(); // Refresh the data
        } else {
            console.error(response.error || 'Ошибка при удалении');
        }
        });
  }

    attachDeleteHandler(buttonElement, operationId) {
        buttonElement.addEventListener('click', () => {
        this.currentDeleteId = operationId;
        this.modalDelete.show(); // Show confirmation modal
        });
  }

    async getOperations(start, end) {
        const result = await HttpUtils.request(
            `operations?period=interval&dateFrom=${start}&dateTo=${end}`,
            'GET',
            true
        );
        if (!result || result.error || !result.response) {
            return [];
        } else {
            return result.response;
        }
    }

    async init() {
        this.bindEvents();

        const today = new Date();
        const end = today.toISOString().split('T')[0]; 
        this.allBtn.classList.add('active');
        const data = await this.getOperations('1900-01-01', end);
        const sortedData = data.sort((a, b) => {
            return new Date(a.date) - new Date(b.date);
        });
        this.populateTable(sortedData)
    }

    validateDate(inputElement, feedbackId) {
        const dateStr = inputElement.value;
        const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

        const isValid = regex.test(dateStr);
        if (isValid) {
            inputElement.classList.remove('is-invalid');
            document.getElementById(feedbackId).style.display = 'none';
        } else {
            inputElement.classList.add('is-invalid');
            document.getElementById(feedbackId).style.display = 'block';
        }
        return isValid;
    }

    async populateTable(data) {
        this.tableContainerElement.innerHTML='';
        let tableElement = document.createElement('table');

        tableElement.classList.add('table');
        tableElement.id="incomes-expenced-dashboard";
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        const tbody = document.createElement('tbody');
        const headers = ['№ операции', 'Тип', 'Категория', 'Сумма', 'Дата', 'Комментарий', ''];
        headers.forEach(text => {
            const th = document.createElement('th');
            th.textContent = text;
            headerRow.appendChild(th);
        });

        thead.appendChild(headerRow);
        tableElement.appendChild(thead);
        data.forEach((operation) => {
            const tr = document.createElement('tr');
            const idTd = document.createElement('td');
            idTd.textContent = operation.id;

            const typeTd = document.createElement('td');
            typeTd.textContent = operation.type === 'income' ? 'доход' : 'расход';
            typeTd.style.color = operation.type === 'income' ? 'green' : 'red';

            const categoryTd = document.createElement('td');
            categoryTd.textContent = operation.category || 'Без категории';

            const amountTd = document.createElement('td');
            amountTd.textContent = `${operation.amount}$`;

            const dateTd = document.createElement('td');
            const formattedDate = new Date(operation.date).toLocaleDateString('ru-RU');
            dateTd.textContent = formattedDate;

            const commentTd = document.createElement('td');
            commentTd.textContent = operation.comment || '';

            const actionTd = document.createElement('td');
            actionTd.innerHTML = `
                <button class="me-2" id="income-delete" data-bs-toggle="modal" data-bs-target="#modalDelete" data-id="${operation.id}">
                    <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.5 5.5C4.77614 5.5 5 5.72386 5 6V12C5 12.2761 4.77614 12.5 4.5 12.5C4.22386 12.5 4 12.2761 4 12V6C4 5.72386 4.22386 5.5 4.5 5.5Z" fill="black"/>
                        <path d="M7 5.5C7.27614 5.5 7.5 5.72386 7.5 6V12C7.5 12.2761 7.27614 12.5 7 12.5C6.72386 12.5 6.5 12.2761 6.5 12V6C6.5 5.72386 6.72386 5.5 7 5.5Z" fill="black"/>
                        <path d="M10 6C10 5.72386 9.77614 5.5 9.5 5.5C9.22386 5.5 9 5.72386 9 6V12C9 12.2761 9.22386 12.5 9.5 12.5C9.77614 12.5 10 12.2761 10 12V6Z" fill="black"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M13.5 3C13.5 3.55228 13.0523 4 12.5 4H12V13C12 14.1046 11.1046 15 10 15H4C2.89543 15 2 14.1046 2 13V4H1.5C0.947715 4 0.5 3.55228 0.5 3V2C0.5 1.44772 0.947715 1 1.5 1H5C5 0.447715 5.44772 0 6 0H8C8.55229 0 9 0.447715 9 1H12.5C13.0523 1 13.5 1.44772 13.5 2V3ZM3.11803 4L3 4.05902V13C3 13.5523 3.44772 14 4 14H10C10.5523 14 11 13.5523 11 13V4.05902L10.882 4H3.11803ZM1.5 3V2H12.5V3H1.5Z" fill="black"/>
                    </svg>
                </button>
                <a href="income-expense-edit?id=${operation.id}" title="Редактировать" id="edit-income-link">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.1465 0.146447C12.3417 -0.0488155 12.6583 -0.0488155 12.8536 0.146447L15.8536 3.14645C16.0488 3.34171 16.0488 3.65829 15.8536 3.85355L5.85357 13.8536C5.80569 13.9014 5.74858 13.9391 5.68571 13.9642L0.68571 15.9642C0.500001 16.0385 0.287892 15.995 0.146461 15.8536C0.00502989 15.7121 -0.0385071 15.5 0.0357762 15.3143L2.03578 10.3143C2.06092 10.2514 2.09858 10.1943 2.14646 10.1464L12.1465 0.146447ZM11.2071 2.5L13.5 4.79289L14.7929 3.5L12.5 1.20711L11.2071 2.5ZM12.7929 5.5L10.5 3.20711L4.00001 9.70711V10H4.50001C4.77616 10 5.00001 10.2239 5.00001 10.5V11H5.50001C5.77616 11 6.00001 11.2239 6.00001 11.5V12H6.29291L12.7929 5.5ZM3.03167 10.6755L2.92614 10.781L1.39754 14.6025L5.21903 13.0739L5.32456 12.9683C5.13496 12.8973 5.00001 12.7144 5.00001 12.5V12H4.50001C4.22387 12 4.00001 11.7761 4.00001 11.5V11H3.50001C3.28561 11 3.10272 10.865 3.03167 10.6755Z" fill="black"/>
                    </svg>
                </a>
            `;
            tr.appendChild(idTd);
            tr.appendChild(typeTd);
            tr.appendChild(categoryTd);
            tr.appendChild(amountTd);
            tr.appendChild(dateTd);
            tr.appendChild(commentTd);
            tr.appendChild(actionTd);
            tbody.appendChild(tr);
        });

        tableElement.appendChild(tbody);
        this.tableContainerElement.appendChild(tableElement)
    }

        clearValidation(inputElement, feedbackId) {
            inputElement.classList.remove('is-invalid');
            document.getElementById(feedbackId).style.display = 'none';
        }

}