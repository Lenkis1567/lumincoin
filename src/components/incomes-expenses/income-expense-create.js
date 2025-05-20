
import {AuthUtils} from "../../utils/auth-utils";

export class CreateIncomeExpense {
    constructor() {
        const authInfo = AuthUtils.getAuthInfo();
        if (!authInfo.accessToken){
            window.location.href = 'login'; 
        } 
    console.log('Income-Expense create')
    }
}