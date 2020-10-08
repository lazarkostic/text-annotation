import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { isSelectionEmpty, isBetween } from "../../utils/index";

import "./tokenAnnotator.css";

const TokenAnnotator = ({ tokens, onChange }) => {
  const [allTokens, setAllTokens] = useState([]);

  const [tokensData, setTokensData] = useState([]);

  useEffect(() => {
    const tokensArray = tokens.map((token) => ({
      text: token,
      isHighlighted: false,
    }));
    setAllTokens(tokensArray);
  }, [tokens]);

  const getTokenClasses = (isHighlighted) => (isHighlighted ? "yellow-bg" : "");

  const handleOnMouseUp = () => {
    const selection = window.getSelection();

    if (isSelectionEmpty(selection)) return;

    const selectedText = selection.toString();

    let startIndex = selection.anchorNode.parentElement.getAttribute(
      "data-index"
    );
    let endIndex = selection.focusNode.parentElement.getAttribute("data-index");
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
        tokens: allTokens
          .filter((token, index) => isBetween(index, startIndex, endIndex))
          .map((t) => t.text),
        tag: "INITIAL",
      },
    ]);

    let newTokens = [...allTokens];
    for (let i = startIndex; i <= endIndex; i++) {
      newTokens[i].isHighlighted = true;
    }
    setAllTokens(newTokens);
  };

  const renderText = () => {
    return allTokens.map((token, index) => (
      <span
        data-index={index}
        className={getTokenClasses(token.isHighlighted)}
        key={index}
      >
        {token.text}{" "}
      </span>
    ));
  };

  return (
    <div className="" onMouseUp={() => handleOnMouseUp()}>
      {renderText()}
    </div>
  );
};

TokenAnnotator.propTypes = {
  tokens: PropTypes.arrayOf(PropTypes.string),
};

export default TokenAnnotator;
