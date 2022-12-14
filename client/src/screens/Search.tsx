import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { MainNavigatorProp } from "../navigation/MainNavigation";
import { Feather } from "@expo/vector-icons";

const Search = () => {
  const navigation = useNavigation<MainNavigatorProp>();
  return (
    <View className="flex-1 bg-snacPurple pt-4">
      <Text className="text-xl text-white font-bold text-center">Search</Text>
      <TouchableOpacity
        className="bg-white/10 rounded-full p-1 self-end absolute top-4 right-4"
        onPress={() => navigation.goBack()}
      >
        <Feather name="x" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default Search;
