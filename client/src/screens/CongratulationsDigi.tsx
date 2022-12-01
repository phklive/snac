import { View, Text, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const CongratulationsDigi = ({ route }) => {
  const { title, image } = route.params;
  return (
    <SafeAreaView className="bg-snacPurple flex-1">
      <Text className="text-white text-2xl text-center mt-4 font-bold">
        Congratulations
      </Text>
      <View className="flex flex-col items-center justify-center">
        <Image source={{ uri: image }} className="w-20 h-20 rounded" />
        <Text className="text-white text-xl text-center mt-4">{title}</Text>
      </View>
    </SafeAreaView>
  );
};

export default CongratulationsDigi;
