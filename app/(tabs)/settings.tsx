import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {};

const settings = (props: Props) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>settings</Text>
    </SafeAreaView>
  );
};

export default settings;

const styles = StyleSheet.create({});
