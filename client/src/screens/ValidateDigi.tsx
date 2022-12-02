import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { BASE_URL } from "../utils/config";
import { useNavigation } from "@react-navigation/native";
import { MainNavigatorProp } from "../navigation/MainNavigation";
import Loader from "./Loader";

const ValidateDigi = ({ route }) => {
  const { user, userToken } = useContext(AuthContext);
  const { title, price, description, image } = route.params;
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<MainNavigatorProp>();

  const createDigiHandler = async () => {
    setLoading(true);
    try {
      const form = new FormData();
      form.append("title", title);
      form.append("price", price);
      form.append("description", description);
      form.append("digi", {
        // @ts-ignore
        name: "digi",
        uri: image,
        type: "image/png",
      });

      await axios.post(`${BASE_URL}/digi/createDigi`, form, {
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setLoading(false);

      navigation.navigate("PortfolioStackScreen", {
        screen: "CongratulationsDigi",
        params: {
          image: image,
          title: title,
        },
      });
    } catch (error: any) {
      console.log(error.message);
      setLoading(false);
    }
  };

  return (
    <>
      <SafeAreaView className="bg-snacPurple flex-1">
        <Text className="text-xl text-center text-white font-bold -mb-8">
          Validate Digi
        </Text>
        <View className="h-1/2 flex items-center justify-center">
          <Image
            source={{
              uri: image,
            }}
            className="h-3/4 w-3/4 rounded"
          />
        </View>
        <View className="px-4 border-b border-white w-11/12 mx-auto pb-4">
          <Text className="text-white text-xl mb-2 font-bold">{title}</Text>
          <Text className="text-white text-xl mb-2">{description}</Text>
          <View className="flex flex-row items-center ">
            <Image
              source={{
                uri:
                  user.profile ||
                  "https://www.cdc.gov/healthypets/images/pets/cute-dog-headshot.jpg?_=42445",
              }}
              className="h-16 w-16 rounded-full"
            />
            <Text className="text-white ml-2">0x24bFBaFc7Ca50cf53f07</Text>
          </View>
        </View>
        <View className="p-4 flex flex-row items-center border-b border-white w-11/12 mx-auto ">
          <Image
            source={require("../../assets/digierc.png")}
            className="h-12 w-12"
          />
          <View className="ml-2 ">
            <Text className="text-white">ERC720 NFT</Text>
            <Text className="text-white">compliant</Text>
          </View>
        </View>
        <View className="flex flex-row items-center justify-between p-4">
          <Text className="text-white text-lg">Price</Text>
          <Text className="text-white font-bold text-xl">${price}</Text>
        </View>
        <TouchableOpacity
          className="w-3/4 rounded-full py-2 bg-snacGreen self-center mt-auto -mb-2"
          onPress={createDigiHandler}
        >
          <Text className="text-snacPurple text-center font-bold text-xl">
            Create Digi
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
      {loading && <Loader />}
    </>
  );
};

export default ValidateDigi;
