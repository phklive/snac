import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SnacLogoSVG from "../../assets/SnacLogoSVG";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorProp } from "../navigation/AuthNavigation";

const Selection = () => {
  const navigation = useNavigation<AuthNavigatorProp>();
  return (
    <SafeAreaView className="bg-snacPurple flex-1">
      <View className="flex flex-col justify-center items-center mt-32">
        <SnacLogoSVG />
        <Text className="text-white font-bold text-4xl text-center mt-8">
          Digi collectables,
        </Text>
        <Text className="text-white font-bold text-4xl text-center">
          you own
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
  );
};

export default Selection;
