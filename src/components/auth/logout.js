import {AuthUtils} from '../../utils/auth-utils.js';
import {HttpUtils} from '../../utils/http-utils.js';
export class Logout {

    constructor() {
        console.log('Logout');


        if(!AuthUtils.getAuthInfo(AuthUtils.accessTokenKey) || !AuthUtils.getAuthInfo(AuthUtils.refreshTokenKey)) {
            window.location.href = 'login'; 
        }

        this.logout().then();
    }

    async logout() {

            await HttpUtils.request('/logout', 'POST', false, {
                refreshToken: localStorage.getItem('refreshToken')
            });

            AuthUtils.removeAuthInfo()
        
             window.location.href = 'login'; 
    }
}