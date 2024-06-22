import { Colors } from "@/constants/Colors";
import { StatusBar } from "expo-status-bar";
import {
  Image,
  StyleSheet,
  Platform,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Menu from "@/assets/images/icons/menu.svg";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { globalstyles } from "@/styles/common";

import { Fonts } from "@/constants/Fonts";
import Banner from "@/components/Banner";
import Quotecard from "@/components/cards/Quotecard";

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.primary }}>
      <StatusBar style="light" />
      {/* header */}
      <View
        style={[
          globalstyles.rowview,
          { paddingHorizontal: 25, justifyContent: "space-between" },
        ]}
      >
        <Menu />
        <View style={[globalstyles.rowview, { gap: 10 }]}>
          <View style={{ position: "relative" }}>
            <MaterialCommunityIcons name="bell" size={24} color="white" />
            <View style={styles.notification}></View>
          </View>
          <Image
            style={styles.profileimg}
            source={require("@/assets/images/avatar1.png")}
          />
        </View>
      </View>

      <View style={styles.bottomsection}>
        {/* banner */}
        <Banner />
        {/* Quote section */}
        <View
          style={[
            globalstyles.rowview,
            { justifyContent: "space-between", marginBottom: 15 },
          ]}
        >
          <Text
            style={{
              color: "#1E1E1E",
              fontFamily: Fonts.nun800,
              fontSize: 14,
              lineHeight: 16.8,
            }}
          >
            My Quotes
          </Text>
          <Text
            style={{
              fontFamily: Fonts.pop400,
              textDecorationLine: "underline",
              fontSize: 10,
              color: Colors.primary,
            }}
          >
            Show All
          </Text>
        </View>
        <Quotecard />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  notification: {
    width: 10,
    height: 10,
    borderRadius: 50,
    backgroundColor: "red",
    borderColor: "#fff",
    borderWidth: 2,
    position: "absolute",
    right: 1,
  },
  profileimg: {
    width: 42,
    height: 42,
    borderRadius: 50,
    objectFit: "cover",
    borderWidth: 2,
    borderColor: "white",
  },
  bottomsection: {
    height: "100%",
    backgroundColor: "white",
    paddingHorizontal: 25,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: 87,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
