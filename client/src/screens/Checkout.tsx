import { Text, Image, View, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import axios from "axios";
import { BASE_URL } from "../utils/config";
import { MainNavigatorProp } from "../navigation/MainNavigation";

const Checkout = ({ route }) => {
  const { image, title, description, price, owner, likes, id } = route.params;
  const { user, userToken, setRefetchUserDigis } = useContext(AuthContext);
  const navigation = useNavigation<MainNavigatorProp>();

  const buyDigiHandler = async () => {
    try {
      await axios.post(
        `${BASE_URL}/digi/buyDigi`,
        {
          digiId: id,
          userId: user._id,
          userImage: user.profile,
          userName: user.name,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      setRefetchUserDigis(true);
      navigation.navigate("PortfolioStackScreen", { screen: "Portfolio" });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-snacPurple flex flex-col justify-between">
      <View className="flex flex-row absolute top-10 left-4 z-10">
        <TouchableOpacity
          className="bg-white/10 p-1 rounded-full"
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="chevron-back"
            size={24}
            color="white"
            className="bg-white/10"
          />
        </TouchableOpacity>
      </View>
      <Text className="text-white text-xl text-center font-bold">Checkout</Text>
      <View className="flex-1">
        <Image
          source={{ uri: image }}
          className="h-1/2 w-11/12 rounded-2xl mx-auto mt-12"
        />
        <View className="flex flex-row justify-between mt-8 w-11/12 mx-auto items-center">
          <Text className="text-white text-xl font-bold">{title}</Text>
          <View className="flex flex-row items-center justify-center">
            <Text className="text-white font-bold text-xl mr-1">{likes}</Text>
            <Feather name="heart" size={24} color="white" />
          </View>
        </View>
        <View className="w-11/12 mx-auto mt-2">
          <Text className="text-white text-lg">{description}</Text>
        </View>
      </View>
      {user._id == owner ? (
        <View className="w-1/2 rounded-full py-2 bg-snacGreen self-center my-2 ">
          <Text className="text-snacPurple text-center font-bold text-xl">
            ${price}
          </Text>
        </View>
      ) : (
        <TouchableOpacity
          className="w-1/2 rounded-full py-2 bg-snacGreen self-center my-2 "
          onPress={buyDigiHandler}
        >
          <Text className="text-snacPurple text-center font-bold text-xl">
            Buy ${price}
          </Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default Checkout;
