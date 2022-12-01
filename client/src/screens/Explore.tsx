import {
  Text,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
  View,
  Dimensions,
  Image,
  ImageBackground,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import Logo from "../../assets/LogoSVG";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { MainNavigatorProp } from "../navigation/MainNavigation";
import axios from "axios";
import { BASE_URL } from "../utils/config";
import { AuthContext } from "../context/AuthContext";

const Explore = () => {
  const [digis, setDigis] = useState<Digi[]>([]);
  const [refreshFeed, setRefreshFeed] = useState<boolean>(false);
  const { userToken, user } = useContext(AuthContext);
  const navigation = useNavigation<MainNavigatorProp>();

  const flatListRef = useRef<FlatList>();

  useEffect(() => {
    const getDigis = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/digi/getDigis`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        const data = res.data;

        setDigis(data);
        console.log("refreshed");
      } catch (error: any) {
        console.log(error);
      }
    };

    getDigis();
  }, [refreshFeed]);

  const refreshFeedHandler = () => {
    setRefreshFeed(true);
  };

  const renderItem: ListRenderItem<Digi> = ({ item, index }) => {
    return (
      <View style={{ height: Dimensions.get("window").height - 90 }}>
        <ImageBackground
          source={{ uri: item.image }}
          className="w-full h-full flex flex-col justify-end"
          resizeMode="cover"
        >
          <View className="mb-2">
            <View className="flex flex-row items-center">
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ExploreStackScreen", {
                    screen: "User",
                    params: {
                      id: item.owner,
                    },
                  })
                }
              >
                <Image
                  source={{
                    uri:
                      item.ownerImage ||
                      "https://www.cdc.gov/healthypets/images/pets/cute-dog-headshot.jpg?_=42445",
                  }}
                  className="w-16 h-16 rounded-full ml-2"
                />
              </TouchableOpacity>
              <Text className="text-white ml-2">{item.ownerName}</Text>
            </View>
            <Text className="text-white ml-2 my-2 text-xl font-bold">
              {item.title}
            </Text>
            <Text className="text-white ml-2 text-lg">{item.description}</Text>
          </View>
          {user._id != item.owner && (
            <TouchableOpacity
              className="w-1/2 rounded-full py-2 bg-snacGreen mb-4 mt-2 ml-2"
              onPress={() =>
                navigation.navigate("ExploreStackScreen", {
                  screen: "Checkout",
                  params: {
                    description: item.description,
                    image: item.image,
                    likes: item.likes,
                    owner: item.owner,
                    price: item.price,
                    title: item.title,
                    id: item._id,
                  },
                })
              }
            >
              <Text className="text-snacPurple text-center font-bold text-xl">
                Buy ${item.price}
              </Text>
            </TouchableOpacity>
          )}
        </ImageBackground>
      </View>
    );
  };

  return (
    <View className="bg-snacPurple flex-1">
      <View className="absolute z-10 flex w-full top-12 justify-center items-center">
        <Logo color="#8CFFAC" height={29} width={80} />
      </View>
      <TouchableOpacity
        className="bg-white/20 rounded-full p-1 absolute top-12 right-4 z-20"
        onPress={() =>
          navigation.navigate("ExploreStackScreen", { screen: "Search" })
        }
      >
        <Feather name="search" size={24} color="white" />
      </TouchableOpacity>
      <FlatList
        ref={flatListRef}
        renderItem={renderItem}
        data={digis}
        maxToRenderPerBatch={2}
        initialNumToRender={0}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews
        pagingEnabled
        windowSize={4}
        decelerationRate={"normal"}
        onEndReached={refreshFeedHandler}
      />
    </View>
  );
};

export default Explore;
