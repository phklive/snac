import {
  View,
  Image,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import PortfolioFeed from "../components/PortfolioFeed";
import { collection, doc, getDoc } from "firebase/firestore";
import { auth, db } from "../utils/firebase";

const Portfolio = () => {
  const [user, setUser] = useState<User>(null);
  const [created, setCreated] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const userDocRef = doc(db, "users", auth.currentUser.uid);
      const userSnap = await getDoc(userDocRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        const user: User = {
          uid: userData.uid,
          name: userData.name,
          description: userData.description,
          email: userData.email,
          favs: userData.favs,
          score: userData.score,
          snacs: userData.snacs,
        };
        setUser(user);
      } else {
        console.log("user does not exist");
      }
    };

    getUser();
  }, []);

  return (
    <View className="bg-snacPurple h-full">
      <Image
        source={require("../../assets/space.png")}
        className="w-full absolute"
      />
      <SafeAreaView className="h-full flex-1">
        <View className="flex flex-row justify-end items-center">
          <View className="bg-white/10 rounded-full px-2 py-1 mx-2">
            <Text className="text-white font-bold">Edit Profile</Text>
          </View>
          <View className="bg-white/10 rounded-full p-1 mr-4">
            <Feather name="share" size={20} color="white" />
          </View>
        </View>
        <View className="h-1/2"></View>
        <View className="flex flex-row items-center">
          <TouchableOpacity
            onPress={() => setCreated(true)}
            className={`${
              created ? "border-white" : "border-clearPurple"
            } border-b-2 flex-1`}
          >
            <Text
              className={`font-bold ${
                created ? "text-white" : "text-clearPurple"
              } text-xl text-center`}
            >
              Created 0
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setCreated(false)}
            className={`${
              created ? "border-clearPurple" : "border-white"
            } border-b-2 flex-1 `}
          >
            <Text
              className={`font-bold ${
                created ? "text-clearPurple" : "text-white"
              } text-xl text-center`}
            >
              Collected 0
            </Text>
          </TouchableOpacity>
        </View>
        <PortfolioFeed user={user} view={created ? "created" : "collected"} />
      </SafeAreaView>
    </View>
  );
};

export default Portfolio;
