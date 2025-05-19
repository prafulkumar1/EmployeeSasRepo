import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withDelay,
  withSequence,
  withTiming,
} from "react-native-reanimated";

// 12-dot grid layout
const DOTS = [
  { top: 0, left: 0 }, { top: 12, left: 0 },
  { top: 0, left: 12 }, { top: 12, left: 12 },
  { top: 0, left: 24 }, { top: 0, left: 36 },
  { top: 12, left: 24 }, { top: 12, left: 36 },
  { top: 24, left: 36 }, { top: 24, left: 24 },
  { top: 36, left: 24 }, { top: 36, left: 36 },
];

const GROUPS = [
  [0, 1], [2, 3], [4, 5], [6, 7], [8, 9], [10, 11],
];

const Dot = ({ animatedOpacity, style }) => {
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: animatedOpacity.value,
  }));
  return <Animated.View style={[styles.dot, style, animatedStyle]} />;
};

const DotLoader = ({ visible = false }) => {
  const opacities = DOTS.map(() => useSharedValue(0.2));

  const startAnimation = () => {
    GROUPS.forEach((group, stepIndex) => {
      const delay = stepIndex * 200;
      group.forEach((dotIndex) => {
        opacities[dotIndex].value = withSequence(
          withDelay(delay, withTiming(1, { duration: 200 })),
          withTiming(0.2, { duration: 200 })
        );
      });
    });

    setTimeout(startAnimation, 1600); // loop delay
  };

  useEffect(() => {
    if (visible) {
      startAnimation();
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <View style={styles.overlay} pointerEvents="auto">
      <View style={styles.loaderBox}>
        <View style={styles.grid}>
          {DOTS.map(({ top, left }, index) => (
            <Dot
              key={index}
              animatedOpacity={opacities[index]}
              style={{ top, left }}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    // backgroundColor: "rgba(0, 0, 0, 0.1)", // dim background
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  },
  loaderBox: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 8,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  grid: {
    width: 50,
    height: 50,
    position: "relative",
  },
  dot: {
    position: "absolute",
    width: 8,
    height: 8,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
});

export default DotLoader;

