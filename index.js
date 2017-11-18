'use strict';

function listOwnProps(obj) {
  switch (typeof obj) {
    case 'string': {
      return ['length'];
    }
    case 'object': {
      return Object.getOwnPropertyNames(obj || {});
    }
    default: {
      return [];
    }
  }
}

module.exports = listOwnProps;
