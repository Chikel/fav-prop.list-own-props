'use strict';

var chai = require('chai');
var expect = chai.expect;
var fav = {}; fav.prop = {}; fav.prop.listOwnProps = require('..');

var listOwnProps = fav.prop.listOwnProps;

describe('fav.prop.listOwnProps', function() {

  it('Should get all props when the argument is a plain object', function() {
    expect(listOwnProps({})).to.have.deep.members([]);
    expect(listOwnProps({ a: 1, b: true, c: 'C' })).to.have.deep.members([
      { key: 'a', value: 1 },
      { key: 'b', value: true },
      { key: 'c', value: 'C' }
    ]);
  });

  it('Should not get props of prototype', function() {
    function Fn0() {}
    Fn0.prototype.a = 1;
    expect(listOwnProps(new Fn0())).to.have.deep.members([]);

    function Fn1() {
      this.b = true;
      this.c = 'C';
    }
    Fn1.prototype = new Fn0();
    Fn1.prototype.d = 'D';
    Object.defineProperty(Fn1.prototype, 'e', { value: 'E' });
    expect(listOwnProps(new Fn1())).to.have.deep.members([
      { key: 'b', value: true },
      { key: 'c', value: 'C' },
    ]);
  });

  it('Should get also unenumerable props', function() {
    var obj = {};
    Object.defineProperties(obj, {
      a: { enumerable: true, value: 1 },
      b: { value: true },
      c: { value: 'C' },
    });
    expect(listOwnProps(obj)).to.have.deep.members([
      { key: 'a', value: 1 },
      { key: 'b', value: true },
      { key: 'c', value: 'C' },
    ]);
  });

  it('Should return an empty array when the argument is nullish', function() {
    expect(listOwnProps(undefined)).to.have.deep.members([]);
    expect(listOwnProps(null)).to.have.deep.members([]);
  });

  it('Should return an empty array when the argument is primitive type',
  function() {
    expect(listOwnProps(true)).to.have.deep.members([]);
    expect(listOwnProps(false)).to.have.deep.members([]);
    expect(listOwnProps(0)).to.have.deep.members([]);
    expect(listOwnProps(123)).to.have.deep.members([]);
  });

  it('Should return an array having index strings and `length` when the ' +
  '\n\targument is a string', function() {
    expect(listOwnProps('')).to.have.deep.members([
      { key: 'length', value: 0 },
    ]);
    expect(listOwnProps('abc')).to.have.deep.members([
      { key: '0', value: 'a' },
      { key: '1', value: 'b' },
      { key: '2', value: 'c' },
      { key: 'length', value: 3 },
    ]);

    var s = 'abc';
    try {
      s.aaa = 'AAA';
    } catch (e) {
      // Throws TypeError on Node.js v0.11 or later.
      //console.log(e);
    }
    expect(listOwnProps(s)).to.have.deep.members([
      { key: '0', value: 'a' },
      { key: '1', value: 'b' },
      { key: '2', value: 'c' },
      { key: 'length', value: 3 },
    ]);

    try {
      Object.defineProperty(s, 'bbb', { value: 'BBB' });
    } catch (e) {
      //console.log(e);
    }
    expect(listOwnProps(s)).to.have.deep.members([
      { key: '0', value: 'a' },
      { key: '1', value: 'b' },
      { key: '2', value: 'c' },
      { key: 'length', value: 3 },
    ]);
  });

  it('Should return appended props when the argument is a atring', function() {
    expect(listOwnProps(new String(''))).to.have.deep.members([
      { key: 'length', value: 0 },
    ]);
    expect(listOwnProps(new String('abc'))).to.have.deep.members([
      { key: '0', value: 'a' },
      { key: '1', value: 'b' },
      { key: '2', value: 'c' },
      { key: 'length', value: 3 },
    ]);

    var s = new String('abc');
    try {
      s.aaa = 'AAA';
    } catch (e) {
      // Throws TypeError on Node.js v0.11 or later.
      //console.log(e);
    }
    expect(listOwnProps(s)).to.have.deep.members([
      { key: '0', value: 'a' },
      { key: '1', value: 'b' },
      { key: '2', value: 'c' },
      { key: 'aaa', value: 'AAA' },
      { key: 'length', value: 3 },
    ]);

    try {
      Object.defineProperty(s, 'bbb', { value: 'BBB' });
    } catch (e) {
      //console.log(e);
    }
    expect(listOwnProps(s)).to.have.deep.members([
      { key: '0', value: 'a' },
      { key: '1', value: 'b' },
      { key: '2', value: 'c' },
      { key: 'aaa', value: 'AAA' },
      { key: 'bbb', value: 'BBB' },
      { key: 'length', value: 3 },
    ]);
  });

  it('Should return props of an array of index strings and `length` when ' +
  '\n\tthe argument is an array', function() {
    expect(listOwnProps([])).to.have.deep.members([
      { key: 'length', value: 0 },
    ]);
    expect(listOwnProps([1, 2, 3])).to.have.deep.members([
      { key: '0', value: 1 },
      { key: '1', value: 2 },
      { key: '2', value: 3 },
      { key: 'length', value: 3 },
    ]);

    var a = ['a', 'b'];
    a.aaa = 'AAA';
    expect(listOwnProps(a)).to.have.deep.members([
      { key: '0', value: 'a' },
      { key: '1', value: 'b' },
      { key: 'aaa', value: 'AAA' },
      { key: 'length', value: 2 },
    ]);

    try {
      Object.defineProperty(a, 'bbb', { value: 'BBB' });
    } catch (e) {
      //console.log(e);
    }
    expect(listOwnProps(a)).to.have.deep.members([
      { key: '0', value: 'a' },
      { key: '1', value: 'b' },
      { key: 'aaa', value: 'AAA' },
      { key: 'bbb', value: 'BBB' },
      { key: 'length', value: 2 },
    ]);
  });

  it('Should return `length`, `name`, `prototype` props and appended props ' +
  '\n\twhen the argument is a function', function() {
    var fn = function f() {};
    expect(listOwnProps(fn)).to.have.deep.members([
      { key: 'length', value: 0 },
      { key: 'name', value: 'f' },
      { key: 'prototype', value: fn.prototype },
    ]);

    fn.aaa = 'AAA';
    expect(listOwnProps(fn)).to.have.deep.members([
      { key: 'length', value: 0 },
      { key: 'name', value: 'f' },
      { key: 'prototype', value: fn.prototype },
      { key: 'aaa', value: 'AAA' },
    ]);

    Object.defineProperty(fn, 'bbb', { value: 'BBB' });
    expect(listOwnProps(fn)).to.have.deep.members([
      { key: 'length', value: 0 },
      { key: 'name', value: 'f' },
      { key: 'prototype', value: fn.prototype },
      { key: 'aaa', value: 'AAA' },
      { key: 'bbb', value: 'BBB' },
    ]);
  });

  it('Should return an empty string when the argument is a symbol',
  function() {
    if (typeof Symbol !== 'function') {
      this.skip();
      return;
    }

    var symbol = Symbol('foo');
    expect(listOwnProps(symbol)).to.have.deep.members([]);

    try {
      symbol.aaa = 'AAA';
    } catch (e) {
      // console.error(e);
    }
    expect(listOwnProps(symbol)).to.have.deep.members([]);

    try {
      Object.defineProperty(symbol, 'bbb', { value: 'BBB' });
    } catch (e) {
      // console.error(e);
    }
    expect(listOwnProps(symbol)).to.have.deep.members([]);
  });
});
