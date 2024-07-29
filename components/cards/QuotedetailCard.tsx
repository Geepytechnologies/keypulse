import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Fonts } from "@/constants/Fonts";
import { Status } from "./Quotecard";
import { Colors } from "@/constants/Colors";
import { globalstyles } from "@/styles/common";
import { Helpers } from "@/utils/helpers";
import { router } from "expo-router";

type Props = {
  item: any;
};

const QuotedetailCard = ({ item }: Props) => {
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
  return (
    <View style={[styles.container, { margin: 5, backgroundColor: "#fcfcfd" }]}>
      <View style={[globalstyles.rowview, { justifyContent: "space-between" }]}>
        <View style={{ gap: 5 }}>
          <Text
            style={{
              fontFamily: Fonts.pop600,
              lineHeight: 18,
              color: "#545871",
            }}
          >
            Q-{item.id}
          </Text>
          <Text
            style={{
              fontFamily: Fonts.pop600,
              lineHeight: 18,
              color: "#545871",
            }}
          >
            <Text>Created: </Text>
            {Helpers.formatDate(item.created_on)}
          </Text>
          <View
            style={{
              // backgroundColor: statuscolor(item),
              paddingVertical: 10,
              // paddingHorizontal: 7,
              borderRadius: 5,
              maxWidth: 150,
            }}
          >
            <Text
              style={{
                fontFamily: Fonts.pop600,
                lineHeight: 18,
                color: "#545871",
              }}
            >
              <Text>Status: </Text> {item.status}
            </Text>
          </View>
        </View>
        <View style={{ gap: 5 }}>
          <Text
            style={{
              fontFamily: Fonts.pop600,
              letterSpacing: 0.1,
              color: "#545871",

              lineHeight: 18,
            }}
          >
            {item.service?.service_name}
          </Text>
          <Text
            style={{
              fontFamily: Fonts.pop600,
              color: "#545871",
              letterSpacing: 0.1,
            }}
          >
            Expires:
            <Text style={{ fontFamily: Fonts.pop600 }}> {item.expired_on}</Text>
          </Text>
          <View
            style={{
              // backgroundColor: "#54587138",
              borderRadius: 5,
              padding: 5,
              marginTop: 20,
            }}
          >
            <Text
              style={{
                fontFamily: Fonts.pop600,
                color: "#545871",
                lineHeight: 18,
              }}
            >
              <Text>Amount: </Text>
              {item.amount || "0.00"}
            </Text>
          </View>
        </View>
      </View>
      {/* show comments */}
      <View style={{ marginTop: 10 }}>
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
              textAlign: "right",
            }}
          >
            Show Comments
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default QuotedetailCard;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 8,
    // width: "100%",
    flex: 1,
    backgroundColor: "white",
    height: "auto",
    minHeight: 108,
    borderWidth: 1.3,
    borderColor: "black",
    // iOS
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 0 },
    // shadowOpacity: 0.15,
    // shadowRadius: 7,
    // Android
    // elevation: 5,
  },
});
