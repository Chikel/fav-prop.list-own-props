# [@fav/prop.list-own-props][repo-url] [![NPM][npm-img]][npm-url] [![MIT License][mit-img]][mit-url] [![Build Status][travis-img]][travis-url] [![Build Status][appveyor-img]][appveyor-url] [![Coverage status][coverage-img]][coverage-url]

Lists enumerable and unenumerable own property content objects of an object.

> "fav" is an abbreviation of "favorite" and also the acronym of "for all versions".
> This package is intended to support all Node.js versions and many browsers as possible.
> At least, this package supports Node.js >= v0.10 and major Web browsers: Chrome, Firefox, IE11, Edge, Vivaldi and Safari.


## Install

To install from npm:

```sh
$ npm install --save @fav/prop.list-own-props
```

***NOTE:*** *npm < 2.7.0 does not support scoped package, but even old version Node.js supports it. So when you use such older npm, you should download this package from [github.com][repo-url], and move it in `node_modules/@fav/prop.list-own-props/` directory manually.*


## Usage

For Node.js:

```js
var listOwnProps = require('@fav/prop.list-own-props');
listOwnProps({ a: 1, b: true, c: 'C' });
// => [{ key: 'a', value: 1 }, { key: 'b', value: true }, { key: 'c', value: 'C' }]

function Fn() { this.a = 1; }
Fn.prototype.b = true;
var fn = new Fn();
Object.defineProperty(fn, 'c', { value: 'C' });
listOwnProps(fn);
// => [{ key: 'a', value: 1 }, { key: 'c', value: 'C' }]
```

For Web browsers:

```html
<script src="fav.prop.list-own-props.min.js"></script>
<script>
var listOwnProps = fav.prop.listOwnProps;
listOwnProps({ a: 1, b: true, c: 'C' });
// => [{ key:'a', value: 1 },  { key: 'b', value: true }, { key: 'c', value: 'C' }]
</script>
```


## API

### <u>listOwnProps(obj) : Array</u>

List enumerable and unenumerable own property content objects of the given object.

A property content object is a plain object having `key` and `value` properties, and the values of `key`s are same with the members of `Object.getOwnPropertyNames` in strict mode except that this function returns an empty array when `obj` is nullish.

***NOTE:*** *The result of `Object.getOwnPropertyNames` for a function in strict mode is different between before and after Node.js (io.js) v3.
On v3 and later it doesn't contain the properties `arguments` and `caller`.
This function excludes `arguments` and `caller` properties even not in strict mode for same behaviors on all versions of Node.js.*

***NOTE:*** *On some browsers, Chrome, Safari, Vivaldi, Edge and IE, the result of `Object.getOwnPropertyNames` for a function in non-strict mode is different from in strict mode.
It contains the properties `arguments` and `caller`. 
This function excludes `arguments` and `caller` properties even not in strict mode for same behaviors on other platforms.*

***NOTE:*** *The result of `Object.getOwnPropertyNames` for a function on IE is different from results on other browsers and Node.js.
It does not contain `name` property.
This function append `name` properties to the result on IE for same behaviors on target browsers and Node.js*

***NOTE:*** *The value of `name` property of a no-name function is the first assigned variable's name on Node.js v6 or later, and that value is an empty string on the eariler.
This function does no treatment about this differeneces.*
 
***NOTE:*** *On some browsers, Chrome, Firefox, Safari, and Vivaldi, the `name` property of a no-name function is the first assigned variable's name. On Edge, that `name` property is an empty string. On IE, that `name` property is undefined.
This function does no treatment about this differeneces.*

#### Parameter:

| Parameter |  Type  | Description                             |
|-----------|:------:|-----------------------------------------|
| *obj*     | object | The object to be listed its properties. |

#### Return:

An array of property content objects.

**Type:** Array


## Checked                                                                      
### Node.js (4〜8)

| Platform  |   4    |   5    |   6    |   7    |   8    |
|:---------:|:------:|:------:|:------:|:------:|:------:|
| macOS     |&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|
| Windows10 |&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|
| Linux     |&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|

### io.js (1〜3)

| Platform  |   1    |   2    |   3    |
|:---------:|:------:|:------:|:------:|
| macOS     |&#x25ef;|&#x25ef;|&#x25ef;|
| Windows10 |&#x25ef;|&#x25ef;|&#x25ef;|
| Linux     |&#x25ef;|&#x25ef;|&#x25ef;|

### Node.js (〜0.12)

| Platform  |  0.7   |  0.8   |  0.9   |  0.10  |  0.11  |  0.12  |
|:---------:|:------:|:------:|:------:|:------:|:------:|:------:|
| macOS     |        |&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|
| Windows10 |        |&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|
| Linux     |&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|

### Web browsers

| Platform  | Chrome | Firefox | Vivaldi | Safari |  Edge  | IE11   |
|:---------:|:------:|:-------:|:-------:|:------:|:------:|:------:|
| macOS     |&#x25ef;|&#x25ef; |&#x25ef; |&#x25ef;|   --   |   --   |
| Windows10 |&#x25ef;|&#x25ef; |&#x25ef; |   --   |&#x25ef;|&#x25ef;|
| Linux     |&#x25ef;|&#x25ef; |&#x25ef; |   --   |   --   |   --   |


## License

Copyright (C) 2017 Takayuki Sato

This program is free software under [MIT][mit-url] License.
See the file LICENSE in this distribution for more details.

[repo-url]: https://github.com/sttk/fav-prop.list-own-props/
[npm-img]: https://img.shields.io/badge/npm-v0.2.0-blue.svg
[npm-url]: https://www.npmjs.com/package/@fav/prop.list-own-props
[mit-img]: https://img.shields.io/badge/license-MIT-green.svg
[mit-url]: https://opensource.org/licenses/MIT
[travis-img]: https://travis-ci.org/sttk/fav-prop.list-own-props.svg?branch=master
[travis-url]: https://travis-ci.org/sttk/fav-prop.list-own-props
[appveyor-img]: https://ci.appveyor.com/api/projects/status/github/sttk/fav-prop.list-own-props?branch=master&svg=true
[appveyor-url]: https://ci.appveyor.com/project/sttk/fav-prop-list-own-props
[coverage-img]: https://coveralls.io/repos/github/sttk/fav-prop.list-own-props/badge.svg?branch=master
[coverage-url]: https://coveralls.io/github/sttk/fav-prop.list-own-props?branch=master
