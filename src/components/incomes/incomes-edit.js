import {AuthUtils} from "../../utils/auth-utils";

export class EditIncomesCategory {
    constructor() {
        const authInfo = AuthUtils.getAuthInfo();
        if (!authInfo.accessToken){
            window.location.href = 'login'; 
        } 
        this.incomeCategory = '';
        console.log('incomes edit')
    }
    
}