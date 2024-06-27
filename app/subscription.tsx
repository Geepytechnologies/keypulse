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

const subscription = (props: Props) => {
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
          Manage Billing
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
            Existing Payment Options
          </Text>

          {/* email */}
          <View style={[globalstyles.rowview, { gap: 10 }]}>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Select existing address</Text>
              <View style={styles.inputcon}>
                <TextInput placeholder="Type here" />
              </View>
            </View>
          </View>
          {/* phone */}
          <View style={[globalstyles.rowview, { gap: 10 }]}>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Select existing address</Text>
              <View style={styles.inputcon}>
                <TextInput placeholder="Type here" />
              </View>
            </View>
          </View>
        </View>
        <View style={{ gap: 10, marginTop: 24 }}>
          <Text
            style={{
              fontFamily: Fonts.nun600,
              fontSize: 16,
              color: Colors.primary,
            }}
          >
            Provide credit card details
          </Text>

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
          {/* year & securitycode */}
          <View style={[globalstyles.rowview, { gap: 10 }]}>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Exp. Date</Text>
              <View style={styles.inputcon}>
                <TextInput placeholder="MM/YY" />
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Security Code</Text>
              <View style={styles.inputcon}>
                <TextInput placeholder="Type here" />
              </View>
            </View>
          </View>
          {/* submit */}
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btntext}>Add</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default subscription;

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
