import {AuthUtils} from "../../utils/auth-utils";

export class ListIncomeExpense {
    constructor() {
        const authInfo = AuthUtils.getAuthInfo();
        if (!authInfo.accessToken){
            window.location.href = 'login'; 
        } 
    console.log('Incomes and Expenses list')
    }
}