import React from "react";
import { Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SnacLogoSVG from "../../assets/SnacLogoSVG";

const Splash = () => {
  return (
    <SafeAreaView className="h-full bg-snacPurple flex flex-col items-center justify-center">
      <Image source={require("../../assets/logo.png")} />
    </SafeAreaView>
  );
};

export default Splash;
