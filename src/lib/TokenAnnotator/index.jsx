import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { isSelectionEmpty, isBetween } from '../../utils';

import './tokenAnnotator.css';

const TokenAnnotator = ({ tokens, onChange }) => {
  const [tokensData, setTokensData] = useState([]);

  useEffect(() => {
    onChange(tokensData);
  }, [tokensData, onChange]);

  const isTokenLabeled = (index) =>
    tokensData.find((obj) => isBetween(index, obj.start, obj.end));

  const getTokenClasses = (index) => (isTokenLabeled(index) ? 'blue-bg' : '');

  const handleOnMouseUp = () => {
    const selection = window.getSelection();

    let startIndex = selection.anchorNode.parentElement.getAttribute(
      'data-index'
    );
    let endIndex = selection.focusNode.parentElement.getAttribute('data-index');

    if (isSelectionEmpty(selection)) {
      const newTokensData = [...tokensData];
      setTokensData(
        newTokensData.filter(
          (obj) => !isBetween(startIndex, obj.start, obj.end)
        )
      );
      return;
    }

    const selectedText = selection.toString();

    selection.removeAllRanges();
    if (!/\S/.test(selectedText)) return;

    const isBackwards = startIndex > endIndex;
    if (isBackwards) {
      const temp = startIndex;
      startIndex = endIndex;
      endIndex = temp;
    }

    setTokensData([
      ...tokensData,
      {
        start: startIndex,
        end: endIndex,
        tokens: tokens.filter((token, index) =>
          isBetween(index, startIndex, endIndex)
        ),
        tag: 'INITIAL',
      },
    ]);
  };

  const renderLabel = (index) => {
    const token = isTokenLabeled(index);
    if (token && parseInt(token.end, 1) === index) {
      return token.tag;
    }
    return null;
  };

  const renderTextOutput = () => {
    return tokens.map((token, index) => (
      <span data-index={index} className={getTokenClasses(index)} key={index}>
        {token} {renderLabel(index)}
      </span>
    ));
  };

  return (
    <div className="" onMouseUp={() => handleOnMouseUp()}>
      {renderTextOutput()}
    </div>
  );
};

TokenAnnotator.defaultProps = {
  onChange: () => {},
};

TokenAnnotator.propTypes = {
  onChange: PropTypes.func,
  tokens: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default TokenAnnotator;
