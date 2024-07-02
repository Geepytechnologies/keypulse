import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Fonts } from "@/constants/Fonts";
import { Colors } from "@/constants/Colors";
import { globalstyles } from "@/styles/common";
import { AntDesign } from "@expo/vector-icons";

type Props = {
  title: string;
  content: string;
};

const Itemcard = ({ title, content }: Props) => {
  return (
    <View
      style={[
        styles.container,
        globalstyles.rowview,
        { gap: 10, alignItems: "flex-start" },
      ]}
    >
      <AntDesign name="checksquare" size={24} color={Colors.primary} />
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{title}</Text>
        <Text>{content}</Text>
      </View>
    </View>
  );
};

export default Itemcard;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E2E8F0",

    // // iOS
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 0 },
    // shadowOpacity: 0.25,
    // shadowRadius: 7,
    // // Android
    // elevation: 5,
  },
  title: {
    fontFamily: Fonts.nun700,
    fontSize: 14,
    color: Colors.primary,
  },
  content: {
    color: "#616161",
    fontFamily: Fonts.pop400,
    fontSize: 12,
    lineHeight: 22,
  },
});
