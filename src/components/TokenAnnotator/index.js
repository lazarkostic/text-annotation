import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { isSelectionEmpty, isBetween } from "../../utils/index";

import "./tokenAnnotator.css";

const TokenAnnotator = ({ tokens, onChange }) => {
  const [tokensData, setTokensData] = useState([]);

  const isTokenLabeled = (index) =>
    tokensData.find((obj) => isBetween(index, obj.start, obj.end));

  const getTokenClasses = (index) => (isTokenLabeled(index) ? "blue-bg" : "");

  const handleOnMouseUp = () => {
    const selection = window.getSelection();

    let startIndex = selection.anchorNode.parentElement.getAttribute(
      "data-index"
    );
    let endIndex = selection.focusNode.parentElement.getAttribute("data-index");

    if (isSelectionEmpty(selection)) {
      let newTokensData = [...tokensData];
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
        tag: "INITIAL",
      },
    ]);
  };

  const renderText = () => {
    return tokens.map((token, index) => (
      <span data-index={index} className={getTokenClasses(index)} key={index}>
        {token}{" "}
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
