import {
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Calendar from "@/assets/images/calendar.svg";
import AngleRight from "@/assets/images/icons/angleright.svg";
import { globalstyles } from "@/styles/common";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { router } from "expo-router";

type Props = {};

const Banner = (props: Props) => {
  return (
    <View style={[styles.bannercon, { height: 175 }]}>
      <Image
        source={require("@/assets/images/designelements.png")}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />
      <View
        style={[
          globalstyles.rowview,
          {
            height: "100%",
            paddingLeft: 23,
            justifyContent: "space-between",
            gap: 11,
          },
        ]}
      >
        <View style={{ gap: 9, flex: 1 }}>
          <Text style={{}}>
            <Text
              style={[
                styles.bannertext,
                {
                  color: "black",
                },
              ]}
            >
              A Reliable&nbsp;
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
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.push("(tabs)/quotes")}
            style={[globalstyles.rowview, styles.button]}
          >
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
        <Calendar width={Platform.OS == "ios" ? 150 : 100} />
      </View>
    </View>
  );
};

export default Banner;

const styles = StyleSheet.create({
  bannercon: {
    width: "100%",
    borderColor: "#545871",
    // borderWidth: 2,
    borderRadius: 13,
    backgroundColor: "#f0f1f7",
    transform: [{ translateY: -60 }],
  },
  button: {
    backgroundColor: "black",
    padding: 8,
    borderRadius: 40.5,
    gap: 22,
    justifyContent: "center",
    maxWidth: 113,
  },
  bannertext: {
    fontFamily: Fonts.nun900,
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: 0.9,
  },
});
