/*!
 * set-location-hash.js | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/set-location-hash.js
*/
define(function(require,exports,module){

'use strict';

var setLocationHash;

if (typeof history.pushState === 'function' &&
    typeof history.replaceState === 'function') {
  setLocationHash = function setLocationHash(hash, opts) {
    opts = opts || {
      force: false,
      replace: false
    };

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
  var body = document.body;
  var html = document.documentElement;

  setLocationHash = function setLocationHash(hash) {
    var currentY = body.scrollTop || html.scrollTop;
    location.hash = '' + hash;
    body.scrollTop = currentY;
    html.scrollTop = currentY;

    return location.href;
  };
}

return setLocationHash;

});
