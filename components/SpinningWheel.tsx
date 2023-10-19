import React, { useRef } from "react";
import { View, Animated, Text, TouchableOpacity } from "react-native";
import { START_VAL, WHEEL_SIZE } from "./constants";
import { styles } from "./styles";
import Slice from "./Slice";
import { useSpinningWheel } from "./useSpinningWheel";
import { WordBundler } from "./WordBundler";

const SpinningWheel = () => {
  const spinValue = useRef(new Animated.Value(START_VAL)).current;

  const { yourPersonality, slices, bottomSliceIndex, onSpin } =
    useSpinningWheel(spinValue);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <>
      {yourPersonality ? (
        <Text style={{ fontWeight: "700", fontSize: 20, marginBottom: 20 }}>
          {yourPersonality}
        </Text>
      ) : null}
      <TouchableOpacity
        onPress={onSpin}
        style={{
          backgroundColor: "#8377D1",
          padding: 20,
          borderRadius: 10,
          marginBottom: 20,
        }}
      >
        <Text style={{ color: "white", fontWeight: "700" }}>Spin me</Text>
      </TouchableOpacity>
      <Text style={{ textAlign: "center" }}>
        New bottom: {JSON.stringify(slices[bottomSliceIndex])}
      </Text>
      <View style={[styles.wheelContainer]}>
        <Animated.View
          style={[styles.wheel, { transform: [{ rotate: spin }] }]}
        >
          <Slice
            slice={slices[0]}
            angle={(360 / 4) * 1.5}
            style={{ left: WHEEL_SIZE, top: WHEEL_SIZE }}
          />
          <Slice
            slice={slices[1]}
            angle={(360 / 4) * 0.5}
            style={{ left: WHEEL_SIZE, top: 0 }}
          />
          <Slice
            slice={slices[2]}
            angle={-((360 / 4) * 0.5)}
            style={{ left: 0, top: 0 }}
          />
          <Slice
            slice={slices[3]}
            angle={(360 / 4) * 2.5}
            style={{ left: 0, top: WHEEL_SIZE }}
          />
        </Animated.View>
      </View>
    </>
  );
};

export default SpinningWheel;
