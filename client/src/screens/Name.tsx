import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../utils/firebase";
import { PrimaryNavigatorProp } from "../navigation/types";

const Name = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const navigation = useNavigation<PrimaryNavigatorProp>();

  const addName = async () => {
    try {
      const q = query(collection(db, "users"), where("name", "==", name));
      const querySnap = await getDocs(q);
      if (querySnap.docs.length != 0) {
        throw new Error("Name is already taken.");
      }
      const uid = auth.currentUser.uid;
      const userDocRef = doc(db, "users", uid);
      await updateDoc(userDocRef, {
        name: name,
      });
      navigation.navigate("Congratulations");
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <SafeAreaView className="bg-snacPurple h-screen p-4 flex flex-col">
      <Ionicons
        name="chevron-back"
        size={24}
        color="white"
        onPress={() => navigation.goBack()}
      />
      <View>
        <KeyboardAvoidingView className="flex flex-col items-center mt-32">
          {error && (
            <Text className="text-red-500 text-center text-lg mb-4">
              {error}
            </Text>
          )}
          <AntDesign name="smileo" size={40} color="white" />
          <Text className="text-2xl text-snacGreen text-center font-bold my-4">
            Your Digi name
          </Text>
          <Text className="text-lg text-white text-center">
            This is how everyone will find you, your creations and collections!
          </Text>
          <TextInput
            value={name}
            onChangeText={(text) => setName(text)}
            placeholder="e.g The Beast"
            className="bg-white rounded p-2 font-bold text-black mt-8 w-11/12"
          />
        </KeyboardAvoidingView>
      </View>
      <TouchableOpacity
        className="w-3/4 rounded-full py-2 bg-snacGreen self-center mt-auto"
        onPress={addName}
      >
        <Text className="text-snacPurple text-center font-bold text-xl">
          Continue
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Name;
