import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { share } from "../utils/share";
import { useNavigation } from "@react-navigation/native";
import { MainNavigatorProp } from "../navigation/MainNavigation";

const CongratulationsDigi = ({ route }) => {
  const { title, image } = route.params;
  const navigation = useNavigation<MainNavigatorProp>();
  return (
    <SafeAreaView className="bg-snacPurple flex-1">
      <Text className="text-white text-4xl text-center mt-8 font-bold">
        Congratulations,
      </Text>
      <Text className="text-white text-4xl text-center font-bold">
        on your new Digi!
      </Text>
      <View className="flex flex-col items-center justify-center">
        <Image source={{ uri: image }} className="w-3/4 h-3/4 rounded" />
      </View>
      <View className="-mt-4">
        <TouchableOpacity
          onPress={() => share()}
          className="flex flex-row items-center justify-center"
        >
          <Text className="text-white text-xl text-center mr-2">
            Share this
          </Text>
          <Feather name="share" size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          className="w-3/4 rounded-full py-2 bg-snacGreen self-center my-4"
          onPress={() =>
            navigation.navigate("PortfolioStackScreen", { screen: "Portfolio" })
          }
        >
          <Text className="text-snacPurple text-center font-bold text-xl">
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CongratulationsDigi;
