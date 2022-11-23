import { View, Image, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

const Portfolio = () => {
  const [created, setCreated] = useState(true);
  return (
    <View className="bg-snacPurple h-full">
      <Image
        source={require("../../assets/space.png")}
        className="w-full absolute"
      />
      <SafeAreaView className="h-screen">
        <View className="flex flex-row justify-end items-center">
          <View className="bg-white/10 rounded-full px-2 py-1 mx-2">
            <Text className="text-white font-bold">Edit Profile</Text>
          </View>
          <View className="bg-white/10 rounded-full p-1 mr-4">
            <Feather name="share" size={20} color="white" />
          </View>
        </View>
        <View className="h-1/2"></View>
        <View className="flex flex-row items-center">
          <TouchableOpacity
            onPress={() => setCreated(true)}
            className={`${
              created ? "border-white" : "border-clearPurple"
            } border-b-2 flex-1`}
          >
            <Text
              className={`font-bold ${
                created ? "text-white" : "text-clearPurple"
              } text-xl text-center`}
            >
              Created 0
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setCreated(false)}
            className={`${
              created ? "border-clearPurple" : "border-white"
            } border-b-2 flex-1`}
          >
            <Text
              className={`font-bold ${
                created ? "text-clearPurple" : "text-white"
              } text-xl text-center`}
            >
              Collected 0
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Portfolio;
