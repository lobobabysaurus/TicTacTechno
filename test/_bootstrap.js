import { addPath } from 'app-module-path';
import jsdom from 'jsdom';

// Setup for absolute paths in testing
addPath(__dirname + '/../src');
addPath(__dirname);

// Setup fake dom for react testing
global.document = jsdom.jsdom('<!doctype html><html><body><body><html>');
global.window = document.defaultView
global.navigator = global.window.navigator
