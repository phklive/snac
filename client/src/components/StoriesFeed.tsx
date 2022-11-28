import { Text, Image, View, FlatList, ListRenderItem } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/config";

interface StoryProps {
  user: User;
}

const StoryItem: React.FC<StoryProps> = ({ user }) => {
  return (
    <View className="mx-2 flex flex-col items-center my-4">
      <View className="m-2">
        <Image
          source={{
            uri: "data:image/jpeg;base64,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",
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

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/user/all`);
        const users = res.data;
        setUsers(users);
      } catch (error: any) {
        console.log(error.message);
      }
    };

    getUsers();
  }, []);

  const renderItem: ListRenderItem<User> = ({ item }) => {
    return <StoryItem user={item} />;
  };

  return (
    <FlatList
      data={users}
      renderItem={renderItem}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default StoriesFeed;
