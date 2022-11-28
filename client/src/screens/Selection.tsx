import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "../../assets/LogoSVG";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorProp } from "../navigation/AuthNavigation";

const Selection = () => {
  const navigation = useNavigation<AuthNavigatorProp>();
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
          <TouchableOpacity
            className="w-3/4 rounded-full py-2 self-center mt-auto border border-snacGreen"
            onPress={() => navigation.navigate("Login")}
          >
            <Text className="text-snacGreen text-center font-bold text-xl">
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="w-3/4 rounded-full py-2 bg-snacGreen self-center mt-2"
            onPress={() => navigation.navigate("Register")}
          >
            <Text className="text-snacPurple text-center font-bold text-xl">
              Create an account
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Selection;
