import {
  Image,
  NativeModules,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Animated, {
  Easing,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { ScreenDimensions } from "@/constants/Dimensions";
import { globalstyles } from "@/styles/common";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import User from "@/assets/images/icons/user.svg";
import Notification from "@/assets/images/icons/notify.svg";
import Quote from "@/assets/images/icons/quote.svg";
import Money from "@/assets/images/icons/money.svg";
import Subscription from "@/assets/images/icons/subscription.svg";
import Call from "@/assets/images/icons/call.svg";
import Logout from "@/assets/images/icons/logout.svg";
import { router } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/config/store";
import { Helpers } from "@/utils/helpers";
import { SIGNOUT } from "@/config/slices/userSlice";
import { Auth } from "aws-amplify";
import Toast from "react-native-toast-message";

type Props = {
  sidebarWidth: any;
  toggleModal: any;
};
const Sidebar = ({ sidebarWidth, toggleModal }: Props) => {
  const { currentuser } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [statusBarHeight, setStatusBarHeight] = useState(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: withTiming(sidebarWidth.value, {
        duration: 200,
        easing: Easing.inOut(Easing.ease),
      }),
    };
  });

  const closeSidebar = () => {
    sidebarWidth.value = sidebarWidth.value === 0;
  };
  const { StatusBarManager } = NativeModules;
  useEffect(() => {
    if (StatusBarManager.getHeight) {
      StatusBarManager.getHeight((response: { height: any }) => {
        setStatusBarHeight(response.height);
        return response.height;
      });
    }
  }, []);
  const signout = async () => {
    try {
      toggleModal();
      await Auth.signOut();
      dispatch(SIGNOUT());
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  return (
    <Animated.View
      style={[
        styles.container,
        animatedStyle,
        { paddingTop: Platform.OS == "ios" ? statusBarHeight + 38 : 38 },
      ]}
    >
      <Toast />
      {/* header */}
      <View
        style={[
          globalstyles.rowview,
          {
            justifyContent: "space-between",
            paddingHorizontal: 17.5,
            marginBottom: 40,
          },
        ]}
      >
        <View style={[globalstyles.rowview, { gap: 12 }]}>
          <Image
            style={styles.profileimg}
            source={require("@/assets/images/avatar1.png")}
          />
          <Text style={styles.name}>{currentuser?.name}</Text>
        </View>
        <TouchableOpacity onPress={toggleModal} activeOpacity={0.8}>
          <Ionicons name="close" size={35} color={Colors.primary} />
        </TouchableOpacity>
      </View>
      {/* hr */}
      <View style={globalstyles.hr}></View>
      {/* menus */}
      <View style={{ paddingTop: 20, gap: 8 }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => router.push("editprofile")}
          style={[globalstyles.rowview, { padding: 12, gap: 10 }]}
        >
          <User />
          <Text
            style={{
              fontFamily: Fonts.pop500,
              fontSize: 16,
              lineHeight: 24,
              letterSpacing: -0.16,
            }}
          >
            Manage Profile
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[globalstyles.rowview, { padding: 12, gap: 10 }]}
        >
          <Notification />
          <Text
            style={{
              fontFamily: Fonts.pop500,
              fontSize: 16,
              lineHeight: 24,
              letterSpacing: -0.16,
            }}
          >
            Notifications
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => router.push("myquotes")}
          style={[globalstyles.rowview, { padding: 12, gap: 10 }]}
        >
          <Quote />
          <Text
            style={{
              fontFamily: Fonts.pop500,
              fontSize: 16,
              lineHeight: 24,
              letterSpacing: -0.16,
            }}
          >
            Manage Quotes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => router.push("subscription")}
          style={[globalstyles.rowview, { padding: 12, gap: 10 }]}
        >
          <Money />
          <Text
            style={{
              fontFamily: Fonts.pop500,
              fontSize: 16,
              lineHeight: 24,
              letterSpacing: -0.16,
            }}
          >
            Manage Billing
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => router.push("managesubscription")}
          style={[globalstyles.rowview, { padding: 12, gap: 10 }]}
        >
          <Subscription />
          <Text
            style={{
              fontFamily: Fonts.pop500,
              fontSize: 16,
              lineHeight: 24,
              letterSpacing: -0.16,
            }}
          >
            Manage Subscription
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: "auto" }}>
        {/* hr */}
        <View style={globalstyles.hr}></View>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[globalstyles.rowview, { padding: 12, gap: 10 }]}
        >
          <Call />
          <Text
            style={{
              fontFamily: Fonts.pop500,
              fontSize: 16,
              lineHeight: 24,
              letterSpacing: -0.16,
            }}
          >
            123 456 789
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={signout}
          activeOpacity={0.6}
          style={[globalstyles.rowview, { padding: 12, gap: 10 }]}
        >
          <Logout />
          <Text
            style={{
              fontFamily: Fonts.pop500,
              fontSize: 16,
              lineHeight: 24,
              letterSpacing: -0.16,
            }}
          >
            Sign out
          </Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default Sidebar;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    height: ScreenDimensions.screenHeight,
    gap: 16,
    backgroundColor: "#fff",
    paddingBottom: 38,
  },
  profileimg: {
    width: 42,
    height: 42,
    borderRadius: 50,
    objectFit: "cover",
    borderWidth: 2,
    borderColor: "white",
  },
  name: {
    fontFamily: Fonts.pop500,
    fontSize: 16,
    lineHeight: 24,
    color: "#000",
    letterSpacing: -0.16,
  },
});
