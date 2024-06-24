import { FontAwesome6 } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";

const CustomDropdown = ({ items }: any) => {
  const [selectedValue, setSelectedValue] = useState(null);

  return (
    <RNPickerSelect
      onValueChange={(value) => setSelectedValue(value)}
      items={items}
      useNativeAndroidPickerStyle={false} // Disable native style on Android
      //   style={pickerSelectStyles}
      Icon={() => {
        return <FontAwesome6 name="angle-down" size={24} color="#64748B" />;
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "gray",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  iconContainer: {
    top: 10,
    right: 12,
  },
});

export default CustomDropdown;
