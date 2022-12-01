import { Text, Image, View, FlatList, ListRenderItem } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/config";
import { AuthContext } from "../context/AuthContext";

interface StoryProps {
  user: User;
}

const StoryItem: React.FC<StoryProps> = ({ user }) => {
  return (
    <View className="mx-2 flex flex-col items-center my-4">
      <View className="m-2">
        <Image
          source={{
            uri:
              user.profile ||
              "https://www.cdc.gov/healthypets/images/pets/cute-dog-headshot.jpg?_=42445",
          }}
          className="w-10 h-8 p-8 rounded-full border-2 border-white"
        />
      </View>
      {user.name.length > 8 ? (
        <Text className="text-white">{user.name.slice(0, 7)}...</Text>
      ) : (
        <Text className="text-white">{user.name}</Text>
      )}
    </View>
  );
};

const StoriesFeed = () => {
  const [users, setUsers] = useState([]);
  const { userToken, user } = useContext(AuthContext);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/user/all`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        const users = res.data;
        setUsers(users);
      } catch (error: any) {
        console.log(error.message);
      }
    };

    getUsers();
  }, []);

  const renderItem: ListRenderItem<User> = ({ item }) => {
    if (user._id == item._id) return;
    return <StoryItem user={item} />;
  };

  return (
    <FlatList
      data={users}
      renderItem={renderItem}
      horizontal
      showsHorizontalScrollIndicator={false}
      className="w-full"
    />
  );
};

export default StoriesFeed;
