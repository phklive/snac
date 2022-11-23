import { Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Web3Auth, {
  LOGIN_PROVIDER,
  OPENLOGIN_NETWORK,
} from "@web3auth/react-native-sdk";
import Constants, { AppOwnership } from "expo-constants";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import { Buffer } from "buffer";

global.Buffer = global.Buffer || Buffer;

const scheme = "www.https://google.com/";

const resolvedRedirectUrl =
  Constants.appOwnership == AppOwnership.Expo ||
  Constants.appOwnership == AppOwnership.Guest
    ? Linking.createURL("web3auth", {})
    : Linking.createURL("web3auth", { scheme: scheme });

const Connection = () => {
  const [key, setKey] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const login = async () => {
    try {
      const web3auth = new Web3Auth(WebBrowser, {
        clientId:
          "BMOwA2c02qhKn14FomUaS7Jy5qJmCBbvDfk89uUtlaSFS7-4jd009zQxdnP80bruv9lE5gZwx-Gtkx5X1Aoe22E",
        network: OPENLOGIN_NETWORK.TESTNET, // or other networks
      });
      const state = await web3auth.login({
        loginProvider: LOGIN_PROVIDER.EMAIL_PASSWORDLESS,
        redirectUrl: resolvedRedirectUrl,
      });

      setKey(state.privKey || "no key");
    } catch (e) {
      console.error(e);
      setErrorMsg(String(e));
    }
  };
  return (
    <SafeAreaView>
      <TouchableOpacity onPress={login}>
        <Text>Connection</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Connection;
