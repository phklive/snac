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
import { Video } from "expo-av";
import React, { useContext, useEffect, useRef, useState } from "react";
import Logo from "../../assets/LogoSVG";
import { Feather } from "@expo/vector-icons";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { MainNavigatorProp } from "../navigation/MainNavigation";
import axios from "axios";
import { BASE_URL } from "../utils/config";
import { AuthContext } from "../context/AuthContext";
import { share } from "../utils/share";

const Explore = () => {
  const [digis, setDigis] = useState<Digi[]>([]);
  const [refreshFeed, setRefreshFeed] = useState<boolean>(false);
  const { userToken, user } = useContext(AuthContext);
  const navigation = useNavigation<MainNavigatorProp>();
  const isFocused = useIsFocused();

  const flatListRef = useRef<FlatList>();
  const videoRef = useRef<Video>();

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
  }, [refreshFeed, isFocused]);

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
              className="w-1/3 rounded-full py-1 bg-snacGreen mb-4 mt-2 ml-2"
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
              <Text className="text-snacPurple text-center font-bold text-lg">
                Buy ${item.price}
              </Text>
            </TouchableOpacity>
          )}
        </ImageBackground>
      </View>
    );
  };

  // const renderItem: ListRenderItem<Digi> = ({ item, index }) => {
  //   return (
  //     <View style={{ height: Dimensions.get("window").height - 90 }}>
  //       <View className="flex-1 flex flex-col justify-center items-center mt-20 rounded">
  //         <Image
  //           source={{ uri: item.image }}
  //           className="w-5/6 h-5/6 flex flex-col justify-end rounded"
  //           resizeMode="contain"
  //         />
  //       </View>
  //       <View className="mb-2">
  //         <View className="flex flex-row items-center justify-between pr-2">
  //           <View className="flex flex-row items-center">
  //             <TouchableOpacity
  //               onPress={() =>
  //                 navigation.navigate("ExploreStackScreen", {
  //                   screen: "User",
  //                   params: {
  //                     id: item.owner,
  //                   },
  //                 })
  //               }
  //             >
  //               <Image
  //                 source={{
  //                   uri:
  //                     item.ownerImage ||
  //                     "https://www.cdc.gov/healthypets/images/pets/cute-dog-headshot.jpg?_=42445",
  //                 }}
  //                 className="w-16 h-16 rounded-full ml-2"
  //               />
  //             </TouchableOpacity>
  //             <Text className="text-white ml-2">{item.ownerName}</Text>
  //           </View>
  //           {user._id != item.owner && (
  //             <TouchableOpacity
  //               className="w-1/3 rounded-full py-2 bg-snacGreen mb-4 mt-2 ml-2"
  //               onPress={() =>
  //                 navigation.navigate("ExploreStackScreen", {
  //                   screen: "Checkout",
  //                   params: {
  //                     description: item.description,
  //                     image: item.image,
  //                     likes: item.likes,
  //                     owner: item.owner,
  //                     price: item.price,
  //                     title: item.title,
  //                     id: item._id,
  //                   },
  //                 })
  //               }
  //             >
  //               <Text className="text-snacPurple text-center font-bold text-xl">
  //                 Buy ${item.price}
  //               </Text>
  //             </TouchableOpacity>
  //           )}
  //         </View>
  //         <Text className="text-white ml-2 my-2 text-xl font-bold">
  //           {item.title}
  //         </Text>
  //         <Text className="text-white ml-2 text-lg">{item.description}</Text>
  //       </View>
  //     </View>
  //   );
  // };

  return (
    <View className="bg-snacPurple flex-1">
      <TouchableOpacity
        className="bg-white/20 rounded-full p-1 absolute top-16 left-4 z-20"
        onPress={() => share()}
      >
        <Feather name="share" size={24} color="white" />
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-white/20 rounded-full p-1 absolute top-16 right-4 z-20"
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
