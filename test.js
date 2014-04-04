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

  t.plan(2);
  t.equal(history.length, 3);
  t.equal(location.href.split('#')[1], '');
});
