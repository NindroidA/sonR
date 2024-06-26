/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-unknown-property */
import { Canvas } from '@react-three/fiber/native';
import useControls from 'r3f-native-orbitcontrols';
import type React from 'react';
import { Suspense } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import TrainTrack from '@/components/models/TrainTrack';

export const TrackPage: React.FC = () => {
  const [OrbitControls, events] = useControls();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.modelContainer} {...events}>
        <Canvas>
          <OrbitControls enablePan={false} />
          <directionalLight position={[1, 0, 0]} args={['white', 3]} />
          <directionalLight position={[-1, 0, 0]} args={['white', 3]} />
          <directionalLight position={[0, 1, 0]} args={['white', 3]} />
          <directionalLight position={[0, -1, 0]} args={['white', 3]} />
          <directionalLight position={[0, 0, 1]} args={['white', 3]} />
          <directionalLight position={[0, 0, -1]} args={['white', 3]} />
          <Suspense fallback={null}>
            <TrainTrack scale={0.5} />
          </Suspense>
        </Canvas>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.textContainer}>
          <Text>
            Did you know that this is a train track??
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F7FB',
  },
  modelContainer: {
    flex: 2,
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: 'lightgray',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  textContainer: {
    margin: 20,
    marginBottom: 0,
  }
});
