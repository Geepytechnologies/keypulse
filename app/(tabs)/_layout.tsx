import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import GetQuotes from "@/assets/images/icons/quotes.svg";
import Home from "@/assets/images/icons/home.svg";
import Settings from "@/assets/images/icons/settings.svg";
import { Fonts } from "@/constants/Fonts";
import { StyleSheet, Text, View } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const Test = () => (
    <View>
      <Text>hello</Text>
    </View>
  );
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        headerShown: false,
        tabBarStyle: {
          ...styles.header,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          paddingTop: 17,
          height: 90,
        },
      }}
    >
      <Tabs.Screen
        name="quotes"
        options={{
          title: "Get Quote",
          tabBarIcon: ({ color, focused }) => <GetQuotes fill={color} />,
          tabBarLabelStyle: { fontSize: 12, fontFamily: Fonts.rob400 },
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => <Home fill={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, focused }) => <Settings fill={color} />,
        }}
      />
    </Tabs>
  );
}

export const styles = StyleSheet.create({
  header: {
    // iOS shadow properties
    shadowColor: "rgba(0, 0, 0, 0.10)",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 20,
    // Android shadow property (elevation)
    elevation: 5,
  },
});
