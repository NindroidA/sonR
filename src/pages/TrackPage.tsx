/* eslint-disable prefer-destructuring */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-unknown-property */
import { Canvas, useFrame, useThree } from '@react-three/fiber/native';
import type React from 'react';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import type { GestureResponderEvent } from 'react-native';
import { PanResponder, Platform, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as THREE from 'three';

import DebugGrid from '@/components/debugGrid';
import TrainTrack from '@/components/models/TrainTrack';

const ViewWeb = Platform.OS === 'web' ? require('react-native-web').View : View;

interface CameraControllerHandle {
  onMove: (dx: number, dy: number) => void;
  onZoom: (delta: number) => void;
  onInputEnd: () => void;
}

const CameraController = forwardRef<CameraControllerHandle>((_props, ref) => {
  const { camera } = useThree();
  const [cameraPosition] = useState(() => new THREE.Vector3(-5, 5, -5));
  const velocityRef = useRef(new THREE.Vector2(0, 0));
  const isMovingRef = useRef(false);

  useEffect(() => {
    camera.position.copy(cameraPosition);
  }, [camera, cameraPosition]);

  const onMove = useCallback((dx: number, dy: number) => {
    const sensitivity = 0.001;
    
    const adjustedDx = dx * 0.7071 + dy * 0.7071;
    const adjustedDy = -dx * 0.7071 + dy * 0.7071;

    velocityRef.current.set(adjustedDx * sensitivity, adjustedDy * sensitivity);
    isMovingRef.current = true;
  }, []);

  const onZoom = useCallback((delta: number) => {
    const zoomSensitivity = 0.1;
    const zoomDirection = cameraPosition.clone().normalize();
    
    cameraPosition.add(zoomDirection.multiplyScalar(delta * zoomSensitivity));

    const distanceFromOrigin = cameraPosition.length();
    if (distanceFromOrigin < 2) {
      cameraPosition.setLength(2);
    } else if (distanceFromOrigin > 20) {
      cameraPosition.setLength(20);
    }
  }, [cameraPosition]);

  const onInputEnd = useCallback(() => {
    isMovingRef.current = false;
  }, []);

  useImperativeHandle(ref, () => ({
    onMove,
    onZoom,
    onInputEnd
  }));

  useFrame(() => {
    if (isMovingRef.current || velocityRef.current.length() > 0.0001) {
      cameraPosition.x += velocityRef.current.x;
      cameraPosition.z += velocityRef.current.y;

      if (!isMovingRef.current) {
        velocityRef.current.multiplyScalar(0.95);
      }
    } else {
      velocityRef.current.set(0, 0);
    }

    isMovingRef.current = false;
    camera.position.copy(cameraPosition);
  });

  return null;
});

export const TrackPage: React.FC = () => {
  const cameraControllerRef = useRef<CameraControllerHandle>(null);
  const lastPos = useRef({ x: 0, y: 0, pinchDist: 0 });
  const isDragging = useRef(false);

  const handleMove = (dx: number, dy: number) => {
    if (cameraControllerRef.current) {
      cameraControllerRef.current.onMove(dx, dy);
    }
  };

  const handleZoom = (delta: number) => {
    if (cameraControllerRef.current) {
      cameraControllerRef.current.onZoom(delta);
    }
  };

  const handleInputEnd = () => {
    if (cameraControllerRef.current) {
      cameraControllerRef.current.onInputEnd();
    }
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt: GestureResponderEvent) => {
        isDragging.current = true;
        lastPos.current = { 
          x: evt.nativeEvent.pageX, 
          y: evt.nativeEvent.pageY,
          pinchDist: 0
        };
      },
      onPanResponderMove: (evt: GestureResponderEvent, gestureState: any) => {
        if (isDragging.current) {
          const touches = evt.nativeEvent.touches;
          if (touches && touches.length === 2) {
            // Pinch-to-zoom
            const touch1 = touches[0];
            const touch2 = touches[1];
            if (touch1 && touch2) {
              const dist = Math.hypot(touch1.pageX - touch2.pageX, touch1.pageY - touch2.pageY);
              
              if (lastPos.current.pinchDist !== 0) {
                const delta = lastPos.current.pinchDist - dist;
                handleZoom(delta * 0.1);
              }
              
              lastPos.current.pinchDist = dist;
            }
          } else {
            // Linear movement (single touch or mouse)
            handleMove(gestureState.dx, gestureState.dy);
          }
        }
      },
      onPanResponderRelease: () => {
        isDragging.current = false;
        lastPos.current.pinchDist = 0;
        handleInputEnd();
      },
    })
  ).current;

  const handleMouseMove = useCallback((event: React.MouseEvent) => {
    if (isDragging.current) {
      const dx = event.clientX - lastPos.current.x;
      const dy = event.clientY - lastPos.current.y;
      handleMove(dx, dy);
      lastPos.current = { x: event.clientX, y: event.clientY, pinchDist: 0 };
    }
  }, []);

  const handleMouseDown = useCallback((event: React.MouseEvent) => {
    isDragging.current = true;
    lastPos.current = { x: event.clientX, y: event.clientY, pinchDist: 0 };
  }, []);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
    handleInputEnd();
  }, []);

  const handleWheel = useCallback((event: React.WheelEvent) => {
    event.preventDefault();
    handleZoom(event.deltaY * 0.01);
  }, []);

  const viewProps = Platform.OS === 'web'
    ? {
      onMouseMove: handleMouseMove,
      onMouseDown: handleMouseDown,
      onMouseUp: handleMouseUp,
      onMouseLeave: handleMouseUp,
      onWheel: handleWheel,
    }
    : {};

  return (
    <SafeAreaView style={styles.container}>
      <ViewWeb 
        style={styles.modelContainer} 
        {...panResponder.panHandlers}
        {...viewProps}
      >
        <Canvas camera={{ position: [-5, 15, -5], fov: 90 }}>
          <CameraController ref={cameraControllerRef} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <DebugGrid />
          <TrainTrack scale={0.5} position={[0, 0, -4]} />
        </Canvas>
      </ViewWeb>
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
    backgroundColor: '#1c1e29',
  },
  modelContainer: {
    flex: 5,
  },
  bottomContainer: {
    flex: 0.5,
    backgroundColor: 'lightgray',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  textContainer: {
    margin: 20,
    marginBottom: 0,
  }
});
