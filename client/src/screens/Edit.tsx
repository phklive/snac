import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import React, { useContext, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { BASE_URL } from "../utils/config";
import { MainNavigatorProp } from "../navigation/MainNavigation";

const Edit = () => {
  const { user, userToken, setUser } = useContext(AuthContext);

  const [bannerImage, setBannerImage] = useState<string>(user.banner);
  const [profileImage, setProfileImage] = useState<string>(user.profile);
  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio);

  const navigation = useNavigation<MainNavigatorProp>();

  const uploadBanner = async () => {
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
      setBannerImage(result.assets[0].uri);
    } catch (error: any) {
      console.log(error);
    }
  };

  const uploadProfile = async () => {
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
      setProfileImage(result.assets[0].uri);
    } catch (error: any) {
      console.log(error);
    }
  };

  const saveProfile = async () => {
    try {
      if (user.banner != bannerImage && user.profile != profileImage) {
        try {
          const profileForm = new FormData();
          profileForm.append("profile", {
            // @ts-ignore
            name: "profile",
            uri: profileImage,
            type: "image/png",
          });

          const bannerForm = new FormData();
          bannerForm.append("banner", {
            // @ts-ignore
            name: "banner",
            uri: bannerImage,
            type: "image/png",
          });

          await axios.post(`${BASE_URL}/user/updateProfile`, profileForm, {
            headers: {
              Authorization: `Bearer ${userToken}`,
              "Content-Type": "multipart/form-data",
            },
          });

          await axios.post(`${BASE_URL}/user/updateBanner`, bannerForm, {
            headers: {
              Authorization: `Bearer ${userToken}`,
              "Content-Type": "multipart/form-data",
            },
          });
        } catch (error: any) {
          console.log(error.message);
        }
      } else if (user.banner == bannerImage && user.profile != profileImage) {
        const form = new FormData();
        form.append("profile", {
          // @ts-ignore
          name: "profile",
          uri: profileImage,
          type: "image/png",
        });
        await axios.post(`${BASE_URL}/user/updateProfile`, form, {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "multipart/form-data",
          },
        });
      } else if (user.banner != bannerImage && user.profile == profileImage) {
        const form = new FormData();
        form.append("banner", {
          // @ts-ignore
          name: "banner",
          uri: bannerImage,
          type: "image/png",
        });
        await axios.post(`${BASE_URL}/user/updateBanner`, form, {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "multipart/form-data",
          },
        });
      }
      await axios.post(
        `${BASE_URL}/user/updateText`,
        { name, bio },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      const res = await axios.get(`${BASE_URL}/auth/getMe`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      const newUser = res.data;

      setUser(newUser);

      navigation.navigate("PortfolioStackScreen", { screen: "Portfolio" });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-snacPurple pt-4"
      behavior="padding"
    >
      <View className="flex flex-row justify-between px-2 items-center">
        <TouchableOpacity
          className="bg-white/10 rounded-full p-1"
          onPress={() => navigation.goBack()}
        >
          <Feather name="x" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-2xl font-bold">Edit Profile</Text>
        <TouchableOpacity onPress={saveProfile}>
          <Text className="text-snacPink text-lg font-bold">Save</Text>
        </TouchableOpacity>
      </View>
      <Image
        source={require("../../assets/space.png")}
        className="w-full absolute -z-10"
      />
      <View className="h-1/2 mt-4 flex flex-col justify-center items-center ">
        <View className="flex-1  w-full flex items-center justify-center">
          {bannerImage ? (
            <TouchableOpacity className="h-full w-full" onPress={uploadBanner}>
              <Image
                source={{ uri: bannerImage }}
                className="h-full w-full mb-2"
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              className="w-1/2 rounded-full py-2 bg-snacPurple border border-snacPurple2 self-center mb-24 "
              onPress={uploadBanner}
            >
              <Text className="text-snacPink text-center font-bold text-xl">
                + Add image
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <View className="flex flex-row justify-start w-full px-4 my-4">
          <TouchableOpacity onPress={uploadProfile}>
            {profileImage ? (
              <Image
                source={{ uri: profileImage }}
                className="h-16 w-16 rounded-full"
              />
            ) : (
              <Image
                source={require("../../assets/profileAddPic.png")}
                className="mr-4 h-16 w-16"
              />
            )}
          </TouchableOpacity>
        </View>
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
          className="bg-white rounded p-2 font-bold text-black mt-2"
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default Edit;
