import { View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "../../assets/LogoSVG";
import Stories from "../components/StoriesFeed";
import { Feather } from "@expo/vector-icons";

const ExploreHeader = () => {
  return (
    <View className="mb-10 flex flex-col items-center justify-center">
      <Logo color="#8CFFAC" height={29} width={80} />
      <View className="bg-white/10 rounded-full p-1 absolute top-0 right-4">
        <Feather name="search" size={24} color="white" />
      </View>
      <Stories />
    </View>
  );
};

const Explore = () => {
  return (
    <SafeAreaView className="bg-snacPurple flex-1">
      <ExploreHeader />
    </SafeAreaView>
  );
};

export default Explore;
