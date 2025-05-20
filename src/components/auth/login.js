import {HttpUtils} from '../../utils/http-utils.js';
import {AuthUtils} from '../../utils/auth-utils.js';

export class Form {
    constructor() {
        this.emailInputElement = document.getElementById('mailInput');
        if(AuthUtils.getAuthInfo('accessToken')) {
            return window.location.href='/'
        }

        this.passwordInputElement = document.getElementById('passInput');
        this.rememberMeElement = document.getElementById('rememberme');
        this.commonErrorElement = document.getElementById('common-error');
        document.getElementById('submitLogin').addEventListener('click', this.login.bind(this));
    }

    validateForm() {
        let isValid = true;
        if (this.emailInputElement.value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.emailInputElement.value)) {
            
            this.emailInputElement.classList.remove('is-invalid'); 
        } else {
            this.emailInputElement.classList.add('is-invalid'); 
            isValid = false;
        }
          if (this.passwordInputElement.value) {
            this.passwordInputElement.classList.remove('is-invalid');
        } else {
            this.passwordInputElement.classList.add('is-invalid');
            isValid = false;
        }

         return isValid;
    }

        async login(e) {
            e.preventDefault();

            if (this.validateForm()) {
                const result = await HttpUtils.request('login', 'POST', false, {
                    email: this.emailInputElement.value,
                    password:  this.passwordInputElement.value,
                    rememberMe: this.rememberMeElement.checked
                });

            if (
                result.error ||
                !result.response ||
                !result.response.tokens ||
                !result.response.tokens.accessToken ||
                !result.response.tokens.refreshToken ||
                !result.response.user ||
                !result.response.user.id ||
                !result.response.user.name ||
                !result.response.user.lastName) {
                    this.commonErrorElement.style.display='block';
                    return;
                } else {
                    this.commonErrorElement.style.display = 'none';
                    // Save to localStorage

                    AuthUtils.setAuthInfo('accessToken', result.response.tokens.accessToken);
                    AuthUtils.setAuthInfo('refreshToken', result.response.tokens.refreshToken);
                    AuthUtils.setAuthInfo('userInfo', result.response.user);
                    window.location.href = 'index'; 
                }

            }
        }
}