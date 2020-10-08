const colors = ["#78e395", "#60a5e6", "#e3c954", "#ed61cf", "#f29472"];

export const getRandomColor = () =>
  colors[Math.floor(Math.random() * colors.length)];

export const isSelectionEmpty = (selection) => {
  const position = selection.anchorNode.compareDocumentPosition(
    selection.focusNode
  );
  return position === 0 && selection.focusOffset === selection.anchorOffset;
};

export const isBetween = (n, a, b) => n >= a && n <= b;
