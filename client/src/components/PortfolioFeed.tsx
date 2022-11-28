import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  FlatList,
  ListRenderItem,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { PrimaryNavigatorProp } from "../navigation/types";

interface PortfolioFeedProps {
  user: User;
  view: string;
}

const PortFolioFeed: React.FC<PortfolioFeedProps> = ({ user, view }) => {
  const navigation = useNavigation<PrimaryNavigatorProp>();

  let data: Snac[] = [];

  // if (view == "created") {
  //   data = user?.snacs.filter((snac: Snac) => user.uid == snac.creator) || [];
  // }

  // if (view == "collected") {
  //   data = user?.snacs.filter((snac: Snac) => user.uid != snac.creator) || [];
  // }

  const renderItem: ListRenderItem<Snac> = ({ item }) => {
    return <View></View>;
  };

  return (
    <View className="flex-1">
      {data.length == 0 ? (
        <View>
          {view == "created" ? (
            <View className="flex flex-col justify-center items-center absolute top-10 left-6 z-10">
              <Text className="text-white text-xl text-center mt-2">
                Start filling up your metashop with your creations
              </Text>
              <TouchableOpacity
                className="w-3/4 rounded-full py-2 bg-snacGreen self-center mt-2"
                onPress={() => navigation.navigate("CreateDigi")}
              >
                <Text className="text-snacPurple text-center font-bold text-xl">
                  + Create Digi
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View className="flex flex-col justify-center items-center absolute top-10 left-6 z-10">
              <Text className="text-white text-xl text-center mt-2">
                Start filling up your collection with your favorite Digis
              </Text>
              <TouchableOpacity
                className="w-3/4 rounded-full py-2 bg-snacGreen self-center mt-2"
                onPress={() => navigation.navigate("TabNavigation")}
              >
                <Text className="text-snacPurple text-center font-bold text-xl">
                  Explore Digis
                </Text>
              </TouchableOpacity>
            </View>
          )}
          <ScrollView
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            className="px-2 py-4 fixed"
          >
            <View className="flex flex-row gap-2">
              <View className="h-40 bg-white/10 rounded-2xl flex-1" />
              <View className="h-40 bg-white/10 rounded-2xl flex-1" />
            </View>
            <View className="flex flex-row gap-2 mt-2">
              <View className="h-40 bg-white/10 rounded-2xl flex-1" />
              <View className="h-40 bg-white/10 rounded-2xl flex-1" />
            </View>
          </ScrollView>
        </View>
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
          numColumns={2}
          className="flex pt-2"
          showsVerticalScrollIndicator={false}
          scrollEnabled={user?.snacs != undefined}
        />
      )}
    </View>
  );
};

export default PortFolioFeed;
