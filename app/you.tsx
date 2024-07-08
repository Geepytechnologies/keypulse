import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Redirect } from "expo-router";
import StripePayment from "@/components/StripePayment";

type Props = {};

const index = (props: Props) => {
  return (
    <View>
      <StripePayment />
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
