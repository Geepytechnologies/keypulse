import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Redirect } from "expo-router";

type Props = {};

const index = (props: Props) => {
  return <Redirect href={"changepassword"} />;
};

export default index;

const styles = StyleSheet.create({});
