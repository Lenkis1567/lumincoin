import {HttpUtils} from '../../utils/http-utils.js';
import {AuthUtils} from '../../utils/auth-utils.js';

export class SignIn {
    constructor() {
        if(AuthUtils.getAuthInfo('accessToken')) {
            return window.location.href='/'
        }
        this.nameInputElement = document.getElementById('nameInput');
        this.emailInputElement = document.getElementById('mailInput');
        this.passwordInputElement = document.getElementById('passInput');
        this.passwordConfElement = document.getElementById('passConfirm');
        this.commonErrorElement = document.getElementById('common-error');
        document.getElementById('submitLogin').addEventListener('click', this.signin.bind(this));

    }

    validateForm() {
        let isValid = true;

        if (this.emailInputElement.value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.emailInputElement.value)) {
            
            this.emailInputElement.classList.remove('is-invalid'); 
        } else {
            this.emailInputElement.classList.add('is-invalid'); 
            isValid = false;
        }

        let nameInputRegex = /^[А-ЯЁ][а-яё]+(?: [А-ЯЁ][а-яё]+)+$/;
        if (this.nameInputElement.value && nameInputRegex.test(this.nameInputElement.value)) {
            this.nameInputElement.classList.remove('is-invalid');
        } else {
            this.nameInputElement.classList.add('is-invalid');
            isValid = false;
        }

        let passwordInputRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/; 
          if (this.passwordInputElement.value && passwordInputRegex.test(this.passwordInputElement.value)) {
            this.passwordInputElement.classList.remove('is-invalid');
        } else {
            this.passwordInputElement.classList.add('is-invalid');
            isValid = false;
        }

        if (this.passwordInputElement.value&&this.passwordInputElement.value===this.passwordConfElement.value) {
            this.passwordConfElement.classList.remove('is-invalid');
        } else {
            this.passwordConfElement.classList.add('is-invalid');
            isValid = false;
        }
         return isValid;
    }

    async signin(e) {
        e.preventDefault()
            if (this.validateForm()) {

                let body = {
                   email: this.emailInputElement.value, 
                   password:  this.passwordInputElement.value,
                   passwordRepeat: this.passwordConfElement.value,
                   name: this.nameInputElement.value.trim().split(' ')[0],
                   lastName: this.nameInputElement.value.trim().split(' ').slice(1).join(' '),

                }
                const result = await HttpUtils.request('signup', 'POST', false, body);

                if (
                    result.error ||
                    !result.response ||
                    !result.response.user ||
                    !result.response.user.id ||
                    !result.response.user.name ||
                    !result.response.user.lastName) {

                        this.commonErrorElement.style.display='block';
                        return;
                    } else {
                        this.commonErrorElement.style.display = 'none';
                        const result = await HttpUtils.request('login', 'POST', false, {
                        email: this.emailInputElement.value,
                        password:  this.passwordInputElement.value,
                        rememberMe: false
                    }); //need to add login after sign in
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
                            return;
                        } else {
                            this.commonErrorElement.style.display = 'none';

                            // Save to localStorage
                            AuthUtils.setAuthInfo('accessToken', result.response.tokens.accessToken);
                            AuthUtils.setAuthInfo('refreshToken', result.response.tokens.refreshToken);
                            AuthUtils.setAuthInfo('userInfo', result.response.user);
                            window.location.href = '/index.html'; 
                        }
                }

        }
    }
    
}