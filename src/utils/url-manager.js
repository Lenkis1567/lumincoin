export class UrlManager {
    static getQueryParams() {
        const search = window.location.search; 
        const params = {};

        const urlSearchParams = new URLSearchParams(search);
        for (const [key, value] of urlSearchParams.entries()) {
            params[key] = value;
        }

        return params;
    }
}