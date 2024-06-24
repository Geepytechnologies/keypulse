import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Fonts } from "@/constants/Fonts";
import { Status } from "./Quotecard";
import { Colors } from "@/constants/Colors";
import { globalstyles } from "@/styles/common";

type Props = {};

const QuotedetailCard = (props: Props) => {
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
            10 Jun 2024
          </Text>

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
      <View
        style={{
          backgroundColor: "#54587138",
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
          $125.23
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
