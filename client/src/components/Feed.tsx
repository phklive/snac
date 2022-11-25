import { View, Text, FlatList } from "react-native";
import React from "react";

interface FeedItemProps {}

const FeedItem: React.FC<FeedItemProps> = ({}) => {
  return (
    <View>
      <Text>FeedItem</Text>
    </View>
  );
};

const Feed = () => {
  const data = [];
  return <FlatList data={data} renderItem={} />;
};

export default Feed;
