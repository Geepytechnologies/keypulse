import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {};

const quotes = (props: Props) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>quotes</Text>
    </SafeAreaView>
  );
};

export default quotes;

const styles = StyleSheet.create({});
