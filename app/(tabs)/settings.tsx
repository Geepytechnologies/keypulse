import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { router } from "expo-router";
import { Fonts } from "@/constants/Fonts";
import { globalstyles } from "@/styles/common";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import User from "@/assets/images/icons/user-thick.svg";
import Notification from "@/assets/images/icons/notification-thick.svg";
import Lock from "@/assets/images/icons/lock.svg";
import Card from "@/assets/images/icons/card.svg";
import Help from "@/assets/images/icons/help.svg";
import Subscription from "@/assets/images/icons/subscription-thick.svg";
import Info from "@/assets/images/icons/info.svg";
import Logout from "@/assets/images/icons/logout-thick.svg";
import Flag from "@/assets/images/icons/flag.svg";
import { Auth } from "aws-amplify";
import { useDispatch } from "react-redux";
import { SIGNOUT } from "@/config/slices/userSlice";

type Props = {};

const settings = (props: Props) => {
  const dispatch = useDispatch();
  const signout = async () => {
    try {
      await Auth.signOut();
      dispatch(SIGNOUT());
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
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
          Settings
        </Text>
      </View>
      {/* body */}
      <ScrollView style={styles.body}>
        <View style={{ gap: 26 }}>
          {/* 1 */}
          <View style={{ gap: 13 }}>
            <Text style={styles.headertext}>Account</Text>
            <View style={styles.box}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => router.push("editprofile")}
                style={[globalstyles.rowview, { gap: 15 }]}
              >
                <User />
                <Text style={{ fontFamily: Fonts.pop400, fontSize: 14 }}>
                  Edit profile
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.push("managesubscription")}
                activeOpacity={0.7}
                style={[globalstyles.rowview, { gap: 15 }]}
              >
                <Subscription />
                <Text style={{ fontFamily: Fonts.pop400, fontSize: 14 }}>
                  Subscription
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => router.push("changepassword")}
                activeOpacity={0.7}
                style={[globalstyles.rowview, { gap: 15 }]}
              >
                <Lock />
                <Text style={{ fontFamily: Fonts.pop400, fontSize: 14 }}>
                  Change Password
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* 2 */}
          <View style={{ gap: 13 }}>
            <Text style={styles.headertext}>Support & About</Text>
            <View style={styles.box}>
              <TouchableOpacity
                onPress={() => router.push("subscription")}
                activeOpacity={0.7}
                style={[globalstyles.rowview, { gap: 15 }]}
              >
                <Card />
                <Text style={{ fontFamily: Fonts.pop400, fontSize: 14 }}>
                  Billing History
                </Text>
              </TouchableOpacity>
              <View style={[globalstyles.rowview, { gap: 15 }]}>
                <Help />
                <Text style={{ fontFamily: Fonts.pop400, fontSize: 14 }}>
                  Help & Support
                </Text>
              </View>
              <View style={[globalstyles.rowview, { gap: 15 }]}>
                <Info />
                <Text style={{ fontFamily: Fonts.pop400, fontSize: 14 }}>
                  Terms and Policies
                </Text>
              </View>
            </View>
          </View>
          {/* 3 */}
          <View style={{ gap: 13 }}>
            <Text style={styles.headertext}>Actions</Text>
            <View style={styles.box}>
              <View style={[globalstyles.rowview, { gap: 15 }]}>
                <Flag />
                <Text style={{ fontFamily: Fonts.pop400, fontSize: 14 }}>
                  Report a problem
                </Text>
              </View>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={signout}
                style={[globalstyles.rowview, { gap: 15 }]}
              >
                <Logout />
                <Text style={{ fontFamily: Fonts.pop400, fontSize: 14 }}>
                  Log out
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default settings;

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#fff",
    padding: 25,
    marginTop: 22,
    height: "100%",
  },
  headertext: {
    fontFamily: Fonts.nun600,
    fontSize: 16,
    color: Colors.primary,
  },
  box: {
    backgroundColor: "#2427600D",
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 9,
    borderRadius: 6,
  },
});
