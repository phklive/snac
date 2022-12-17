import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { MainNavigatorProp } from "../navigation/MainNavigation";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { BASE_URL } from "../utils/config";

const User = ({ route }) => {
  const navigation = useNavigation<MainNavigatorProp>();
  const { id } = route.params;
  const { userToken } = useContext(AuthContext);
  const [user, setUser] = useState<User>(null);
  const [collectedDigis, setCollectedDigis] = useState<Digi[]>([]);
  const [createdDigis, setCreatedDigis] = useState<Digi[]>([]);
  const [created, setCreated] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/user/single/?userId=${id}`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        const user: User = res.data;

        setUser(user);

        const resDigis = await axios.get(
          `${BASE_URL}/digi/getUserDigis/?userId=${id}`,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );

        const digis: Digi[] = resDigis.data;
        const createdDigis = digis.filter((digi) => digi.creator == id);

        const collectedDigis = digis.filter(
          (digi) => digi.creator != id && digi.owner == id
        );

        setCreatedDigis(createdDigis);
        setCollectedDigis(collectedDigis);
      } catch (error: any) {
        console.log(error.message);
      }
    };

    getUser();
  }, []);

  if (!user)
    return (
      <SafeAreaView className="flex-1 bg-snacPurple">
        <Text className="text-xl text-white text-center mt-4">Loading...</Text>
      </SafeAreaView>
    );

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
          {user.banner && (
            <Image
              source={{ uri: user.banner }}
              className="h-96 w-full absolute -z-10"
            />
          )}
          <View className="flex flex-col justify-end">
            <View className="flex flex-row items-center p-4 mt-72">
              {user.profile ? (
                <Image
                  source={{ uri: user.profile }}
                  className="h-16 w-16 rounded-full mr-4"
                />
              ) : (
                <Image
                  source={require("../../assets/profileAddPic.png")}
                  className="h-16 w-16 mr-4"
                />
              )}
              <View>
                {user.name && (
                  <Text className="text-2xl text-white font-bold">
                    {user.name}
                  </Text>
                )}
                {user.bio ? (
                  <Text className="text-white font-bold">{user.bio}</Text>
                ) : (
                  <Text></Text>
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
            <View className="flex flex-row flex-wrap mt-2">
              {created
                ? createdDigis.map((digi) => {
                    return (
                      <View className="w-1/2 p-2" key={digi._id}>
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate("ExploreStackScreen", {
                              screen: "Digi",
                              params: {
                                title: digi.title,
                                price: digi.price,
                                description: digi.description,
                                image: digi.image,
                                owner: digi.owner,
                                likes: digi.likes,
                                id: digi._id,
                                from: "ExploreStackScreen",
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
                            navigation.navigate("ExploreStackScreen", {
                              screen: "Digi",
                              params: {
                                title: digi.title,
                                price: digi.price,
                                description: digi.description,
                                image: digi.image,
                                owner: digi.owner,
                                likes: digi.likes,
                                id: digi._id,
                                from: "ExploreStackScreen",
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

export default User;
