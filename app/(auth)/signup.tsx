import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "@/assets/images/logo.svg";
import Logotext from "@/assets/images/logotext.svg";
import { globalstyles } from "@/styles/common";
import { Fonts } from "@/constants/Fonts";
import { Feather } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { Link } from "expo-router";
import { API } from "aws-amplify";

type Props = {};

const signup = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible1, setIsPasswordVisible1] = useState(false);
  const [isPasswordVisible2, setIsPasswordVisible2] = useState(false);
  const togglePasswordVisibility1 = () => {
    setIsPasswordVisible1(!isPasswordVisible1);
  };
  const togglePasswordVisibility2 = () => {
    setIsPasswordVisible2(!isPasswordVisible2);
  };
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (name: any, value: any) => {
    setFormData({ ...formData, [name]: value });
  };
  const validateForm = () => {
    let valid = true;
    const newErrors: any = {};

    if (!formData.firstname.trim()) {
      newErrors.firstname = "firstname is required";
      valid = false;
    }

    if (!formData.lastname.trim()) {
      newErrors.lastname = "lastname is required";
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      valid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
      valid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  const handleSubmit = async () => {
    console.log(formData);
    setLoading(true);
    try {
      if (validateForm()) {
        const response = await API.post("profile", "", {
          name: `${formData.firstname} ${formData.lastname}`,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          country: "US",
        });
        console.log(response);
        console.log("Form submitted successfully:", formData);
      } else {
        console.log("Form has errors. Please correct them.");
      }
    } catch (error: any) {
      console.log(error.response);
    } finally {
      setLoading(false);
    }
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: "rgba(0,0,0,0.73)" }}
    >
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
            <Text style={styles.logintext}>Sign Up</Text>
            <View>
              <Text style={styles.welcome}>Welcome Back!</Text>
              <Text style={styles.enterdetails}>
                Please enter the details to proceed.
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.formcon}
      >
        <View style={{ gap: 23 }}>
          {/* firstname */}
          <View style={{ gap: 2 }}>
            <Text
              style={{
                fontFamily: Fonts.pop600,
                fontSize: 12,
                lineHeight: 14.4,
              }}
            >
              First name
            </Text>
            <View style={styles.inputboxcon}>
              <TextInput
                placeholder="Type here"
                placeholderTextColor={"#64748B"}
                style={styles.inputbox}
                value={formData.firstname}
                onChangeText={(text) => handleChange("firstname", text)}
              />
            </View>
          </View>
          {/* lastname */}
          <View style={{ gap: 2 }}>
            <Text
              style={{
                fontFamily: Fonts.pop600,
                fontSize: 12,
                lineHeight: 14.4,
              }}
            >
              Last name
            </Text>
            <View style={styles.inputboxcon}>
              <TextInput
                placeholder="Type here"
                placeholderTextColor={"#64748B"}
                style={styles.inputbox}
                value={formData.lastname}
                onChangeText={(text) => handleChange("lastname", text)}
              />
            </View>
          </View>
          {/* email */}
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
                value={formData.email}
                onChangeText={(text) => handleChange("email", text)}
              />
            </View>
          </View>
          {/* phone */}
          <View style={{ gap: 2 }}>
            <Text
              style={{
                fontFamily: Fonts.pop600,
                fontSize: 12,
                lineHeight: 14.4,
              }}
            >
              Phone
            </Text>
            <View style={styles.inputboxcon}>
              <TextInput
                placeholder="Type here"
                placeholderTextColor={"#64748B"}
                style={styles.inputbox}
                value={formData.phone}
                onChangeText={(text) => handleChange("phone", text)}
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
                { justifyContent: "space-between", gap: 2 },
              ]}
            >
              <TextInput
                placeholder="Enter Your Password"
                placeholderTextColor={"#64748B"}
                style={[styles.inputbox, { flex: 1 }]}
                secureTextEntry={!isPasswordVisible1}
                value={formData.password}
                onChangeText={(text) => handleChange("password", text)}
              />
              <Pressable onPress={togglePasswordVisibility1}>
                <Feather
                  name={isPasswordVisible1 ? "eye" : "eye-off"}
                  size={24}
                  color="#64748B"
                />
              </Pressable>
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
              Confirm Password
            </Text>
            <View
              style={[
                styles.inputboxcon,
                globalstyles.rowview,
                { justifyContent: "space-between", gap: 2 },
              ]}
            >
              <TextInput
                placeholder="Enter Your Password"
                placeholderTextColor={"#64748B"}
                style={[styles.inputbox, { flex: 1 }]}
                secureTextEntry={!isPasswordVisible2}
                value={formData.confirmPassword}
                onChangeText={(text) => handleChange("confirmPassword", text)}
              />
              <Pressable onPress={togglePasswordVisibility2}>
                <Feather
                  name={isPasswordVisible2 ? "eye" : "eye-off"}
                  size={24}
                  color="#64748B"
                />
              </Pressable>
            </View>
          </View>

          {/* login btn */}
          <TouchableOpacity
            onPress={handleSubmit}
            activeOpacity={0.8}
            style={styles.btn}
          >
            <Text
              style={{
                fontFamily: Fonts.pop600,
                fontSize: 14,
                lineHeight: 16.8,
                color: "#fff",
                textAlign: "center",
              }}
            >
              {loading ? "Processing..." : "Sign Up"}
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
            <Text>Already a member? </Text>
            <Link
              suppressHighlighting
              href={"(auth)/login"}
              style={{
                fontFamily: Fonts.pop600,
                textDecorationLine: "underline",
              }}
            >
              Login
            </Link>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default signup;

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
