(self.webpackChunkchat_app=self.webpackChunkchat_app||[]).push([[371],{3371:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7294);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9669);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var Utilities_InputField__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9550);\n/* harmony import */ var Hooks_useInput__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(969);\nfunction _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }\n\n\n\n\n\n\nfunction Index() {\n  var [username, usernameData, setUsernameError] = (0,Hooks_useInput__WEBPACK_IMPORTED_MODULE_3__/* .default */ .Z)(null);\n  var [password, passwordData, setPasswordError] = (0,Hooks_useInput__WEBPACK_IMPORTED_MODULE_3__/* .default */ .Z)(null);\n  var [authError, setAuthError] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);\n  var [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);\n\n  function submit(event) {\n    event.preventDefault();\n    setLoading(true);\n    (0,axios__WEBPACK_IMPORTED_MODULE_1__.post)(\'/signin\', {\n      username,\n      password\n    }).then((_ref) => {\n      var {\n        data\n      } = _ref;\n      sessionStorage.setItem(\'jwt-token\', data.token);\n      location = \'/home\';\n    }).catch(error => {\n      var {\n        data\n      } = error.response;\n      setUsernameError(data.username);\n      setPasswordError(data.password);\n      setAuthError(data.auth);\n      setLoading(false);\n    });\n  }\n\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("section", null, !!authError && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {\n    className: "text--danger mg-t--md"\n  }, authError), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("form", {\n    "data-testid": "form",\n    onSubmit: submit\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Utilities_InputField__WEBPACK_IMPORTED_MODULE_2__/* .default */ .Z, _extends({\n    id: "username",\n    label: "Username",\n    autoFocus: true\n  }, usernameData)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Utilities_InputField__WEBPACK_IMPORTED_MODULE_2__/* .default */ .Z, _extends({\n    id: "password",\n    type: "password",\n    label: "Password"\n  }, passwordData)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {\n    className: "d--flex ai--center jc--between mg-t--lg"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {\n    className: "btn btn--primary font--lg text--bold pd-t--sm pd-b--sm pd-l--lg pd-r--lg b-rad--sm",\n    disabled: !username || !password || loading\n  }, "Sign in"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("a", {\n    className: "text--gray-light font--lg index__forgot",\n    href: ""\n  }, "I forgot my password"))));\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Index);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jaGF0LWFwcC8uL2NsaWVudC9qcy92aWV3cy9JbmRleC5qcz84NGFjIl0sIm5hbWVzIjpbIkluZGV4IiwidXNlcm5hbWUiLCJ1c2VybmFtZURhdGEiLCJzZXRVc2VybmFtZUVycm9yIiwidXNlSW5wdXQiLCJwYXNzd29yZCIsInBhc3N3b3JkRGF0YSIsInNldFBhc3N3b3JkRXJyb3IiLCJhdXRoRXJyb3IiLCJzZXRBdXRoRXJyb3IiLCJ1c2VTdGF0ZSIsImxvYWRpbmciLCJzZXRMb2FkaW5nIiwic3VibWl0IiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsInBvc3QiLCJ0aGVuIiwiZGF0YSIsInNlc3Npb25TdG9yYWdlIiwic2V0SXRlbSIsInRva2VuIiwibG9jYXRpb24iLCJjYXRjaCIsImVycm9yIiwicmVzcG9uc2UiLCJhdXRoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVNBLEtBQVQsR0FBaUI7QUFDYixNQUFNLENBQUNDLFFBQUQsRUFBV0MsWUFBWCxFQUF5QkMsZ0JBQXpCLElBQTZDQyxnRUFBUSxDQUFDLElBQUQsQ0FBM0Q7QUFDQSxNQUFNLENBQUNDLFFBQUQsRUFBV0MsWUFBWCxFQUF5QkMsZ0JBQXpCLElBQTZDSCxnRUFBUSxDQUFDLElBQUQsQ0FBM0Q7QUFDQSxNQUFNLENBQUNJLFNBQUQsRUFBWUMsWUFBWixJQUE0QkMsK0NBQVEsQ0FBQyxJQUFELENBQTFDO0FBQ0EsTUFBTSxDQUFDQyxPQUFELEVBQVVDLFVBQVYsSUFBd0JGLCtDQUFRLENBQUMsS0FBRCxDQUF0Qzs7QUFFQSxXQUFTRyxNQUFULENBQWdCQyxLQUFoQixFQUF1QjtBQUNuQkEsU0FBSyxDQUFDQyxjQUFOO0FBRUFILGNBQVUsQ0FBQyxJQUFELENBQVY7QUFFQUksK0NBQUksQ0FBQyxTQUFELEVBQVk7QUFBRWYsY0FBRjtBQUFZSTtBQUFaLEtBQVosQ0FBSixDQUNLWSxJQURMLENBQ1UsVUFBYztBQUFBLFVBQWI7QUFBRUM7QUFBRixPQUFhO0FBQ2hCQyxvQkFBYyxDQUFDQyxPQUFmLENBQXVCLFdBQXZCLEVBQW9DRixJQUFJLENBQUNHLEtBQXpDO0FBQ0FDLGNBQVEsR0FBRyxPQUFYO0FBQ0gsS0FKTCxFQUtLQyxLQUxMLENBS1dDLEtBQUssSUFBSTtBQUNaLFVBQU07QUFBRU47QUFBRixVQUFXTSxLQUFLLENBQUNDLFFBQXZCO0FBRUF0QixzQkFBZ0IsQ0FBQ2UsSUFBSSxDQUFDakIsUUFBTixDQUFoQjtBQUNBTSxzQkFBZ0IsQ0FBQ1csSUFBSSxDQUFDYixRQUFOLENBQWhCO0FBQ0FJLGtCQUFZLENBQUNTLElBQUksQ0FBQ1EsSUFBTixDQUFaO0FBQ0FkLGdCQUFVLENBQUMsS0FBRCxDQUFWO0FBQ0gsS0FaTDtBQWFIOztBQUVELHNCQUNJLGtFQUNLLENBQUMsQ0FBQ0osU0FBRixpQkFDRztBQUFHLGFBQVMsRUFBQztBQUFiLEtBQXNDQSxTQUF0QyxDQUZSLGVBS0k7QUFBTSxtQkFBWSxNQUFsQjtBQUF5QixZQUFRLEVBQUVLO0FBQW5DLGtCQUNJLGlEQUFDLGtFQUFEO0FBQ0ksTUFBRSxFQUFDLFVBRFA7QUFFSSxTQUFLLEVBQUMsVUFGVjtBQUdJLGFBQVM7QUFIYixLQUlRWCxZQUpSLEVBREosZUFRSSxpREFBQyxrRUFBRDtBQUNJLE1BQUUsRUFBQyxVQURQO0FBRUksUUFBSSxFQUFDLFVBRlQ7QUFHSSxTQUFLLEVBQUM7QUFIVixLQUlRSSxZQUpSLEVBUkosZUFlSTtBQUFLLGFBQVMsRUFBQztBQUFmLGtCQUNJO0FBQ0ksYUFBUyxFQUFDLG9GQURkO0FBRUksWUFBUSxFQUFFLENBQUNMLFFBQUQsSUFBYSxDQUFDSSxRQUFkLElBQTBCTTtBQUZ4QyxlQURKLGVBT0k7QUFDSSxhQUFTLEVBQUMseUNBRGQ7QUFFSSxRQUFJLEVBQUM7QUFGVCw0QkFQSixDQWZKLENBTEosQ0FESjtBQXFDSDs7QUFFRCxpRUFBZVgsS0FBZiIsImZpbGUiOiIzMzcxLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgcG9zdCB9IGZyb20gJ2F4aW9zJztcbmltcG9ydCBJbnB1dEZpZWxkIGZyb20gJ1V0aWxpdGllcy9JbnB1dEZpZWxkJztcbmltcG9ydCB1c2VJbnB1dCBmcm9tICdIb29rcy91c2VJbnB1dCc7XG5cbmZ1bmN0aW9uIEluZGV4KCkge1xuICAgIGNvbnN0IFt1c2VybmFtZSwgdXNlcm5hbWVEYXRhLCBzZXRVc2VybmFtZUVycm9yXSA9IHVzZUlucHV0KG51bGwpO1xuICAgIGNvbnN0IFtwYXNzd29yZCwgcGFzc3dvcmREYXRhLCBzZXRQYXNzd29yZEVycm9yXSA9IHVzZUlucHV0KG51bGwpO1xuICAgIGNvbnN0IFthdXRoRXJyb3IsIHNldEF1dGhFcnJvcl0gPSB1c2VTdGF0ZShudWxsKTtcbiAgICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgICBmdW5jdGlvbiBzdWJtaXQoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBzZXRMb2FkaW5nKHRydWUpO1xuXG4gICAgICAgIHBvc3QoJy9zaWduaW4nLCB7IHVzZXJuYW1lLCBwYXNzd29yZCB9KVxuICAgICAgICAgICAgLnRoZW4oKHsgZGF0YSB9KSA9PiB7XG4gICAgICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgnand0LXRva2VuJywgZGF0YS50b2tlbik7XG4gICAgICAgICAgICAgICAgbG9jYXRpb24gPSAnL2hvbWUnO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBkYXRhIH0gPSBlcnJvci5yZXNwb25zZTtcblxuICAgICAgICAgICAgICAgIHNldFVzZXJuYW1lRXJyb3IoZGF0YS51c2VybmFtZSk7XG4gICAgICAgICAgICAgICAgc2V0UGFzc3dvcmRFcnJvcihkYXRhLnBhc3N3b3JkKTtcbiAgICAgICAgICAgICAgICBzZXRBdXRoRXJyb3IoZGF0YS5hdXRoKTtcbiAgICAgICAgICAgICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICAgIDxzZWN0aW9uPlxuICAgICAgICAgICAgeyEhYXV0aEVycm9yICYmIChcbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9J3RleHQtLWRhbmdlciBtZy10LS1tZCc+e2F1dGhFcnJvcn08L3A+XG4gICAgICAgICAgICApfVxuXG4gICAgICAgICAgICA8Zm9ybSBkYXRhLXRlc3RpZD0nZm9ybScgb25TdWJtaXQ9e3N1Ym1pdH0+XG4gICAgICAgICAgICAgICAgPElucHV0RmllbGRcbiAgICAgICAgICAgICAgICAgICAgaWQ9J3VzZXJuYW1lJ1xuICAgICAgICAgICAgICAgICAgICBsYWJlbD0nVXNlcm5hbWUnXG4gICAgICAgICAgICAgICAgICAgIGF1dG9Gb2N1c1xuICAgICAgICAgICAgICAgICAgICB7Li4udXNlcm5hbWVEYXRhfVxuICAgICAgICAgICAgICAgIC8+XG5cbiAgICAgICAgICAgICAgICA8SW5wdXRGaWVsZFxuICAgICAgICAgICAgICAgICAgICBpZD0ncGFzc3dvcmQnXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9J3Bhc3N3b3JkJ1xuICAgICAgICAgICAgICAgICAgICBsYWJlbD0nUGFzc3dvcmQnXG4gICAgICAgICAgICAgICAgICAgIHsuLi5wYXNzd29yZERhdGF9XG4gICAgICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdkLS1mbGV4IGFpLS1jZW50ZXIgamMtLWJldHdlZW4gbWctdC0tbGcnPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9J2J0biBidG4tLXByaW1hcnkgZm9udC0tbGcgdGV4dC0tYm9sZCBwZC10LS1zbSBwZC1iLS1zbSBwZC1sLS1sZyBwZC1yLS1sZyBiLXJhZC0tc20nXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17IXVzZXJuYW1lIHx8ICFwYXNzd29yZCB8fCBsb2FkaW5nfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIFNpZ24gaW5cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgICAgICAgICAgPGFcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0ndGV4dC0tZ3JheS1saWdodCBmb250LS1sZyBpbmRleF9fZm9yZ290J1xuICAgICAgICAgICAgICAgICAgICAgICAgaHJlZj0nJz5cbiAgICAgICAgICAgICAgICAgICAgICAgIEkgZm9yZ290IG15IHBhc3N3b3JkXG4gICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgPC9zZWN0aW9uPlxuICAgICk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IEluZGV4O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///3371\n')}}]);