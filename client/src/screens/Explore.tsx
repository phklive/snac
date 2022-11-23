import { Text, View, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const ExploreHeader = () => {
  return (
    <View className="mb-10">
      <Image source={require("../../assets/snac.png")} className=" mx-auto" />
    </View>
  );
};

const Explore = () => {
  return (
    <SafeAreaView className="bg-bg h-full">
      <ExploreHeader />
      <Text className="text-center text-white text-2xl">Explore page</Text>
    </SafeAreaView>
  );
};

export default Explore;
