import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import SpinningWheel from "./components/SpinningWheel";

const App = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <SpinningWheel />
      <StatusBar style="auto" />
    </View>
  );
};

export default App;
