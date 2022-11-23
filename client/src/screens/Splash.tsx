import { Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Splash = () => {
  return (
    <SafeAreaView className="h-full bg-pink-200">
      <Image
        source={require("../../assets/snac.png")}
        className="mx-auto my-auto"
      />
    </SafeAreaView>
  );
};

export default Splash;
