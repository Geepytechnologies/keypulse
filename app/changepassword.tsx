import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { Fonts } from "@/constants/Fonts";
import { globalstyles } from "@/styles/common";
import { Colors } from "@/constants/Colors";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {};

const changepassword = (props: Props) => {
  return (
    <SafeAreaView style={{ backgroundColor: Colors.primary }}>
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
      <ScrollView style={[styles.body, { display: "flex" }]}>
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
                { justifyContent: "space-between" },
              ]}
            >
              <TextInput
                placeholder="Enter Your Password"
                placeholderTextColor={"#64748B"}
                secureTextEntry={true}
              />
              <Feather name="eye" size={24} color="#64748B" />
            </View>
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
                { justifyContent: "space-between" },
              ]}
            >
              <TextInput
                placeholder="Enter Your Password"
                placeholderTextColor={"#64748B"}
                secureTextEntry={true}
              />
              <Feather name="eye" size={24} color="#64748B" />
            </View>
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
                secureTextEntry={true}
              />
              <Feather name="eye" size={24} color="#64748B" />
            </View>
          </View>

          {/* proceed btn */}
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
      </ScrollView>
    </SafeAreaView>
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
  btn: {
    borderRadius: 40.5,
    backgroundColor: "black",
    paddingVertical: 19,
  },
});
