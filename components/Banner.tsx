import {
  ImageBackground,
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

type Props = {};

const Banner = (props: Props) => {
  return (
    <View style={styles.bannercon}>
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
  );
};

export default Banner;

const styles = StyleSheet.create({
  bannercon: {
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
