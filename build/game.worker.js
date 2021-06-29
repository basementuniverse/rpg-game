/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/workers/MenuMap.worker.ts":
/*!***************************************!*\
  !*** ./src/workers/MenuMap.worker.ts ***!
  \***************************************/
/*! flagged exports */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
class MenuMapWorker {
    doSomething() {
        return 'MenuMapWorker';
    }
}
exports.default = MenuMapWorker;


/***/ }),

/***/ "./src/workers/TestWorker.worker.ts":
/*!******************************************!*\
  !*** ./src/workers/TestWorker.worker.ts ***!
  \******************************************/
/*! flagged exports */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
class TestWorker {
    doSomething() {
        return 'TestWorker';
    }
}
exports.default = TestWorker;


/***/ }),

/***/ "./node_modules/ts-loader/index.js!./src/workers/index.ts":
/*!****************************************************************!*\
  !*** ./node_modules/ts-loader/index.js!./src/workers/index.ts ***!
  \****************************************************************/
/*! flagged exports */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__ */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const MenuMap_worker_1 = __webpack_require__(/*! ./MenuMap.worker */ "./src/workers/MenuMap.worker.ts");
const TestWorker_worker_1 = __webpack_require__(/*! ./TestWorker.worker */ "./src/workers/TestWorker.worker.ts");
const context = self;
context.addEventListener('message', event => {
    switch (event.data) {
        case 'menu':
            context.postMessage(`worker ${new MenuMap_worker_1.default().doSomething()}`);
            break;
        case 'test':
            context.postMessage(`worker ${new TestWorker_worker_1.default().doSomething()}`);
            break;
        default:
            context.postMessage('worker unknown');
            break;
    }
});


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
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
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./node_modules/ts-loader/index.js!./src/workers/index.ts");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ycGctZ2FtZS8uL3NyYy93b3JrZXJzL01lbnVNYXAud29ya2VyLnRzIiwid2VicGFjazovL3JwZy1nYW1lLy4vc3JjL3dvcmtlcnMvVGVzdFdvcmtlci53b3JrZXIudHMiLCJ3ZWJwYWNrOi8vcnBnLWdhbWUvLi9zcmMvd29ya2Vycy9pbmRleC50cyIsIndlYnBhY2s6Ly9ycGctZ2FtZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9ycGctZ2FtZS93ZWJwYWNrL3N0YXJ0dXAiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFRQSxNQUFxQixhQUFhO0lBQ3pCLFdBQVc7UUFDaEIsT0FBTyxlQUFlLENBQUM7SUFDekIsQ0FBQztDQUNGO0FBSkQsZ0NBSUM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0pELE1BQXFCLFVBQVU7SUFDdEIsV0FBVztRQUNoQixPQUFPLFlBQVksQ0FBQztJQUN0QixDQUFDO0NBQ0Y7QUFKRCw2QkFJQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNaRCx3R0FBNkM7QUFDN0MsaUhBQTZDO0FBRTdDLE1BQU0sT0FBTyxHQUFXLElBQXFCLENBQUM7QUFFOUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsRUFBRTtJQUMxQyxRQUFRLEtBQUssQ0FBQyxJQUFJLEVBQUU7UUFDbEIsS0FBSyxNQUFNO1lBQ1QsT0FBTyxDQUFDLFdBQVcsQ0FBQyxVQUFVLElBQUksd0JBQWEsRUFBRSxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNuRSxNQUFNO1FBQ1IsS0FBSyxNQUFNO1lBQ1QsT0FBTyxDQUFDLFdBQVcsQ0FBQyxVQUFVLElBQUksMkJBQVUsRUFBRSxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNoRSxNQUFNO1FBQ1I7WUFDRSxPQUFPLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDdEMsTUFBTTtLQUNUO0FBQ0gsQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7VUNqQkg7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7OztVQ3JCQTtVQUNBO1VBQ0E7VUFDQSIsImZpbGUiOiJnYW1lLndvcmtlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGNvbnN0IG1lbnVNYXBDb250ZXh0OiBXb3JrZXIgPSBzZWxmIGFzIGFueSBhcyBXb3JrZXI7XG5cbmltcG9ydCBHYW1lV29ya2VyIGZyb20gJy4vR2FtZVdvcmtlcic7XG5cbi8vIG1lbnVNYXBDb250ZXh0LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBldmVudCA9PiB7XG4vLyAgIG1lbnVNYXBDb250ZXh0LnBvc3RNZXNzYWdlKGBtZW51bWFwd29ya2VyICR7ZXZlbnQuZGF0YX1gKTtcbi8vIH0pO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNZW51TWFwV29ya2VyIGltcGxlbWVudHMgR2FtZVdvcmtlciB7XG4gIHB1YmxpYyBkb1NvbWV0aGluZygpOiBzdHJpbmcge1xuICAgIHJldHVybiAnTWVudU1hcFdvcmtlcic7XG4gIH1cbn1cbiIsIi8vIGNvbnN0IHRlc3RDb250ZXh0OiBXb3JrZXIgPSBzZWxmIGFzIGFueSBhcyBXb3JrZXI7XG5cbmltcG9ydCBHYW1lV29ya2VyIGZyb20gJy4vR2FtZVdvcmtlcic7XG5cbi8vIHRlc3RDb250ZXh0LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBldmVudCA9PiB7XG4vLyAgIHRlc3RDb250ZXh0LnBvc3RNZXNzYWdlKGB0ZXN0d29ya2VyICR7ZXZlbnQuZGF0YX1gKTtcbi8vIH0pO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZXN0V29ya2VyIGltcGxlbWVudHMgR2FtZVdvcmtlciB7XG4gIHB1YmxpYyBkb1NvbWV0aGluZygpOiBzdHJpbmcge1xuICAgIHJldHVybiAnVGVzdFdvcmtlcic7XG4gIH1cbn1cbiIsImltcG9ydCBNZW51TWFwV29ya2VyIGZyb20gJy4vTWVudU1hcC53b3JrZXInO1xuaW1wb3J0IFRlc3RXb3JrZXIgZnJvbSAnLi9UZXN0V29ya2VyLndvcmtlcic7XG5cbmNvbnN0IGNvbnRleHQ6IFdvcmtlciA9IHNlbGYgYXMgYW55IGFzIFdvcmtlcjtcblxuY29udGV4dC5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgZXZlbnQgPT4ge1xuICBzd2l0Y2ggKGV2ZW50LmRhdGEpIHtcbiAgICBjYXNlICdtZW51JzpcbiAgICAgIGNvbnRleHQucG9zdE1lc3NhZ2UoYHdvcmtlciAke25ldyBNZW51TWFwV29ya2VyKCkuZG9Tb21ldGhpbmcoKX1gKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3Rlc3QnOlxuICAgICAgY29udGV4dC5wb3N0TWVzc2FnZShgd29ya2VyICR7bmV3IFRlc3RXb3JrZXIoKS5kb1NvbWV0aGluZygpfWApO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIGNvbnRleHQucG9zdE1lc3NhZ2UoJ3dvcmtlciB1bmtub3duJyk7XG4gICAgICBicmVhaztcbiAgfVxufSk7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHRpZihfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdKSB7XG5cdFx0cmV0dXJuIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0uZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlXG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9ub2RlX21vZHVsZXMvdHMtbG9hZGVyL2luZGV4LmpzIS4vc3JjL3dvcmtlcnMvaW5kZXgudHNcIik7XG4vLyBUaGlzIGVudHJ5IG1vZHVsZSB1c2VkICdleHBvcnRzJyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG4iXSwic291cmNlUm9vdCI6IiJ9