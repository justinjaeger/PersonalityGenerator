import { StyleSheet } from "react-native";
import { WHEEL_SIZE } from "./constants";

export const styles = StyleSheet.create({
  slice: {
    position: "absolute",
    width: 0,
    borderTopWidth: WHEEL_SIZE,
    borderRightWidth: WHEEL_SIZE,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderTopColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "transparent",
    borderLeftColor: "transparent",
  },
  sliceTextContainer: {
    position: "absolute",
    display: "flex",
    left: WHEEL_SIZE / WHEEL_SIZE,
    width: WHEEL_SIZE / 1,
    height: WHEEL_SIZE / 1,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  wheel: {
    position: "absolute",
    bottom: -WHEEL_SIZE,
    width: WHEEL_SIZE * 2,
    height: WHEEL_SIZE * 2,
    borderRadius: WHEEL_SIZE,
    overflow: "hidden",
  },
  wheelContainer: {
    position: "absolute",
    bottom: -20,
    width: WHEEL_SIZE * 2,
    transform: [{ rotate: "45deg" }],
  },
});
