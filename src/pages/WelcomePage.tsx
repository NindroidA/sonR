import type React from 'react';
import { StyleSheet, View } from 'react-native';

import Sonar from '@/components/Sonar';
import TypeWriterText from '@/components/TypeWriterText';

export const WelcomePage: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Sonar size={300} color="#00ffff" />
        <TypeWriterText text="Welcome to sonR" delay={125} />
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
});
