import { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';

interface TypeWriterProps {
  text?: string;
  delay?: number;
}

const TypeWriterText: React.FC<TypeWriterProps> = ({ text = "", delay = 100 }) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, delay);

    return () => clearInterval(typingInterval);
  }, [text, delay]);

  return <Text style={styles.text}>{displayText}</Text>;
};

const styles = StyleSheet.create({
  text: {
    color: '#00ff00',
    fontSize: 28,
    marginTop: 20,
    fontFamily: 'monospace',
  },
});

export default TypeWriterText;
