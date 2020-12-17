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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_code_blocks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-code-blocks */ \"react-code-blocks\");\n/* harmony import */ var react_code_blocks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_code_blocks__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var prismjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prismjs */ \"prismjs\");\n/* harmony import */ var prismjs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prismjs__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var prismjs_themes_prism_okaidia_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prismjs/themes/prism-okaidia.css */ \"./node_modules/prismjs/themes/prism-okaidia.css\");\n/* harmony import */ var prismjs_themes_prism_okaidia_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prismjs_themes_prism_okaidia_css__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _utils_useCopyToClipBoard__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/useCopyToClipBoard */ \"./utils/useCopyToClipBoard.js\");\nvar _jsxFileName = \"/Users/ankit/Documents/crypto/gr8/panvala/donation-widget/widget-creator/pages/index.js\";\n\nvar __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;\n\n\n\n\n\nlet sampleHTML = `\n<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\"/>\n  <script src=\"panvala\"></script>\n</head>\n<body>\n  <div class=\"widget\"></div>\n</body>\n</html>`;\n\nfunction Home() {\n  const {\n    0: htmlText,\n    1: setHtmlText\n  } = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(sampleHTML);\n  const {\n    0: defaultAmount,\n    1: setDefaultAmount\n  } = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(50);\n  const {\n    0: recieversAddress,\n    1: setRecieversAddress\n  } = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])('');\n  const {\n    0: recieversName,\n    1: setRecieversName\n  } = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])('');\n  const [copied, copy] = Object(_utils_useCopyToClipBoard__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(htmlText);\n\n  function handleAmountChange({\n    target\n  }) {\n    let regExpr = new RegExp('^[0-9]+$'); // check for number\n\n    if (!regExpr.test(target.value)) {\n      setDefaultAmount('');\n    } else {\n      setDefaultAmount(target.value);\n    }\n  }\n\n  Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useEffect\"])(() => {\n    prismjs__WEBPACK_IMPORTED_MODULE_2___default.a.highlightAll();\n  }, [htmlText]);\n\n  function updateHtmlText(amount = 50, address = '') {\n    return `\n    <!DOCTYPE html>\n    <html lang=\"en\">\n    <head>\n      <meta charset=\"UTF-8\"/>\n      <script src=\"https://panvala.vercel.com/widget.js\"></script>\n    </head>\n    <body>\n      <div class=\"widget\"></div>\n      <script >\n        panWidget.init(${JSON.stringify({\n      defaultAmpunt: amount,\n      recieversAddress: address\n    })})\n      </script>\n    </body>\n    </html>`;\n  }\n\n  Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useEffect\"])(() => {\n    setHtmlText(updateHtmlText(defaultAmount, recieversAddress));\n  }, [defaultAmount, recieversAddress]);\n  return __jsx(\"div\", {\n    className: \"bg-gradient-to-r from-blue-900 to-blue-400\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 67,\n      columnNumber: 5\n    }\n  }, __jsx(\"div\", {\n    className: \"overflow-hidden h-screen max-w-6xl mx-auto\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 68,\n      columnNumber: 7\n    }\n  }, __jsx(\"h1\", {\n    className: \"text-4xl inline-block tracking-tight font-bold text-center leading-3 text-white sm:text-5xl md:text-6xl py-12 w-full\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 69,\n      columnNumber: 9\n    }\n  }, __jsx(\"span\", {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 70,\n      columnNumber: 11\n    }\n  }, \"Create Your Custom Widget For \"), __jsx(\"span\", {\n    className: \"text-yellow-300 block pt-4\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 71,\n      columnNumber: 11\n    }\n  }, \"PAN Donations\")), __jsx(\"div\", {\n    className: \"px-4 py-5 sm:p-6 flex justify-between\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 75,\n      columnNumber: 9\n    }\n  }, __jsx(\"div\", {\n    className: \"w-3/12\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 76,\n      columnNumber: 11\n    }\n  }, __jsx(\"div\", {\n    className: \"rounded-md shadow-sm items-baseline justify-between\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 77,\n      columnNumber: 13\n    }\n  }, __jsx(\"h3\", {\n    className: \"mt-2 text-lg tracking-tight text-white mb-2\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 78,\n      columnNumber: 15\n    }\n  }, \"Default amount for donation (in USD)\"), __jsx(\"div\", {\n    className: \"relative w-full\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 81,\n      columnNumber: 15\n    }\n  }, __jsx(\"input\", {\n    className: \"form-input block pl-3 pr-12 sm:text-sm sm:leading-5 rounded h-14 text-3xl w-full\",\n    placeholder: \"10.00\",\n    value: defaultAmount,\n    onChange: handleAmountChange,\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 82,\n      columnNumber: 17\n    }\n  }), __jsx(\"div\", {\n    className: \"absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 88,\n      columnNumber: 17\n    }\n  }, __jsx(\"span\", {\n    className: \"text-gray-500 sm:text-2xl sm:leading-5\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 89,\n      columnNumber: 19\n    }\n  }, \"USD\")))), __jsx(\"div\", {\n    className: \"rounded-md shadow-sm items-baseline justify-between mt-4\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 95,\n      columnNumber: 13\n    }\n  }, __jsx(\"h3\", {\n    className: \"mt-2 text-lg tracking-tight text-white mb-2\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 96,\n      columnNumber: 15\n    }\n  }, \"ETH Address For Donation (required)\"), __jsx(\"input\", {\n    placeholder: \"0x6A92864...\",\n    className: \"w-full form-input block pl-3 sm:text-sm sm:leading-5 rounded h-14 text-3xl\",\n    value: recieversAddress,\n    onChange: ({\n      target\n    }) => {\n      setRecieversAddress(target.value);\n    },\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 99,\n      columnNumber: 15\n    }\n  }))), __jsx(\"div\", {\n    className: \"w-8/12 h-full\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 109,\n      columnNumber: 11\n    }\n  }, __jsx(\"div\", {\n    className: \"Code relative whitespace-pre\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 110,\n      columnNumber: 13\n    }\n  }, __jsx(\"pre\", {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 111,\n      columnNumber: 15\n    }\n  }, __jsx(\"code\", {\n    className: `language-html`,\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 112,\n      columnNumber: 17\n    }\n  }, htmlText)), __jsx(\"button\", {\n    onClick: () => copy(htmlText),\n    className: \"absolute top-0 right-0 bg-blue-200 p-2 shadow-lg\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 116,\n      columnNumber: 15\n    }\n  }, copied ? 'Copied' : 'Copy to clipboard'))))));\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Home);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWdlcy9pbmRleC5qcz80NGQ4Il0sIm5hbWVzIjpbInNhbXBsZUhUTUwiLCJIb21lIiwiaHRtbFRleHQiLCJzZXRIdG1sVGV4dCIsInVzZVN0YXRlIiwiZGVmYXVsdEFtb3VudCIsInNldERlZmF1bHRBbW91bnQiLCJyZWNpZXZlcnNBZGRyZXNzIiwic2V0UmVjaWV2ZXJzQWRkcmVzcyIsInJlY2lldmVyc05hbWUiLCJzZXRSZWNpZXZlcnNOYW1lIiwiY29waWVkIiwiY29weSIsInVzZUNvcHlUb0NsaXBib2FyZCIsImhhbmRsZUFtb3VudENoYW5nZSIsInRhcmdldCIsInJlZ0V4cHIiLCJSZWdFeHAiLCJ0ZXN0IiwidmFsdWUiLCJ1c2VFZmZlY3QiLCJQcmlzbSIsImhpZ2hsaWdodEFsbCIsInVwZGF0ZUh0bWxUZXh0IiwiYW1vdW50IiwiYWRkcmVzcyIsIkpTT04iLCJzdHJpbmdpZnkiLCJkZWZhdWx0QW1wdW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBLElBQUlBLFVBQVUsR0FBSTtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQVZBOztBQVlBLFNBQVNDLElBQVQsR0FBZ0I7QUFDZCxRQUFNO0FBQUEsT0FBQ0MsUUFBRDtBQUFBLE9BQVdDO0FBQVgsTUFBMEJDLHNEQUFRLENBQUNKLFVBQUQsQ0FBeEM7QUFDQSxRQUFNO0FBQUEsT0FBQ0ssYUFBRDtBQUFBLE9BQWdCQztBQUFoQixNQUFvQ0Ysc0RBQVEsQ0FBQyxFQUFELENBQWxEO0FBQ0EsUUFBTTtBQUFBLE9BQUNHLGdCQUFEO0FBQUEsT0FBbUJDO0FBQW5CLE1BQTBDSixzREFBUSxDQUN0RCxFQURzRCxDQUF4RDtBQUdBLFFBQU07QUFBQSxPQUFDSyxhQUFEO0FBQUEsT0FBZ0JDO0FBQWhCLE1BQW9DTixzREFBUSxDQUFDLEVBQUQsQ0FBbEQ7QUFFQSxRQUFNLENB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REYsRUFJRTtBQUNFLGVBQVcsRUFBQyxjQURkO0FBRUUsYUFBUyxFQUFDLDRFQUZaO0FBR0UsU0FBSyxFQUFFUCxnQkFIVDtBQUlFLFlBQVEsRUFBRSxDQUFDO0FBQUVRO0FBQUYsS0FBRCxLQUFnQjtBQUN4QlAseUJBQW1CLENBQUNPLE1BQU0sQ0FBQ0ksS0FBUixDQUFuQjtBQUNELEtBTkg7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQUpGLENBbkJGLENBREYsRUFrQ0U7QUFBSyxhQUFTLEVBQUMsZUFBZjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0U7QUFBSyxhQUFTLEVBQUMsOEJBQWY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDRTtBQUFNLGFBQVMsRUFBRyxlQUFsQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0dqQixRQURILENBREYsQ0FERixFQU1FO0FBQ0UsV0FBTyxFQUFFLE1BQU1VLElBQUksQ0FBQ1YsUUFBRCxDQURyQjtBQUVFLGFBQVMsRUFBQyxrREFGWjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBSUdTLE1BQU0sR0FBRyxRQUFILEdBQWMsbUJBSnZCLENBTkYsQ0FERixDQWxDRixDQVBGLENBREYsQ0FERjtBQThERDs7QUFFY1YsbUVBQWYiLCJmaWxlIjoiLi9wYWdlcy9pbmRleC5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBDb3B5QmxvY2ssIGRyYWN1bGEgfSBmcm9tICdyZWFjdC1jb2RlLWJsb2Nrcyc7XG5pbXBvcnQgUHJpc20gZnJvbSAncHJpc21qcyc7XG5pbXBvcnQgJ3ByaXNtanMvdGhlbWVzL3ByaXNtLW9rYWlkaWEuY3NzJztcbmltcG9ydCB1c2VDb3B5VG9DbGlwYm9hcmQgZnJvbSAnLi4vdXRpbHMvdXNlQ29weVRvQ2xpcEJvYXJkJztcblxubGV0IHNhbXBsZUhUTUwgPSBgXG48IURPQ1RZUEUgaHRtbD5cbjxodG1sIGxhbmc9XCJlblwiPlxuPGhlYWQ+XG4gIDxtZXRhIGNoYXJzZXQ9XCJVVEYtOFwiLz5cbiAgPHNjcmlwdCBzcmM9XCJwYW52YWxhXCI+PC9zY3JpcHQ+XG48L2hlYWQ+XG48Ym9keT5cbiAgPGRpdiBjbGFzcz1cIndpZGdldFwiPjwvZGl2PlxuPC9ib2R5PlxuPC9odG1sPmA7XG5cbmZ1bmN0aW9uIEhvbWUoKSB7XG4gIGNvbnN0IFtodG1sVGV4dCwgc2V0SHRtbFRleHRdID0gdXNlU3RhdGUoc2FtcGxlSFRNTCk7XG4gIGNvbnN0IFtkZWZhdWx0QW1vdW50LCBzZXREZWZhdWx0QW1vdW50XSA9IHVzZVN0YXRlKDUwKTtcbiAgY29uc3QgW3JlY2lldmVyc0FkZHJlc3MsIHNldFJlY2lldmVyc0FkZHJlc3NdID0gdXNlU3RhdGUoXG4gICAgJydcbiAgKTtcbiAgY29uc3QgW3JlY2lldmVyc05hbWUsIHNldFJlY2lldmVyc05hbWVdID0gdXNlU3RhdGUoJycpO1xuXG4gIGNvbnN0IFtjb3BpZWQsIGNvcHldID0gdXNlQ29weVRvQ2xpcGJvYXJkKGh0bWxUZXh0KTtcbiAgZnVuY3Rpb24gaGFuZGxlQW1vdW50Q2hhbmdlKHsgdGFyZ2V0IH0pIHtcbiAgICBsZXQgcmVnRXhwciA9IG5ldyBSZWdFeHAoJ15bMC05XSskJyk7IC8vIGNoZWNrIGZvciBudW1iZXJcbiAgICBpZiAoIXJlZ0V4cHIudGVzdCh0YXJnZXQudmFsdWUpKSB7XG4gICAgICBzZXREZWZhdWx0QW1vdW50KCcnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2V0RGVmYXVsdEFtb3VudCh0YXJnZXQudmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgUHJpc20uaGlnaGxpZ2h0QWxsKCk7XG4gIH0sIFtodG1sVGV4dF0pO1xuXG4gIGZ1bmN0aW9uIHVwZGF0ZUh0bWxUZXh0KGFtb3VudCA9IDUwLCBhZGRyZXNzID0gJycpIHtcbiAgICByZXR1cm4gYFxuICAgIDwhRE9DVFlQRSBodG1sPlxuICAgIDxodG1sIGxhbmc9XCJlblwiPlxuICAgIDxoZWFkPlxuICAgICAgPG1ldGEgY2hhcnNldD1cIlVURi04XCIvPlxuICAgICAgPHNjcmlwdCBzcmM9XCJodHRwczovL3BhbnZhbGEudmVyY2VsLmNvbS93aWRnZXQuanNcIj48L3NjcmlwdD5cbiAgICA8L2hlYWQ+XG4gICAgPGJvZHk+XG4gICAgICA8ZGl2IGNsYXNzPVwid2lkZ2V0XCI+PC9kaXY+XG4gICAgICA8c2NyaXB0ID5cbiAgICAgICAgcGFuV2lkZ2V0LmluaXQoJHtKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgZGVmYXVsdEFtcHVudDogYW1vdW50LFxuICAgICAgICAgIHJlY2lldmVyc0FkZHJlc3M6IGFkZHJlc3MsXG4gICAgICAgIH0pfSlcbiAgICAgIDwvc2NyaXB0PlxuICAgIDwvYm9keT5cbiAgICA8L2h0bWw+YDtcbiAgfVxuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgc2V0SHRtbFRleHQoXG4gICAgICB1cGRhdGVIdG1sVGV4dChkZWZhdWx0QW1vdW50LCByZWNpZXZlcnNBZGRyZXNzKVxuICAgICk7XG4gIH0sIFtkZWZhdWx0QW1vdW50LCByZWNpZXZlcnNBZGRyZXNzXSk7XG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9J2JnLWdyYWRpZW50LXRvLXIgZnJvbS1ibHVlLTkwMCB0by1ibHVlLTQwMCc+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT0nb3ZlcmZsb3ctaGlkZGVuIGgtc2NyZWVuIG1heC13LTZ4bCBteC1hdXRvJz5cbiAgICAgICAgPGgxIGNsYXNzTmFtZT0ndGV4dC00eGwgaW5saW5lLWJsb2NrIHRyYWNraW5nLXRpZ2h0IGZvbnQtYm9sZCB0ZXh0LWNlbnRlciBsZWFkaW5nLTMgdGV4dC13aGl0ZSBzbTp0ZXh0LTV4bCBtZDp0ZXh0LTZ4bCBweS0xMiB3LWZ1bGwnPlxuICAgICAgICAgIDxzcGFuPkNyZWF0ZSBZb3VyIEN1c3RvbSBXaWRnZXQgRm9yIDwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9J3RleHQteWVsbG93LTMwMCBibG9jayBwdC00Jz5cbiAgICAgICAgICAgIFBBTiBEb25hdGlvbnNcbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgIDwvaDE+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdweC00IHB5LTUgc206cC02IGZsZXgganVzdGlmeS1iZXR3ZWVuJz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ndy0zLzEyJz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3VuZGVkLW1kIHNoYWRvdy1zbSBpdGVtcy1iYXNlbGluZSBqdXN0aWZ5LWJldHdlZW4nPlxuICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPSdtdC0yIHRleHQtbGcgdHJhY2tpbmctdGlnaHQgdGV4dC13aGl0ZSBtYi0yJz5cbiAgICAgICAgICAgICAgICBEZWZhdWx0IGFtb3VudCBmb3IgZG9uYXRpb24gKGluIFVTRClcbiAgICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JlbGF0aXZlIHctZnVsbCc+XG4gICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9J2Zvcm0taW5wdXQgYmxvY2sgcGwtMyBwci0xMiBzbTp0ZXh0LXNtIHNtOmxlYWRpbmctNSByb3VuZGVkIGgtMTQgdGV4dC0zeGwgdy1mdWxsJ1xuICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9JzEwLjAwJ1xuICAgICAgICAgICAgICAgICAgdmFsdWU9e2RlZmF1bHRBbW91bnR9XG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17aGFuZGxlQW1vdW50Q2hhbmdlfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2Fic29sdXRlIGluc2V0LXktMCByaWdodC0wIHByLTMgZmxleCBpdGVtcy1jZW50ZXIgcG9pbnRlci1ldmVudHMtbm9uZSc+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9J3RleHQtZ3JheS01MDAgc206dGV4dC0yeGwgc206bGVhZGluZy01Jz5cbiAgICAgICAgICAgICAgICAgICAgVVNEXG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm91bmRlZC1tZCBzaGFkb3ctc20gaXRlbXMtYmFzZWxpbmUganVzdGlmeS1iZXR3ZWVuIG10LTQnPlxuICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPSdtdC0yIHRleHQtbGcgdHJhY2tpbmctdGlnaHQgdGV4dC13aGl0ZSBtYi0yJz5cbiAgICAgICAgICAgICAgICBFVEggQWRkcmVzcyBGb3IgRG9uYXRpb24gKHJlcXVpcmVkKVxuICAgICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj0nMHg2QTkyODY0Li4uJ1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0ndy1mdWxsIGZvcm0taW5wdXQgYmxvY2sgcGwtMyBzbTp0ZXh0LXNtIHNtOmxlYWRpbmctNSByb3VuZGVkIGgtMTQgdGV4dC0zeGwnXG4gICAgICAgICAgICAgICAgdmFsdWU9e3JlY2lldmVyc0FkZHJlc3N9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyh7IHRhcmdldCB9KSA9PiB7XG4gICAgICAgICAgICAgICAgICBzZXRSZWNpZXZlcnNBZGRyZXNzKHRhcmdldC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSd3LTgvMTIgaC1mdWxsJz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdDb2RlIHJlbGF0aXZlIHdoaXRlc3BhY2UtcHJlJz5cbiAgICAgICAgICAgICAgPHByZT5cbiAgICAgICAgICAgICAgICA8Y29kZSBjbGFzc05hbWU9e2BsYW5ndWFnZS1odG1sYH0+XG4gICAgICAgICAgICAgICAgICB7aHRtbFRleHR9XG4gICAgICAgICAgICAgICAgPC9jb2RlPlxuICAgICAgICAgICAgICA8L3ByZT5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGNvcHkoaHRtbFRleHQpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0nYWJzb2x1dGUgdG9wLTAgcmlnaHQtMCBiZy1ibHVlLTIwMCBwLTIgc2hhZG93LWxnJ1xuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge2NvcGllZCA/ICdDb3BpZWQnIDogJ0NvcHkgdG8gY2xpcGJvYXJkJ31cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgSG9tZTtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/index.js\n");

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

/***/ }),

/***/ "react-code-blocks":
/*!************************************!*\
  !*** external "react-code-blocks" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-code-blocks\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1jb2RlLWJsb2Nrc1wiP2Q1ZGUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoicmVhY3QtY29kZS1ibG9ja3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1jb2RlLWJsb2Nrc1wiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///react-code-blocks\n");

/***/ })

/******/ });