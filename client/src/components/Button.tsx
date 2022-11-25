import { Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  AuthPrimaryNavigatorProp,
  PrimaryNavigatorProp,
} from "../navigation/types";

interface ButtonProps {
  text: string;
  type: string;
  to: string;
  color: string;
  params?: object;
  style?: string;
}

const Button: React.FC<ButtonProps> = ({ text, type, to, style, color }) => {
  let navigation: any;
  let buttonStyle: string;
  let textStyle: string;

  if (type === "auth") {
    navigation = useNavigation<AuthPrimaryNavigatorProp>();
  }

  if (type === "primary") {
    navigation = useNavigation<PrimaryNavigatorProp>();
  }

  if (color === "black") {
    buttonStyle =
      "border border-snacGreen w-3/4 rounded-full py-2 bg-snacPurple";
    textStyle = "text-snacGreen text-center font-bold text-xl";
  }

  if (color === "green") {
    buttonStyle = "w-3/4 rounded-full py-2 bg-snacGreen";
    textStyle = "text-snacPurple text-center font-bold text-xl";
  }

  if (color === "outline") {
    buttonStyle = "border border-white w-3/4 rounded-full py-2";
    textStyle = "text-white text-center font-bold text-xl";
  }

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(to)}
      className={buttonStyle + " " + style}
    >
      <Text className={textStyle}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;
