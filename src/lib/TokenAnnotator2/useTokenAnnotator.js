import { useState } from 'react';

export default function useTokenAnnotator() {
  // TODO: This will be passed as prop
  const parsedString = `When Gregor Samsa woke up one morning from unsettling dreams, he found himself changed in his bed into a monstrous vermin.`
    .split(' ')
    .map((t) => ({ text: t }));

  const [tokens, setTokens] = useState(parsedString);

  const labels = [
    {
      name: 'PERSON',
    },
    {
      name: 'ANIMAL',
    },
  ];

  const handleTokenClick = (idx, label) => () => {
    console.log('clicked', idx, label);
    setTokens((current) =>
      current.map((token, currentIndex) => {
        if (idx === currentIndex) return { ...token, label };
        return token;
      })
    );
  };

  return { tokens, labels, handleTokenClick };
}
