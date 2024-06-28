import {
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
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { Fonts } from "@/constants/Fonts";
import { globalstyles } from "@/styles/common";
import { Colors } from "@/constants/Colors";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Auth } from "aws-amplify";
import Toast from "react-native-toast-message";

type Props = {};
interface Errorfields {
  currentpassword?: string;
  newpassword?: string;
  confirmnewPassword?: string;
}

const changepassword = (props: Props) => {
  const [isPasswordVisible1, setIsPasswordVisible1] = useState(false);
  const [isPasswordVisible2, setIsPasswordVisible2] = useState(false);
  const [isPasswordVisible3, setIsPasswordVisible3] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const togglePasswordVisibility1 = () => {
    setIsPasswordVisible1(!isPasswordVisible1);
  };
  const togglePasswordVisibility2 = () => {
    setIsPasswordVisible2(!isPasswordVisible2);
  };
  const togglePasswordVisibility3 = () => {
    setIsPasswordVisible3(!isPasswordVisible3);
  };
  const [formData, setFormData] = useState({
    currentpassword: "",
    newpassword: "",
    confirmnewPassword: "",
  });
  const [errors, setErrors] = useState<Errorfields>({});

  const handleChange = (name: any, value: any) => {
    setFormData({ ...formData, [name]: value });
  };
  const validateForm = () => {
    let valid = true;
    const newErrors: any = {};

    if (!formData.currentpassword.trim()) {
      newErrors.currentpassword = "Enter Current Password";
      valid = false;
    }

    if (!formData.newpassword.trim()) {
      newErrors.newpassword = "Password is required";
      valid = false;
    } else if (!isValidPassword(formData.newpassword)) {
      newErrors.password =
        "Password must be at least 8 characters containing at least a number, a special character, uppercase and lowercase characters";
      valid = false;
    }

    if (formData.newpassword !== formData.confirmnewPassword) {
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
        const user = await Auth.currentAuthenticatedUser();
        const response = await Auth.changePassword(
          user,
          formData.currentpassword,
          formData.newpassword
        );
        if (response == "SUCCESS") {
          Toast.show({
            type: "success",
            text1: "Success",
            text2: "Password Changed",
          });
        }
      }
    } catch (error: any) {
      if (error.code === "NotAuthorizedException") {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Incorrect details",
        });
      }
      if (error.code === "LimitExceededException") {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "please try after some time",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView style={{ backgroundColor: Colors.primary }}>
        <Toast />

        <StatusBar style="light" />
        {/* header */}
        <View
          style={[
            globalstyles.rowview,
            {
              paddingHorizontal: 25,
              marginTop: 22,
            },
          ]}
        >
          <TouchableOpacity activeOpacity={0.8} onPress={() => router.back()}>
            <Feather name="arrow-left" size={24} color="white" />
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: Fonts.nun700,
              fontSize: 20,
              lineHeight: 24,
              color: "#fff",
              flex: 1,
              textAlign: "center",
            }}
          >
            Change Password
          </Text>
        </View>
        {/* body */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={[styles.body, { display: "flex" }]}
        >
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
                Current Password
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
                  value={formData.currentpassword}
                  onChangeText={(text) => handleChange("currentpassword", text)}
                />
                <Pressable onPress={togglePasswordVisibility1}>
                  <Feather
                    name={isPasswordVisible1 ? "eye" : "eye-off"}
                    size={24}
                    color="#64748B"
                  />
                </Pressable>
              </View>
              {errors && errors.currentpassword && (
                <Text style={globalstyles.error}>{errors.currentpassword}</Text>
              )}
            </View>
            {/* New Password */}
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
                  value={formData.newpassword}
                  onChangeText={(text) => handleChange("newpassword", text)}
                />
                <Pressable onPress={togglePasswordVisibility2}>
                  <Feather
                    name={isPasswordVisible2 ? "eye" : "eye-off"}
                    size={24}
                    color="#64748B"
                  />
                </Pressable>
              </View>
              {errors && errors.newpassword && (
                <Text style={globalstyles.error}>{errors.newpassword}</Text>
              )}
            </View>
            {/* Confirm New Password */}
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
                  style={[styles.inputbox, { flex: 1 }]}
                  secureTextEntry={!isPasswordVisible3}
                  value={formData.confirmnewPassword}
                  onChangeText={(text) =>
                    handleChange("confirmnewPassword", text)
                  }
                />
                <Pressable onPress={togglePasswordVisibility3}>
                  <Feather
                    name={isPasswordVisible2 ? "eye" : "eye-off"}
                    size={24}
                    color="#64748B"
                  />
                </Pressable>
              </View>
              {errors && errors.confirmnewPassword && (
                <Text style={globalstyles.error}>
                  {errors.confirmnewPassword}
                </Text>
              )}
            </View>

            {/* proceed btn */}
            <TouchableOpacity
              disabled={isLoading}
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
                {isLoading ? "Processing..." : "Proceed"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default changepassword;

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#fff",
    padding: 25,
    marginTop: 22,
    height: "100%",
  },
  inputboxcon: {
    borderRadius: 6,
    borderColor: "#E2E8F0",
    padding: 19,
    borderWidth: 1,
  },
  inputbox: {},
  btn: {
    borderRadius: 40.5,
    backgroundColor: "black",
    paddingVertical: 19,
  },
});
