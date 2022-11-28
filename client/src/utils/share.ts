import { Share } from "react-native";

export const share = async () => {
  try {
    const result = await Share.share({
      message:
        "React Native | A framework for building native apps using React",
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
        console.log("activitytype");
      } else {
        // shared
        console.log("shared");
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
      console.log("dismissed");
    }
  } catch (error) {
    alert(error.message);
  }
};
