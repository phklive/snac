import { View, Text, Image, ImageBackground } from "react-native";
import React from "react";

const CreateDigi2 = () => {
  return (
    <>
      <View className="bg-snacPurple">
        <Text className="text-white text-center font-bold text-3xl mt-20">
          Create DIGI
        </Text>
        <Text className="text-white text-center font-bold text-2xl mt-20">
          Select a video type to convert
        </Text>
        <Text className="text-white text-center font-bold text-2xl">
          into a Digi...
        </Text>
      </View>
      <View className="flex-1 bg-snacPurple flex justify-center items-center">
        <Image
          className="absolute"
          source={require("../../assets/Circles.png")}
        />
        <Image className="absolute" source={require("../../assets/Digi.png")} />

        <Image
          className="absolute translate-x-4 -translate-y-28"
          source={require("../../assets/But.png")}
        />
        <Image
          className="absolute translate-x-28 translate-y-4"
          source={require("../../assets/But1.png")}
        />
        <Image
          className="absolute translate-x-24 -translate-y-16"
          source={require("../../assets/But2.png")}
        />
      </View>
    </>
  );
};

export default CreateDigi2;
