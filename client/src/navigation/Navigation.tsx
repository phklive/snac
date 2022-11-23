import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Explore from "../screens/Explore";
import Portfolio from "../screens/Portfolio";
import Profile from "../screens/Profile";
import Splash from "../screens/Splash";
import {
  AuthPrimaryNavigatorParamList,
  PrimaryNavigatorParamList,
} from "./types";
import PortfolioSVG from "../../assets/PortfolioSVG";
import ProfileSVG from "../../assets/ProfileSVG";
import ExploreSVG from "../../assets/ExploreSVG";
import Selection from "../screens/Selection";
import Register from "../screens/Register";
import Login from "../screens/Login";
import Name from "../screens/Name";
import Congratulations from "../screens/Congratulations";

interface NavigationProps {
  connected: boolean;
  userHasName: boolean;
}

const Tab = createBottomTabNavigator();

const TabNavigation: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName="Explore"
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: "#1D0A32",
          borderTopWidth: 0,
        },
        tabBarShowLabel: false,
        lazy: true,
        headerShown: false,
        tabBarIcon: ({ focused }) => {
          let color: string;

          if (route.name === "Explore") {
            color = focused ? "#8CFFAC" : "#BEAED2";
            return <ExploreSVG height={31} width={31} color={color} />;
          } else if (route.name === "Portfolio") {
            color = focused ? "#8CFFAC" : "#BEAED2";
            return <PortfolioSVG height={31} width={31} color={color} />;
          } else if (route.name === "Profile") {
            color = focused ? "#8CFFAC" : "#BEAED2";
            return <ProfileSVG height={31} width={31} color={color} />;
          }
        },
      })}
    >
      <Tab.Screen name="Explore" component={Explore} />
      <Tab.Screen name="Portfolio" component={Portfolio} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

const Navigation: React.FC<NavigationProps> = ({ connected, userHasName }) => {
  if (connected && userHasName) {
    const Stack = createNativeStackNavigator<PrimaryNavigatorParamList>();

    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="TabNavigation" component={TabNavigation} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else if (connected && !userHasName) {
    const Stack = createNativeStackNavigator<PrimaryNavigatorParamList>();

    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="Name"
        >
          <Stack.Screen name="Name" component={Name} />
          <Stack.Screen name="Congratulations" component={Congratulations} />
          <Stack.Screen name="TabNavigation" component={TabNavigation} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    const Stack = createNativeStackNavigator<AuthPrimaryNavigatorParamList>();
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Selection"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Selection" component={Selection} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};

export default Navigation;
