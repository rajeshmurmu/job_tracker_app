import { Alert, Platform, ToastAndroid } from "react-native";

export function toast(msg: string, duration?: number) {
  if (Platform.OS === "android") {
    ToastAndroid.show(msg, duration || ToastAndroid.LONG);
  } else {
    Alert.alert(msg);
  }
}
