import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigatorScreenParams } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import React from "react";
import ExploreSVG from "../../assets/ExploreSVG";
import PortfolioSVG from "../../assets/PortfolioSVG";
import CreamLogo from "../../assets/CreamLogo";
import ProfileSVG from "../../assets/ProfileSVG";
import CreateDigi from "../screens/CreateDigi";
import ValidateDigi from "../screens/ValidateDigi";
import CongratulationsDigi from "../screens/CongratulationsDigi";
import Digi from "../screens/Digi";
import Edit from "../screens/Edit";
import Explore from "../screens/Explore";
import Portfolio from "../screens/Portfolio";
import Checkout from "../screens/Checkout";
import Profile from "../screens/Profile";
import Search from "../screens/Search";
import Settings from "../screens/Settings";
import Stories from "../screens/Stories";
import User from "../screens/User";
import CongratulationsBuy from "../screens/CongratulationsBuy";
import { Image } from "react-native";
import CreateDigi2 from "../screens/CreateDigi2";

type ExploreStackParamList = {
  Explore: undefined;
  User: {
    id: string;
  };

  Checkout: {
    image: string;
    description: string;
    title: string;
    price: number;
    owner: string;
    likes: number;
    id: string;
  };

  Digi: {
    image: string;
    description: string;
    title: string;
    price: number;
    owner: string;
    likes: number;
    id: string;
    from: string;
  };

  Stories: undefined;
  Search: undefined;
  CongratulationsBuy: {
    image: string;
  };
};

const ExploreStack = createNativeStackNavigator<ExploreStackParamList>();

const ExploreStackScreen = () => {
  return (
    <ExploreStack.Navigator
      initialRouteName="Explore"
      screenOptions={{ headerShown: false }}
    >
      <ExploreStack.Screen name="Explore" component={Explore} />
      <ExploreStack.Screen name="User" component={User} />
      <ExploreStack.Screen name="Checkout" component={Checkout} />
      <ExploreStack.Screen name="Digi" component={Digi} />
      <ExploreStack.Screen name="Stories" component={Stories} />
      <ExploreStack.Screen
        name="CongratulationsBuy"
        component={CongratulationsBuy}
      />
      <ExploreStack.Screen
        name="Search"
        component={Search}
        options={{ presentation: "modal" }}
      />
    </ExploreStack.Navigator>
  );
};

type PortfolioStackParamList = {
  Portfolio: undefined;
  CreateDigi: undefined;
  ValidateDigi: {
    image: string;
    title: string;
    price: number;
    description: string;
  };
  CongratulationsDigi: {
    image: string;
    title: string;
  };
  Edit: undefined;
  Digi: {
    image: string;
    description: string;
    title: string;
    price: number;
    owner: string;
    likes: number;
    from: string;
  };
  CongratulationsBuy: {
    image: string;
  };
};

const PortfolioStack = createNativeStackNavigator<PortfolioStackParamList>();

const PortfolioStackScreen = () => {
  return (
    <PortfolioStack.Navigator
      initialRouteName="Portfolio"
      screenOptions={{ headerShown: false }}
    >
      <PortfolioStack.Screen name="Portfolio" component={Portfolio} />
      <PortfolioStack.Screen name="CreateDigi" component={CreateDigi} />
      <PortfolioStack.Screen name="ValidateDigi" component={ValidateDigi} />
      <PortfolioStack.Screen
        name="CongratulationsBuy"
        component={CongratulationsBuy}
      />
      <PortfolioStack.Screen
        name="CongratulationsDigi"
        component={CongratulationsDigi}
      />
      <PortfolioStack.Screen
        name="Edit"
        component={Edit}
        options={{ presentation: "modal" }}
      />
      <PortfolioStack.Screen name="Digi" component={Digi} />
    </PortfolioStack.Navigator>
  );
};

type ProfileStackParamList = {
  createDigi: undefined;
};

const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();

const ProfileStackScreen = () => {
  return (
    <ProfileStack.Navigator
      initialRouteName="createDigi"
      screenOptions={{ headerShown: false }}
    >
      <ProfileStack.Screen name="createDigi" component={CreateDigi2} />
    </ProfileStack.Navigator>
  );
};

type MainNavigationParamList = {
  ExploreStackScreen: NavigatorScreenParams<ExploreStackParamList>;
  PortfolioStackScreen: NavigatorScreenParams<PortfolioStackParamList>;
  ProfileStackScreen: NavigatorScreenParams<ProfileStackParamList>;
};

export type MainNavigatorProp =
  NativeStackNavigationProp<MainNavigationParamList>;

const MainStack = createBottomTabNavigator<MainNavigationParamList>();

const MainNavigation: React.FC = () => {
  return (
    <MainStack.Navigator
      initialRouteName="ExploreStackScreen"
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: "#1D0A32",
          borderTopWidth: 0,
          marginTop: 0,
          height: 90,
        },
        tabBarShowLabel: false,
        lazy: true,
        headerShown: false,
        tabBarIcon: ({ focused }) => {
          let color: string;

          if (route.name === "ExploreStackScreen") {
            color = focused ? "#FFF" : "#BEAED2";
            return <CreamLogo height={40} width={40} color={color} />;
          } else if (route.name === "ProfileStackScreen") {
            color = focused ? "#8CFFAC" : "#BEAED2";
            return <Image source={require("../../assets/CreateDigi.png")} />;
          } else if (route.name === "PortfolioStackScreen") {
            color = focused ? "#FFF" : "#BEAED2";
            return <ProfileSVG height={40} width={40} color={color} />;
          }
        },
      })}
    >
      <MainStack.Screen
        name="ExploreStackScreen"
        component={ExploreStackScreen}
      />
      <MainStack.Screen
        name="ProfileStackScreen"
        component={ProfileStackScreen}
      />
      <MainStack.Screen
        name="PortfolioStackScreen"
        component={PortfolioStackScreen}
      />
    </MainStack.Navigator>
  );
};

export default MainNavigation;
