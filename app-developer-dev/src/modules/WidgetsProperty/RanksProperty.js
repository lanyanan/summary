'use strict';
/**
 * 九宫格行列
 * @author   hey
 * @datetime 2017-06-05
 */

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RanksProperty = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reflux = require('reflux');

var _reflux2 = _interopRequireDefault(_reflux);

var _Actions = require('../../apps/playground/Actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RanksProperty = exports.RanksProperty = {
    getComponent: _react2.default.createClass({
        addNum: function addNum(e) {
            e.preventDefault();
            e.stopPropagation();
            var type = e.target.getAttribute('data-type');
            var row = Number(e.target.getAttribute('data-row'));
            var column = Number(e.target.getAttribute('data-column'));
            if (type == "row") {
                if (row == 2) return false;
                var height = this.getNum(row + 1, column);

                _Actions.Actions.changeSize('height', height);
                _Actions.Actions.changeWidgetInfo('row', row + 1);
            } else {
                if (column == 4) return false;
                var _height = this.getNum(row, column + 1);

                _Actions.Actions.changeSize('height', _height);
                _Actions.Actions.changeWidgetInfo('column', column + 1);
            }
        },
        subNum: function subNum(e) {
            e.preventDefault();
            e.stopPropagation();
            var type = e.target.getAttribute('data-type');
            var row = Number(e.target.getAttribute('data-row'));
            var column = Number(e.target.getAttribute('data-column'));

            if (type == "row") {
                if (row === 1) return false;
                var height = this.getNum(row - 1, column);

                _Actions.Actions.changeSize('height', height);
                _Actions.Actions.changeWidgetInfo('row', row - 1);
            } else {
                if (column === 2) return false;
                var _height2 = this.getNum(row, column - 1);

                _Actions.Actions.changeSize('height', _height2);
                _Actions.Actions.changeWidgetInfo('column', column - 1);
            }
        },
        getNum: function getNum(row, column) {
            var height = 184;
            var num = row * column;
            switch (num) {
                case 2:
                    height = 184;
                    break;
                case 3:
                    height = 128;
                    break;
                case 6:
                    height = 247;
                    break;
                case 8:
                    height = 247;
                    break;
            }
            if (row == 2 && column == 2) {
                height = 247;
            }
            if (row == 1 && column == 4) {
                height = 128;
            }
            return height;
        },
        render: function render() {
            var row = this.props.row ? this.props.row : 1,
                column = this.props.column ? this.props.column : 2;
            return _react2.default.createElement(
                'section',
                { className: 'speeddial-ranks' },
                _react2.default.createElement(
                    'span',
                    null,
                    '\u884C\u5217'
                ),
                _react2.default.createElement(
                    'section',
                    { className: 'speeddial-ranks-row' },
                    _react2.default.createElement(
                        'em',
                        { className: 'sub', 'data-type': 'row', 'data-row': row, 'data-column': column, onClick: this.subNum },
                        '-'
                    ),
                    _react2.default.createElement(
                        'span',
                        null,
                        row
                    ),
                    _react2.default.createElement(
                        'em',
                        { className: 'add', 'data-type': 'row', 'data-row': row, 'data-column': column, onClick: this.addNum },
                        '+'
                    )
                ),
                _react2.default.createElement(
                    'section',
                    { className: 'speeddial-ranks-column' },
                    _react2.default.createElement(
                        'em',
                        { className: 'sub', 'data-type': 'column', 'data-row': row, 'data-column': column, onClick: this.subNum },
                        '-'
                    ),
                    _react2.default.createElement(
                        'span',
                        null,
                        column
                    ),
                    _react2.default.createElement(
                        'em',
                        { className: 'add', 'data-type': 'column', 'data-row': row, 'data-column': column, onClick: this.addNum },
                        '+'
                    )
                )
            );
        }
    })
};