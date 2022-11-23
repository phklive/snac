import { Text, SafeAreaView, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { PrimaryNavigatorProp } from "../navigation/types";

const Congratulations = () => {
  const navigation = useNavigation<PrimaryNavigatorProp>();
  return (
    <SafeAreaView className="bg-bg flex flex-col justify-center items-center h-screen">
      <Image
        source={require("../../assets/Iconsuccess.png")}
        className="mx-auto mt-32"
      />
      <Text className="text-white text-3xl text-center w-2/3 mt-10">
        Congratulations ready to rock & roll!
      </Text>

      <TouchableOpacity
        className="w-3/4 rounded-full py-2 bg-snacGreen self-center mt-auto"
        onPress={() => navigation.navigate("TabNavigation")}
      >
        <Text className="text-snacPurple text-center font-bold text-xl">
          Continue
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Congratulations;
