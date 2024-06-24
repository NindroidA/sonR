/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-trailing-spaces */
import type React from 'react';
import { useRef, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

import GlowText from '@/components/GlowText';
import Sonar from '@/components/Sonar';
import TypeWriterText from '@/components/TypeWriterText';

export const WelcomePage: React.FC = () => {
  const [typewriterFinished, setTypewriterFinished] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const handleTypewriterFinish = () => {
    setTypewriterFinished(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Sonar size={300} color="#00ffff" />
      <View style={styles.textContainer}>
        <TypeWriterText 
          text="Welcome to"
          delay={100} 
          onFinish={handleTypewriterFinish} 
        />
        {typewriterFinished && (
          <GlowText text="sonR" fadeAnim={fadeAnim} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
});
