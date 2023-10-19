import { useEffect, useState } from "react";
import { iSlice } from "./Slice";
import { ADJECTIVES, COLORS, START_VAL } from "./constants";
import { Animated, Easing } from "react-native";
import { WordBundler } from "./WordBundler";

const MIN_VAL_TO_INCREASE_BY = 0.25;
const BOTTOM_RELATIVE_TO_START = 3;

export const useSpinningWheel = (spinValue: Animated.Value) => {
  const [slices, setSlices] = useState<Array<iSlice>>(
    Array.from(Array(4)).map((x, i) => ({
      color: COLORS[i],
      text: ADJECTIVES[i],
    }))
  );
  const [adjectivesPointer, setAdjectivesPointer] = useState<number>(4);
  const [colorsPointer, setColorsPointer] = useState<number>(4);
  const [currWheelValue, setCurrWheelValue] = useState<number>(START_VAL);
  const [bottomSliceIndex, setBottomSliceIndex] = useState<number>(
    BOTTOM_RELATIVE_TO_START
  );
  const [yourPersonality, setYourPersonality] = useState<String>('');

  // tracks the bottomSliceIndex
  useEffect(() => {
    spinValue.addListener(({ value }) => {
      const val = Math.round(value * 4) / 4;
      const lastTwoDigits = (val % 1) * 100; // 0, 25, 50, 75
      setBottomSliceIndex(lastTwoDigits / ((1 / 4) * 100)); // 0-3
    });
  });

  // assigns a new value to the bottomSliceIndex whenever bottomSliceIndex changes
  useEffect(() => {
    setAdjectivesPointer((prev) => {
      console.log('prev: ', prev)
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
      [bottomSliceIndex]: {
        ...prevSlices[bottomSliceIndex],
        text: ADJECTIVES[adjectivesPointer],
        color: COLORS[colorsPointer],
      },
    }));
  }, [bottomSliceIndex]);

  const onSpin = () => {
    const randomFactor = (Math.floor(Math.random() * 4) + 1) * (1 / 4); // 0.25, 0.5, 0.75, 1
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
        console.log('ap: ', ap);
        const threeBehind = ap - BOTTOM_RELATIVE_TO_START;
        const top =
          ADJECTIVES[threeBehind] ||
          ADJECTIVES[threeBehind + ADJECTIVES.length];
        return ap;
      });
      setYourPersonality(() => {
        const sentence = new WordBundler().getSentence();
        return sentence;
      })
    });
  };

  return { yourPersonality, onSpin, slices, bottomSliceIndex };
};
