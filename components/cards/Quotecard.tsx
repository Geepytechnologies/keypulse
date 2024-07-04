import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { globalstyles } from "@/styles/common";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { Link, router } from "expo-router";

type Props = {
  item: any;
};

export enum Status {
  Approved = "#10AC16",
  Pending = "#FFBB6A",
  Rejected = "#FF6A6A",
}
const statuscolor = (item: any) => {
  switch (item.status) {
    case "Approved":
      return Status.Approved;
    case "Awaiting Customer Approval":
      return Status.Pending;
    case "Rejected":
      return Status.Rejected;
    default:
      return Status.Pending;
  }
};
const Quotecard = ({ item }: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() =>
        router.push({
          pathname: "quotedetails",
          params: { item: JSON.stringify(item) },
        })
      }
      style={[
        styles.container,
        globalstyles.rowview,
        { justifyContent: "space-between", gap: 10 },
      ]}
    >
      <View
        style={[globalstyles.rowview, { height: "100%", gap: 15, flex: 1 }]}
      >
        <View
          style={[
            {
              backgroundColor: statuscolor(item),
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
            Q-{item.id}
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
            {item.service?.service_name}
          </Text>
          <Text
            style={{
              fontFamily: Fonts.pop300,
              fontSize: 12,
              color: "#545871",
              letterSpacing: 0.1,
            }}
          >
            Exp.{" "}
            <Text style={{ fontFamily: Fonts.pop700 }}> {item.expired_on}</Text>
          </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              router.push({
                pathname: "comments",
                params: { quote_id: item.id },
              })
            }
            style={{ gap: 10 }}
          >
            <Text
              style={{
                fontFamily: Fonts.pop700,
                fontSize: 12,
                color: "#545871",
                textDecorationLine: "underline",
                textAlign: "center",
              }}
            >
              Show Comments
            </Text>
          </TouchableOpacity>
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
          style={[
            globalstyles.centerview,
            {
              backgroundColor: "#545871",
              borderRadius: 5,
              padding: 5,
              maxWidth: 75,
            },
          ]}
        >
          <Text
            style={{ fontSize: 14, fontFamily: Fonts.pop600, color: "#fff" }}
          >
            {item.amount || "00.00"}
          </Text>
        </View>
        <View
          style={[
            globalstyles.centerview,
            {
              backgroundColor: statuscolor(item),
              paddingVertical: 10,
              paddingHorizontal: 7,
              borderRadius: 5,
              maxWidth: 150,
            },
          ]}
        >
          <Text
            style={{
              fontFamily: Fonts.pop600,
              fontSize: 12,
              color: "#fff",
              lineHeight: 18,
            }}
          >
            {item.status}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
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
    marginBottom: 15,
    // iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 7,
    // Android
    elevation: 5,
  },
});
