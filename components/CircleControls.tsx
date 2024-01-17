import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
interface CircleControlsProps {
  wheelSegments: number;
  setWheelSegments: (value: number) => void;
}

const CircleControls: FC<CircleControlsProps> = ({
  wheelSegments,
  setWheelSegments,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Circle segments: {wheelSegments}</Text>
      <TouchableOpacity onPress={() => setWheelSegments(wheelSegments + 1)}>
        <AntDesign name="plus" size={28} color="white" />
      </TouchableOpacity>
      {wheelSegments > 2 && (
        <TouchableOpacity
          onPress={() => setWheelSegments(wheelSegments - 1)}
          disabled={wheelSegments <= 2}
        >
          <AntDesign name="minus" size={28} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 20,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    marginBottom: 30,
  },
});

export default CircleControls;
