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
        <Feather
          name="settings"
          size={24}
          color="white"
          onPress={() =>
            navigation.navigate("ProfileStackScreen", { screen: "Settings" })
          }
        />
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
