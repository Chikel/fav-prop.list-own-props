'use strict';

var listOwnKeys = require('@fav/prop.list-own-keys');
var listOwnSymbols = require('@fav/prop.list-own-symbols');

function listOwnProps(obj) {
  return listOwnKeys(obj).concat(listOwnSymbols(obj));
}

module.exports = listOwnProps;
