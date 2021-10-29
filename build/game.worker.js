/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/workers/MenuMap.worker.ts":
/*!***************************************!*\
  !*** ./src/workers/MenuMap.worker.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
class MenuMapWorker {
    doSomething() {
        return 'MenuMapWorker';
    }
}
exports["default"] = MenuMapWorker;


/***/ }),

/***/ "./src/workers/TestWorker.worker.ts":
/*!******************************************!*\
  !*** ./src/workers/TestWorker.worker.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
class TestWorker {
    doSomething() {
        return 'TestWorker';
    }
}
exports["default"] = TestWorker;


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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!****************************************************************!*\
  !*** ./node_modules/ts-loader/index.js!./src/workers/index.ts ***!
  \****************************************************************/

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

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZS53b3JrZXIuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBUUEsTUFBcUIsYUFBYTtJQUN6QixXQUFXO1FBQ2hCLE9BQU8sZUFBZSxDQUFDO0lBQ3pCLENBQUM7Q0FDRjtBQUpELG1DQUlDOzs7Ozs7Ozs7Ozs7O0FDSkQsTUFBcUIsVUFBVTtJQUN0QixXQUFXO1FBQ2hCLE9BQU8sWUFBWSxDQUFDO0lBQ3RCLENBQUM7Q0FDRjtBQUpELGdDQUlDOzs7Ozs7O1VDWkQ7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7Ozs7Ozs7O0FDdEJBLHdHQUE2QztBQUM3QyxpSEFBNkM7QUFFN0MsTUFBTSxPQUFPLEdBQVcsSUFBcUIsQ0FBQztBQUU5QyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxFQUFFO0lBQzFDLFFBQVEsS0FBSyxDQUFDLElBQUksRUFBRTtRQUNsQixLQUFLLE1BQU07WUFDVCxPQUFPLENBQUMsV0FBVyxDQUFDLFVBQVUsSUFBSSx3QkFBYSxFQUFFLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ25FLE1BQU07UUFDUixLQUFLLE1BQU07WUFDVCxPQUFPLENBQUMsV0FBVyxDQUFDLFVBQVUsSUFBSSwyQkFBVSxFQUFFLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ2hFLE1BQU07UUFDUjtZQUNFLE9BQU8sQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUN0QyxNQUFNO0tBQ1Q7QUFDSCxDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3JwZy1nYW1lLy4vc3JjL3dvcmtlcnMvTWVudU1hcC53b3JrZXIudHMiLCJ3ZWJwYWNrOi8vcnBnLWdhbWUvLi9zcmMvd29ya2Vycy9UZXN0V29ya2VyLndvcmtlci50cyIsIndlYnBhY2s6Ly9ycGctZ2FtZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9ycGctZ2FtZS8uL3NyYy93b3JrZXJzL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGNvbnN0IG1lbnVNYXBDb250ZXh0OiBXb3JrZXIgPSBzZWxmIGFzIGFueSBhcyBXb3JrZXI7XG5cbmltcG9ydCBHYW1lV29ya2VyIGZyb20gJy4vR2FtZVdvcmtlcic7XG5cbi8vIG1lbnVNYXBDb250ZXh0LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBldmVudCA9PiB7XG4vLyAgIG1lbnVNYXBDb250ZXh0LnBvc3RNZXNzYWdlKGBtZW51bWFwd29ya2VyICR7ZXZlbnQuZGF0YX1gKTtcbi8vIH0pO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNZW51TWFwV29ya2VyIGltcGxlbWVudHMgR2FtZVdvcmtlciB7XG4gIHB1YmxpYyBkb1NvbWV0aGluZygpOiBzdHJpbmcge1xuICAgIHJldHVybiAnTWVudU1hcFdvcmtlcic7XG4gIH1cbn1cbiIsIi8vIGNvbnN0IHRlc3RDb250ZXh0OiBXb3JrZXIgPSBzZWxmIGFzIGFueSBhcyBXb3JrZXI7XG5cbmltcG9ydCBHYW1lV29ya2VyIGZyb20gJy4vR2FtZVdvcmtlcic7XG5cbi8vIHRlc3RDb250ZXh0LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBldmVudCA9PiB7XG4vLyAgIHRlc3RDb250ZXh0LnBvc3RNZXNzYWdlKGB0ZXN0d29ya2VyICR7ZXZlbnQuZGF0YX1gKTtcbi8vIH0pO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZXN0V29ya2VyIGltcGxlbWVudHMgR2FtZVdvcmtlciB7XG4gIHB1YmxpYyBkb1NvbWV0aGluZygpOiBzdHJpbmcge1xuICAgIHJldHVybiAnVGVzdFdvcmtlcic7XG4gIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJpbXBvcnQgTWVudU1hcFdvcmtlciBmcm9tICcuL01lbnVNYXAud29ya2VyJztcbmltcG9ydCBUZXN0V29ya2VyIGZyb20gJy4vVGVzdFdvcmtlci53b3JrZXInO1xuXG5jb25zdCBjb250ZXh0OiBXb3JrZXIgPSBzZWxmIGFzIGFueSBhcyBXb3JrZXI7XG5cbmNvbnRleHQuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGV2ZW50ID0+IHtcbiAgc3dpdGNoIChldmVudC5kYXRhKSB7XG4gICAgY2FzZSAnbWVudSc6XG4gICAgICBjb250ZXh0LnBvc3RNZXNzYWdlKGB3b3JrZXIgJHtuZXcgTWVudU1hcFdvcmtlcigpLmRvU29tZXRoaW5nKCl9YCk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICd0ZXN0JzpcbiAgICAgIGNvbnRleHQucG9zdE1lc3NhZ2UoYHdvcmtlciAke25ldyBUZXN0V29ya2VyKCkuZG9Tb21ldGhpbmcoKX1gKTtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICBjb250ZXh0LnBvc3RNZXNzYWdlKCd3b3JrZXIgdW5rbm93bicpO1xuICAgICAgYnJlYWs7XG4gIH1cbn0pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9