import { View, Text, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../components/Button";

const Selection = () => {
  return (
    <SafeAreaView className="bg-bg flex flex-col justify-between items-center h-screen">
      <Image source={require("../../assets/snac.png")} className=" mx-auto" />
      <Text className="text-white text-5xl text-center mt-10">
        Digi collectables, you own
      </Text>
      <View className="flex flex-col w-full items-center justify-center">
        <Button style="" text="Login" to="Login" type="auth" color="black" />
        <Button
          style="mt-2"
          text="Create an account"
          to="Register"
          type="auth"
          color="outline"
        />
      </View>
    </SafeAreaView>
  );
};

export default Selection;
