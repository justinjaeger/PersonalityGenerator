import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Animated,
  Text,
  TouchableHighlight,
  Easing,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { ADJECTIVES, COLORS, WHEEL_SIZE } from "./constants";

const styles = StyleSheet.create({
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
});

enum Quadrant {
  Q1 = 1,
  Q2 = 2,
  Q3 = 3,
  Q4 = 4,
}

type iSlice = { color: string; text: string };

const Slice = ({
  slice,
  angle,
  style,
}: {
  slice: iSlice;
  angle: number;
  style: any;
}) => (
  <View style={{ ...style }}>
    <View style={[styles.slice, { backgroundColor: slice.color }]} />
    <View style={[styles.sliceTextContainer]}>
      <Text
        style={{
          transform: [{ rotate: `${angle}deg` }],
          color: "white",
          fontWeight: "600",
          fontSize: 20,
          textTransform: "capitalize",
        }}
      >
        {slice.text}
      </Text>
    </View>
  </View>
);

const SpinningWheel = () => {
  const startValue = 0;
  const minAmountToIncreaseBy = 0.25;

  const spinValue = useRef(new Animated.Value(startValue)).current;

  const [currWheelValue, setCurrWheelValue] = useState<number>(startValue);
  const [bottom, setBottom] = useState<Quadrant>(3);
  const [adjectivesPointer, setAdjectivesPointer] = useState<number>(3);
  const [colorsPointer, setColorsPointer] = useState<number>(3);
  const [result, setResult] = useState<string>("");
  const [slices, setSlices] = useState<{
    [key in Quadrant]: iSlice;
  }>({
    1: {
      color: COLORS[0],
      text: ADJECTIVES[0],
    },
    2: {
      color: COLORS[1],
      text: ADJECTIVES[1],
    },
    3: {
      color: COLORS[2],
      text: ADJECTIVES[2],
    },
    4: {
      color: COLORS[3],
      text: ADJECTIVES[3],
    },
  });

  // determines which quadrant is on the bottom
  useEffect(() => {
    spinValue.addListener(({ value }) => {
      const val = Math.round(value * 4) / 4;
      const lastTwoDigits = (val % 1) * 100;
      if (lastTwoDigits === 25) {
        setBottom(2);
      } else if (lastTwoDigits === 50) {
        setBottom(1);
      } else if (lastTwoDigits === 75) {
        setBottom(4);
      } else if (lastTwoDigits === 0) {
        setBottom(3);
      }
    });
  });

  // assign a new value to the bottom
  useEffect(() => {
    setAdjectivesPointer((prev) => {
      const newVal = prev + 1;
      if (!ADJECTIVES[newVal]) return 0;
      return newVal;
    });
    setColorsPointer((prev) => {
      const newVal = prev + 1;
      if (!COLORS[newVal]) return 0;
      return newVal;
    });
    setSlices((prevSlices) => ({
      ...prevSlices,
      [bottom]: {
        ...prevSlices[bottom],
        text: ADJECTIVES[adjectivesPointer],
        color: COLORS[colorsPointer],
      },
    }));
  }, [bottom]);

  const onSpin = () => {
    const randomFactor = (Math.floor(Math.random() * 4) + 1) * 0.25; // 0.25, 0.5, 0.75, 1
    const newWheelVal = currWheelValue + minAmountToIncreaseBy + randomFactor;
    setCurrWheelValue(newWheelVal); // lets the wheel continue from its current position
    Animated.timing(spinValue, {
      toValue: newWheelVal,
      duration: 3000, // Set the duration of the spinning animation
      useNativeDriver: true,
      easing: Easing.bezier(0.03, -0.02, 0.24, 0.99), // Use a different easing function here
    }).start(() => {
      // must use this syntax to NOT access a stale value
      setAdjectivesPointer((ap) => {
        const threeBehind = ap - 3;
        const top =
          ADJECTIVES[threeBehind] ||
          ADJECTIVES[threeBehind + ADJECTIVES.length];
        setResult(top);
        return ap;
      });
    });
  };

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <>
      {result ? (
        <Text style={{ fontWeight: "700", fontSize: 20, marginBottom: 20 }}>
          Your word is: {result}
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
        New bottom: {JSON.stringify(slices[bottom])}
      </Text>
      <View
        style={{
          position: "absolute",
          bottom: -20,
          width: WHEEL_SIZE * 2,
          transform: [{ rotate: "45deg" }],
        }}
      >
        <Animated.View
          style={[
            {
              position: "absolute",
              bottom: -WHEEL_SIZE,
              width: WHEEL_SIZE * 2,
              height: WHEEL_SIZE * 2,
              borderRadius: WHEEL_SIZE,
              overflow: "hidden",
            },
            { transform: [{ rotate: spin }] },
          ]}
        >
          <Slice slice={slices[1]} angle={-45} style={{ left: 0, top: 0 }} />
          <Slice
            slice={slices[2]}
            angle={45}
            style={{ left: WHEEL_SIZE, top: 0 }}
          />
          <Slice
            slice={slices[3]}
            angle={135}
            style={{ left: WHEEL_SIZE, top: WHEEL_SIZE }}
          />
          <Slice
            slice={slices[4]}
            angle={(360 / 4) * 2.5}
            style={{ left: 0, top: WHEEL_SIZE }}
          />
        </Animated.View>
      </View>
    </>
  );
};

export default SpinningWheel;
