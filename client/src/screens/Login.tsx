import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AuthPrimaryNavigatorProp } from "../navigation/types";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigation = useNavigation<AuthPrimaryNavigatorProp>();

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      if (error.message == "Firebase: Error (auth/invalid-email).") {
        setError("Invalid credentials.");
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
          Glad to see you again!
        </Text>
        <Text className="text-white mb-10">
          Please provide your email address and password.
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
        onPress={login}
      >
        <Text className="text-snacPurple text-center font-bold text-xl">
          Connect to your account
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Login;
