"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _indexModule = _interopRequireDefault(require("./index.module.less"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(props) {
  return _react.default.createElement("button", {
    className: (0, _classnames.default)(_indexModule.default.large, _indexModule.default.bold),
    style: {
      color: props.color
    }
  }, props.children);
}