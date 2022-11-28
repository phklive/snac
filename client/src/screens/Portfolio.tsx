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

const Portfolio = () => {
  const [created, setCreated] = useState(true);

  const { user } = useContext(AuthContext);

  return (
    <View className="bg-snacPurple h-full">
      <Image
        source={require("../../assets/space.png")}
        className="w-full absolute"
      />
      <SafeAreaView className="h-full flex-1">
        <View className="flex flex-row justify-end items-center">
          <TouchableOpacity className="bg-white/10 rounded-full px-2 py-1 mx-2">
            <Text className="text-white font-bold">Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-white/10 rounded-full p-1 mr-4"
            onPress={() => share()}
          >
            <Feather name="share" size={20} color="white" />
          </TouchableOpacity>
        </View>
        <View className="h-1/2 flex flex-col justify-end pb-4 p-4">
          <View className="flex flex-row items-center">
            <TouchableOpacity>
              <Image
                source={require("../../assets/profileAddPic.png")}
                className="mr-4"
              />
            </TouchableOpacity>
            <View>
              {user?.name && (
                <Text className="text-2xl text-white font-bold">
                  {user.name}
                </Text>
              )}
              {user?.description ? (
                <Text className="text-white font-bold">{user.description}</Text>
              ) : (
                <TouchableOpacity>
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
              created ? "border-white" : "border-clearPurple"
            } border-b-2 flex-1`}
          >
            <Text
              className={`font-bold ${
                created ? "text-white" : "text-clearPurple"
              } text-xl text-center`}
            >
              Created 0
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setCreated(false)}
            className={`${
              created ? "border-clearPurple" : "border-white"
            } border-b-2 flex-1 `}
          >
            <Text
              className={`font-bold ${
                created ? "text-clearPurple" : "text-white"
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
