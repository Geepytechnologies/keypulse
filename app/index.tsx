import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { globalstyles } from "@/styles/common";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenDimensions } from "@/constants/Dimensions";

type Props = {};

const index = (props: Props) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Image
        source={require("@/assets/images/SplashScreen.png")}
        style={[{ width: ScreenDimensions.screenWidth, height: "100%" }]}
      />
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({});
