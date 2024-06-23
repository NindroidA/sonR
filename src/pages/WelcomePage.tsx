/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-plusplus */
import type React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Sonar from '../components/Sonar';

const TypeWriter: React.FC<{ text: string; delay?: number }> = ({ text, delay = 100 }) => {
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

export const WelcomePage: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Sonar size={300} color="#00ffff" />
        <TypeWriter text="Welcome to sonR" delay={125} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#00ff00',
    fontSize: 28,
    marginTop: 20,
    fontFamily: 'monospace',
  },
});
