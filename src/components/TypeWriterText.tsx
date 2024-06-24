/* eslint-disable no-else-return */
/* eslint-disable consistent-return */
import type React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';

interface TypeWriterProps {
  text: string;
  delay?: number;
  onFinish?: () => void;
}

const TypeWriterText: React.FC<TypeWriterProps> = ({ text, delay = 100, onFinish }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeoutId = setTimeout(() => {
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, delay);

      return () => clearTimeout(timeoutId);
    } else if (onFinish) {
      onFinish();
    }

    // Add this line to ensure all code paths return a value
    return undefined;
  }, [currentIndex, delay, onFinish, text]);

  return (
    <Text style={styles.typewriterText}>
      {text.slice(0, currentIndex)}
    </Text>
  );
};

const styles = StyleSheet.create({
  typewriterText: {
    color: '#00ffff',
    fontSize: 24,
    fontFamily: 'monospace',
  },
});

export default TypeWriterText;
