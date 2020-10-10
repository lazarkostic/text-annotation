import React from 'react';
import debug from 'debug';
import ReactDOM from 'react-dom';
import TokenAnnotator from 'components/TokenAnnotator2';

// Enable debugger
debug.enable(process.env.REACT_APP_DEBUG);

ReactDOM.render(
  <React.StrictMode>
    <TokenAnnotator />
  </React.StrictMode>,
  document.getElementById('root')
);

// Enable HMR
if (module.hot) module.hot.accept();
