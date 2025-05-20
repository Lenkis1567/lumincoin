import {AuthUtils} from "../../utils/auth-utils";

export class EditExpensesCategory {
    constructor() {        
        const authInfo = AuthUtils.getAuthInfo();
            if (!authInfo.accessToken){
                window.location.href = 'login'; 
            } 
        console.log('expenses category edit')
    }
}