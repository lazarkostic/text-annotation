import { useState } from 'react';

import { isSelectionEmpty, isBetween } from 'utils';

const log = require('debug')('ta:components:token-annotator');

export default function useTokenAnnotator() {
  // TODO: This will be passed as prop
  const tokens = `When Gregor Samsa woke up one morning from unsettling dreams, he found himself changed in his bed into a monstrous vermin.`.split(
    ' '
  );

  const labels = [
    {
      name: 'PERSON',
    },
    {
      name: 'ANIMAL',
    },
  ];

  const [label, setLabel] = useState(labels[0]);
  const [tokensData, setTokensData] = useState([]);

  const isTokenLabeled = (index) =>
    tokensData.find((obj) => isBetween(index, obj.start, obj.end));

  const handleLabelChange = (newLabel) => setLabel(newLabel);

  const handleOnMouseUp = () => {
    const selection = window.getSelection();

    let startIndex =
      selection.anchorNode.parentElement.getAttribute('data-index') ||
      selection.anchorNode.parentElement.getAttribute('data-label');
    let endIndex = selection.focusNode.parentElement.getAttribute('data-index');

    startIndex = parseInt(startIndex, 10);
    endIndex = parseInt(endIndex, 10);

    log('start, end: ', startIndex, endIndex);

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
        tag: label.name,
      },
    ]);
  };

  return {
    labels,
    label,
    handleLabelChange,
    tokens,
    handleOnMouseUp,
    isTokenLabeled,
  };
}
