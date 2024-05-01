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

/***/ "./src/frontend/ts/Entry.ts":
/*!**********************************!*\
  !*** ./src/frontend/ts/Entry.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\n__webpack_require__(/*! ./Toast */ \"./src/frontend/ts/Toast.ts\");\n__webpack_require__(/*! ./FormRegister */ \"./src/frontend/ts/FormRegister.ts\");\n__webpack_require__(/*! ./FormLogin */ \"./src/frontend/ts/FormLogin.ts\");\nconst Storage_1 = __importDefault(__webpack_require__(/*! ./Storage */ \"./src/frontend/ts/Storage.ts\"));\nconst tokenManager = new Storage_1.default(\"token\");\nconst userToken = tokenManager.readToken();\n__webpack_require__(/*! ./Files */ \"./src/frontend/ts/Files.ts\");\n\n\n//# sourceURL=webpack://foodtracker/./src/frontend/ts/Entry.ts?");

/***/ }),

/***/ "./src/frontend/ts/Files.ts":
/*!**********************************!*\
  !*** ./src/frontend/ts/Files.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst Toast_1 = __webpack_require__(/*! ./Toast */ \"./src/frontend/ts/Toast.ts\");\n/* eslint-disable @typescript-eslint/no-unused-vars */\nconst dropzoneFile = document.getElementById('dropzone-file');\nif (dropzoneFile) {\n    dropzoneFile.addEventListener('change', handleFileSelect, false);\n}\nfunction handleFileSelect(event) {\n    event.stopPropagation();\n    const target = event.target;\n    if (!target.files)\n        return;\n    const files = target.files;\n    const imagePreview = document.getElementById('image-preview');\n    // Função para verificar a extensão do arquivo\n    const isAllowedFileType = (fileName) => {\n        const allowedExtensions = ['png', 'jpg'];\n        const extension = fileName.split('.').pop()?.toLowerCase();\n        return allowedExtensions.includes(extension || '');\n    };\n    for (let i = 0; i < files.length; i++) {\n        const file = files[i];\n        const fileName = file.name;\n        if (!isAllowedFileType(fileName)) {\n            (0, Toast_1.showToast)(\"Apenas arquivos PNG e JPG são permitidos.\");\n            continue;\n        }\n        const reader = new FileReader();\n        reader.onload = ((file) => {\n            return (e) => {\n                if (!e.target)\n                    return;\n                const target = e.target;\n                const imageTemplate = `\r\n                    <div class=\"p-1 bg-white rounded-lg\">\r\n                      <div class=\"relative w-50 h-64 bg-cover bg-center border-black border rounded-lg\" style=\"background-image: url('${target.result}');\">\r\n                        <a class=\"flex items-center justify-center absolute top-1 right-1 bg-red-500 text-white w-6 h-6 rounded-full p-1 text-xs\" onclick=\"deleteImage(this)\" >X</a>\r\n                      </div>  \r\n                    </div>\r\n                `;\n                if (imagePreview) {\n                    imagePreview.insertAdjacentHTML('beforeend', imageTemplate);\n                }\n            };\n        })(file);\n        reader.readAsDataURL(file);\n    }\n}\nfunction deleteImage(event) {\n    const parentNode = event.parentNode;\n    if (parentNode instanceof Node) {\n        parentNode.removeChild(event);\n    }\n}\n\n\n//# sourceURL=webpack://foodtracker/./src/frontend/ts/Files.ts?");

/***/ }),

/***/ "./src/frontend/ts/FormLogin.ts":
/*!**************************************!*\
  !*** ./src/frontend/ts/FormLogin.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.validateLoginForm = void 0;\nconst Toast_1 = __webpack_require__(/*! ./Toast */ \"./src/frontend/ts/Toast.ts\");\nfunction validateLoginForm() {\n    const form = document.getElementById('form-register');\n    const email = document.getElementById('email').value;\n    const password = document.getElementById('password').value;\n    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;\n    const passwordRegex = /^.{8,}$/;\n    let valid = true;\n    if (!emailRegex.test(email)) {\n        (0, Toast_1.showToast)('E-mail não é válido.');\n        valid = false;\n    }\n    if (!passwordRegex.test(password)) {\n        (0, Toast_1.showToast)('Senha deve ter no mínimo 8 caracteres.');\n        valid = false;\n    }\n    if (valid) {\n        form.submit();\n    }\n    return valid;\n}\nexports.validateLoginForm = validateLoginForm;\ntry {\n    document.getElementById('submit-btn-login').addEventListener('click', function (event) {\n        event.preventDefault();\n        if (validateLoginForm()) {\n            console.log('Formulário válido. Pronto para enviar.');\n        }\n    });\n}\ncatch (error) {\n    console.log(error);\n}\n\n\n//# sourceURL=webpack://foodtracker/./src/frontend/ts/FormLogin.ts?");

/***/ }),

/***/ "./src/frontend/ts/FormRegister.ts":
/*!*****************************************!*\
  !*** ./src/frontend/ts/FormRegister.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.validateRegisterForm = void 0;\nconst Toast_1 = __webpack_require__(/*! ./Toast */ \"./src/frontend/ts/Toast.ts\");\nfunction validateRegisterForm() {\n    const form = document.getElementById('form-register');\n    const name = document.getElementById('name').value;\n    const email = document.getElementById('email').value;\n    const phone = document.getElementById('phone').value;\n    const password = document.getElementById('password').value;\n    const nameRegex = /^.{3,}$/;\n    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;\n    const phoneRegex = /^[0-9]{10,11}$/;\n    const passwordRegex = /^.{8,}$/;\n    let valid = true;\n    if (!nameRegex.test(name)) {\n        (0, Toast_1.showToast)('Nome deve ter no mínimo 3 caracteres.');\n        valid = false;\n    }\n    if (!emailRegex.test(email)) {\n        (0, Toast_1.showToast)('E-mail não é válido.');\n        valid = false;\n    }\n    if (!phoneRegex.test(phone)) {\n        (0, Toast_1.showToast)('Telefone não é válido.');\n        valid = false;\n    }\n    if (!passwordRegex.test(password)) {\n        (0, Toast_1.showToast)('Senha deve ter no mínimo 8 caracteres.');\n        valid = false;\n    }\n    if (valid) {\n        form.submit();\n    }\n    return valid;\n}\nexports.validateRegisterForm = validateRegisterForm;\ntry {\n    document.getElementById('submit-btn-register').addEventListener('click', function (event) {\n        event.preventDefault();\n        if (validateRegisterForm()) {\n            console.log('Formulário válido. Pronto para enviar.');\n        }\n    });\n}\ncatch (error) {\n    console.log(error);\n}\n\n\n//# sourceURL=webpack://foodtracker/./src/frontend/ts/FormRegister.ts?");

/***/ }),

/***/ "./src/frontend/ts/Storage.ts":
/*!************************************!*\
  !*** ./src/frontend/ts/Storage.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nclass LocalManager {\n    constructor(path) {\n        this.path = path;\n        const actualValue = this.readToken();\n        if (!actualValue) {\n            this.setToken(\"\");\n            this.actualValue = \"\";\n            return;\n        }\n        this.actualValue = actualValue;\n    }\n    setToken(token) {\n        localStorage.setItem(this.path, token);\n    }\n    readToken() {\n        return localStorage.getItem(this.path);\n    }\n}\nexports[\"default\"] = LocalManager;\n\n\n//# sourceURL=webpack://foodtracker/./src/frontend/ts/Storage.ts?");

/***/ }),

/***/ "./src/frontend/ts/Toast.ts":
/*!**********************************!*\
  !*** ./src/frontend/ts/Toast.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.showToast = exports.random = exports.createToastContainer = exports.createToast = exports.addTimerToCloseToast = exports.activeToast = void 0;\nlet activeToast = [];\nexports.activeToast = activeToast;\ncreateToastContainer();\nfunction createToastContainer() {\n    let container = document.getElementById('toast-container');\n    if (!container) {\n        container = document.createElement('div');\n        container.id = 'toast-container';\n        container.classList.add('w-fit', 'h-fit', 'bg-blue-500', 'shadow-lg', 'grid', 'grid-cols-1', 'fixed', 'top-0', 'right-0', 'mr-4', 'mt-4', 'p-4', 'rounded', 'gap-2', 'hidden');\n        document.body.appendChild(container);\n        const observer = new MutationObserver(() => {\n            if (container.children.length > 0)\n                container.classList.remove('hidden');\n            if (container.children.length === 0)\n                container.classList.add('hidden');\n        });\n        observer.observe(container, { childList: true });\n    }\n}\nexports.createToastContainer = createToastContainer;\nfunction random(length = 8) {\n    let result = '';\n    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';\n    const charactersLength = characters.length;\n    let counter = 0;\n    while (counter < length) {\n        result += characters.charAt(Math.floor(Math.random() * charactersLength));\n        counter += 1;\n    }\n    return result;\n}\nexports.random = random;\nfunction showToast(message = '') {\n    createToast(message);\n    addTimerToCloseToast();\n}\nexports.showToast = showToast;\nfunction createToast(message) {\n    if (!message)\n        return;\n    const container = document.getElementById('toast-container');\n    const toastId = random(8);\n    const newToast = document.createElement('div');\n    newToast.id = toastId;\n    newToast.classList.add('card', 'p-2', 'bg-white', 'overflow-hidden', 'text-ellipsis', 'whitespace-nowrap', 'rounded');\n    newToast.innerText = message;\n    container.appendChild(newToast);\n    activeToast.push(toastId);\n}\nexports.createToast = createToast;\nfunction addTimerToCloseToast() {\n    if (activeToast.length > 0) {\n        for (const toastId of activeToast) {\n            exports.activeToast = activeToast = activeToast.filter(id => id !== toastId);\n            setTimeout(() => {\n                const toast = document.getElementById(toastId);\n                toast.remove();\n            }, 2000);\n        }\n    }\n}\nexports.addTimerToCloseToast = addTimerToCloseToast;\n\n\n//# sourceURL=webpack://foodtracker/./src/frontend/ts/Toast.ts?");

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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/frontend/ts/Entry.ts");
/******/ 	
/******/ })()
;