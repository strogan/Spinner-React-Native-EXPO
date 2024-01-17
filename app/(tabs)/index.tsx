import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View, Vibration } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import Info from "../../components/Info";
import Wheel from "../../components/Wheel";
import { useColorGenerator } from "../../utils/useColor";
import { debounce } from "../../utils/debounce";
import CircleControls from "../../components/CircleControls";

const App = () => {
  const rotation = useSharedValue(0);
  const [colorIndex, setColorIndex] = useState(0);
  const [winnerColor, setWinnerColor] = useState("");

  const [wheelSegments, setWheelSegments] = useState(6);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ rotateZ: `${rotation.value}deg` }],
    };
  }, [rotation]);

  const gesture = Gesture.Pan().onUpdate((e) => {
    rotation.value = withSpring(Math.abs(e.velocityY) / 7 + rotation.value, {
      damping: 50,
      stiffness: 100,
    });
  });

  const colorNames = useColorGenerator(wheelSegments);

  const debouncedSetColorIndex = debounce((value: number) => {
    setColorIndex(value);
  }, 100);

  useDerivedValue(() => {
    let colorIdx = Math.floor(rotation.value / (360 / wheelSegments));
    colorIdx = Math.ceil(colorIdx % wheelSegments);
    runOnJS(debouncedSetColorIndex)(wheelSegments - colorIdx);
  });

  useEffect(() => {
    setWinnerColor(colorNames[colorIndex - 1]);
    Vibration.vibrate(50);
  }, [debouncedSetColorIndex]);

  return (
    <SafeAreaView style={styles.container}>
      <CircleControls
        wheelSegments={wheelSegments}
        setWheelSegments={setWheelSegments}
      />
      <GestureDetector gesture={gesture}>
        <View style={styles.circleContainer}>
          <View style={styles.pointer} />
          <Animated.View style={[styles.circle, animatedStyles]}>
            <Wheel N={wheelSegments} colors={colorNames} />
          </Animated.View>
        </View>
      </GestureDetector>
      <Info currentColor={winnerColor} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: 300,
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 150,
    borderWidth: 2,
    overflow: "hidden",
    borderColor: "#ced4da",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#343a40",
  },
  circleContainer: {
    width: 300,
    height: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  pointer: {
    width: 10,
    height: 30,
    backgroundColor: "black",
    position: "absolute",
    top: -15,
    borderWidth: 2,
    borderColor: "white",
    zIndex: 6000,
  },
});

export default App;
