/*!
 * set-location-hash.js | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/set-location-hash.js
*/

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.setLocationHash = factory();
  }
}(this, function() {

'use strict';

var setLocationHash;

if (typeof history.pushState === 'function' &&
    typeof history.replaceState === 'function') {
  setLocationHash = function(hash)  {var opts = arguments[1];if(opts === void 0)opts = {replace: false, force: false};
    var methodName;
    if (opts.replace) {
      methodName = 'replaceState';
    } else {
      methodName = 'pushState';
    }
    
    var nextHash = '#' + hash;
    
    if (location.hash !== nextHash || opts.force) {
      history[methodName](
        null,
        document.title,
        location.pathname + location.search + nextHash
      );
    }
    
    return location.href;
  };

} else {
  setLocationHash = function(hash ) {
    var body = document.body, html = document.documentElement;

    var currentY = body.scrollTop || html.scrollTop;
    location.hash = '' + hash;
    body.scrollTop = currentY;
    html.scrollTop = currentY;

    return location.href;
  };
}

return setLocationHash;

}));
