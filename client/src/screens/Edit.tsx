import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import React, { useContext, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import * as ImagePicker from "expo-image-picker";

const Edit = () => {
  const { user } = useContext(AuthContext);
  const [image, setImage] = useState("");
  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.description);

  const navigation = useNavigation();

  const uploadImage = async () => {
    try {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        quality: 1,
      });

      console.log(result);

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error: any) {
      console.log(error);
    }
  };
  const saveProfileHandler = async () => {};

  return (
    <View className="flex-1 bg-snacPurple pt-4">
      <View className="flex flex-row justify-between px-2 items-center">
        <TouchableOpacity
          className="bg-white/10 rounded-full p-1"
          onPress={() => navigation.goBack()}
        >
          <Feather name="x" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-2xl font-bold">Edit Profile</Text>
        <TouchableOpacity onPress={saveProfileHandler}>
          <Text className="text-snacPink text-lg font-bold">Save</Text>
        </TouchableOpacity>
      </View>
      <Image
        source={require("../../assets/space.png")}
        className="w-full absolute -z-10"
      />
      <View className="h-1/2 mt-4 flex flex-col justify-center items-center bg-red-200">
        {image ? (
          <Text>{image}</Text>
        ) : (
          <TouchableOpacity
            className="w-1/2 rounded-full py-2 bg-snacPurple border border-snacPurple2 self-center mb-24"
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
        <Text className=" text-white mt-4">Bio</Text>
        <TextInput
          value={bio}
          onChangeText={(text) => setBio(text)}
          className="bg-white rounded p-2 font-bold text-black mt-2 h-32"
          multiline={true}
          numberOfLines={8}
          style={{ height: 150, textAlignVertical: "top" }}
        />
      </View>
    </View>
  );
};

export default Edit;
