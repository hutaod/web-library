import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

var ImageFail = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGIAAABECAMAAABNjhAXAAAAllBMVEUAAAD////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AJcWoAAAAMXRSTlMA9vDfGRcD6EEG0Pt8Jri1h4QgCZ5HEu3NYEQy8sG5czkN2K+olol+ZVctyI5NalIqfjVxpQAAAghJREFUWMPd18lS40AQBFCpW/vufccGbLANzEz+/89NeCIGu5DUhejSAd7Rlwy5ldUl5xsJosGdVlD6brAMnB74VYirsPKlA+LMBeVmsWhCnqAuyQUTIoUmKpJLcNHMlcrIFdqoXOakE7RLRM48w63S80rcyCT6QA/CcxyPHIdAPyoQl5/ID5X91AiZiDCwfmHBRGBpGzFgI55sIwo2orCN0GyEto1QbISyjQAbgW/wFDJnwb9RdID4IArpXpS+Vwr3IgKDb/dpwc4oI35GeTN3xU1a432Bij9N6Gmv98UvACjNj5oZ36iMu/jXuHhm7m7DG8Xd3cEL/kknthsI/xfMhj3tUasU/81HvWyDowdcjXvZaV9xa9HDZh6BcFfi3xf3GpSesvvOsttX0hgfFYEj6jfqnkUT/BAEaaCMRxCkgTKOILgGTvedV/zhGgTTwEkIbDsu2xsQ5gaODrg4dorYgjA3cKdr4byzC8LUwLhK39+3k8DXYb2B5wRX6dtnI55AGBoYbN0v9WaXgmhv4HAD/gbip5+hgcc1ata7ztOvvYFegSZqxSa84VPGpxmahWcmYRrCVphz08+eNs7KBSRozzD9FEQ8tF/bGwhJfGb6CZjfNyb8cSHnpSkjnkPSZsR8FgooYmb6CXiMayuyuD1d7Q6QR3eJCXpxINOvH6/vEXv0ZeD8IH8B+ZsDuHQ1s98AAAAASUVORK5CYII=";

var LazyImage =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(LazyImage, _React$PureComponent);

  function LazyImage(props) {
    var _this;

    _classCallCheck(this, LazyImage);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(LazyImage).call(this, props));

    _this.onError = function () {
      var error = _this.props.error;

      if (!error) {
        _this.setState({
          src: ImageFail,
          isFail: true
        });
      } else {
        _this.setState({
          src: error
        });
      }
    };

    _this.state = {
      src: _this.props.src,
      isFail: false
    };
    return _this;
  }

  _createClass(LazyImage, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          width = _this$props.width,
          height = _this$props.height,
          onClick = _this$props.onClick,
          className = _this$props.className;
      var _this$state = this.state,
          src = _this$state.src,
          isFail = _this$state.isFail;
      var ImageHtml = isFail ? React.createElement("div", {
        className: classNames('al-load-fail', className),
        style: {
          width: width,
          height: height
        }
      }, React.createElement("img", {
        src: ImageFail,
        onClick: onClick,
        onError: this.onError
      })) : React.createElement("img", {
        className: className,
        src: src,
        onClick: onClick,
        style: {
          width: width,
          height: height
        },
        onError: this.onError
      });
      return ImageHtml;
    }
  }]);

  return LazyImage;
}(React.PureComponent);

LazyImage.propTypes = {
  className: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  src: PropTypes.string,
  onClick: PropTypes.func,
  error: PropTypes.string
};
LazyImage.defaultProps = {
  className: '',
  // width: "auto",
  // height: "auto",
  error: '',
  onClick: function onClick() {}
};

var Button =
/*#__PURE__*/
function (_Component) {
  _inherits(Button, _Component);

  function Button() {
    _classCallCheck(this, Button);

    return _possibleConstructorReturn(this, _getPrototypeOf(Button).apply(this, arguments));
  }

  _createClass(Button, [{
    key: "render",
    value: function render() {
      return React.createElement("div", null, "123");
    }
  }]);

  return Button;
}(Component);

export { Button, LazyImage };
