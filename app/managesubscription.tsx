import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { Fonts } from "@/constants/Fonts";
import { globalstyles } from "@/styles/common";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { API, Auth } from "aws-amplify";
import Subscriptioncard from "@/components/cards/Subscriptioncard";

type Props = {};

const managesubscription = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const [subscriptions, setSubscriptions] = useState([]);
  const getSubscriptions = async () => {
    const session: any = await Auth.currentSession().catch((e) => {
      console.log(e);
    });
    const myInit = {
      headers: {
        Authorization: session.idToken.jwtToken,
      },
    };
    setLoading(true);
    try {
      const res = await API.get("subscriptions", ``, myInit);
      console.log(res.subscriptions);
      setSubscriptions(res.subscriptions);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getSubscriptions();
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
          Manage Subscription
        </Text>
      </View>
      {/* body */}
      <ScrollView style={styles.body}>
        {subscriptions.length > 0
          ? subscriptions.map((item, index) => (
              <Subscriptioncard
                key={index}
                item={item}
                getSubscriptions={getSubscriptions}
              />
            ))
          : !loading && (
              <View style={[globalstyles.centerview]}>
                <Text
                  style={{
                    fontFamily: Fonts.pop500,
                    fontSize: 18,
                    lineHeight: 20,
                  }}
                >
                  No Subscriptions
                </Text>
              </View>
            )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default managesubscription;

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#fff",
    padding: 25,
    marginTop: 22,
    height: "100%",
  },
});
