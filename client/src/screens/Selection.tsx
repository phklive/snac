import { View, Text, Image, ImageBackground } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../components/Button";
import Logo from "../../assets/LogoSVG";

const Selection = () => {
  return (
    <ImageBackground source={require("../../assets/BG.png")}>
      <SafeAreaView className="flex flex-col items-center h-screen">
        <View className="flex flex-col items-center justify-center mt-32">
          <Logo color="#8CFFAC" height={40} width={80} />
          <Text className="text-white font-bold text-5xl text-center mt-10">
            Digi collectables, you own
          </Text>
        </View>
        <View className="flex flex-col w-full items-center justify-center mt-auto">
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
    </ImageBackground>
  );
};

export default Selection;
