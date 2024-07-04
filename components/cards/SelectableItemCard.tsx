import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Fonts } from "@/constants/Fonts";
import { Colors } from "@/constants/Colors";
import { globalstyles } from "@/styles/common";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";

type Props = {
  title: string;
  content: string;
  selected?: boolean;
  toggleSelection: any;
};

const SelectableItemCard = ({
  title,
  content,
  selected,
  toggleSelection,
}: Props) => {
  return (
    <View
      style={[
        styles.container,
        globalstyles.rowview,
        { gap: 10, alignItems: "flex-start" },
      ]}
    >
      <TouchableOpacity onPress={toggleSelection} activeOpacity={0.8}>
        {selected ? (
          <MaterialCommunityIcons
            name="checkbox-marked"
            size={24}
            color={Colors.primary}
          />
        ) : (
          <MaterialCommunityIcons
            name="checkbox-blank-outline"
            size={24}
            color="black"
          />
        )}
      </TouchableOpacity>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{title}</Text>
        <Text>{content}</Text>
      </View>
    </View>
  );
};

export default SelectableItemCard;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E2E8F0",
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
