// Setup chai with plugins
import chai             from 'chai';
import sinonChai        from 'sinon-chai';
import sinonChaiInOrder from 'sinon-chai-in-order';
import chaiAsPromised   from 'chai-as-promised';

chai.should();
chai.use(sinonChai);
chai.use(sinonChaiInOrder);
chai.use(chaiAsPromised);

// Setup for absolute paths in testing
import path from 'path';
import { addPath } from 'app-module-path';

addPath(path.join(__dirname, '..', 'app'));
addPath(__dirname);

// Setup fake dom and react testing
import jsdom from 'jsdom';

global.document = jsdom.jsdom('<!doctype html><html><body><body><html>');
global.window = document.defaultView;
global.navigator = global.window.navigator;
