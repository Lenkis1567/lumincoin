import {AuthUtils} from "../../utils/auth-utils";

export class EditIncomeExpense {
    constructor() {
        const authInfo = AuthUtils.getAuthInfo();
        if (!authInfo.accessToken){
            window.location.href = 'login'; 
        } 
    console.log('Income-Expense edit')
    }
}