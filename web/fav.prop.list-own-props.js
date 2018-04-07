(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g=(g.fav||(g.fav = {}));g=(g.prop||(g.prop = {}));g.listOwnProps = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var listOwnKeys = require('@fav/prop.list-own-keys');
var listOwnSymbols = require('@fav/prop.list-own-symbols');

function listOwnProps(obj) {
  return listOwnKeys(obj).concat(listOwnSymbols(obj));
}

module.exports = listOwnProps;

},{"@fav/prop.list-own-keys":2,"@fav/prop.list-own-symbols":3}],2:[function(require,module,exports){
'use strict';

function listOwnKeys(obj) {
  switch (typeof obj) {
    case 'object': {
      return Object.getOwnPropertyNames(obj || {});
    }
    case 'string': {
      obj = new String(obj);
      return Object.getOwnPropertyNames(obj);
    }
    case 'function': {
      var arr = Object.getOwnPropertyNames(obj);
      var hasName = false;
      for (var i = arr.length - 1; i >= 0; i--) {
        var key = arr[i];
        /* istanbul ignore next */
        switch (key) {
          case 'caller':
          case 'arguments': {
            arr.splice(i, 1);
            break;
          }
          case 'name': {
            hasName = true;
            break;
          }
        }
      }
      /* istanbul ignore if */
      if (!hasName) { // A function don't have `name` prop on IE
        arr.push('name');
      }
      return arr;
    }
    default: {
      return [];
    }
  }
}

module.exports = listOwnKeys;

},{}],3:[function(require,module,exports){
'use strict';

function listOwnSymbols(obj) {
  /* istanbul ignore if */
  if (typeof Symbol !== 'function') {
    return [];
  }

  switch (typeof obj) {
    case 'object': {
      obj = obj || [];
      break;
    }
    case 'function': {
      break;
    }
    default: {
      return [];
    }
  }

  return Object.getOwnPropertySymbols(obj);
}

module.exports = listOwnSymbols;

},{}]},{},[1])(1)
});
