import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Fonts } from "@/constants/Fonts";
import { Status } from "./Quotecard";
import { Colors } from "@/constants/Colors";
import { globalstyles } from "@/styles/common";
import { Helpers } from "@/utils/helpers";

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
    <View style={[styles.container, { margin: 5 }]}>
      <View style={[globalstyles.rowview, { justifyContent: "space-between" }]}>
        <View style={{ gap: 5 }}>
          <Text
            style={{
              fontFamily: Fonts.nun400,
              fontSize: 12,
              lineHeight: 14.4,
            }}
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
        </View>
        <View style={{ gap: 11 }}>
          <Text
            style={{
              fontFamily: Fonts.pop400,
              fontSize: 12,
              color: "#64748B",
              lineHeight: 22,
            }}
          >
            {Helpers.formatDate(item.created_on)}
          </Text>

          <View
            style={{
              // backgroundColor: statuscolor(item),
              paddingVertical: 10,
              paddingHorizontal: 7,
              borderRadius: 5,
              maxWidth: 150,
            }}
          >
            <Text
              style={{
                fontFamily: Fonts.pop600,
                fontSize: 12,
                color: "#64748B",
                lineHeight: 18,
              }}
            >
              {item.status}
            </Text>
          </View>
        </View>
      </View>
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
            fontSize: 14,
            fontFamily: Fonts.pop600,
            color: "#545871",
            textAlign: "center",
          }}
        >
          {item.amount || "0.00"}
        </Text>
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
    // iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 7,
    // Android
    elevation: 5,
  },
});
