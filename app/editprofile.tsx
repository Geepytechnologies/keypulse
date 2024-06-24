import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Fonts } from "@/constants/Fonts";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { globalstyles } from "@/styles/common";
import { Colors } from "@/constants/Colors";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {};

const editprofile = (props: Props) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.primary }}>
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
          Edit Profile
        </Text>
      </View>
      {/* body */}
      <ScrollView style={[styles.body, { display: "flex" }]}>
        <View style={{ gap: 10 }}>
          <Text
            style={{
              fontFamily: Fonts.nun600,
              fontSize: 16,
              color: Colors.primary,
            }}
          >
            Update your contact information
          </Text>
          {/* firstname & lastname */}
          <View style={[globalstyles.rowview, { gap: 10 }]}>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>First name</Text>
              <View style={styles.inputcon}>
                <TextInput placeholder="Type here" />
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Last name</Text>
              <View style={styles.inputcon}>
                <TextInput placeholder="Type here" />
              </View>
            </View>
          </View>

          {/* email */}
          <View style={[globalstyles.rowview, { gap: 10 }]}>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Email</Text>
              <View style={styles.inputcon}>
                <TextInput placeholder="Type here" />
              </View>
            </View>
          </View>
          {/* phone */}
          <View style={[globalstyles.rowview, { gap: 10 }]}>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Phone Number</Text>
              <View style={styles.inputcon}>
                <TextInput placeholder="Type here" />
              </View>
            </View>
          </View>
          {/* address */}
          <View style={[globalstyles.rowview, { gap: 10 }]}>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Address</Text>
              <View style={styles.inputcon}>
                <TextInput numberOfLines={4} placeholder="Type here" />
              </View>
            </View>
          </View>
          {/* submit */}
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btntext}>Update</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default editprofile;

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#fff",
    padding: 20,
    marginTop: 22,
    height: "100%",
  },
  label: {
    color: "#000000",
    fontFamily: Fonts.pop600,
    fontSize: 12,
  },
  inputcon: {
    paddingHorizontal: 19,
    paddingVertical: 18,
    borderRadius: 8,
    borderColor: "#E2E8F0",
    borderWidth: 1,
    backgroundColor: "#fff",
  },
  btn: {
    backgroundColor: "black",
    borderRadius: 40.5,
    paddingVertical: 19,
  },
  btntext: {
    color: "#fff",
    fontFamily: Fonts.pop600,
    fontSize: 14,
    textAlign: "center",
  },
});
