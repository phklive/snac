import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { signOut } from "firebase/auth";
import { auth, db } from "../utils/firebase";
import { doc, getDoc } from "firebase/firestore";

const Profile = () => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const getUser = async () => {
      const userRef = doc(db, "users", auth.currentUser.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        const user: User = {
          uid: userData.uid,
          name: userData.name,
          description: userData.description,
          email: userData.email,
          favs: userData.favs,
          snacs: userData.snacs,
        };
        setUser(user);
      } else {
        console.log("user does not exist");
      }
    };

    getUser();
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <SafeAreaView className="bg-bg h-full">
      <Text className="text-center text-white text-2xl">Profile page</Text>
      {user?.name && (
        <Text className="text-center text-white text-2xl">{user.name}</Text>
      )}
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
