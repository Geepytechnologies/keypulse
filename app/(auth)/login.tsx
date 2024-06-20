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

type Props = {};

const login = (props: Props) => {
  return (
    <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.73)" }}>
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
            <Text style={styles.logintext}>Login</Text>
            <View>
              <Text style={styles.welcome}>Welcome Back!</Text>
              <Text style={styles.enterdetails}>
                Please enter the details to proceed.
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
      <View style={styles.formcon}>
        <View style={{ gap: 23 }}>
          <View style={{ gap: 2 }}>
            <Text
              style={{
                fontFamily: Fonts.pop600,
                fontSize: 12,
                lineHeight: 14.4,
              }}
            >
              Email
            </Text>
            <View style={styles.inputboxcon}>
              <TextInput
                placeholder="Type here"
                placeholderTextColor={"#64748B"}
                style={styles.inputbox}
              />
            </View>
          </View>
          {/* Password */}
          <View style={{ gap: 2 }}>
            <Text
              style={{
                fontFamily: Fonts.pop600,
                fontSize: 12,
                lineHeight: 14.4,
              }}
            >
              Password
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
          {/* forgot pass */}
          <Text style={styles.forgotpass}>Forget Password?</Text>
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
              Login
            </Text>
          </TouchableOpacity>
          {/* not a member */}
          <Text
            style={{
              textAlign: "center",
              lineHeight: 19,
              fontSize: 14,
              color: "#000000B2",
            }}
          >
            <Text>Not a member? </Text>
            <Text
              style={{
                fontFamily: Fonts.pop600,
                textDecorationLine: "underline",
              }}
            >
              Sign Up
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default login;

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
