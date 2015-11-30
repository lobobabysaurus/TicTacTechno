import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';

import Home from './views/home';

$(() => {
  ReactDOM.render(
    <Home textClass='homeText'/>,
    document.getElementById('app')
  );
});
