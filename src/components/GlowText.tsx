import type React from 'react';
import { Animated, StyleSheet, Text } from 'react-native';

interface GlowTextProps {
  text: string;
  fadeAnim: Animated.Value;
}

const GlowText: React.FC<GlowTextProps> = ({ text, fadeAnim }) => {
  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      <Text style={styles.glowText}>{text}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  glowText: {
    color: '#00ff00',
    fontSize: 32,
    fontWeight: 'bold',
    fontFamily: 'monospace',
    textShadowColor: '#00ff00',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
});

export default GlowText;
