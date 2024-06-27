import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Fonts } from "@/constants/Fonts";
import { Colors } from "@/constants/Colors";

type Props = {
  title: string;
  content: string;
};

const Itemcard = ({ title, content }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text>{content}</Text>
    </View>
  );
};

export default Itemcard;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 4,
    // iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    // Android
    elevation: 5,
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
