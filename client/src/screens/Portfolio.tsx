import {
  View,
  Image,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { useContext, useState } from "react";
import { Feather } from "@expo/vector-icons";
import PortfolioFeed from "../components/PortfolioFeed";
import { share } from "../utils/share";
import { AuthContext } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { MainNavigatorProp } from "../navigation/MainNavigation";

const Portfolio = () => {
  const [created, setCreated] = useState(true);
  const navigation = useNavigation<MainNavigatorProp>();
  const { user } = useContext(AuthContext);

  return (
    <View className="bg-snacPurple h-full">
      <Image
        source={require("../../assets/space.png")}
        className="w-full absolute"
      />
      <SafeAreaView className="h-full flex-1">
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

        <View className="h-1/2 flex flex-col justify-end">
          <View className="flex-1 py-2 justify-center items-center">
            {user.banner ? (
              <Image source={{ uri: user.banner }} className="h-full w-full" />
            ) : (
              <TouchableOpacity
                className="w-1/2 rounded-full py-2 bg-snacPurple border border-snacPurple2 self-center"
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
          </View>
          <View className="flex flex-row items-center p-4">
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
              Created 0
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
              Collected 0
            </Text>
          </TouchableOpacity>
        </View>
        <PortfolioFeed user={user} view={created ? "created" : "collected"} />
      </SafeAreaView>
    </View>
  );
};

export default Portfolio;
