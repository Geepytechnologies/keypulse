import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Fonts } from "@/constants/Fonts";
import { globalstyles } from "@/styles/common";
import { Colors } from "@/constants/Colors";

type Props = {};

const Commentbox = (props: Props) => {
  return (
    <View style={{ gap: 10 }}>
      <View style={[globalstyles.rowview, { justifyContent: "space-between" }]}>
        <Text
          style={{
            fontFamily: Fonts.pop600,
            fontSize: 14,
            lineHeight: 20,
            color: "#545871",
          }}
        >
          Sameera Noxus
        </Text>
        <Text
          style={{
            fontFamily: Fonts.pop400,
            fontSize: 12,
            lineHeight: 22,
            color: "#64748B",
          }}
        >
          10 Jun 2024
        </Text>
      </View>
      <Text
        style={{ fontFamily: Fonts.pop400, fontSize: 12, color: "#808080" }}
      >
        Lorem ipsum dolor sit amet consectetur. Sed et et felis volutpat
        tristique lorem facilisi massa. Massa id nisi lectus nullam.
      </Text>
      {/* hr */}
      <View style={{ height: 0.5, backgroundColor: Colors.primary }} />
    </View>
  );
};

export default Commentbox;

const styles = StyleSheet.create({});
