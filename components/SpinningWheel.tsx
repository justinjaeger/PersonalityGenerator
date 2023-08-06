import React, { useEffect, useRef, useState } from "react";
import { View, Animated, Text, Easing, TouchableOpacity } from "react-native";
import { ADJECTIVES, COLORS, WHEEL_SIZE } from "./constants";
import { styles } from "./styles";
import Slice, { iSlice } from "./Slice";

const START_VAL = 0;
const FOUR = 4;
const MIN_VAL_TO_INCREASE_BY = 0.25;
const BOTTOM_RELATIVE_TO_START = 3;

const SpinningWheel = () => {
  const spinValue = useRef(new Animated.Value(START_VAL)).current;

  const [slices, setSlices] = useState<Array<iSlice>>(
    Array.from(Array(FOUR)).map((x, i) => ({
      color: COLORS[i],
      text: ADJECTIVES[i],
    }))
  );
  const [adjectivesPointer, setAdjectivesPointer] = useState<number>(FOUR);
  const [colorsPointer, setColorsPointer] = useState<number>(FOUR);
  const [currWheelValue, setCurrWheelValue] = useState<number>(START_VAL);
  const [bottom, setBottom] = useState<number>(BOTTOM_RELATIVE_TO_START);
  const [result, setResult] = useState<string>("");

  // determines which quadrant is on the bottom
  useEffect(() => {
    spinValue.addListener(({ value }) => {
      const val = Math.round(value * FOUR) / FOUR;
      const lastTwoDigits = (val % 1) * 100; // 0, 25, 50, 75
      setBottom(lastTwoDigits / ((1 / FOUR) * 100)); // 0-3
    });
  });

  // assigns a new value to the bottom whenever bottom changes
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
    const randomFactor = (Math.floor(Math.random() * FOUR) + 1) * (1 / FOUR); // 0.25, 0.5, 0.75, 1
    const newWheelVal = currWheelValue + MIN_VAL_TO_INCREASE_BY + randomFactor;
    setCurrWheelValue(newWheelVal); // lets the wheel continue from its current position
    Animated.timing(spinValue, {
      toValue: newWheelVal,
      duration: 3000,
      useNativeDriver: true,
      easing: Easing.bezier(0.03, -0.02, 0.24, 0.99), // Use a different easing function here
    }).start(() => {
      // fires when spin is over
      // though not changing setAdjectivesPointer, must use syntax to get the latest "ap" value & set result
      setAdjectivesPointer((ap) => {
        const threeBehind = ap - BOTTOM_RELATIVE_TO_START;
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
      <View style={[styles.wheelContainer]}>
        <Animated.View
          style={[styles.wheel, { transform: [{ rotate: spin }] }]}
        >
          <Slice
            slice={slices[0]}
            angle={(360 / FOUR) * 1.5}
            style={{ left: WHEEL_SIZE, top: WHEEL_SIZE }}
          />
          <Slice
            slice={slices[1]}
            angle={(360 / FOUR) * 0.5}
            style={{ left: WHEEL_SIZE, top: 0 }}
          />
          <Slice
            slice={slices[2]}
            angle={-((360 / FOUR) * 0.5)}
            style={{ left: 0, top: 0 }}
          />
          <Slice
            slice={slices[3]}
            angle={(360 / FOUR) * 2.5}
            style={{ left: 0, top: WHEEL_SIZE }}
          />
        </Animated.View>
      </View>
    </>
  );
};

export default SpinningWheel;
