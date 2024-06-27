import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef } from "react";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { Fonts } from "@/constants/Fonts";
import { globalstyles } from "@/styles/common";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import Itemcard from "@/components/cards/Itemcard";

type Props = {};

const items = (props: Props) => {
  const DATA = [
    {
      id: "1",
      title: "Monitoring Vital Signs",
      content:
        "Regularly checking and recording vital signs such as blood pressure, pulse, temperature, and respiratory rate",
    },
    {
      id: "2",
      title: "Assisting with Mobility",
      content:
        "Helping individuals move around, transfer in and out of beds or chairs, and using mobility aids as needed",
    },
  ];
  const itemcardref = useRef<FlatList | null>(null);
  const renderItem = ({ item }: any) => (
    <Itemcard title={item.title} content={item.content} />
  );
  return (
    <SafeAreaView style={{ backgroundColor: Colors.primary }}>
      <StatusBar style="light" />
      {/* header */}
      <View
        style={[
          globalstyles.rowview,
          {
            paddingHorizontal: 25,
            marginTop: 22,
          },
        ]}
      >
        <TouchableOpacity activeOpacity={0.8} onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text
          style={{
            fontFamily: Fonts.nun700,
            fontSize: 20,
            lineHeight: 24,
            color: "#fff",
            flex: 1,
            textAlign: "center",
          }}
        >
          Items
        </Text>
      </View>
      {/* body */}
      <View style={styles.body}>
        <FlatList
          ref={itemcardref}
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

export default items;

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#fff",
    padding: 25,
    marginTop: 22,
    height: "100%",
  },
});
