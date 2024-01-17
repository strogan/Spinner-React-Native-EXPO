import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";

const Info: FC<{ currentColor: string }> = ({ currentColor }) => {
  return (
    <View style={styles.infoBox}>
      <Text style={styles.text}>Current Color: {currentColor}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 20,
  },
  infoBox: {
    marginTop: 15,
    height: 40,
    justifyContent: "space-between",
  },
});

export default Info;
