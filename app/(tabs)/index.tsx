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
import Calendar from "@/assets/images/calendar.svg";
import AngleRight from "@/assets/images/icons/angleright.svg";
import { Fonts } from "@/constants/Fonts";

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
      {/* banner */}
      <View style={{ paddingHorizontal: 25, marginTop: 18 }}>
        <ImageBackground
          resizeMode="stretch"
          style={{ width: "100%", height: 250 }}
          source={require("@/assets/images/banner.png")}
        >
          <View
            style={[
              globalstyles.rowview,
              {
                height: "100%",
                justifyContent: "flex-end",
                gap: 11,
              },
            ]}
          >
            <View style={{ gap: 9 }}>
              <Text style={{ width: 165 }}>
                <Text
                  style={[
                    styles.bannertext,
                    {
                      color: "black",
                    },
                  ]}
                >
                  A Reliable personal&nbsp;
                </Text>
                <Text style={[styles.bannertext, { color: Colors.primary }]}>
                  personal assistant&nbsp;
                </Text>
                <Text
                  style={[
                    styles.bannertext,
                    {
                      color: "black",
                    },
                  ]}
                >
                  for your{" "}
                  <Text
                    style={[
                      styles.bannertext,
                      {
                        color: "#545871",
                      },
                    ]}
                  >
                    family
                  </Text>
                </Text>
              </Text>
              <TouchableOpacity style={[globalstyles.rowview, styles.button]}>
                <Text
                  style={{
                    color: "white",
                    fontSize: 10,
                    fontFamily: Fonts.pop600,
                  }}
                >
                  Get Quote
                </Text>
                <AngleRight />
              </TouchableOpacity>
            </View>
            <Calendar />
          </View>
        </ImageBackground>
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
  button: {
    backgroundColor: "black",
    padding: 8,
    borderRadius: 40.5,
    gap: 22,
    justifyContent: "center",
  },
  bannertext: {
    fontFamily: Fonts.nun900,
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: 0.9,
  },
});
