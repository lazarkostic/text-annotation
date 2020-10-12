import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { isSelectionEmpty, isBetween } from 'utils';

const Root = styled.div`
  margin: auto;
  max-width: 600px;
  margin-top: 50px;
  font-family: sans-serif;
  color: rgba(0, 0, 0, 0.8);
  line-height: 1.5;
  font-size: 16px;
`;

const TokenContainer = styled.div`
`;

const Token = styled.span`
display: inline-flex;
  padding: 2px 2px; 
  ${(p) =>
    p.isLabeled &&
    css`
      background: #add8e6;
    `};
`;

const Label = styled.div`
    display: inline;
    font-size: 9px;
    font-weight: bold;
    padding: 0 2px;
`

const LabelContainer = styled.div`
margin-bottom: 20px;
`;

const TokenAnnotator = ({ tokens }) => {
  const [tokensData, setTokensData] = useState([]);

  const isTokenLabeled = (index) => tokensData.find((obj) => isBetween(index, obj.start, obj.end));

  const handleOnMouseUp = () => {
    const selection = window.getSelection();

    let startIndex = selection.anchorNode.parentElement.getAttribute(
      'data-index'
    ) || selection.anchorNode.parentElement.getAttribute(
      'data-label'
    );
    let endIndex = selection.focusNode.parentElement.getAttribute('data-index');

    console.log("start, end: ", startIndex, endIndex);

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
    if (token && parseInt(token.end) === index) {
      return <Label data-label={index}>{token.tag}</Label>
    }
    return null;
  };

  const renderTextOutput = () => {
    return tokens.map((token, index) => (
      <Token data-index={index} isLabeled={isTokenLabeled(index)} key={index}>
        {token} {renderLabel(index)}
      </Token>
    ));
  };

  return (
    <Root>
      <LabelContainer>
      {/* {labels.map((l, idx) => (
          <Label key={idx} label={l} style={{ marginRight: 3 }}>
            {l.name}
          </Label>
        ))} */}
      </LabelContainer>
      <TokenContainer className="" onMouseUp={() => handleOnMouseUp()}>
        {renderTextOutput()}
      </TokenContainer>
    </Root>
  );
};

TokenAnnotator.defaultProps = {
};

TokenAnnotator.propTypes = {
  tokens: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default TokenAnnotator;
