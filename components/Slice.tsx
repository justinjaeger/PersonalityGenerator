import { Text, View } from "react-native";
import { styles } from "./styles";

export type iSlice = { color: string; text: string };

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

export default Slice;
