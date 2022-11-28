import { StatusBar } from "expo-status-bar";
import { useContext } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthContext, AuthProvider } from "./src/context/AuthContext";
import Navigation from "./src/navigation/Navigation";

export default function App() {
  const { loading, userToken } = useContext(AuthContext);

  return (
    <AuthProvider>
      <SafeAreaProvider>
        <Navigation loading={loading} userToken={userToken} />
        <StatusBar style="auto" />
      </SafeAreaProvider>
    </AuthProvider>
  );
}
