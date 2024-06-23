import type React from 'react';
import { useEffect, useRef } from 'react';
import { Animated, Platform, StyleSheet, View } from 'react-native';
import Svg, { Circle, G, Line, Path, Text } from 'react-native-svg';

interface SonarProps {
  size?: number;
  color?: string;
}

const Sonar: React.FC<SonarProps> = ({ size = 300, color = '#00ffff' }) => {
  const viewBox = "0 0 100 100";
  const rotateAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnimation, {
        toValue: 1,
        duration: 3750,
        useNativeDriver: Platform.OS !== 'web',
      })
    ).start();
  }, []);

  const rotateDegree = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const SweepComponent = () => (
    <G>
      <Path
        d="M50,50 L50,0 A50,50 0 0,1 75,6.7 z"
        fill={color}
        opacity="0.7"
      />
    </G>
  );

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size} viewBox={viewBox}>
        {/* background */}
        <Circle cx="50" cy="50" r="50" fill="#001a1a" />

        {/* grid lines */}
        <G stroke={color} strokeWidth="0.2" opacity="0.5">
          {[...Array(10)].map((_, i) => (
            <Circle key={i} cx="50" cy="50" r={5 * (i + 1)} fill="none" />
          ))}
          {[...Array(12)].map((_, i) => (
            <Line
              key={i}
              x1="50"
              y1="50"
              x2={50 + 50 * Math.sin((i * Math.PI) / 6)}
              y2={50 - 50 * Math.cos((i * Math.PI) / 6)}
            />
          ))}
        </G>

        {/* degree markings */}
        <G fill={color} fontSize="3">
          {[...Array(12)].map((_, i) => (
            <Text
              key={i}
              x={50 + 45 * Math.sin((i * Math.PI) / 6)}
              y={50 - 45 * Math.cos((i * Math.PI) / 6)}
              textAnchor="middle"
              alignmentBaseline="central"
            >
              {(i * 30 + 360) % 360}
            </Text>
          ))}
        </G>

        {/* rotating sweep */}
        {Platform.OS === 'web' ? (
          <G style={{ transformOrigin: 'center', animation: 'rotate 4s linear infinite' }}>
            <SweepComponent />
          </G>
        ) : (
          <Animated.View style={{
            position: 'absolute',
            width: size,
            height: size,
            transform: [{ rotate: rotateDegree }],
          }}>
            <Svg width={size} height={size} viewBox="0 0 100 100">
              <SweepComponent />
            </Svg>
          </Animated.View>
        )}

        {/* blips */}
        <Circle cx="70" cy="30" r="1" fill={color} />
        <Circle cx="60" cy="60" r="1" fill={color} />
      </Svg>
    </View>
  );
};

// styles
const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
});

// native web compatibility
if (Platform.OS === 'web') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes rotate {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `;
  document.head.append(style);
}

export default Sonar;
