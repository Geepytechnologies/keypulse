import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { SetStateAction } from "react";
import { Fonts } from "@/constants/Fonts";
import { Colors } from "@/constants/Colors";

type Props = {
  label: string;
  gender: string;
  setGender: any;
};

const GenderBox = ({ label, gender, setGender }: Props) => {
  const checkactive = () => {
    if (gender === label) {
      return true;
    }
    return false;
  };
  return (
    <TouchableOpacity
      onPress={() => setGender(label)}
      activeOpacity={0.8}
      style={checkactive() ? styles.selectboxactive : styles.selectboxinactive}
    >
      <Text
        style={
          checkactive()
            ? styles.selectboxtextactive
            : styles.selectboxtextinactive
        }
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default GenderBox;

const styles = StyleSheet.create({
  selectboxinactive: {
    padding: 10,
    borderRadius: 6,
    backgroundColor: "#E2E8F0",
    minWidth: 75,
    maxWidth: 150,
    marginRight: 8,
  },
  selectboxactive: {
    padding: 10,
    borderRadius: 6,
    backgroundColor: Colors.primary,
    minWidth: 75,
    maxWidth: 150,
    marginRight: 8,
  },
  selectboxtextinactive: {
    color: "#000",
    fontFamily: Fonts.pop300,
    fontSize: 12,
    textAlign: "center",
  },
  selectboxtextactive: {
    color: "#fff",
    fontFamily: Fonts.pop700,
    fontSize: 12,
    textAlign: "center",
  },
});
