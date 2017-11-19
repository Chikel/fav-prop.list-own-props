'use strict';

function listOwnProps(obj) {
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
      for (var i = arr.length - 1; i >= 0; i--) {
        var elm = arr[i];
        /* istanbul ignore if */
        if (elm === 'caller' || elm === 'arguments') {
          arr.splice(i, 1);
        }
      }
      return arr;
    }
    default: {
      return [];
    }
  }
}

module.exports = listOwnProps;
