import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {
  FlatList,
  ListRenderItem,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { AuthContext } from "../context/AuthContext";
import { MainNavigatorProp } from "../navigation/MainNavigation";
import { BASE_URL } from "../utils/config";

interface PortfolioFeedProps {
  view: string;
}

const PortFolioFeed: React.FC<PortfolioFeedProps> = ({ view }) => {
  const [digis, setDigis] = useState<Digi[]>([]);
  const navigation = useNavigation<MainNavigatorProp>();
  const { userToken, user } = useContext(AuthContext);

  useEffect(() => {
    const getUserDigis = async () => {
      const res = await axios.get(`${BASE_URL}/digi/getUserDigis`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      const data = res.data;

      setDigis(data);
    };

    getUserDigis();
  }, []);

  console.log(digis);

  const renderItem: ListRenderItem<Digi> = ({ item }) => {
    return (
      <View className="flex-1 flex flex-col mt-2">
        <Image
          source={{ uri: item.image }}
          className="h-5/6 w-5/6 rounded self-center"
        />
        <Text className="text-white text-2xl ml-4">{item.title}</Text>
        <View className="w-1/2 rounded-full py-2 bg-snacGreen self-center my-2 ">
          <Text className="text-snacPurple text-center font-bold text-xl">
            {item.price}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View className="flex-1">
      {digis.length == 0 ? (
        <View>
          {view == "created" ? (
            <View className="flex flex-col justify-center items-center absolute top-10 left-6 z-10">
              <Text className="text-white text-xl text-center mt-2">
                Start filling up your metashop with your creations
              </Text>
              <TouchableOpacity
                className="w-3/4 rounded-full py-2 bg-snacGreen self-center mt-2"
                onPress={() =>
                  navigation.navigate("PortfolioStackScreen", {
                    screen: "CreateDigi",
                  })
                }
              >
                <Text className="text-snacPurple text-center font-bold text-xl">
                  + Create Digi
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View className="flex flex-col justify-center items-center absolute top-10 left-6 z-10">
              <Text className="text-white text-xl text-center mt-2">
                Start filling up your collection with your favorite Digis
              </Text>
              <TouchableOpacity
                className="w-3/4 rounded-full py-2 bg-snacGreen self-center mt-2"
                onPress={() =>
                  navigation.navigate("ExploreStackScreen", {
                    screen: "Explore",
                  })
                }
              >
                <Text className="text-snacPurple text-center font-bold text-xl">
                  Explore Digis
                </Text>
              </TouchableOpacity>
            </View>
          )}
          <ScrollView
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            className="px-2 py-4 fixed"
          >
            <View className="flex flex-row gap-2">
              <View className="h-40 bg-white/10 rounded-2xl flex-1" />
              <View className="h-40 bg-white/10 rounded-2xl flex-1" />
            </View>
            <View className="flex flex-row gap-2 mt-2">
              <View className="h-40 bg-white/10 rounded-2xl flex-1" />
              <View className="h-40 bg-white/10 rounded-2xl flex-1" />
            </View>
          </ScrollView>
        </View>
      ) : (
        <View className="flex flex-1">
          <TouchableOpacity
            className="w-1/2 rounded-full py-2 bg-snacGreen self-center my-2 "
            onPress={() =>
              navigation.navigate("PortfolioStackScreen", {
                screen: "CreateDigi",
              })
            }
          >
            <Text className="text-snacPurple text-center font-bold text-xl">
              + Create Digi
            </Text>
          </TouchableOpacity>
          <FlatList
            data={
              view == "created"
                ? digis.filter((digi) => digi.creator == user._id)
                : digis.filter((digi) => digi.owner == user._id)
            }
            renderItem={renderItem}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            contentContainerStyle={{
              flex: 1,
              display: "flex",
            }}
          />
        </View>
      )}
    </View>
  );
};

export default PortFolioFeed;
