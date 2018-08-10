'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _chromeRemoteInterface = require('chrome-remote-interface');

var _chromeRemoteInterface2 = _interopRequireDefault(_chromeRemoteInterface);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DevToolsService = function () {
    function DevToolsService() {
        (0, _classCallCheck3.default)(this, DevToolsService);
    }

    (0, _createClass3.default)(DevToolsService, [{
        key: 'beforeSession',
        value: function beforeSession(_, caps) {
            if (caps.browserName !== 'chrome' || caps.version && caps.version < 63) {
                console.error('The wdio-devtools-service currently only supports Chrome version 63 and up');
            }
        }
    }, {
        key: 'before',
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
                var _this = this;

                var _client, host, port;

                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return this._findChromePort();

                            case 2:
                                this.chromePort = _context.sent;
                                _context.next = 5;
                                return this._getCDPClient(this.chromePort);

                            case 5:
                                this.client = _context.sent;


                                /**
                                 * allow to easily access the CDP from the browser object
                                 */
                                browser.addCommand('cdp', function (domain, command) {
                                    var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

                                    if (!_this.client[domain]) {
                                        throw new Error(`Domain "${domain}" doesn't exist in the Chrome DevTools protocol`);
                                    }

                                    if (!_this.client[domain][command]) {
                                        throw new Error(`The "${domain}" domain doesn't have a method called "${command}"`);
                                    }

                                    return new _promise2.default(function (resolve, reject) {
                                        return _this.client[domain][command](args, function (err, result) {
                                            if (err) {
                                                return reject(new Error(`Chrome DevTools Error: ${result.message}`));
                                            }

                                            return resolve(result);
                                        });
                                    });
                                });

                                /**
                                 * helper method to receive Chrome remote debugging connection data to
                                 * e.g. use external tools like lighthouse
                                 */
                                _client = this.client, host = _client.host, port = _client.port;

                                browser.addCommand('cdpConnection', function () {
                                    return { host, port };
                                });

                                /**
                                 * propagate CDP events to the browser event listener
                                 */
                                this.client.on('event', function (event) {
                                    return browser.emit(event.method || 'event', event.params);
                                });

                            case 10:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function before() {
                return _ref.apply(this, arguments);
            }

            return before;
        }()
    }, {
        key: '_findChromePort',
        value: function () {
            var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.prev = 0;
                                _context2.next = 3;
                                return browser.url('chrome://version');

                            case 3:
                                return _context2.abrupt('return', browser.session().value['goog:chromeOptions'].debuggerAddress.split(":")[1]);

                            case 6:
                                _context2.prev = 6;
                                _context2.t0 = _context2['catch'](0);

                            case 8:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[0, 6]]);
            }));

            function _findChromePort() {
                return _ref2.apply(this, arguments);
            }

            return _findChromePort;
        }()
    }, {
        key: '_getCDPClient',
        value: function () {
            var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(port) {
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                return _context3.abrupt('return', new _promise2.default(function (resolve) {
                                    return (0, _chromeRemoteInterface2.default)({
                                        port,
                                        host: 'localhost',
                                        target: function target(targets) {
                                            return targets.findIndex(function (t) {
                                                return t.type === 'page';
                                            });
                                        }
                                    }, resolve);
                                }));

                            case 1:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function _getCDPClient(_x2) {
                return _ref3.apply(this, arguments);
            }

            return _getCDPClient;
        }()
    }]);
    return DevToolsService;
}();

exports.default = DevToolsService;
module.exports = exports['default'];
