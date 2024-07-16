import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Fonts } from "@/constants/Fonts";
import { Entypo, Feather, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { globalstyles } from "@/styles/common";
import { Colors } from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { API, Auth } from "aws-amplify";

type Props = {};

interface IBusinessDetails {
  id: string;
  email: string;
  location: string;
  phone_number: string;
}

const contact = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const [businessDetails, setBusinessDetails] = useState<IBusinessDetails>();

  const getBusinessDetails = async () => {
    const session: any = await Auth.currentSession().catch((e) => {
      console.log(e);
    });
    const myInit = {
      headers: {
        Authorization: session.idToken.jwtToken,
      },
    };
    try {
      const res = await API.get("business", ``, myInit);
      setBusinessDetails(res.business);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBusinessDetails();
  }, []);
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
          Contact Us
        </Text>
      </View>
      {/* body */}
      <ScrollView style={styles.body}>
        <View style={{ gap: 26, marginTop: 30 }}>
          <View style={[globalstyles.rowview, { gap: 10 }]}>
            <Ionicons name="call" size={24} color={Colors.primary} />
            <Text
              style={{ fontFamily: Fonts.pop500, fontSize: 16, color: "black" }}
            >
              {businessDetails?.phone_number}
            </Text>
          </View>
          <View style={[globalstyles.rowview, { gap: 10 }]}>
            <FontAwesome6
              name="location-pin"
              size={24}
              color={Colors.primary}
            />
            <Text
              style={{ fontFamily: Fonts.pop500, fontSize: 16, color: "black" }}
            >
              {businessDetails?.location}
            </Text>
          </View>
          <View style={[globalstyles.rowview, { gap: 10 }]}>
            <Entypo name="mail" size={24} color={Colors.primary} />
            <Text
              style={{ fontFamily: Fonts.pop500, fontSize: 16, color: "black" }}
            >
              {businessDetails?.email}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default contact;

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#fff",
    padding: 20,
    marginTop: 22,
    height: "100%",
  },
});
