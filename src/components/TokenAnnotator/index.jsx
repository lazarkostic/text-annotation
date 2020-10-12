import React from 'react';
import styled, { css } from 'styled-components';
import useTokenAnnotator from './useTokenAnnotator';

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
  cursor: text;
  ${(p) =>
    p.isLabeled &&
    css`
      background: #add8e6;
      cursor: pointer;
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

export default function TokenAnnotator() {
  const { tokens, handleOnMouseUp, isTokenLabeled } = useTokenAnnotator();

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