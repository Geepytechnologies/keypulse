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
import { router, useLocalSearchParams } from "expo-router";
import { Auth } from "aws-amplify";

type Props = {};

interface Errorfields {
  email?: string;
  code?: string;
  password?: string;
  confirmPassword?: string;
}

const resetpassword = (props: Props) => {
  const { email }: any = useLocalSearchParams();
  const [isPasswordVisible1, setIsPasswordVisible1] = useState(false);
  const [isPasswordVisible2, setIsPasswordVisible2] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const togglePasswordVisibility1 = () => {
    setIsPasswordVisible1(!isPasswordVisible1);
  };
  const togglePasswordVisibility2 = () => {
    setIsPasswordVisible2(!isPasswordVisible2);
  };
  const [formData, setFormData] = useState({
    code: "",
    email: email || "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Errorfields>({});

  const handleChange = (name: any, value: any) => {
    setFormData({ ...formData, [name]: value });
  };
  const validateForm = () => {
    let valid = true;
    const newErrors: any = {};

    if (!formData.code.trim()) {
      newErrors.code = "Enter Confirmation Code";
      valid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (!isValidPassword(formData.password)) {
      newErrors.password =
        "Password must be at least 8 characters containing at least a number, a special character, uppercase and lowercase characters";
      valid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const isValidPassword = (password: string) => {
    const passwordRegex =
      /^(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]).{8,}$/;
    return passwordRegex.test(password);
  };
  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      if (validateForm()) {
        const response = await Auth.forgotPasswordSubmit(
          formData.email,
          formData.code,
          formData.password
        );
        if (response) {
          router.push("(auth)/login");
        }
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.73)" }}
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
            {/* Code */}
            <View style={{ gap: 2 }}>
              <Text
                style={{
                  fontFamily: Fonts.pop600,
                  fontSize: 12,
                  lineHeight: 14.4,
                }}
              >
                Confirmation Code
              </Text>
              <View
                style={[
                  styles.inputboxcon,
                  globalstyles.rowview,
                  { justifyContent: "space-between" },
                ]}
              >
                <TextInput
                  placeholder="Enter Code"
                  placeholderTextColor={"#64748B"}
                  style={styles.inputbox}
                  value={formData.code}
                  onChangeText={(text) => handleChange("code", text)}
                />
              </View>
              {errors && errors.code && (
                <Text style={globalstyles.error}>{errors.code}</Text>
              )}
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
                New Password
              </Text>
              <View
                style={[
                  styles.inputboxcon,
                  globalstyles.rowview,
                  { justifyContent: "space-between", gap: 3 },
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
              {errors && errors.password && (
                <Text style={globalstyles.error}>{errors.password}</Text>
              )}
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
                  { justifyContent: "space-between", gap: 3 },
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
              {errors && errors.confirmPassword && (
                <Text style={globalstyles.error}>{errors.confirmPassword}</Text>
              )}
            </View>

            {/* login btn */}
            <TouchableOpacity
              onPress={handleSubmit}
              activeOpacity={0.8}
              style={styles.btn}
            >
              <Text
                disabled={isLoading}
                style={{
                  fontFamily: Fonts.pop600,
                  fontSize: 14,
                  lineHeight: 16.8,
                  color: "#fff",
                  textAlign: "center",
                }}
              >
                {isLoading ? "Processing..." : "Proceed"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
