/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-extraneous-dependencies */
import type React from 'react';
import { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';
import Svg, { Circle, Line } from 'react-native-svg';

interface SonarProps {
  size?: number;
  color?: string;
}

const Sonar: React.FC<SonarProps> = ({ size = 300, color = '#00ff00' }) => {
  const rotateAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnimation, {
        toValue: 1,
        duration: 4000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const rotate = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size}>
        {/* Static circle outline */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={size / 2 - 2}
          stroke="#333"
          strokeWidth="2"
          fill="none"
        />
        {/* X and Y axes */}
        <Line
          x1={0}
          y1={size / 2}
          x2={size}
          y2={size / 2}
          stroke="#333"
          strokeWidth="1"
        />
        <Line
          x1={size / 2}
          y1={0}
          x2={size / 2}
          y2={size}
          stroke="#333"
          strokeWidth="1"
        />
        {/* Concentric circles */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={size / 3}
          stroke="#333"
          strokeWidth="1"
          fill="none"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={size / 6}
          stroke="#333"
          strokeWidth="1"
          fill="none"
        />
      </Svg>
      <Animated.View
        style={{
          position: 'absolute',
          width: size,
          height: size,
          transform: [{ rotate }],
        }}
      >
        <Svg width={size} height={size}>
          <Line
            x1={size / 2}
            y1={size / 2}
            x2={size / 2}
            y2={0}
            stroke={color}
            strokeWidth="2"
          />
        </Svg>
      </Animated.View>
    </View>
  );
};

export default Sonar;
