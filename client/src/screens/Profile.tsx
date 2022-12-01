import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { AuthContext } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { MainNavigatorProp } from "../navigation/MainNavigation";

const Profile = () => {
  const { logout, user } = useContext(AuthContext);
  const navigation = useNavigation<MainNavigatorProp>();

  return (
    <SafeAreaView className="bg-snacPurple flex-1">
      <View className="flex flex-row justify-between px-4 items-center">
        <View className="flex flex-row items-center">
          <Image
            source={{
              uri:
                user.profile ||
                "https://www.cdc.gov/healthypets/images/pets/cute-dog-headshot.jpg?_=42445",
            }}
            className="w-10 h-8 p-8 rounded-full border-2 border-white"
          />
          {user?.name && (
            <Text className="text-center text-white text-xl font-bold ml-4">
              {user.name}
            </Text>
          )}
        </View>
        <View className="p-1 bg-white/10 rounded-full">
          <Feather
            name="settings"
            size={24}
            color="white"
            onPress={() =>
              navigation.navigate("ProfileStackScreen", { screen: "Settings" })
            }
          />
        </View>
      </View>
      <View className="w-11/12 mx-auto mt-8">
        <View className="bg-white/5 flex flex-row rounded items-center justify-between px-8 py-4">
          <View className="border-r border-white pr-16">
            <Text className="text-white text-3xl font-bold text-center">
              14
            </Text>
            <Text className="text-snacPurple3 text-center text-lg">Digis</Text>
          </View>
          <View>
            <Text className="text-snacGreen text-3xl font-bold text-center">
              $12000
            </Text>
            <Text className="text-snacPurple3 text-center text-lg">
              Total Value
            </Text>
          </View>
        </View>
      </View>
      <View className="w-11/12 mx-auto mt-4  flex flex-row items-center justify-center">
        <View className="flex-1  mr-2 bg-white/5 rounded py-2">
          <Text className="text-white text-3xl font-bold text-center">
            $1200
          </Text>
          <Text className="text-snacPurple3 text-center text-lg">Bought</Text>
        </View>
        <View className="flex-1  ml-2 bg-white/5 rounded py-2">
          <Text className="text-white text-3xl font-bold text-center">
            $350
          </Text>
          <Text className="text-snacPurple3 text-center text-lg">Sold</Text>
        </View>
      </View>

      <TouchableOpacity
        className="w-3/4 rounded-full py-2 bg-snacGreen self-center mt-auto"
        onPress={logout}
      >
        <Text className="text-snacPurple text-center font-bold text-xl">
          Logout
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Profile;
