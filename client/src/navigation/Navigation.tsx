import { NavigationContainer } from "@react-navigation/native";
import Splash from "../screens/Splash";
import AuthNavigation from "./AuthNavigation";
import MainNavigation from "./MainNavigation";

interface NavigationProps {
  loading: boolean;
  userToken: string;
}

const Navigation: React.FC<NavigationProps> = ({ userToken, loading }) => {
  if (loading) return <Splash />;
  return (
    <NavigationContainer>
      {userToken ? <MainNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
};

export default Navigation;
