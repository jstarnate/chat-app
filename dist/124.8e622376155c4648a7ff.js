(self.webpackChunkchat_app=self.webpackChunkchat_app||[]).push([[124],{9550:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";eval('/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "Z": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7294);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5697);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nfunction InputField(props) {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {\n    className: props.containerClassName\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {\n    className: "d--flex ai--center jc--between"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", {\n    className: "text--black text--bold",\n    htmlFor: props.id\n  }, props.label), props.children), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", {\n    id: props.id,\n    className: "".concat(props.inputClassName, " ").concat(props.error ? \'b--danger\' : \'b--gray-light\'),\n    type: props.type,\n    value: props.value || \'\',\n    onChange: props.onChangeEvent,\n    autoFocus: props.autoFocus\n  }), !!props.error && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {\n    "data-testid": "".concat(props.id, "-error"),\n    className: "d--block text--danger"\n  }, props.error));\n}\n\nInputField.propTypes = {\n  containerClassName: prop_types__WEBPACK_IMPORTED_MODULE_1__.string,\n  inputClassName: prop_types__WEBPACK_IMPORTED_MODULE_1__.string,\n  id: prop_types__WEBPACK_IMPORTED_MODULE_1__.string.isRequired,\n  label: prop_types__WEBPACK_IMPORTED_MODULE_1__.string.isRequired,\n  type: prop_types__WEBPACK_IMPORTED_MODULE_1__.string,\n  value: prop_types__WEBPACK_IMPORTED_MODULE_1__.string,\n  onChangeEvent: prop_types__WEBPACK_IMPORTED_MODULE_1__.func.isRequired,\n  error: prop_types__WEBPACK_IMPORTED_MODULE_1__.string,\n  autoFocus: prop_types__WEBPACK_IMPORTED_MODULE_1__.bool,\n  children: prop_types__WEBPACK_IMPORTED_MODULE_1__.element\n};\nInputField.defaultProps = {\n  containerClassName: \'mg-t--lg\',\n  inputClassName: \'b--1 b-rad--sm full-width pd--sm mg-t--sm\',\n  type: \'text\',\n  autoFocus: false\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (InputField);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jaGF0LWFwcC8uL2NsaWVudC9qcy9jb21wb25lbnRzL3V0aWxpdGllcy9JbnB1dEZpZWxkLmpzPzhiODciXSwibmFtZXMiOlsiSW5wdXRGaWVsZCIsInByb3BzIiwiY29udGFpbmVyQ2xhc3NOYW1lIiwiaWQiLCJsYWJlbCIsImNoaWxkcmVuIiwiaW5wdXRDbGFzc05hbWUiLCJlcnJvciIsInR5cGUiLCJ2YWx1ZSIsIm9uQ2hhbmdlRXZlbnQiLCJhdXRvRm9jdXMiLCJwcm9wVHlwZXMiLCJzdHJpbmciLCJmdW5jIiwiYm9vbCIsImVsZW1lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBO0FBQ0E7O0FBRUEsU0FBU0EsVUFBVCxDQUFvQkMsS0FBcEIsRUFBMkI7QUFDdkIsc0JBQ0k7QUFBSyxhQUFTLEVBQUVBLEtBQUssQ0FBQ0M7QUFBdEIsa0JBQ0k7QUFBSyxhQUFTLEVBQUM7QUFBZixrQkFDSTtBQUFPLGFBQVMsRUFBQyx3QkFBakI7QUFBMEMsV0FBTyxFQUFFRCxLQUFLLENBQUNFO0FBQXpELEtBQ0tGLEtBQUssQ0FBQ0csS0FEWCxDQURKLEVBS0tILEtBQUssQ0FBQ0ksUUFMWCxDQURKLGVBU0k7QUFDSSxNQUFFLEVBQUVKLEtBQUssQ0FBQ0UsRUFEZDtBQUVJLGFBQVMsWUFBS0YsS0FBSyxDQUFDSyxjQUFYLGNBQ0xMLEtBQUssQ0FBQ00sS0FBTixHQUFjLFdBQWQsR0FBNEIsZUFEdkIsQ0FGYjtBQUtJLFFBQUksRUFBRU4sS0FBSyxDQUFDTyxJQUxoQjtBQU1JLFNBQUssRUFBRVAsS0FBSyxDQUFDUSxLQUFOLElBQWUsRUFOMUI7QUFPSSxZQUFRLEVBQUVSLEtBQUssQ0FBQ1MsYUFQcEI7QUFRSSxhQUFTLEVBQUVULEtBQUssQ0FBQ1U7QUFSckIsSUFUSixFQW9CSyxDQUFDLENBQUNWLEtBQUssQ0FBQ00sS0FBUixpQkFDRztBQUNJLDZCQUFnQk4sS0FBSyxDQUFDRSxFQUF0QixXQURKO0FBRUksYUFBUyxFQUFDO0FBRmQsS0FHS0YsS0FBSyxDQUFDTSxLQUhYLENBckJSLENBREo7QUE4Qkg7O0FBRURQLFVBQVUsQ0FBQ1ksU0FBWCxHQUF1QjtBQUNuQlYsb0JBQWtCLEVBQUVXLDhDQUREO0FBRW5CUCxnQkFBYyxFQUFFTyw4Q0FGRztBQUduQlYsSUFBRSxFQUFFVSx5REFIZTtBQUluQlQsT0FBSyxFQUFFUyx5REFKWTtBQUtuQkwsTUFBSSxFQUFFSyw4Q0FMYTtBQU1uQkosT0FBSyxFQUFFSSw4Q0FOWTtBQU9uQkgsZUFBYSxFQUFFSSx1REFQSTtBQVFuQlAsT0FBSyxFQUFFTSw4Q0FSWTtBQVNuQkYsV0FBUyxFQUFFSSw0Q0FUUTtBQVVuQlYsVUFBUSxFQUFFVywrQ0FBT0E7QUFWRSxDQUF2QjtBQWFBaEIsVUFBVSxDQUFDaUIsWUFBWCxHQUEwQjtBQUN0QmYsb0JBQWtCLEVBQUUsVUFERTtBQUV0QkksZ0JBQWMsRUFBRSwyQ0FGTTtBQUd0QkUsTUFBSSxFQUFFLE1BSGdCO0FBSXRCRyxXQUFTLEVBQUU7QUFKVyxDQUExQjtBQU9BLGlFQUFlWCxVQUFmIiwiZmlsZSI6Ijk1NTAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgc3RyaW5nLCBmdW5jLCBib29sLCBlbGVtZW50IH0gZnJvbSAncHJvcC10eXBlcyc7XG5cbmZ1bmN0aW9uIElucHV0RmllbGQocHJvcHMpIHtcbiAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17cHJvcHMuY29udGFpbmVyQ2xhc3NOYW1lfT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdkLS1mbGV4IGFpLS1jZW50ZXIgamMtLWJldHdlZW4nPlxuICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9J3RleHQtLWJsYWNrIHRleHQtLWJvbGQnIGh0bWxGb3I9e3Byb3BzLmlkfT5cbiAgICAgICAgICAgICAgICAgICAge3Byb3BzLmxhYmVsfVxuICAgICAgICAgICAgICAgIDwvbGFiZWw+XG5cbiAgICAgICAgICAgICAgICB7cHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgaWQ9e3Byb3BzLmlkfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YCR7cHJvcHMuaW5wdXRDbGFzc05hbWV9ICR7XG4gICAgICAgICAgICAgICAgICAgIHByb3BzLmVycm9yID8gJ2ItLWRhbmdlcicgOiAnYi0tZ3JheS1saWdodCdcbiAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICB0eXBlPXtwcm9wcy50eXBlfVxuICAgICAgICAgICAgICAgIHZhbHVlPXtwcm9wcy52YWx1ZSB8fCAnJ31cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17cHJvcHMub25DaGFuZ2VFdmVudH1cbiAgICAgICAgICAgICAgICBhdXRvRm9jdXM9e3Byb3BzLmF1dG9Gb2N1c31cbiAgICAgICAgICAgIC8+XG5cbiAgICAgICAgICAgIHshIXByb3BzLmVycm9yICYmIChcbiAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICBkYXRhLXRlc3RpZD17YCR7cHJvcHMuaWR9LWVycm9yYH1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPSdkLS1ibG9jayB0ZXh0LS1kYW5nZXInPlxuICAgICAgICAgICAgICAgICAgICB7cHJvcHMuZXJyb3J9XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG4gICAgKTtcbn1cblxuSW5wdXRGaWVsZC5wcm9wVHlwZXMgPSB7XG4gICAgY29udGFpbmVyQ2xhc3NOYW1lOiBzdHJpbmcsXG4gICAgaW5wdXRDbGFzc05hbWU6IHN0cmluZyxcbiAgICBpZDogc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgbGFiZWw6IHN0cmluZy5pc1JlcXVpcmVkLFxuICAgIHR5cGU6IHN0cmluZyxcbiAgICB2YWx1ZTogc3RyaW5nLFxuICAgIG9uQ2hhbmdlRXZlbnQ6IGZ1bmMuaXNSZXF1aXJlZCxcbiAgICBlcnJvcjogc3RyaW5nLFxuICAgIGF1dG9Gb2N1czogYm9vbCxcbiAgICBjaGlsZHJlbjogZWxlbWVudCxcbn07XG5cbklucHV0RmllbGQuZGVmYXVsdFByb3BzID0ge1xuICAgIGNvbnRhaW5lckNsYXNzTmFtZTogJ21nLXQtLWxnJyxcbiAgICBpbnB1dENsYXNzTmFtZTogJ2ItLTEgYi1yYWQtLXNtIGZ1bGwtd2lkdGggcGQtLXNtIG1nLXQtLXNtJyxcbiAgICB0eXBlOiAndGV4dCcsXG4gICAgYXV0b0ZvY3VzOiBmYWxzZSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IElucHV0RmllbGQ7XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///9550\n')},969:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";eval('/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "Z": () => /* export default binding */ __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7294);\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(initialValue) {\n  var [value, modifyEvent] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(initialValue);\n  var [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);\n\n  function handle(fn, event) {\n    fn(event.target.value);\n  }\n\n  function handleError(obj) {\n    setError(obj ? obj.properties.message : null);\n  }\n\n  var data = {\n    value,\n    error,\n    onChangeEvent: handle.bind(null, modifyEvent)\n  };\n  return [value, data, handleError];\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jaGF0LWFwcC8uL2NsaWVudC9qcy9ob29rcy91c2VJbnB1dC5qcz9kMGNkIl0sIm5hbWVzIjpbImluaXRpYWxWYWx1ZSIsInZhbHVlIiwibW9kaWZ5RXZlbnQiLCJ1c2VTdGF0ZSIsImVycm9yIiwic2V0RXJyb3IiLCJoYW5kbGUiLCJmbiIsImV2ZW50IiwidGFyZ2V0IiwiaGFuZGxlRXJyb3IiLCJvYmoiLCJwcm9wZXJ0aWVzIiwibWVzc2FnZSIsImRhdGEiLCJvbkNoYW5nZUV2ZW50IiwiYmluZCJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBO0FBRUEsNkJBQWUsb0NBQVVBLFlBQVYsRUFBd0I7QUFDbkMsTUFBTSxDQUFDQyxLQUFELEVBQVFDLFdBQVIsSUFBdUJDLCtDQUFRLENBQUNILFlBQUQsQ0FBckM7QUFDQSxNQUFNLENBQUNJLEtBQUQsRUFBUUMsUUFBUixJQUFvQkYsK0NBQVEsQ0FBQyxJQUFELENBQWxDOztBQUVBLFdBQVNHLE1BQVQsQ0FBZ0JDLEVBQWhCLEVBQW9CQyxLQUFwQixFQUEyQjtBQUN2QkQsTUFBRSxDQUFDQyxLQUFLLENBQUNDLE1BQU4sQ0FBYVIsS0FBZCxDQUFGO0FBQ0g7O0FBRUQsV0FBU1MsV0FBVCxDQUFxQkMsR0FBckIsRUFBMEI7QUFDdEJOLFlBQVEsQ0FBQ00sR0FBRyxHQUFHQSxHQUFHLENBQUNDLFVBQUosQ0FBZUMsT0FBbEIsR0FBNEIsSUFBaEMsQ0FBUjtBQUNIOztBQUVELE1BQU1DLElBQUksR0FBRztBQUNUYixTQURTO0FBRVRHLFNBRlM7QUFHVFcsaUJBQWEsRUFBRVQsTUFBTSxDQUFDVSxJQUFQLENBQVksSUFBWixFQUFrQmQsV0FBbEI7QUFITixHQUFiO0FBTUEsU0FBTyxDQUFDRCxLQUFELEVBQVFhLElBQVIsRUFBY0osV0FBZCxDQUFQO0FBQ0giLCJmaWxlIjoiOTY5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChpbml0aWFsVmFsdWUpIHtcbiAgICBjb25zdCBbdmFsdWUsIG1vZGlmeUV2ZW50XSA9IHVzZVN0YXRlKGluaXRpYWxWYWx1ZSk7XG4gICAgY29uc3QgW2Vycm9yLCBzZXRFcnJvcl0gPSB1c2VTdGF0ZShudWxsKTtcblxuICAgIGZ1bmN0aW9uIGhhbmRsZShmbiwgZXZlbnQpIHtcbiAgICAgICAgZm4oZXZlbnQudGFyZ2V0LnZhbHVlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVFcnJvcihvYmopIHtcbiAgICAgICAgc2V0RXJyb3Iob2JqID8gb2JqLnByb3BlcnRpZXMubWVzc2FnZSA6IG51bGwpO1xuICAgIH1cblxuICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgIHZhbHVlLFxuICAgICAgICBlcnJvcixcbiAgICAgICAgb25DaGFuZ2VFdmVudDogaGFuZGxlLmJpbmQobnVsbCwgbW9kaWZ5RXZlbnQpLFxuICAgIH07XG5cbiAgICByZXR1cm4gW3ZhbHVlLCBkYXRhLCBoYW5kbGVFcnJvcl07XG59XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///969\n')}}]);