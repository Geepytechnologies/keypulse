import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { globalstyles } from "@/styles/common";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";

type Props = {};

enum Status {
  Approved = "#10AC16",
  Pending = "#FFBB6A",
  Rejected = "#FF6A6A",
}

const Quotecard = (props: Props) => {
  return (
    <View
      style={[
        styles.container,
        globalstyles.rowview,
        { justifyContent: "space-between" },
      ]}
    >
      <View style={[globalstyles.rowview, { height: "100%", gap: 15 }]}>
        <View
          style={[
            {
              backgroundColor: Status.Approved,
              width: 10,
              height: "100%",
              borderRadius: 10,
            },
          ]}
        ></View>
        <View style={{ gap: 5 }}>
          <Text
            style={{ fontFamily: Fonts.nun400, fontSize: 12, lineHeight: 14.4 }}
          >
            Q-1234566789
          </Text>
          <Text
            style={{
              color: Colors.primary,
              fontSize: 12,
              fontFamily: Fonts.pop600,
              letterSpacing: 0.1,
              lineHeight: 14.4,
            }}
          >
            Medical Care Giving
          </Text>
          <Text
            style={{
              fontFamily: Fonts.pop300,
              fontSize: 12,
              color: "#545871",
              letterSpacing: 0.1,
            }}
          >
            Exp. <Text style={{ fontFamily: Fonts.pop700 }}> 12/26</Text>
          </Text>
          <Text
            style={{
              fontFamily: Fonts.pop600,
              fontSize: 12,
              lineHeight: 18,
              textDecorationLine: "underline",
            }}
          >
            Show Comments
          </Text>
        </View>
      </View>
      <View style={{ gap: 11 }}>
        <Text
          style={{
            fontFamily: Fonts.pop500,
            fontSize: 10,
            color: "#FF6A6A",
            textDecorationLine: "underline",
          }}
        >
          Cancel
        </Text>
        <View
          style={{ backgroundColor: "#545871", borderRadius: 5, padding: 5 }}
        >
          <Text
            style={{ fontSize: 14, fontFamily: Fonts.pop600, color: "#fff" }}
          >
            $125.23
          </Text>
        </View>
        <View
          style={{
            backgroundColor: Status.Approved,
            paddingVertical: 10,
            paddingHorizontal: 7,
            borderRadius: 5,
          }}
        >
          <Text
            style={{
              fontFamily: Fonts.pop600,
              fontSize: 12,
              color: "#fff",
              lineHeight: 18,
            }}
          >
            Approved
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Quotecard;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 8,
    width: "100%",
    backgroundColor: "white",
    height: 200,
    minHeight: 108,
    // iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 7,
    // Android
    elevation: 5,
  },
});
