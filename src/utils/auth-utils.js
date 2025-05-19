import config from "../../config/config.js";
export class AuthUtils {

    static setAuthInfo(item, value) {
        if (typeof value === 'object') {
            localStorage.setItem(item, JSON.stringify(value));
        } else {
            localStorage.setItem(item, value);
        }
    }

    static removeAuthInfo() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userInfo');
    }


    static getAuthInfo(key = null) {
        if (key && ['accessToken', 'refreshToken', 'userInfo'].includes(key)) {
            return localStorage.getItem(key)
        } else {
            return {
                'accessToken': localStorage.getItem('accessToken'),
                'refreshToken': localStorage.getItem('refreshToken'),
                'userInfo': JSON.parse(localStorage.getItem('userInfo') || 'null')
            }
        }

    }

     static async updateRefreshToken() {
        let result = false;
        const refreshToken = this.getAuthInfo('refreshToken');
        console.log(refreshToken, 'refresh')
        if (refreshToken) {

         const response = await fetch(config.api +'refresh', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json', 
                    },
                    body: JSON.stringify({'refreshToken': refreshToken})
            });
            if (response&&response.status ===200) {
                const tokens = await response.json();
                if (tokens && !tokens.error){
                    this.setAuthInfo('accessToken', tokens.accessToken);    
                    this.setAuthInfo('refreshToken', tokens.refreshToken);
                    result = true;
                }
            }
        }
        if (!result) {
            this.removeAuthInfo()
            console.log('remove')
        }
        return result
    }
}