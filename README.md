# [@fav/prop.list-own-props][repo-url] [![NPM][npm-img]][npm-url] [![MIT License][mit-img]][mit-url] [![Build Status][travis-img]][travis-url] [![Build Status][appveyor-img]][appveyor-url] [![Coverage status][coverage-img]][coverage-url]

Lists enumerable and unenumerable own property keys and symbols of an object.

> "fav" is an abbreviation of "favorite" and also the acronym of "for all versions".
> This package is intended to support all Node.js versions and many browsers as possible.
> At least, this package supports Node.js >= v0.10 and major Web browsers: Chrome, Firefox, IE11, Edge, Vivaldi and Safari.


## Install

To install from npm:

```sh
$ npm install --save @fav/prop.list-own-props
```

***NOTE:*** *npm < 2.7.0 does not support scoped package, but old version Node.js supports it. So when you use such older npm, you should download this package from [github.com][repo-url], and move it in `node_modules/@fav/prop.list-own-props/` directory manually.*


## Usage

For Node.js:

```js
var listOwnProps = require('@fav/prop.list-own-props');

var symbol0 = Symbol('symbol-0');
var symbol1 = Symbol('symbol-1');

var obj = { a: 1 };
obj[symbol0] = 2;
listOwnProps(obj); // => [ 'a', Symbol(symbol-0) ]

Object.defineProperty(obj, 'b', { value: 3 });
Object.defineProperty(obj, symbol1, { value: 4 });
listOwnProps(obj); // => [ 'a', 'b', Symbol(symbol-0), Symbol(symbol-1) ]

function Fn() { this.a = 1; }
Fn.prototype.b = 2;
Fn.prototype[symbol0] = 3;
var fn = new Fn();
Object.defineProperty(fn, 'c', { value: 4 });
Object.defineProperty(fn, symbol1, { value: 5 });
listOwnProps(fn); // => [ 'a', 'c', Symbol(symbol-1) ]
```

For Web browsers:

```html
<script src="fav.prop.list-own-props.min.js"></script>
<script>
var listOwnProps = fav.prop.listOwnProps;

var symbol0 = Symbol('symbol-0');
var symbol1 = Symbol('symbol-1');

var obj = { a: 1 };
obj[symbol0] = 2;
listOwnProps(obj); // => [ 'a', Symbol(symbol-0) ]
</script>
```


## API

### <u>listOwnProps(obj) : Array</u>

Lists enumerable and unenumerable own property keys and symbols of the given object.

This function returns an array of keys and symbols which are same with the concatenation of `Object.getOwnPropertyNames` and `Object.getOwnPropertySymbols` results in strict mode except that this function returns an empty array when `obj` is nullish.

***NOTE:*** *The result of `Object.getOwnPropertyNames` for a function in strict mode is different between before and after Node.js (io.js) v3.
On v3 and later it doesn't contain the properties `arguments` and `caller`.
This function excludes `arguments` and `caller` properties even not in strict mode for same behaviors on all versions of Node.js.*

***NOTE:*** *On some browsers, Chrome, Safari, Vivaldi, Edge and IE, the result of `Object.getOwnPropertyNames` for a function in non-strict mode is different from in strict mode.
It contains the properties `arguments` and `caller`. 
This function excludes `arguments` and `caller` properties even not in strict mode for same behaviors on other platforms.*

***NOTE:*** *The results of `Object.getOwnPropertyNames` for a function on IE and a no name function on Edge are different from results on other browsers and Node.js.
It does not contain `name` property.
This function appends `name` property to the result on IE or Edge for same behaviors on target browsers and Node.js*

***NOTE:*** *The value of `name` property of a no-name function is the first assigned variable's name on Node.js v6 or later, and that value is an empty string on the eariler.
This function does no treatment about this differeneces.*
 
***NOTE:*** *On some browsers, Chrome, Firefox, Safari, and Vivaldi, the `name` property of a no-name function is the first assigned variable's name. On Edge, that `name` property is an empty string. On IE, that `name` property is undefined.
This function does no treatment about this differeneces.*

#### Parameter:

| Parameter |  Type  | Description                                            |
|-----------|:------:|--------------------------------------------------------|
| *obj*     | object | The object to be listed its property keys and symbols. |

#### Return:

An array of property keys and symbols.

**Type:** Array


## Checked                                                                      
### Node.js (4〜)

| Platform  |   4    |   5    |   6    |   7    |   8    |   9    |   10   |
|:---------:|:------:|:------:|:------:|:------:|:------:|:------:|:------:|
| macOS     |&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|
| Windows10 |&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|
| Linux     |&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|

### io.js (1〜3)

| Platform  |   1    |   2    |   3    |
|:---------:|:------:|:------:|:------:|
| macOS     |&#x25ef;|&#x25ef;|&#x25ef;|
| Windows10 |&#x25ef;|&#x25ef;|&#x25ef;|
| Linux     |&#x25ef;|&#x25ef;|&#x25ef;|

### Node.js (〜0.12)

| Platform  |  0.8   |  0.9   |  0.10  |  0.11  |  0.12  |
|:---------:|:------:|:------:|:------:|:------:|:------:|
| macOS     |&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|
| Windows10 |&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|
| Linux     |&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|

### Web browsers

| Platform  | Chrome | Firefox | Vivaldi | Safari |  Edge  | IE11   |
|:---------:|:------:|:-------:|:-------:|:------:|:------:|:------:|
| macOS     |&#x25ef;|&#x25ef; |&#x25ef; |&#x25ef;|   --   |   --   |
| Windows10 |&#x25ef;|&#x25ef; |&#x25ef; |   --   |&#x25ef;|&#x25ef;|
| Linux     |&#x25ef;|&#x25ef; |&#x25ef; |   --   |   --   |   --   |


## License

Copyright (C) 2017-2018 Takayuki Sato

This program is free software under [MIT][mit-url] License.
See the file LICENSE in this distribution for more details.

[repo-url]: https://github.com/sttk/fav-prop.list-own-props/
[npm-img]: https://img.shields.io/badge/npm-v1.0.1-blue.svg
[npm-url]: https://www.npmjs.com/package/@fav/prop.list-own-props
[mit-img]: https://img.shields.io/badge/license-MIT-green.svg
[mit-url]: https://opensource.org/licenses/MIT
[travis-img]: https://travis-ci.org/sttk/fav-prop.list-own-props.svg?branch=master
[travis-url]: https://travis-ci.org/sttk/fav-prop.list-own-props
[appveyor-img]: https://ci.appveyor.com/api/projects/status/github/sttk/fav-prop.list-own-props?branch=master&svg=true
[appveyor-url]: https://ci.appveyor.com/project/sttk/fav-prop-list-own-props
[coverage-img]: https://coveralls.io/repos/github/sttk/fav-prop.list-own-props/badge.svg?branch=master
[coverage-url]: https://coveralls.io/github/sttk/fav-prop.list-own-props?branch=master
