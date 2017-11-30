(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g=(g.fav||(g.fav = {}));g=(g.prop||(g.prop = {}));g.listOwnProps = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var listOwnKeys = require('@fav/prop.list-own-keys');

function listOwnProps(obj) {
  /* istanbul ignore if */
  if (typeof obj === 'function' && obj.name == null) { // for IE, Edge
    var arr = Object.getOwnPropertyNames(obj);
    var hasName = false;
    for (var i = arr.length - 1; i >= 0; i--) {
      var key = arr[i];
      switch (key) {
        case 'caller':
        case 'arguments': {
          arr.splice(i, 1);
          continue;
        }
        case 'name': {
          hasName = true;
          break;
        }
      }
      arr[i] = { key: key, value: obj[key] };
    }
    // A function don't have `name` prop on IE
    // A no-name function don't have `name` prop on Edge
    if (!hasName) {
      arr.push({ key: 'name', value: getFunctionName(obj) });
    }
    return arr;
  }

  var arr = listOwnKeys(obj);
  for (var i = 0, n = arr.length; i < n; i++) {
    var key = arr[i];
    var val = obj[key];
    arr[i] = { key: key, value: val };
  }
  return arr;
}

/* istanbul ignore next */
function getFunctionName(fn) {
  var result = /^function\s+([^\s\*]+)\s*\(.*$/.exec(fn.toString());
  if (!result) {
    return undefined;
  }
  return result[1];
}

module.exports = listOwnProps;

},{"@fav/prop.list-own-keys":2}],2:[function(require,module,exports){
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

},{}]},{},[1])(1)
});