import { View, Image, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { share } from "../utils/share";
import { AuthContext } from "../context/AuthContext";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { MainNavigatorProp } from "../navigation/MainNavigation";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { BASE_URL } from "../utils/config";

const Portfolio = () => {
  const [collectedDigis, setCollectedDigis] = useState<Digi[]>([]);
  const [createdDigis, setCreatedDigis] = useState<Digi[]>([]);
  const [created, setCreated] = useState(true);
  const navigation = useNavigation<MainNavigatorProp>();
  const isFocused = useIsFocused();
  const { userToken, user } = useContext(AuthContext);

  useEffect(() => {
    const getUserDigis = async () => {
      const res = await axios.get(
        `${BASE_URL}/digi/getUserDigis/?userId=${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      const data: Digi[] = res.data;

      const createdDigis = data.filter((digi) => digi.creator == user._id);

      const collectedDigis = data.filter(
        (digi) => digi.creator != user._id && digi.owner == user._id
      );

      setCreatedDigis(createdDigis);
      setCollectedDigis(collectedDigis);
    };

    getUserDigis();
  }, [isFocused]);

  return (
    <View className="flex-1">
      <ScrollView
        className="bg-snacPurple"
        showsVerticalScrollIndicator={false}
      >
        <SafeAreaView>
          <Image
            source={require("../../assets/space.png")}
            className="w-full absolute -z-10"
          />
          <View className="flex flex-row justify-end items-center">
            <TouchableOpacity
              className="bg-white/10 rounded-full px-2 py-1 mx-2"
              onPress={() =>
                navigation.navigate("PortfolioStackScreen", { screen: "Edit" })
              }
            >
              <Text className="text-white font-bold">Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-white/10 rounded-full p-1 mr-4"
              onPress={() => share()}
            >
              <Feather name="share" size={20} color="white" />
            </TouchableOpacity>
          </View>

          {user.banner && (
            <Image
              source={{ uri: user.banner }}
              className="h-96 w-full absolute -z-10"
            />
          )}

          <View className="flex flex-col justify-end">
            {!user.banner && (
              <TouchableOpacity
                className="w-1/2 rounded-full py-2 bg-snacPurple border border-snacPurple2 self-center absolute top-32"
                onPress={() =>
                  navigation.navigate("PortfolioStackScreen", {
                    screen: "Edit",
                  })
                }
              >
                <Text className="text-snacPink text-center font-bold text-xl">
                  + Add Banner
                </Text>
              </TouchableOpacity>
            )}
            <View className="flex flex-row items-center p-4 mt-72">
              {user.profile ? (
                <Image
                  source={{ uri: user.profile }}
                  className="h-16 w-16 rounded-full mr-4"
                />
              ) : (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("PortfolioStackScreen", {
                      screen: "Edit",
                    })
                  }
                >
                  <Image
                    source={require("../../assets/profileAddPic.png")}
                    className="h-16 w-16 mr-4"
                  />
                </TouchableOpacity>
              )}
              <View>
                {user?.name && (
                  <Text className="text-2xl text-white font-bold">
                    {user.name}
                  </Text>
                )}
                {user?.bio ? (
                  <Text className="text-white font-bold">{user.bio}</Text>
                ) : (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("PortfolioStackScreen", {
                        screen: "Edit",
                      })
                    }
                  >
                    <Text className="text-lg text-snacPink font-bold">
                      Add Bio
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
          <View className="flex flex-row items-center">
            <TouchableOpacity
              onPress={() => setCreated(true)}
              className={`${
                created ? "border-white" : "border-snacPurple2"
              } border-b-2 flex-1`}
            >
              <Text
                className={`font-bold ${
                  created ? "text-white" : "text-snacPurple2"
                } text-xl text-center`}
              >
                Created {createdDigis.length}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setCreated(false)}
              className={`${
                created ? "border-snacPurple2" : "border-white"
              } border-b-2 flex-1 `}
            >
              <Text
                className={`font-bold ${
                  created ? "text-snacPurple2" : "text-white"
                } text-xl text-center`}
              >
                Collected {collectedDigis.length}
              </Text>
            </TouchableOpacity>
          </View>
          <View className="mt-2">
            {created && (
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
            )}
            <View className="flex flex-row flex-wrap mt-2">
              {created
                ? createdDigis.map((digi) => {
                    return (
                      <View className="w-1/2 p-2" key={digi._id}>
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate("PortfolioStackScreen", {
                              screen: "Digi",
                              params: {
                                title: digi.title,
                                price: digi.price,
                                description: digi.description,
                                image: digi.image,
                                owner: digi.owner,
                                likes: digi.likes,
                              },
                            })
                          }
                        >
                          <Image
                            source={{ uri: digi.image }}
                            className="h-60 w-full self-center rounded-2xl"
                          />
                        </TouchableOpacity>
                        <Text className="text-white text-2xl my-2">
                          {digi.title}
                        </Text>
                        <View className="w-1/2 rounded-full py-2 bg-snacGreen mb-2 ">
                          <Text className="text-snacPurple text-center text-lg">
                            ${digi.price}
                          </Text>
                        </View>
                      </View>
                    );
                  })
                : collectedDigis.map((digi) => {
                    return (
                      <View className="w-1/2 p-2" key={digi._id}>
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate("PortfolioStackScreen", {
                              screen: "Digi",
                              params: {
                                title: digi.title,
                                price: digi.price,
                                description: digi.description,
                                image: digi.image,
                                owner: digi.owner,
                                likes: digi.likes,
                              },
                            })
                          }
                        >
                          <Image
                            source={{ uri: digi.image }}
                            className="h-60 w-full self-center rounded-2xl"
                          />
                        </TouchableOpacity>
                        <Text className="text-white text-2xl my-2">
                          {digi.title}
                        </Text>
                        <View className="w-1/2 rounded-full py-2 bg-snacGreen mb-2 ">
                          <Text className="text-snacPurple text-center text-lg">
                            ${digi.price}
                          </Text>
                        </View>
                      </View>
                    );
                  })}
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};

export default Portfolio;
