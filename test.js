var test = require('tape');
var setLocationHash = require('./dist/set-location-hash.js');

var body = document.body;

body.style.height = '9999px';

// create 'div#some' element
var target = document.createElement('div');
target.id = 'some';
target.style.position = 'absolute';
target.style.top = '5000px';
body.appendChild(target);

window.scrollTo(0, 0);

test('if hash changed', function(t) {
  'use strict';

  setLocationHash('some');
  
  t.plan(1);
  t.equal(location.hash, '#some');
});

test('if scroll position unchanged', function(t) {
  'use strict';

  setLocationHash('some');

  t.plan(1);
  t.equal(
    body.scrollTop || document.documentElement.scrollTop,
    0
  );
});

test('if empty hash available', function(t) {
  'use strict';

  setLocationHash('');

  t.plan(1);
  t.equal(location.href.split('#')[1], '');
});

if (typeof history.pushState === 'function' &&
    typeof history.replaceState === 'function') {

  test('replace option', function(t) {
    'use strict';

    var currentHistoryLength = history.length;

    setLocationHash('baz', {replace: true});

    t.plan(1);
    t.equal(history.length, currentHistoryLength);
  });

  test('force option', function(t) {
    'use strict';

    var currentHistoryLength = history.length;
    var currentFrag = location.hash.substring(1);

    setLocationHash(currentFrag, {force: true});

    t.plan(1);
    t.equal(history.length, currentHistoryLength + 1);
  });
}
