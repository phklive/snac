import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SnacLogoSVG from "../../assets/SnacLogoSVG";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorProp } from "../navigation/AuthNavigation";

const Selection = () => {
  const navigation = useNavigation<AuthNavigatorProp>();
  return (
    <ImageBackground
      className="flex-1"
      source={require("../../assets/bgvid.png")}
      resizeMode="cover"
    >
      <SafeAreaView className="flex-1">
        <View className="flex flex-col justify-center pl-10 mt-20">
          <Image source={require("../../assets/logo.png")} />
          <Text className="text-white font-bold text-7xl mt-8">Social</Text>
          <Text className="text-white font-bold text-7xl">Shorts,</Text>
          <Text className="text-white font-bold text-7xl">
            you <Text className="text-snacGreen">buy.</Text>
          </Text>
        </View>
        <TouchableOpacity
          className="w-3/4 rounded-full py-2 self-center border border-snacGreen mt-auto"
          onPress={() => navigation.navigate("Login")}
        >
          <Text className="text-snacGreen text-center font-bold text-xl">
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="w-3/4 rounded-full py-2 bg-snacGreen self-center mt-2 mb-8"
          onPress={() => navigation.navigate("Register")}
        >
          <Text className="text-snacPurple text-center font-bold text-xl">
            Create an account
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Selection;
