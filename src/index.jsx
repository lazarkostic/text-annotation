import React from 'react';
import ReactDOM from 'react-dom';
import TokenAnnotator from 'lib/TokenAnnotator2';

ReactDOM.render(
  <React.StrictMode>
    <TokenAnnotator />
  </React.StrictMode>,
  document.getElementById('root')
);

// Enable HMR
if (module.hot) module.hot.accept();
