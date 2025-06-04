import {AuthUtils} from "../utils/auth-utils";
import {HttpUtils} from "../utils/http-utils";

export class Main {
    constructor() {
        const authInfo = AuthUtils.getAuthInfo();
        if (!authInfo.accessToken){
            window.location.href = 'login'; 
        } 
        this.incomeChart = null;
        this.expenseChart = null;
        this.paginationDates = document.querySelector('.pagination-dates');
        this.yearBtn = document.querySelector('[data-range="year"]');
        this.allBtn = document.querySelector('[data-range="all"]');
        this.startDateElement = document.getElementById('start-date');
        this.endDateElement = document.getElementById('end-date');

        this.init();
        this.bindEvents();
    }

    async init() {
        let startDate = '1900-01-01';
        let endDate = new Date();
        let operations = await this.getOperations(startDate, endDate );
        this.processAndRenderCharts(operations);
        this.allBtn.classList.add('active')
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

    renderScript(type, data) {
        const canvasId = type === 'income' ? 'incomeChart' : 'outcomeChart';
        const chartTitle = type === 'income' ? 'Доходы' : 'Расходы';
        const ctx = document.getElementById(canvasId).getContext('2d');

        if (type === 'income' && this.incomeChart) {
            this.incomeChart.destroy();
        }
        if (type === 'expense' && this.expenseChart) {
            this.expenseChart.destroy();
        }

        const labels = Object.keys(data);
        const amounts = Object.values(data);

        const newChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Доходы по категориям',
                    data: amounts,
                    backgroundColor: [
                        '#DC3545', '#0D6EFD', '#FFC107',
                        '#20C997', '#FD7E14', '#6F42C1',
                        '#198754', '#0dcaf0', '#6610f2'
                    ]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            boxWidth: 20,
                            padding: 10,
                            font: {
                                size: 14
                            }
                        }
                    },
                    title: {
                        display: true,
                        text: chartTitle,
                        font: {
                            size: 28
                        }
                    }
                }
            }
    });

    if (type === 'income') {
        this.incomeChart = newChart;
    } else {
        this.expenseChart = newChart;
    }
}


    processAndRenderCharts(operations) {
        const incomeData = {};
        const expenseData = {};

        for (const op of operations) {
            const category = op.category || 'Без категории';
            const target = op.type === 'income' ? incomeData : expenseData;

            if (!target[category]) {
                target[category] = 0;
            }
            target[category] += op.amount;
        }

        this.renderScript('income', incomeData);
        this.renderScript('expense', expenseData);
    }

    bindEvents() {
        document.querySelectorAll('.btn-pagination').forEach(button => {
            button.addEventListener('click', () => {
                const range = button.dataset.range;

                this.clearValidation(this.startDateElement, 'start-dateFeedback');
                this.clearValidation(this.endDateElement, 'end-dateFeedback');
                document.querySelectorAll('.btn-pagination').forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

            if (range === 'interval') {
                const isVisible = window.getComputedStyle(this.paginationDates).display !== 'none';
                console.log('Interval clicked. Currently visible:', isVisible);

                if (isVisible) {
                    this.paginationDates.style.display = 'none';
                    button.classList.remove('active');
                } else {
                    
                    this.paginationDates.style.display = 'flex';
                    button.classList.add('active');
                }

                return; 
                this.paginationDates.style.display = 'none'; 
            }

                const today = new Date();
                const todayStr = today.toISOString().split('T')[0];
                let startDate, endDate;

                if (range === 'today') {
                    startDate = endDate = todayStr;
                } else if (range === 'week') {
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
                }

                this.fetchAndRender(startDate, endDate);
            });
        });

        [this.startDateElement, this.endDateElement].forEach(input => {
            input.addEventListener('keydown', async (event) => {
                if (event.key === 'Enter') {
                    const isStartValid = this.validateDate(this.startDateElement, 'start-dateFeedback');
                    const isEndValid = this.validateDate(this.endDateElement, 'end-dateFeedback');

                    if (isStartValid && isEndValid) {
                        const startDate = this.startDateElement.value;
                        const endDate = this.endDateElement.value;
                        await this.fetchAndRender(startDate, endDate);
                    }
                }
            });
        });
    }

    async fetchAndRender(startDate, endDate) {
        const operations = await this.getOperations(startDate, endDate);
        this.processAndRenderCharts(operations);
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

    clearValidation(inputElement, feedbackId) {
        inputElement.classList.remove('is-invalid');
        document.getElementById(feedbackId).style.display = 'none';
    }
}
