import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {
  FlatList,
  ListRenderItem,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { AuthContext } from "../context/AuthContext";
import { MainNavigatorProp } from "../navigation/MainNavigation";
import { BASE_URL } from "../utils/config";

interface PortfolioFeedProps {
  view: string;
}

const PortFolioFeed: React.FC<PortfolioFeedProps> = ({ view }) => {
  return (
    <View>
      <Text>PorfolioFeed</Text>
    </View>
  );
};

export default PortFolioFeed;
