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
