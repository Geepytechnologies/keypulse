import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "@/assets/images/logo.svg";
import Logotext from "@/assets/images/logotext.svg";
import { globalstyles } from "@/styles/common";
import { Fonts } from "@/constants/Fonts";
import { Feather } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

type Props = {};

const resetpassword = (props: Props) => {
  return (
    <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.73)" }}>
      <StatusBar style="light" />
      <ImageBackground
        source={require("@/assets/images/imagebg.png")}
        style={styles.image}
      >
        <View style={styles.darken}></View>
        <View
          style={[
            styles.headerelement,
            globalstyles.colview,
            { alignItems: "center" },
          ]}
        >
          <View>
            <View style={globalstyles.centerview}>
              <Logo />
            </View>
            <Logotext />
          </View>
          <View style={{ gap: 10 }}>
            <Text style={styles.logintext}>Reset Password</Text>
            <View>
              <Text style={styles.welcome}>Create Your New Password</Text>
              <Text style={styles.enterdetails}>
                And make sure to remember it this time.
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
      <View style={styles.formcon}>
        <View style={{ gap: 23 }}>
          {/* Password */}
          <View style={{ gap: 2 }}>
            <Text
              style={{
                fontFamily: Fonts.pop600,
                fontSize: 12,
                lineHeight: 14.4,
              }}
            >
              New Password
            </Text>
            <View
              style={[
                styles.inputboxcon,
                globalstyles.rowview,
                { justifyContent: "space-between" },
              ]}
            >
              <TextInput
                placeholder="Enter Your Password"
                placeholderTextColor={"#64748B"}
                style={styles.inputbox}
                secureTextEntry={true}
              />
              <Feather name="eye" size={24} color="#64748B" />
            </View>
          </View>
          {/* confirm Password */}
          <View style={{ gap: 2 }}>
            <Text
              style={{
                fontFamily: Fonts.pop600,
                fontSize: 12,
                lineHeight: 14.4,
              }}
            >
              Confirm New Password
            </Text>
            <View
              style={[
                styles.inputboxcon,
                globalstyles.rowview,
                { justifyContent: "space-between" },
              ]}
            >
              <TextInput
                placeholder="Enter Your Password"
                placeholderTextColor={"#64748B"}
                style={styles.inputbox}
                secureTextEntry={true}
              />
              <Feather name="eye" size={24} color="#64748B" />
            </View>
          </View>

          {/* login btn */}
          <TouchableOpacity activeOpacity={0.8} style={styles.btn}>
            <Text
              style={{
                fontFamily: Fonts.pop600,
                fontSize: 14,
                lineHeight: 16.8,
                color: "#fff",
                textAlign: "center",
              }}
            >
              Proceed
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default resetpassword;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 400,
    position: "relative",
  },
  darken: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.73)",
  },
  headerelement: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    gap: 20,
  },
  logintext: {
    fontSize: 40,
    fontFamily: Fonts.nun700,
    color: "white",
    textAlign: "center",
  },
  welcome: {
    fontSize: 14,
    fontFamily: Fonts.pop700,
    lineHeight: 24,
    color: "#fff",
    textAlign: "center",
  },
  enterdetails: {
    fontSize: 14,
    fontFamily: Fonts.pop400,
    lineHeight: 24,
    color: "#fff",
    opacity: 0.85,
  },
  formcon: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: "100%",
    backgroundColor: "#fff",
    transform: [{ translateY: -20 }],
    paddingVertical: 40,
    paddingHorizontal: 25,
  },
  inputboxcon: {
    borderRadius: 6,
    borderColor: "#E2E8F0",
    padding: 19,
    borderWidth: 1,
  },
  inputbox: {},
  forgotpass: {
    color: "#090314",
    fontFamily: Fonts.pop400,
    fontSize: 13,
    lineHeight: 19,
    textAlign: "right",
    textDecorationLine: "underline",
  },
  btn: {
    borderRadius: 40.5,
    backgroundColor: "black",
    paddingVertical: 19,
  },
});
