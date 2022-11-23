import { StatusBar } from "expo-status-bar";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Navigation from "./src/navigation/Navigation";
import { auth, db } from "./src/utils/firebase";

export default function App() {
  const [connected, setConnected] = useState(false);
  const [userHasName, setUserHasName] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      try {
        if (user) {
          const userDocRef = doc(db, "users", auth.currentUser.uid);
          const userSnap = await getDoc(userDocRef);
          if (userSnap.exists()) {
            const user = userSnap.data();
            if (user.name) {
              setUserHasName(true);
            } else {
              setUserHasName(false);
            }
            setConnected(true);
          } else {
            return;
          }
        } else {
          setConnected(false);
        }
      } catch (error: any) {
        console.log(error.message);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <SafeAreaProvider>
      <Navigation connected={connected} userHasName={userHasName} />
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
