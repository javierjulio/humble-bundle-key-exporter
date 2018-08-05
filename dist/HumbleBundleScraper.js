(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define('HumbleBundleScraper', ['module'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod);
    global.HumbleBundleScraper = mod.exports;
  }
})(this, function (module) {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    } else {
      return Array.from(arr);
    }
  }

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  function delayOf(ms) {
    return new Promise(function (resolve) {
      return setTimeout(resolve, ms);
    });
  }

  function downloadFile(data, name) {
    var a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([data]));
    a.download = name;
    a.click();
    setTimeout(function () {
      return URL.revokeObjectURL(a.href);
    }, 500);
  }

  var hideRedeemed = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
      var checkbox;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              checkbox = document.getElementById('hide-redeemed');

              console.log('Hiding redeemed keys.');

              if (checkbox.checked) {
                _context.next = 6;
                break;
              }

              checkbox.click();
              _context.next = 6;
              return delayOf(250);

            case 6:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function hideRedeemed() {
      return _ref.apply(this, arguments);
    };
  }();

  var setFirstPage = function () {
    var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              console.log('Setting first page.');
              document.querySelector('.js-jump-to-page[data-index="0"]').click();
              _context2.next = 4;
              return delayOf(100);

            case 4:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    }));

    return function setFirstPage() {
      return _ref2.apply(this, arguments);
    };
  }();

  var getKeysForCurrentPage = function getKeysForCurrentPage() {
    return [].concat(_toConsumableArray(document.querySelectorAll('.unredeemed-keys-table tbody tr'))).map(function (row) {
      return {
        platform: row.querySelector('.platform :first-child').title,
        name: row.querySelector('.game-name h4').textContent,
        bundle: row.querySelector('.game-name p').textContent,
        bundle_url: row.querySelector('.game-name a').href
      };
    });
  };

  var hasNextPage = function hasNextPage() {
    return document.querySelector('.js-jump-to-page.current + .js-jump-to-page') !== null;
  };

  var setNextPage = function () {
    var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
      var page;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              page = document.querySelector('.js-jump-to-page.current + .js-jump-to-page');

              if (!(page !== null)) {
                _context3.next = 5;
                break;
              }

              page.click();
              _context3.next = 5;
              return delayOf(100);

            case 5:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined);
    }));

    return function setNextPage() {
      return _ref3.apply(this, arguments);
    };
  }();

  var getAllKeys = function () {
    var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
      var data;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              data = getKeysForCurrentPage();

              if (!hasNextPage()) {
                _context4.next = 11;
                break;
              }

              _context4.next = 4;
              return setNextPage();

            case 4:
              _context4.t0 = data;
              _context4.next = 7;
              return getAllKeys();

            case 7:
              _context4.t1 = _context4.sent;
              return _context4.abrupt('return', _context4.t0.concat.call(_context4.t0, _context4.t1));

            case 11:
              return _context4.abrupt('return', data);

            case 12:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, undefined);
    }));

    return function getAllKeys() {
      return _ref4.apply(this, arguments);
    };
  }();

  var index = function () {
    function index() {
      _classCallCheck(this, index);
    }

    _createClass(index, [{
      key: 'run',
      value: function run() {
        setFirstPage().then(hideRedeemed).then(getAllKeys).then(function (data) {
          return JSON.stringify(data, null, 2);
        }).then(function (json) {
          return downloadFile(json, 'humble-bundle-keys.json');
        });
      }
    }]);

    return index;
  }();

  module.exports = index;
});