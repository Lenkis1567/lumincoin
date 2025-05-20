import {AuthUtils} from "../../utils/auth-utils";

export class ListExpensesCategory {
    constructor() {
        const authInfo = AuthUtils.getAuthInfo();
        if (!authInfo.accessToken){
            window.location.href = 'login'; 
        } 
        console.log('Category expenses list')
    }
}