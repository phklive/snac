import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type AuthPrimaryNavigatorParamList = {
  Selection: undefined;
  Login: undefined;
  Register: undefined;
};

export type PrimaryNavigatorParamList = {
  Name: { uid: string };
  Congratulations: undefined;
  CreateDigi: undefined;
  TabNavigation: undefined;
};

export type AuthPrimaryNavigatorProp =
  NativeStackNavigationProp<AuthPrimaryNavigatorParamList>;

export type PrimaryNavigatorProp =
  NativeStackNavigationProp<PrimaryNavigatorParamList>;
