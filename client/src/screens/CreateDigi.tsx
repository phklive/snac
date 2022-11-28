import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { MainNavigatorProp } from "../navigation/MainNavigation";
import { Ionicons } from "@expo/vector-icons";

const CreateDigi = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const navigation = useNavigation<MainNavigatorProp>();
  return (
    <SafeAreaView className="flex-1 bg-snacPurple">
      <View className="flex flex-row absolute top-10 left-4 z-10">
        <TouchableOpacity
          className="bg-white/10 p-1 rounded-full"
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="chevron-back"
            size={24}
            color="white"
            className="bg-white/10"
          />
        </TouchableOpacity>
      </View>
      <Text className="text-xl text-white font-bold text-center">
        Create Digi
      </Text>
      <Image
        source={require("../../assets/space.png")}
        className="w-full absolute -z-10"
      />
      <TouchableOpacity
        className="w-1/2 rounded-full py-2 bg-snacPurple border border-snacPurple2 self-center mt-auto mb-20"
        onPress={() => {}}
      >
        <Text className="text-snacPink text-center font-bold text-xl">
          + Add image
        </Text>
      </TouchableOpacity>
      <View className="flex flex-col px-4 mt-4">
        <Text className="text-white">Name</Text>
        <TextInput
          value={name}
          onChangeText={(text) => setName(text)}
          className="bg-white rounded p-2 font-bold text-black mt-2"
        />
        <Text className=" text-white mt-4">Description</Text>
        <TextInput
          value={description}
          onChangeText={(text) => setDescription(text)}
          className="bg-white rounded p-2 font-bold text-black mt-2 h-32"
          multiline={true}
          numberOfLines={8}
          style={{ height: 150, textAlignVertical: "top" }}
        />
      </View>
      <TouchableOpacity
        className="w-3/4 rounded-full py-2 bg-snacGreen self-center mt-auto"
        onPress={() => {}}
      >
        <Text className="text-snacPurple text-center font-bold text-xl">
          Create Digi
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CreateDigi;
