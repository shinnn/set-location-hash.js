var test = require('tape');
var setLocationHash = require('./dist/set-location-hash.js');

var body = document.body;
body.style.padding = '0 1px 1px 0';
body.style.height = '9999px';

// create 'div#some' element
var target = document.createElement('div');
target.id = 'some';
target.style.position = 'absolute';
target.style.top = '5000px';
body.appendChild(target);

var historyAvailable = typeof history.pushState === 'function' &&
                       typeof history.replaceState === 'function';

window.scrollTo(0, 0);

test('setLocationHash()', function(t) {
  'use strict';
  if (historyAvailable) {
    t.plan(6);
  } else {
    t.plan(4);
  }

  setLocationHash('some');
  
  t.equal(
    location.hash,
    '#some',
    'should change fragment identifier of URL.'
  );

  setLocationHash('some');
  
  t.equal(
    body.scrollTop || document.documentElement.scrollTop,
    0,
    'should not change scroll position.'
  );

  t.equal(
    setLocationHash('some'),
    location.href,
    'should return current URL.'
  );

  setLocationHash('');

  t.equal(
    location.href.split('#')[1],
    '',
    'should remove fragment identifier when the argument is empty string.'
  );
  
  if (historyAvailable) {
    var currentHistoryLength = history.length;
    setLocationHash('baz', {replace: true});
    
    t.equal(
      history.length,
      currentHistoryLength,
      'should not push new history when "replace" option enabled.'
    );

    currentHistoryLength = history.length;
    var currentFrag = location.hash.substring(1);
    setLocationHash(currentFrag, {force: true});
    
    t.equal(
      history.length,
      currentHistoryLength + 1,
      'should push new history anyway when "force" option enabled.'
    );
  }
});
