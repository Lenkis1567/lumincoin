import config from "../../config/config.js"
import { AuthUtils } from "./auth-utils.js";

export class HttpUtils {
    static async request(url, method = 'GET', useAuth = true, body = null) {
        const result = {
            error: false,
            response: null
        };

        const params = {
            method: method,
            headers: {
                 'Content-type': 'application/json',
                 'Accept': 'application/json', 
        }};
        let accessToken = null;

        if (useAuth){
            accessToken = AuthUtils.getAuthInfo('accessToken');
            if (accessToken) {
                params.headers['x-auth-token'] = accessToken;
            }  
        }

        if (body){
            params.body = JSON.stringify(body)
        }

        let response = null; 
        try {
            response = await fetch(config.api+url, params);
            result.response = await response.json();
        } catch (e) {
            result.error = true;
            return result
        }
        
        if (response.status < 200 || response.status >= 300) {
            result.error = true;
            if (useAuth && response.status === 401) {
                if (!accessToken) {
                    result.redirect = 'login' //no token
                } else {
                 //old token   
                  const updateTokenResult = await AuthUtils.updateRefreshToken();
                  if (updateTokenResult)  {
                    return this.request(url, method, useAuth, body) //fetch again
                  } else {
                    AuthUtils.removeAuthInfo()
                    result.redirect = 'login'
                  }
                  
                }
             }
        }
        console.log(result, 'result in utils')
        return result
    }
}
