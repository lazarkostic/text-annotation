import React from 'react';
import ReactDOM from 'react-dom';
import TokenAnnotator from './lib/TokenAnnotator';

const TEXT = 'This is some text to try out, new things.';
const tokensArray = TEXT.split(' ');

ReactDOM.render(
  <React.StrictMode>
    <TokenAnnotator tokens={tokensArray} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
