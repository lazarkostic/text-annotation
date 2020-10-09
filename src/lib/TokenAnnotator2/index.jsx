import React from 'react';
import styled, { css } from 'styled-components';
import stc from 'string-to-color';
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

const Token = styled.div`
  display: inline-flex;
  padding: 2px 2px;
  cursor: pointer;
  ${(p) =>
    p.label &&
    css`
      background: ${() => stc(p.label.name)};
    `};
  &:hover {
    background: rgba(0, 0, 0, 0.09);
  }
`;

const LabelContainer = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.div`
  display: inline-flex;
  font-size: 10px;
  text-transform: uppercase;
  background: red;
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  ${'' /* Use string-to-color to generate color for the label */}
  background: ${(p) => stc(p.label.name)};
`;

const Annotation = styled.div`
  font-size: 9px;
  font-weight: bold;
  padding: 0 2px;
  display: inline;
`;

export default function NewTokenAnnotator() {
  const { tokens, labels, handleTokenClick } = useTokenAnnotator();
  return (
    <Root>
      <LabelContainer>
        {labels.map((l, idx) => (
          <Label key={idx} label={l} style={{ marginRight: 3 }}>
            {l.name}
          </Label>
        ))}
      </LabelContainer>
      {tokens.map((token, idx) => (
        <Token
          key={idx}
          onClick={handleTokenClick(idx, labels[0])}
          label={token.label}
        >
          {token.text}
          {token.label && <Annotation>{token.label.name}</Annotation>}
        </Token>
      ))}
    </Root>
  );
}
