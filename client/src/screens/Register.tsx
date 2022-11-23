import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AuthPrimaryNavigatorProp } from "../navigation/types";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../utils/firebase";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigation = useNavigation<AuthPrimaryNavigatorProp>();

  const register = async () => {
    try {
      if (password.length < 6) {
        throw new Error("Password should be at least 6 characters.");
      }
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const uid = userCredentials.user.uid;
      const newUser: User = {
        uid: uid,
        name: "",
        email: email,
        description: "",
        favs: [],
        snacs: [],
        score: 0,
      };
      await setDoc(doc(db, "users", uid), newUser);
    } catch (error) {
      if (error.message == "Firebase: Error (auth/email-already-in-use).") {
        setError("Email already in use.");
      } else if (error.message == "Firebase: Error (auth/invalid-email).") {
        setError("Invalid email.");
      } else if (error.message == "Firebase: Error (auth/internal-error).") {
        setError("Form is invalid.");
      } else {
        setError(error.message);
      }
    }
  };

  return (
    <SafeAreaView className="bg-snacPurple h-screen p-4">
      <Ionicons
        name="chevron-back"
        size={24}
        color="white"
        onPress={() => navigation.goBack()}
      />
      <KeyboardAvoidingView behavior="padding" className="mt-32">
        {error && (
          <Text className="text-red-500 text-center text-lg">{error}</Text>
        )}
        <Text className="text-snacGreen font-bold text-2xl mt-4">
          Nice to meet you!
        </Text>
        <Text className="text-white mb-10">
          Please provide your email address and password you’d like to use with
          snac.
        </Text>
        <Text className="text-white">Email</Text>
        <TextInput
          value={email}
          onChangeText={(text) => setEmail(text)}
          className="bg-white rounded p-2 font-bold text-black mt-2"
          placeholder="Email"
        />
        <Text className=" text-white mt-4">Password</Text>
        <TextInput
          secureTextEntry
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          className="bg-white rounded p-2 font-bold text-black mt-2"
        />
      </KeyboardAvoidingView>
      <TouchableOpacity
        className="w-3/4 rounded-full py-2 bg-snacGreen self-center mt-auto"
        onPress={register}
      >
        <Text className="text-snacPurple text-center font-bold text-xl">
          Create an account
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Register;
