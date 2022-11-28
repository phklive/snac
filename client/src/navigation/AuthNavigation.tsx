import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import Congratulations from "../screens/Congratulations";
import Login from "../screens/Login";
import Name from "../screens/Name";
import Register from "../screens/Register";
import Selection from "../screens/Selection";

type AuthNavigationParamList = {
  Selection: undefined;
  Login: undefined;
  Register: undefined;
  Name: { email: string; password: string };
  Congratulations: undefined;
};

export type AuthNavigatorProp =
  NativeStackNavigationProp<AuthNavigationParamList>;

const AuthStack = createNativeStackNavigator<AuthNavigationParamList>();

const AuthNavigation = () => {
  return (
    <AuthStack.Navigator
      initialRouteName="Selection"
      screenOptions={{ headerShown: false }}
    >
      <AuthStack.Screen name="Selection" component={Selection} />
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Register" component={Register} />
      <AuthStack.Screen name="Name" component={Name} />
      <AuthStack.Screen name="Congratulations" component={Congratulations} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigation;
