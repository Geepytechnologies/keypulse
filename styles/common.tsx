import { ScreenDimensions } from "@/constants/Dimensions";
import { Fonts } from "@/constants/Fonts";
import { StyleSheet } from "react-native";

export const globalstyles = StyleSheet.create({
  rowview: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  hr: {
    backgroundColor: "#1711411A",
    height: 2,
    width: "100%",
  },
  colview: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  fullscreencenterview: {
    display: "flex",
    width: ScreenDimensions.screenWidth,
    height: ScreenDimensions.screenHeight,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  centerview: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    color: "red",
    marginTop: 5,
    fontSize: 12,
    fontFamily: Fonts.pop400,
    lineHeight: 14.4,
  },
});
