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

const Token = styled.div`
display: inline-flex;
  padding: 2px 2px; 
  cursor: text;
  ${(p) =>
    p.isLabeled &&
    css`
      background: #FFE184;
      cursor: pointer;
    `};
`;

const Label = styled.div`
    display: inline;
    font-size: 9px;
    font-weight: bold;
    padding: 0 2px;
    color: #593ECF;
`

const LabelContainer = styled.div`
display: flex;
padding: 10px 5px;
margin-bottom: 20px;
background: #593ECF;
`;

const LabelItem = styled.div`
cursor: pointer;
border-radius: 5px;
border: 1px solid;
padding: 2px 4px;
border-color: white;
font-size: 16px;
margin: 0 4px;
background: #593ECF;
color: white;
${(p) =>
  p.isSelected &&
  css`
    background: white;
    color:#593ECF;
    border-color: 
  `};
`;

export default function TokenAnnotator() {
  const { tokens, label, labels, handleOnMouseUp, handleLabelChange, isTokenLabeled } = useTokenAnnotator();

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
      {labels.map((l, idx) => (
          <LabelItem key={idx} isSelected={l.name===label.name} onClick={() => handleLabelChange(l)}>
            {l.name}
          </LabelItem>
        ))}
      </LabelContainer>
      <TokenContainer className="" onMouseUp={() => handleOnMouseUp()}>
        {renderTextOutput()}
      </TokenContainer>
    </Root>
  );
};