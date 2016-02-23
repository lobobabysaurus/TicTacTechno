import { addPath } from 'app-module-path';
import jsdom from 'jsdom';

// Setup for absolute paths in testing
addPath(__dirname + '/../src');
addPath(__dirname);

// Setup fake dom for react testing
const doc = jsdom.jsdom('<!doctype html><html><body><body><html>');
const win = doc.defaultView;
global.document = doc
global.window = win

propagateToGlobal(win)
// from mocha-jsdom https://github.com/rstacruz/mocha-jsdom/blob/master/index.js#L80
function propagateToGlobal(window) {
  for (let key in window) {
    if (!window.hasOwnProperty(key)) continue
    if (key in global) continue

    global[key] = window[key]
  }
}
