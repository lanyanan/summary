'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PanelBase = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Base = require('./Base.class');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 面板基类
 */
var PanelBase = exports.PanelBase = function (_BaseClass) {
    _inherits(PanelBase, _BaseClass);

    function PanelBase() {
        _classCallCheck(this, PanelBase);

        return _possibleConstructorReturn(this, (PanelBase.__proto__ || Object.getPrototypeOf(PanelBase)).call(this));
        // if (new.target === PanelBase) {
        //     throw new Error('This class cannot be instantiated!');
        // }
    }

    /**
     * 加载css文件
     * @param  {String} fileName 文件名
     * @param  {String} base     基准路径，默认为 ../static/css/
     */


    _createClass(PanelBase, [{
        key: 'loadCssFile',
        value: function loadCssFile(fileName) {
            var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '../static/';

            var link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = base + fileName;
            document.head.appendChild(link);
        }
    }]);

    return PanelBase;
}(_Base.BaseClass);