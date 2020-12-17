module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./pages/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/prismjs/themes/prism-okaidia.css":
/*!*******************************************************!*\
  !*** ./node_modules/prismjs/themes/prism-okaidia.css ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiIuL25vZGVfbW9kdWxlcy9wcmlzbWpzL3RoZW1lcy9wcmlzbS1va2FpZGlhLmNzcy5qcyIsInNvdXJjZXNDb250ZW50IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./node_modules/prismjs/themes/prism-okaidia.css\n");

/***/ }),

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/head */ \"next/head\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var prismjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prismjs */ \"prismjs\");\n/* harmony import */ var prismjs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prismjs__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var prismjs_themes_prism_okaidia_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prismjs/themes/prism-okaidia.css */ \"./node_modules/prismjs/themes/prism-okaidia.css\");\n/* harmony import */ var prismjs_themes_prism_okaidia_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prismjs_themes_prism_okaidia_css__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _utils_useCopyToClipBoard__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/useCopyToClipBoard */ \"./utils/useCopyToClipBoard.js\");\nvar _jsxFileName = \"/Users/ankit/Documents/crypto/gr8/panvala/donation-widget/widget-creator/pages/index.js\";\n\nvar __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;\n\n\n\n\n\nlet sampleHTML = `\n<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\"/>\n  <script src=\"https://panvala.vercel.app/widget.js\"></script>\n  </head>\n  <body>\n  <div id=\"panWidget\"></div>\n</body>\n</html>`;\n\nfunction Home() {\n  const {\n    0: htmlText,\n    1: setHtmlText\n  } = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(sampleHTML);\n  const {\n    0: defaultAmount,\n    1: setDefaultAmount\n  } = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(50);\n  const {\n    0: recieversAddress,\n    1: setRecieversAddress\n  } = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])('');\n  const [copied, copy] = Object(_utils_useCopyToClipBoard__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(htmlText);\n\n  function handleAmountChange({\n    target\n  }) {\n    let regExpr = new RegExp('^[0-9]+$'); // check for number\n\n    if (!regExpr.test(target.value)) {\n      setDefaultAmount('');\n    } else {\n      setDefaultAmount(target.value);\n    }\n  }\n\n  Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useEffect\"])(() => {\n    prismjs__WEBPACK_IMPORTED_MODULE_2___default.a.highlightAll();\n  }, [htmlText]);\n\n  function updateHtmlText(amount = 50, address = '') {\n    return `\n    <!DOCTYPE html>\n    <html lang=\"en\">\n    <head>\n      <meta charset=\"UTF-8\"/>\n      <script src=\"https://panvala.vercel.app/widget.js\"></script>\n    </head>\n    <body>\n      <div id=\"panWidget\"></div>\n      <script >\n        panWidget.init(${JSON.stringify({\n      defaultAmpunt: amount,\n      toAddress: address\n    })})\n      </script>\n    </body>\n    </html>`;\n  }\n\n  Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useEffect\"])(() => {\n    setHtmlText(updateHtmlText(defaultAmount, recieversAddress));\n  }, [defaultAmount, recieversAddress]);\n  return __jsx(\"div\", {\n    className: \"\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 66,\n      columnNumber: 5\n    }\n  }, __jsx(next_head__WEBPACK_IMPORTED_MODULE_1___default.a, {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 67,\n      columnNumber: 7\n    }\n  }, __jsx(\"title\", {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 68,\n      columnNumber: 9\n    }\n  }, \"PAN Donation Widget\"), __jsx(\"meta\", {\n    name: \"viewport\",\n    content: \"initial-scale=1.0, width=device-width\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 69,\n      columnNumber: 9\n    }\n  })), __jsx(\"div\", {\n    className: \"overflow-hidden max-w-6xl mx-auto\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 74,\n      columnNumber: 7\n    }\n  }, __jsx(\"h1\", {\n    className: \"text-4xl inline-block tracking-tight font-bold text-center leading-3 text-white sm:text-5xl md:text-6xl py-12 w-full\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 75,\n      columnNumber: 9\n    }\n  }, __jsx(\"span\", {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 76,\n      columnNumber: 11\n    }\n  }, \"Create Your Custom Widget For \"), __jsx(\"span\", {\n    className: \"text-black block pt-4\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 77,\n      columnNumber: 11\n    }\n  }, \"PAN Donations\")), __jsx(\"div\", {\n    className: \"px-4 py-5 sm:p-6 flex justify-between\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 81,\n      columnNumber: 9\n    }\n  }, __jsx(\"div\", {\n    className: \"w-3/12\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 82,\n      columnNumber: 11\n    }\n  }, __jsx(\"div\", {\n    className: \"rounded-md shadow-sm items-baseline justify-between\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 83,\n      columnNumber: 13\n    }\n  }, __jsx(\"h3\", {\n    className: \"mt-2 text-lg tracking-tight text-white mb-2\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 84,\n      columnNumber: 15\n    }\n  }, \"Default amount for donations (in USD)\"), __jsx(\"div\", {\n    className: \"relative w-full\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 87,\n      columnNumber: 15\n    }\n  }, __jsx(\"input\", {\n    className: \"form-input block pl-3 pr-12 sm:text-sm sm:leading-5 rounded h-14 text-3xl w-full\",\n    placeholder: \"10.00\",\n    value: defaultAmount,\n    onChange: handleAmountChange,\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 88,\n      columnNumber: 17\n    }\n  }), __jsx(\"div\", {\n    className: \"absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 94,\n      columnNumber: 17\n    }\n  }, __jsx(\"span\", {\n    className: \"text-gray-500 sm:text-2xl sm:leading-5\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 95,\n      columnNumber: 19\n    }\n  }, \"USD\")))), __jsx(\"div\", {\n    className: \"rounded-md shadow-sm items-baseline justify-between mt-4\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 101,\n      columnNumber: 13\n    }\n  }, __jsx(\"h3\", {\n    className: \"mt-2 text-lg tracking-tight text-white mb-2\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 102,\n      columnNumber: 15\n    }\n  }, \"Ethereum(ETH) address to recieve donations (required)\"), __jsx(\"input\", {\n    placeholder: \"0x6A92864...\",\n    className: \"w-full form-input block pl-3 sm:text-sm sm:leading-5 rounded h-14 text-3xl\",\n    value: recieversAddress,\n    onChange: ({\n      target\n    }) => {\n      setRecieversAddress(target.value);\n    },\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 106,\n      columnNumber: 15\n    }\n  }))), __jsx(\"div\", {\n    className: \"w-8/12 h-full\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 116,\n      columnNumber: 11\n    }\n  }, __jsx(\"div\", {\n    className: \"Code relative whitespace-pre\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 117,\n      columnNumber: 13\n    }\n  }, __jsx(\"pre\", {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 118,\n      columnNumber: 15\n    }\n  }, __jsx(\"code\", {\n    className: `language-html`,\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 119,\n      columnNumber: 17\n    }\n  }, htmlText)), __jsx(\"button\", {\n    onClick: () => copy(htmlText),\n    className: \"absolute top-0 right-0 bg-blue-200 p-2 shadow-lg\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 123,\n      columnNumber: 15\n    }\n  }, copied ? 'Copied' : 'Copy to clipboard'))))));\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Home);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWdlcy9pbmRleC5qcz80NGQ4Il0sIm5hbWVzIjpbInNhbXBsZUhUTUwiLCJIb21lIiwiaHRtbFRleHQiLCJzZXRIdG1sVGV4dCIsInVzZVN0YXRlIiwiZGVmYXVsdEFtb3VudCIsInNldERlZmF1bHRBbW91bnQiLCJyZWNpZXZlcnNBZGRyZXNzIiwic2V0UmVjaWV2ZXJzQWRkcmVzcyIsImNvcGllZCIsImNvcHkiLCJ1c2VDb3B5VG9DbGlwYm9hcmQiLCJoYW5kbGVBbW91bnRDaGFuZ2UiLCJ0YXJnZXQiLCJyZWdFeHByIiwiUmVnRXhwIiwidGVzdCIsInZhbHVlIiwidXNlRWZmZWN0IiwiUHJpc20iLCJoaWdobGlnaHRBbGwiLCJ1cGRhdGVIdG1sVGV4dCIsImFtb3VudCIsImFkZHJlc3MiLCJKU09OIiwic3RyaW5naWZ5IiwiZGVmYXVsdEFtcHVudCIsInRvQWRkcmVzcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQSxJQUFJQSxVQUFVLEdBQUk7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFWQTs7QUFZQSxTQUFTQyxJQUFULEdBQWdCO0FBQ2QsUUFBTTtBQUFBLE9BQUNDLFFBQUQ7QUFBQSxPQUFXQztBQUFYLE1BQTBCQyxzREFBUSxDQUFDSixVQUFELENBQXhDO0FBQ0EsUUFBTTtBQUFBLE9BQUNLLGFBQUQ7QUFBQSxPQUFnQkM7QUFBaEIsTUFBb0NGLHNEQUFRLENBQUMsRUFBRCxDQUFsRDtBQUNBLFFBQU07QUFBQSxPQUFDRyxnQkFBRDtBQUFBLE9BQW1CQztBQUFuQixNQUEwQ0osc0RBQVEsQ0FDdEQsRUFEc0QsQ0FBeEQ7QUFJQSxRQUFNLENBQUNLLE1BQUQsRUFBU0MsSUFBVCxJQUFpQkMseUVBQWtCLENBQUNULFFBQUQsQ0FBekM7O0FBQ0EsV0FBU1Usa0JBQVQsQ0FBNEI7QUFBRUM7QUFBRixHQUE1QixFQUF3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QUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNFO0FBQUksYUFBUyxFQUFDLDZDQUFkO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsNkRBREYsRUFLRTtBQUNFLGVBQVcsRUFBQyxjQURkO0FBRUUsYUFBUyxFQUFDLDRFQUZaO0FBR0UsU0FBSyxFQUFFTCxnQkFIVDtBQUlFLFlBQVEsRUFBRSxDQUFDO0FBQUVNO0FBQUYsS0FBRCxLQUFnQjtBQUN4QkwseUJBQW1CLENBQUNLLE1BQU0sQ0FBQ0ksS0FBUixDQUFuQjtBQUNELEtBTkg7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQUxGLENBbkJGLENBREYsRUFtQ0U7QUFBSyxhQUFTLEVBQUMsZUFBZjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0U7QUFBSyxhQUFTLEVBQUMsOEJBQWY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDRTtBQUFNLGFBQVMsRUFBRyxlQUFsQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0dmLFFBREgsQ0FERixDQURGLEVBTUU7QUFDRSxXQUFPLEVBQUUsTUFBTVEsSUFBSSxDQUFDUixRQUFELENBRHJCO0FBRUUsYUFBUyxFQUFDLGtEQUZaO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FJR08sTUFBTSxHQUFHLFFBQUgsR0FBYyxtQkFKdkIsQ0FORixDQURGLENBbkNGLENBUEYsQ0FSRixDQURGO0FBc0VEOztBQUVjUixtRUFBZiIsImZpbGUiOiIuL3BhZ2VzL2luZGV4LmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBIZWFkIGZyb20gJ25leHQvaGVhZCc7XG5pbXBvcnQgUHJpc20gZnJvbSAncHJpc21qcyc7XG5pbXBvcnQgJ3ByaXNtanMvdGhlbWVzL3ByaXNtLW9rYWlkaWEuY3NzJztcbmltcG9ydCB1c2VDb3B5VG9DbGlwYm9hcmQgZnJvbSAnLi4vdXRpbHMvdXNlQ29weVRvQ2xpcEJvYXJkJztcblxubGV0IHNhbXBsZUhUTUwgPSBgXG48IURPQ1RZUEUgaHRtbD5cbjxodG1sIGxhbmc9XCJlblwiPlxuPGhlYWQ+XG4gIDxtZXRhIGNoYXJzZXQ9XCJVVEYtOFwiLz5cbiAgPHNjcmlwdCBzcmM9XCJodHRwczovL3BhbnZhbGEudmVyY2VsLmFwcC93aWRnZXQuanNcIj48L3NjcmlwdD5cbiAgPC9oZWFkPlxuICA8Ym9keT5cbiAgPGRpdiBpZD1cInBhbldpZGdldFwiPjwvZGl2PlxuPC9ib2R5PlxuPC9odG1sPmA7XG5cbmZ1bmN0aW9uIEhvbWUoKSB7XG4gIGNvbnN0IFtodG1sVGV4dCwgc2V0SHRtbFRleHRdID0gdXNlU3RhdGUoc2FtcGxlSFRNTCk7XG4gIGNvbnN0IFtkZWZhdWx0QW1vdW50LCBzZXREZWZhdWx0QW1vdW50XSA9IHVzZVN0YXRlKDUwKTtcbiAgY29uc3QgW3JlY2lldmVyc0FkZHJlc3MsIHNldFJlY2lldmVyc0FkZHJlc3NdID0gdXNlU3RhdGUoXG4gICAgJydcbiAgKTtcblxuICBjb25zdCBbY29waWVkLCBjb3B5XSA9IHVzZUNvcHlUb0NsaXBib2FyZChodG1sVGV4dCk7XG4gIGZ1bmN0aW9uIGhhbmRsZUFtb3VudENoYW5nZSh7IHRhcmdldCB9KSB7XG4gICAgbGV0IHJlZ0V4cHIgPSBuZXcgUmVnRXhwKCdeWzAtOV0rJCcpOyAvLyBjaGVjayBmb3IgbnVtYmVyXG4gICAgaWYgKCFyZWdFeHByLnRlc3QodGFyZ2V0LnZhbHVlKSkge1xuICAgICAgc2V0RGVmYXVsdEFtb3VudCgnJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNldERlZmF1bHRBbW91bnQodGFyZ2V0LnZhbHVlKTtcbiAgICB9XG4gIH1cblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIFByaXNtLmhpZ2hsaWdodEFsbCgpO1xuICB9LCBbaHRtbFRleHRdKTtcblxuICBmdW5jdGlvbiB1cGRhdGVIdG1sVGV4dChhbW91bnQgPSA1MCwgYWRkcmVzcyA9ICcnKSB7XG4gICAgcmV0dXJuIGBcbiAgICA8IURPQ1RZUEUgaHRtbD5cbiAgICA8aHRtbCBsYW5nPVwiZW5cIj5cbiAgICA8aGVhZD5cbiAgICAgIDxtZXRhIGNoYXJzZXQ9XCJVVEYtOFwiLz5cbiAgICAgIDxzY3JpcHQgc3JjPVwiaHR0cHM6Ly9wYW52YWxhLnZlcmNlbC5hcHAvd2lkZ2V0LmpzXCI+PC9zY3JpcHQ+XG4gICAgPC9oZWFkPlxuICAgIDxib2R5PlxuICAgICAgPGRpdiBpZD1cInBhbldpZGdldFwiPjwvZGl2PlxuICAgICAgPHNjcmlwdCA+XG4gICAgICAgIHBhbldpZGdldC5pbml0KCR7SlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgIGRlZmF1bHRBbXB1bnQ6IGFtb3VudCxcbiAgICAgICAgICB0b0FkZHJlc3M6IGFkZHJlc3MsXG4gICAgICAgIH0pfSlcbiAgICAgIDwvc2NyaXB0PlxuICAgIDwvYm9keT5cbiAgICA8L2h0bWw+YDtcbiAgfVxuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgc2V0SHRtbFRleHQoXG4gICAgICB1cGRhdGVIdG1sVGV4dChkZWZhdWx0QW1vdW50LCByZWNpZXZlcnNBZGRyZXNzKVxuICAgICk7XG4gIH0sIFtkZWZhdWx0QW1vdW50LCByZWNpZXZlcnNBZGRyZXNzXSk7XG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9Jyc+XG4gICAgICA8SGVhZD5cbiAgICAgICAgPHRpdGxlPlBBTiBEb25hdGlvbiBXaWRnZXQ8L3RpdGxlPlxuICAgICAgICA8bWV0YVxuICAgICAgICAgIG5hbWU9J3ZpZXdwb3J0J1xuICAgICAgICAgIGNvbnRlbnQ9J2luaXRpYWwtc2NhbGU9MS4wLCB3aWR0aD1kZXZpY2Utd2lkdGgnXG4gICAgICAgIC8+XG4gICAgICA8L0hlYWQ+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT0nb3ZlcmZsb3ctaGlkZGVuIG1heC13LTZ4bCBteC1hdXRvJz5cbiAgICAgICAgPGgxIGNsYXNzTmFtZT0ndGV4dC00eGwgaW5saW5lLWJsb2NrIHRyYWNraW5nLXRpZ2h0IGZvbnQtYm9sZCB0ZXh0LWNlbnRlciBsZWFkaW5nLTMgdGV4dC13aGl0ZSBzbTp0ZXh0LTV4bCBtZDp0ZXh0LTZ4bCBweS0xMiB3LWZ1bGwnPlxuICAgICAgICAgIDxzcGFuPkNyZWF0ZSBZb3VyIEN1c3RvbSBXaWRnZXQgRm9yIDwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9J3RleHQtYmxhY2sgYmxvY2sgcHQtNCc+XG4gICAgICAgICAgICBQQU4gRG9uYXRpb25zXG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICA8L2gxPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncHgtNCBweS01IHNtOnAtNiBmbGV4IGp1c3RpZnktYmV0d2Vlbic+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3ctMy8xMic+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm91bmRlZC1tZCBzaGFkb3ctc20gaXRlbXMtYmFzZWxpbmUganVzdGlmeS1iZXR3ZWVuJz5cbiAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT0nbXQtMiB0ZXh0LWxnIHRyYWNraW5nLXRpZ2h0IHRleHQtd2hpdGUgbWItMic+XG4gICAgICAgICAgICAgICAgRGVmYXVsdCBhbW91bnQgZm9yIGRvbmF0aW9ucyAoaW4gVVNEKVxuICAgICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncmVsYXRpdmUgdy1mdWxsJz5cbiAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0nZm9ybS1pbnB1dCBibG9jayBwbC0zIHByLTEyIHNtOnRleHQtc20gc206bGVhZGluZy01IHJvdW5kZWQgaC0xNCB0ZXh0LTN4bCB3LWZ1bGwnXG4gICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj0nMTAuMDAnXG4gICAgICAgICAgICAgICAgICB2YWx1ZT17ZGVmYXVsdEFtb3VudH1cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtoYW5kbGVBbW91bnRDaGFuZ2V9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nYWJzb2x1dGUgaW5zZXQteS0wIHJpZ2h0LTAgcHItMyBmbGV4IGl0ZW1zLWNlbnRlciBwb2ludGVyLWV2ZW50cy1ub25lJz5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0ndGV4dC1ncmF5LTUwMCBzbTp0ZXh0LTJ4bCBzbTpsZWFkaW5nLTUnPlxuICAgICAgICAgICAgICAgICAgICBVU0RcbiAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3VuZGVkLW1kIHNoYWRvdy1zbSBpdGVtcy1iYXNlbGluZSBqdXN0aWZ5LWJldHdlZW4gbXQtNCc+XG4gICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9J210LTIgdGV4dC1sZyB0cmFja2luZy10aWdodCB0ZXh0LXdoaXRlIG1iLTInPlxuICAgICAgICAgICAgICAgIEV0aGVyZXVtKEVUSCkgYWRkcmVzcyB0byByZWNpZXZlIGRvbmF0aW9uc1xuICAgICAgICAgICAgICAgIChyZXF1aXJlZClcbiAgICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9JzB4NkE5Mjg2NC4uLidcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9J3ctZnVsbCBmb3JtLWlucHV0IGJsb2NrIHBsLTMgc206dGV4dC1zbSBzbTpsZWFkaW5nLTUgcm91bmRlZCBoLTE0IHRleHQtM3hsJ1xuICAgICAgICAgICAgICAgIHZhbHVlPXtyZWNpZXZlcnNBZGRyZXNzfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoeyB0YXJnZXQgfSkgPT4ge1xuICAgICAgICAgICAgICAgICAgc2V0UmVjaWV2ZXJzQWRkcmVzcyh0YXJnZXQudmFsdWUpO1xuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ndy04LzEyIGgtZnVsbCc+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nQ29kZSByZWxhdGl2ZSB3aGl0ZXNwYWNlLXByZSc+XG4gICAgICAgICAgICAgIDxwcmU+XG4gICAgICAgICAgICAgICAgPGNvZGUgY2xhc3NOYW1lPXtgbGFuZ3VhZ2UtaHRtbGB9PlxuICAgICAgICAgICAgICAgICAge2h0bWxUZXh0fVxuICAgICAgICAgICAgICAgIDwvY29kZT5cbiAgICAgICAgICAgICAgPC9wcmU+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBjb3B5KGh0bWxUZXh0KX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9J2Fic29sdXRlIHRvcC0wIHJpZ2h0LTAgYmctYmx1ZS0yMDAgcC0yIHNoYWRvdy1sZydcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHtjb3BpZWQgPyAnQ29waWVkJyA6ICdDb3B5IHRvIGNsaXBib2FyZCd9XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IEhvbWU7XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/index.js\n");

/***/ }),

/***/ "./utils/useCopyToClipBoard.js":
/*!*************************************!*\
  !*** ./utils/useCopyToClipBoard.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\n\nfunction useCopyToClipboard(text) {\n  const copyToClipboard = str => {\n    const el = document.createElement('textarea');\n    el.value = str;\n    el.setAttribute('readonly', '');\n    el.style.position = 'absolute';\n    el.style.left = '-9999px';\n    document.body.appendChild(el);\n    const selected = document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false;\n    el.select();\n    const success = document.execCommand('copy');\n    document.body.removeChild(el);\n\n    if (selected) {\n      document.getSelection().removeAllRanges();\n      document.getSelection().addRange(selected);\n    }\n\n    return success;\n  };\n\n  const {\n    0: copied,\n    1: setCopied\n  } = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(false);\n  const copy = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useCallback\"])(() => {\n    if (!copied) setCopied(copyToClipboard(text));\n  }, [text]);\n  Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useEffect\"])(() => () => setCopied(false), [text]);\n  return [copied, copy];\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (useCopyToClipboard);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi91dGlscy91c2VDb3B5VG9DbGlwQm9hcmQuanM/ZWJkYSJdLCJuYW1lcyI6WyJ1c2VDb3B5VG9DbGlwYm9hcmQiLCJ0ZXh0IiwiY29weVRvQ2xpcGJvYXJkIiwic3RyIiwiZWwiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJ2YWx1ZSIsInNldEF0dHJpYnV0ZSIsInN0eWxlIiwicG9zaXRpb24iLCJsZWZ0IiwiYm9keSIsImFwcGVuZENoaWxkIiwic2VsZWN0ZWQiLCJnZXRTZWxlY3Rpb24iLCJyYW5nZUNvdW50IiwiZ2V0UmFuZ2VBdCIsInNlbGVjdCIsInN1Y2Nlc3MiLCJleGVjQ29tbWFuZCIsInJlbW92ZUNoaWxkIiwicmVtb3ZlQWxsUmFuZ2VzIiwiYWRkUmFuZ2UiLCJjb3BpZWQiLCJzZXRDb3BpZWQiLCJ1c2VTdGF0ZSIsImNvcHkiLCJ1c2VDYWxsYmFjayIsInVzZUVmZmVjdCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7O0FBRUEsU0FBU0Esa0JBQVQsQ0FBNEJDLElBQTVCLEVBQWtDO0FBQ2hDLFFBQU1DLGVBQWUsR0FBSUMsR0FBRCxJQUFTO0FBQy9CLFVBQU1DLEVBQUUsR0FBR0MsUUFBUSxDQUFDQyxhQUFULENBQXVCLFVBQXZCLENBQVg7QUFDQUYsTUFBRSxDQUFDRyxLQUFILEdBQVdKLEdBQVg7QUFDQUMsTUFBRSxDQUFDSSxZQUFILENBQWdCLFVBQWhCLEVBQTRCLEVBQTVCO0FBQ0FKLE1BQUUsQ0FBQ0ssS0FBSCxDQUFTQyxRQUFULEdBQW9CLFVBQXBCO0FBQ0FOLE1BQUUsQ0FBQ0ssS0FBSCxDQUFTRSxJQUFULEdBQWdCLFNBQWhCO0FBQ0FOLFlBQVEsQ0FBQ08sSUFBVCxDQUFjQyxXQUFkLENBQTBCVCxFQUExQjtBQUNBLFVBQU1VLFFBQVEsR0FDWlQsUUFBUSxDQUFDVSxZQUFULEdBQXdCQyxVQUF4QixHQUFxQyxDQUFyQyxHQUNJWCxRQUFRLENBQUNVLFlBQVQsR0FBd0JFLFVBQXhCLENBQW1DLENBQW5DLENBREosR0FFSSxLQUhOO0FBSUFiLE1BQUUsQ0FBQ2MsTUFBSDtBQUNBLFVBQU1DLE9BQU8sR0FBR2QsUUFBUSxDQUFDZSxXQUFULENBQXFCLE1BQXJCLENBQWhCO0FBQ0FmLFlBQVEsQ0FBQ08sSUFBVCxDQUFjUyxXQUFkLENBQTBCakIsRUFBMUI7O0FBQ0EsUUFBSVUsUUFBSixFQUFjO0FBQ1pULGNBQVEsQ0FBQ1UsWUFBVCxHQUF3Qk8sZUFBeEI7QUFDQWpCLGNBQVEsQ0FBQ1UsWUFBVCxHQUF3QlEsUUFBeEIsQ0FBaUNULFFBQWpDO0FBQ0Q7O0FBQ0QsV0FBT0ssT0FBUDtBQUNELEdBbkJEOztBQXFCQSxRQUFNO0FBQUEsT0FBQ0ssTUFBRDtBQUFBLE9BQVNDO0FBQVQsTUFBc0JDLHNEQUFRLENBQUMsS0FBRCxDQUFwQztBQUVBLFFBQU1DLElBQUksR0FBR0MseURBQVcsQ0FBQyxNQUFNO0FBQzdCLFFBQUksQ0FBQ0osTUFBTCxFQUFhQyxTQUFTLENBQUN2QixlQUFlLENBQUNELElBQUQsQ0FBaEIsQ0FBVDtBQUNkLEdBRnVCLEVBRXJCLENBQUNBLElBQUQsQ0FGcUIsQ0FBeEI7QUFHQTRCLHlEQUFTLENBQUMsTUFBTSxNQUFNSixTQUFTLENBQUMsS0FBRCxDQUF0QixFQUErQixDQUFDeEIsSUFBRCxDQUEvQixDQUFUO0FBRUEsU0FBTyxDQUFDdUIsTUFBRCxFQUFTRyxJQUFULENBQVA7QUFDRDs7QUFFYzNCLGlGQUFmIiwiZmlsZSI6Ii4vdXRpbHMvdXNlQ29weVRvQ2xpcEJvYXJkLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlQ2FsbGJhY2ssIHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5cbmZ1bmN0aW9uIHVzZUNvcHlUb0NsaXBib2FyZCh0ZXh0KSB7XG4gIGNvbnN0IGNvcHlUb0NsaXBib2FyZCA9IChzdHIpID0+IHtcbiAgICBjb25zdCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RleHRhcmVhJyk7XG4gICAgZWwudmFsdWUgPSBzdHI7XG4gICAgZWwuc2V0QXR0cmlidXRlKCdyZWFkb25seScsICcnKTtcbiAgICBlbC5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgZWwuc3R5bGUubGVmdCA9ICctOTk5OXB4JztcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGVsKTtcbiAgICBjb25zdCBzZWxlY3RlZCA9XG4gICAgICBkb2N1bWVudC5nZXRTZWxlY3Rpb24oKS5yYW5nZUNvdW50ID4gMFxuICAgICAgICA/IGRvY3VtZW50LmdldFNlbGVjdGlvbigpLmdldFJhbmdlQXQoMClcbiAgICAgICAgOiBmYWxzZTtcbiAgICBlbC5zZWxlY3QoKTtcbiAgICBjb25zdCBzdWNjZXNzID0gZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2NvcHknKTtcbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGVsKTtcbiAgICBpZiAoc2VsZWN0ZWQpIHtcbiAgICAgIGRvY3VtZW50LmdldFNlbGVjdGlvbigpLnJlbW92ZUFsbFJhbmdlcygpO1xuICAgICAgZG9jdW1lbnQuZ2V0U2VsZWN0aW9uKCkuYWRkUmFuZ2Uoc2VsZWN0ZWQpO1xuICAgIH1cbiAgICByZXR1cm4gc3VjY2VzcztcbiAgfTtcblxuICBjb25zdCBbY29waWVkLCBzZXRDb3BpZWRdID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIGNvbnN0IGNvcHkgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKCFjb3BpZWQpIHNldENvcGllZChjb3B5VG9DbGlwYm9hcmQodGV4dCkpO1xuICB9LCBbdGV4dF0pO1xuICB1c2VFZmZlY3QoKCkgPT4gKCkgPT4gc2V0Q29waWVkKGZhbHNlKSwgW3RleHRdKTtcblxuICByZXR1cm4gW2NvcGllZCwgY29weV07XG59XG5cbmV4cG9ydCBkZWZhdWx0IHVzZUNvcHlUb0NsaXBib2FyZDtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./utils/useCopyToClipBoard.js\n");

/***/ }),

/***/ "next/head":
/*!****************************!*\
  !*** external "next/head" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"next/head\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJuZXh0L2hlYWRcIj81ZWYyIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6Im5leHQvaGVhZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5leHQvaGVhZFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///next/head\n");

/***/ }),

/***/ "prismjs":
/*!**************************!*\
  !*** external "prismjs" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"prismjs\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJwcmlzbWpzXCI/MmVlYyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiJwcmlzbWpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicHJpc21qc1wiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///prismjs\n");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdFwiPzU4OGUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoicmVhY3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///react\n");

/***/ })

/******/ });