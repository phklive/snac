import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { MainNavigatorProp } from "../navigation/MainNavigation";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const CreateDigi = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const navigation = useNavigation<MainNavigatorProp>();

  const uploadImage = async () => {
    try {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (result.canceled) {
        return;
      }
      setImage(result.assets[0].uri);
    } catch (error: any) {
      console.log(error);
    }
  };

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
      <View className=" h-1/2 flex flex-col items-center justify-center py-4">
        {image ? (
          <Image source={{ uri: image }} className="h-full w-full" />
        ) : (
          <TouchableOpacity
            className="w-1/2 rounded-full py-2 bg-snacPurple border border-snacPurple2"
            onPress={uploadImage}
          >
            <Text className="text-snacPink text-center font-bold text-xl">
              + Add image
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <View className="flex flex-col px-4">
        <Text className="text-white">Name</Text>
        <TextInput
          value={name}
          onChangeText={(text) => setName(text)}
          className="bg-white rounded p-2 font-bold text-black mt-2"
        />
        <Text className="text-white mt-4">Price</Text>
        <TextInput
          value={name}
          onChangeText={(text) => setPrice(parseInt(text))}
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
