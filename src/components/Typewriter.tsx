"use client";
import { useEffect, useState } from 'react';

const typewriterWords = ['for Design Studio', 'for Dubai Municipality'];

export default function Typewriter() {
  const [displayed, setDisplayed] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const currentWord = typewriterWords[wordIndex];
    let timeout: NodeJS.Timeout;

    if (!deleting && charIndex < currentWord.length) {
      timeout = setTimeout(() => {
        setDisplayed(currentWord.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, 40); // fast typing
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setDisplayed(currentWord.slice(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      }, 20); // fast deleting
    } else if (!deleting && charIndex === currentWord.length) {
      timeout = setTimeout(() => setDeleting(true), 800);
    } else if (deleting && charIndex === 0) {
      timeout = setTimeout(() => {
        setDeleting(false);
        setWordIndex((wordIndex + 1) % typewriterWords.length);
      }, 200);
    }
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, wordIndex]);

  return <span className="text-orange-900 font-bold ml-3 uppercase">{displayed}&nbsp;</span>;
} 