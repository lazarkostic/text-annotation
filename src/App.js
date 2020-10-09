import React from 'react';

import TokenAnnotator from './components/TokenAnnotator';

const App = () => {
  const TEXT = 'This is some text to try out, new things.';
  const tokensArray = TEXT.split(' ');

  return (
    <>
      <TokenAnnotator tokens={tokensArray} />
    </>
  );
};

export default App;
