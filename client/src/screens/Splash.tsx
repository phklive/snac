import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SnacLogoSVG from "../../assets/SnacLogoSVG";

const Splash = () => {
  return (
    <SafeAreaView className="h-full bg-snacPurple flex flex-col items-center justify-center">
      <SnacLogoSVG />
    </SafeAreaView>
  );
};

export default Splash;
