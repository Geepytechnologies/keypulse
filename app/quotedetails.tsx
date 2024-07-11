import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { StatusBar } from "expo-status-bar";
import { globalstyles } from "@/styles/common";
import { Feather } from "@expo/vector-icons";
import { Fonts } from "@/constants/Fonts";
import { Link, router, useLocalSearchParams, useRouter } from "expo-router";
import Quotecard, { Status } from "@/components/cards/Quotecard";
import QuotedetailCard from "@/components/cards/QuotedetailCard";
import Commentbox from "@/components/Commentbox";
import { API, Auth } from "aws-amplify";
import { useStripe } from "@stripe/stripe-react-native";

type Props = {};

const quotedetails = (props: Props) => {
  const { item }: any = useLocalSearchParams();
  const quoteitems = JSON.parse(item);
  const [loading, setLoading] = useState(false);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [secret, setSecret] = useState("");

  const onCheckout = async () => {
    await InitializePaymentsheet();
    const { error: paymentsheetError } = await presentPaymentSheet();
    if (paymentsheetError) {
      console.log("Payment failed:", paymentsheetError);
      Alert.alert(paymentsheetError.code, paymentsheetError.message);
    } else {
      console.log("Payment successful!");
      Alert.alert("Success", "Your payment was successful.");
    }
  };

  const InitializePaymentsheet = async () => {
    const { error, paymentOption } = await initPaymentSheet({
      merchantDisplayName: "keypulse",
      customFlow: true,
      paymentIntentClientSecret: secret,
      returnURL: "keypulse://stripe-redirect",
    });
    if (error) {
      // console.warn("frominitialize", error.message);
    }
    console.log("option", paymentOption?.label);
  };

  const fetchClientSecret = async () => {
    try {
      const session: any = await Auth.currentSession().catch((e) => {
        console.log(e);
      });
      const myInit = {
        body: { id: quoteitems.id },
        headers: { Authorization: session.idToken.jwtToken },
      };
      const res = await API.post("quote_secret", ``, myInit);
      console.log("intent", res.paymentIntent);
      setSecret(res.paymentIntent);
      // InitializePaymentsheet();
      return res.paymentIntent;
    } catch (error: any) {
      // console.error("Error fetching client secret:", error.message);
    }
  };

  useEffect(() => {
    fetchClientSecret();
  }, []);
  const CancelQuote = async () => {
    const session: any = await Auth.currentSession().catch((e) => {
      console.log(e);
    });
    const submitdata = { id: quoteitems.id };
    const myInit = {
      body: submitdata,
      headers: {
        Authorization: session.idToken.jwtToken,
      },
    };
    setLoading(true);
    try {
      const result = await API.del("quotes", ``, myInit);
      if (result) {
        router.push("myquotes");
      }
    } catch (e: any) {
      Alert.alert("Could not cancel quote");
      console.log("error cancelling quote", e.message);
    } finally {
      setLoading(false);
    }
  };
  // console.log(quoteitems.status);
  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      style={{ flex: 1, backgroundColor: Colors.primary }}
    >
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
          Quote Details
        </Text>
      </View>
      {/* body */}
      <ScrollView style={[styles.body, { display: "flex" }]}>
        <View>
          <QuotedetailCard item={quoteitems} />
          {/* buttons */}
          <View style={[globalstyles.rowview, { gap: 8, marginTop: 15 }]}>
            {quoteitems.status == "Awaiting Customer Approval" &&
              quoteitems.status !== "Cancelled" && (
                <TouchableOpacity
                  onPress={onCheckout}
                  activeOpacity={0.8}
                  style={styles.commentbtn}
                >
                  <Text style={styles.comment}>Approve</Text>
                </TouchableOpacity>
              )}
            {quoteitems.status !== "Cancelled" && (
              <TouchableOpacity
                onPress={CancelQuote}
                disabled={loading}
                activeOpacity={0.8}
                style={styles.cancelbtn}
              >
                <Text style={styles.cancel}>
                  {loading ? "Cancelling..." : "Cancel"}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        {/* comments */}
        <View style={{ marginTop: 15 }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              router.push({
                pathname: "comments",
                params: { quote_id: quoteitems.id },
              })
            }
            style={{ gap: 10 }}
          >
            <Text
              style={{
                fontFamily: Fonts.pop700,
                fontSize: 12,
                color: "#545871",
                textDecorationLine: "underline",
                textAlign: "center",
              }}
            >
              Show Comments
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default quotedetails;

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#fff",
    padding: 20,
    marginTop: 22,
    height: "100%",
  },
  commentbtn: {
    backgroundColor: "black",
    borderRadius: 6,
    padding: 10,
    flex: 1,
  },
  cancelbtn: {
    backgroundColor: "#FF6A6A3D",
    borderRadius: 6,
    padding: 10,
    flex: 1,
  },
  comment: {
    fontFamily: Fonts.pop700,
    color: "#fff",
    fontSize: 12,
    textAlign: "center",
  },
  cancel: {
    fontFamily: Fonts.pop700,
    color: "#FF6A6A",
    fontSize: 12,
    textAlign: "center",
  },
});
