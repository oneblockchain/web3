'use client'
import { useState, useEffect } from 'react';
import { Text } from '@chakra-ui/react';

function TypingText({ text }) {
  const [displayText, setDisplayText] = useState('');
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  useEffect(() => {
    let timer;

    if (currentCharIndex < text.length) {
      timer = setTimeout(() => {
        setCurrentCharIndex(currentCharIndex + 1);
      }, 50); // adjust the typing speed here
    }

    return () => clearTimeout(timer);
  }, [currentCharIndex, text]);

  useEffect(() => {
    setDisplayText(text.substring(0, currentCharIndex));
  }, [currentCharIndex, text]);

  return (
    <Text>{displayText}</Text>
  );
}

export default TypingText;