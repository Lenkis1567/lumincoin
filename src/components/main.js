import {AuthUtils} from "../utils/auth-utils";


export class Main {
    constructor() {
        const authInfo = AuthUtils.getAuthInfo();
        if (!authInfo.accessToken){
            window.location.href = 'login'; 
        } 
    console.log('Dashboard')
    }
}