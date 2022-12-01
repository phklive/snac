import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigatorScreenParams } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import React from "react";
import ExploreSVG from "../../assets/ExploreSVG";
import PortfolioSVG from "../../assets/PortfolioSVG";
import ProfileSVG from "../../assets/ProfileSVG";
import CreateDigi from "../screens/CreateDigi";
import ValidateDigi from "../screens/ValidateDigi";
import CongratulationsDigi from "../screens/CongratulationsDigi";
import Digi from "../screens/Digi";
import Edit from "../screens/Edit";
import Explore from "../screens/Explore";
import Portfolio from "../screens/Portfolio";
import Profile from "../screens/Profile";
import Search from "../screens/Search";
import Settings from "../screens/Settings";
import Stories from "../screens/Stories";
import User from "../screens/User";

type ExploreStackParamList = {
  Explore: undefined;
  User: undefined;
  Digi: undefined;
  Stories: undefined;
  Search: undefined;
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
      <ExploreStack.Screen name="Digi" component={Digi} />
      <ExploreStack.Screen name="Stories" component={Stories} />
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
  Digi: undefined;
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
  Profile: undefined;
  Settings: undefined;
};

const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();

const ProfileStackScreen = () => {
  return (
    <ProfileStack.Navigator
      initialRouteName="Profile"
      screenOptions={{ headerShown: false }}
    >
      <ProfileStack.Screen name="Profile" component={Profile} />
      <ProfileStack.Screen
        name="Settings"
        component={Settings}
        options={{ presentation: "modal" }}
      />
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
        },
        style: {
          backgroundColor: "transparent",
          borderTopWidth: 0,
          position: "absolute",
          left: 50,
          right: 50,
          bottom: 20,
          height: 100,
        },
        tabBarShowLabel: false,
        lazy: true,
        headerShown: false,
        tabBarIcon: ({ focused }) => {
          let color: string;

          if (route.name === "ExploreStackScreen") {
            color = focused ? "#8CFFAC" : "#BEAED2";
            return <ExploreSVG height={31} width={31} color={color} />;
          } else if (route.name === "PortfolioStackScreen") {
            color = focused ? "#8CFFAC" : "#BEAED2";
            return <PortfolioSVG height={31} width={31} color={color} />;
          } else if (route.name === "ProfileStackScreen") {
            color = focused ? "#8CFFAC" : "#BEAED2";
            return <ProfileSVG height={31} width={31} color={color} />;
          }
        },
      })}
    >
      <MainStack.Screen
        name="ExploreStackScreen"
        component={ExploreStackScreen}
      />
      <MainStack.Screen
        name="PortfolioStackScreen"
        component={PortfolioStackScreen}
      />
      <MainStack.Screen
        name="ProfileStackScreen"
        component={ProfileStackScreen}
      />
    </MainStack.Navigator>
  );
};

export default MainNavigation;
