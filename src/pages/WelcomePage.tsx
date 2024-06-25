/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-trailing-spaces */
import { useRouter } from 'expo-router';
import type React from 'react';
import { useRef, useState } from 'react';
import { Animated, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';

import GlowText from '@/components/GlowText';
import Sonar from '@/components/Sonar';
import TypeWriterText from '@/components/TypeWriterText';

export const WelcomePage: React.FC = () => {
  const [typewriterFinished, setTypewriterFinished] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const router = useRouter();

  const handleTypewriterFinish = () => {
    setTypewriterFinished(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const navigateToHomePage = () => {
    router.push('/home');
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      navigateToHomePage();
    }
  };

  return (
    <View style={styles.container}>
      <Sonar size={300} color="#00ffff" />
      <View>
        <TouchableOpacity
          onPress={navigateToHomePage}
          style={styles.textContainer}
          {...(Platform.OS === 'web' ? {
            onKeyPress: handleKeyPress,
            tabIndex: 0
          } : {})}
        >
          <TypeWriterText 
            text="Welcome to"
            delay={100} 
            onFinish={handleTypewriterFinish} 
          />
          {typewriterFinished && (
            <GlowText text="sonR" fadeAnim={fadeAnim} />
          )}
        </TouchableOpacity>
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
