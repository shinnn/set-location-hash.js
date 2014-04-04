'use strict';

var setLocationHash;

if (typeof history.pushState === 'function' &&
    typeof history.replaceState === 'function') {
  setLocationHash = (hash, opts = {replace: false, force: false}) => {
    let methodName;
    if (opts.replace) {
      methodName = 'replaceState';
    } else {
      methodName = 'pushState';
    }
    
    let nextHash = '#' + hash;
    
    if (location.hash === nextHash && !opts.force) {
      return;
    }
    
    history[methodName](
      null,
      document.title,
      location.pathname + location.search + nextHash
    );
    
    return;
  };

} else {
  setLocationHash = hash => {
    let {body, documentElement: html} = document;

    let currentY = body.scrollTop || html.scrollTop;
    location.hash = '' + hash;
    body.scrollTop = currentY;
    html.scrollTop = currentY;

    return;
  };
}
