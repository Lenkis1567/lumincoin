/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _router_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./router.js */ \"./src/router.js\");\n\r\n\r\nclass App {\r\n    constructor() {\r\n        this.router = new _router_js__WEBPACK_IMPORTED_MODULE_0__.Router();\r\n        window.addEventListener('DOMContentLoaded', () => {\r\n            this.handleRouteChanging();\r\n\r\n            // Add your toolbar dropdown behavior here\r\n            document.querySelectorAll('.nav-item.dropdown').forEach(item => {\r\n                item.addEventListener('show.bs.dropdown', () => {\r\n                    const svg = item.querySelector('svg');\r\n                    if (svg) svg.style.transform = 'rotate(90deg)';\r\n                });\r\n                item.addEventListener('hide.bs.dropdown', () => {\r\n                    const svg = item.querySelector('svg');\r\n                    if (svg) svg.style.transform = 'rotate(0deg)';\r\n                });\r\n            });\r\n        });\r\n\r\n        window.addEventListener('popstate', this.handleRouteChanging.bind(this));\r\n    }\r\n\r\n    handleRouteChanging() {\r\n        this.router.openRoute();\r\n    }\r\n}\r\n\r\n(new App());\n\n//# sourceURL=webpack://frontend/./src/app.js?");

/***/ }),

/***/ "./src/components/incomes-create.js":
/*!******************************************!*\
  !*** ./src/components/incomes-create.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   IncomesCreate: () => (/* binding */ IncomesCreate)\n/* harmony export */ });\nclass IncomesCreate {\r\n    constructor() {\r\n        this.incomeCategory = '';\r\n        console.log('incomesCreate')\r\n    }\r\n    \r\n}\n\n//# sourceURL=webpack://frontend/./src/components/incomes-create.js?");

/***/ }),

/***/ "./src/components/login.js":
/*!*********************************!*\
  !*** ./src/components/login.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Form: () => (/* binding */ Form)\n/* harmony export */ });\nclass Form {\r\n    constructor() {\r\n        this.emailInputElement = document.getElementById('mailInput');\r\n        console.log('login');\r\n    }\r\n    \r\n}\n\n//# sourceURL=webpack://frontend/./src/components/login.js?");

/***/ }),

/***/ "./src/components/sign-in.js":
/*!***********************************!*\
  !*** ./src/components/sign-in.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   SignIn: () => (/* binding */ SignIn)\n/* harmony export */ });\nclass SignIn {\r\n    constructor() {\r\n        this.emailInputElement = document.getElementById('mailInput');\r\n        console.log('signin');\r\n    }\r\n    \r\n}\n\n//# sourceURL=webpack://frontend/./src/components/sign-in.js?");

/***/ }),

/***/ "./src/router.js":
/*!***********************!*\
  !*** ./src/router.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Router: () => (/* binding */ Router)\n/* harmony export */ });\n/* harmony import */ var _components_incomes_create_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/incomes-create.js */ \"./src/components/incomes-create.js\");\n/* harmony import */ var _components_login_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/login.js */ \"./src/components/login.js\");\n/* harmony import */ var _components_sign_in_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/sign-in.js */ \"./src/components/sign-in.js\");\n\r\n\r\n\r\n\r\n\r\n\r\nclass Router {\r\n    constructor() {\r\n        this.contentElement = document.getElementById('content');\r\n        this.stylesElement = document.getElementById('styles');\r\n        this.titleElement = document.getElementById('page-title');\r\n        this.balanceElement = document.getElementById('toolbar-balance-value');\r\n        this.profileFullNameElement = document.getElementById('toolbar-profile-login');\r\n        this.routes=[\r\n                      {\r\n                route: '/',\r\n                title: 'Main',\r\n                template: './templates/index.html',\r\n                styles: './styles/style.css',\r\n                layout: true,\r\n                load: () => {}\r\n            },\r\n            {\r\n                route: '/login',\r\n                title: 'Login',\r\n                template: './templates/pages/auth/login.html',\r\n                styles: './styles/form.css',\r\n                layout: false,\r\n                load: () => new _components_login_js__WEBPACK_IMPORTED_MODULE_1__.Form('login')\r\n            },\r\n                        {\r\n                route: '/sign-in',\r\n                title: 'Login',\r\n                template: './templates/pages/auth/sign-in.html',\r\n                styles: './styles/form.css',\r\n                layout: false,\r\n                load: () => new _components_sign_in_js__WEBPACK_IMPORTED_MODULE_2__.SignIn('sign-in')\r\n            },\r\n        ]\r\n\r\n }\r\n\r\n   async openRoute() {\r\n        const urlRoute = window.location.pathname;\r\n\r\n        const newRoute = this.routes.find(route => route.route === urlRoute);\r\n        \r\n        if (!newRoute) {\r\n            // Redirect to root\r\n            history.replaceState(null, '', '/');\r\n            return this.openRoute();\r\n        }\r\n\r\n        const html = await fetch(newRoute.template).then(res => res.text());\r\n\r\n\r\n\r\n        this.stylesElement.setAttribute('href', newRoute.styles);\r\n        document.title = newRoute.title;\r\n\r\n        if (newRoute.layout) {\r\n            if (this.titleElement) {\r\n                this.titleElement.innerText = newRoute.title;\r\n            }\r\n        } else {\r\n            // Replace whole body\r\n            document.body.innerHTML = html;\r\n        }\r\n\r\n\r\n\r\n        // const userInfo = Auth.getUserInfo();\r\n        // const accessToken = localStorage.getItem(Auth.accessTokenKey);\r\n        // if (userInfo && accessToken) {\r\n        //     this.profileElement.style.display = 'flex';\r\n        //     this.profileFullNameElement.innerText = userInfo.fullName;\r\n        // } else {\r\n        //     this.profileElement.style.display ='none'\r\n        // }\r\n        newRoute.load();\r\n        \r\n    }\r\n}\n\n//# sourceURL=webpack://frontend/./src/router.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app.js");
/******/ 	
/******/ })()
;