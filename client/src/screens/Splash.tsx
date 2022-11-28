import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SnacLogoSVG from "../../assets/SnacLogoSVG";

const Splash = () => {
  return (
    <SafeAreaView className="h-full bg-gradient-to-b from-rose-400 via-fuchsia-500 to-indigo-500 flex flex-col items-center justify-center">
      <SnacLogoSVG color="" height={0} width={0} />
    </SafeAreaView>
  );
};

export default Splash;
