import { View, ActivityIndicator, StyleSheet } from "react-native";
import React from "react";
import SnacLogoSVG from "../../assets/SnacLogoSVG";

const Loader = () => {
  return (
    <View style={styles.loading}>
      <ActivityIndicator size={"large"} />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  loading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(52, 52, 52, 0.5)",
    zIndex: 10,
  },
});
