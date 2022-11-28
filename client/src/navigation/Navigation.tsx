import { NavigationContainer } from "@react-navigation/native";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Splash from "../screens/Splash";
import AuthNavigation from "./AuthNavigation";
import MainNavigation from "./MainNavigation";

const Navigation = () => {
  const { loading, userToken } = useContext(AuthContext);

  if (loading) return <Splash />;
  return (
    <NavigationContainer>
      {userToken ? <MainNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
};

export default Navigation;
