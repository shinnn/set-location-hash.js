# set-location-hash.js

[![Bower version](https://badge.fury.io/bo/set-location-hash.svg)](http://badge.fury.io/bo/set-location-hash)
[![NPM version](https://badge.fury.io/js/set-location-hash.svg)](http://badge.fury.io/js/set-location-hash)
[![Build Status](https://travis-ci.org/shinnn/set-location-hash.js.svg?branch=master)](https://travis-ci.org/shinnn/set-location-hash.js)
[![devDependency Status](https://david-dm.org/shinnn/set-location-hash.js/dev-status.svg?theme=shields.io)](https://david-dm.org/shinnn/set-location-hash.js#info=devDependencies)

[![browser support](https://ci.testling.com/shinnn/set-location-hash.js.png)](https://ci.testling.com/shinnn/set-location-hash.js)

A client-side library to set the anchor portion of current URL without scrolling

```javascript
// On http://yoursite.com/

setLocationHash('foo');
location.href; //=> "http://yoursite.com/#foo"
```

## Installation

### Install with package manager

#### [Bower](http://bower.io/)

```
bower i --save set-location-hash
```

#### [Component](http://component.io/)

```
component install shinnn/set-location-hash.js
```

#### [npm](https://www.npmjs.org/) (Use with [Browserify](http://browserify.org/) etc.)

```
npm i --save set-location-hash
```

### Standalone

[Download the script file directly.](https://raw.githubusercontent.com/shinnn/set-location-hash.js/master/dist/set-location-hash.js "view raw")

## API

### setLocationHash(fragment, options)

Pass a `String` to the `fragment` argument and the anchor portion of URL will be changed.

This function is vary similar to `location.hash` property, but this function won't change the scroll position of the page unlike `location.hash`.

If the browser supports `history.pushState` and `history.replaceState`, you can set `replace` and `force` options by passing an `Object` to the `options` argument.

#### options.replace

Type: `Boolean` Default: `false`

Replace the browser history instead of pushing a new history.

```javascript
// On http://yoursite.com/

history.length; //=> 1

setLocationHash('foo', {replace: true});
history.length; //=> 1

setLocationHash('bar');
history.length; //=> 2
```

#### options.force

Type: `Boolean` Default: `false`

By default, this function doesn't push a new history if the old URL and the new URL have the same value. If you set this option `true`, it will push a new history in any case.

```javascript
// On http://yoursite.com/#foo

history.length; //=> 1

setLocationHash('foo');
history.length; //=> 1

setLocationHash('foo', {force: true});
history.length; //=> 2
```

## License

Copyright (c) 2014 [Shinnosuke Watanabe](https://github.com/shinnn)

Licensed under [the MIT LIcense](./LICENSE).