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
/***/ (() => {

eval("\r\n\r\nconst signUp = document.querySelector('#signUp'),\r\n    signIn = document.querySelector('#signIn'),\r\n    body = document.querySelector('body');\r\n\r\nsignUp.addEventListener('click', (event) => {\r\n    event.preventDefault();\r\n    body.classList.add('signup');\r\n});\r\n\r\nsignIn.addEventListener('click', (event) => {\r\n    event.preventDefault();\r\n    body.classList.remove('signup');\r\n});\r\n\n\n//# sourceURL=webpack://login_register/./src/app.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/app.js"]();
/******/ 	
/******/ })()
;