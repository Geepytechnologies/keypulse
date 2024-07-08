import React, { useEffect, useState } from "react";
import {
  Button,
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Text,
  Platform,
} from "react-native";
import { initStripe, useStripe } from "@stripe/stripe-react-native";
import { API, Auth } from "aws-amplify";
import { Keys } from "@/constants/Keys";

const StripePayment = () => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const quoteId = "DY76MHHC9U";
  const [secret, setSecret] = useState("");

  const onCheckout = async () => {
    console.warn("i was pressed");
    await InitializePaymentsheet();
    const { error: paymentsheetError } = await presentPaymentSheet();
    if (paymentsheetError) {
      console.error("Payment failed:", paymentsheetError);
      Alert.alert("Payment failed", paymentsheetError.message);
    } else {
      console.log("Payment successful!");
      Alert.alert("Payment successful", "Your payment was successful.");
    }
  };
  const InitializePaymentsheet = async () => {
    // console.log(secret);
    const { error } = await initPaymentSheet({
      merchantDisplayName: "keypulse",
      paymentIntentClientSecret: secret,
      returnURL: "com.keypulse.app",
    });
    if (error) {
      console.warn("frominitialize", error.message);
      // Alert.alert(error.message);
    } else {
      console.log("payment sheet initialized", Platform.OS);
    }
  };
  //   useEffect(() => {
  //     InitializePaymentsheet();
  //   }, []);
  const fetchClientSecret = async () => {
    try {
      const session: any = await Auth.currentSession().catch((e) => {
        console.log(e);
      });
      const myInit = {
        body: { id: quoteId },
        headers: { Authorization: session.idToken.jwtToken },
      };
      const res = await API.post("quote_secret", ``, myInit);
      console.log(res);
      setSecret(res.paymentIntent);
      return res.paymentIntent;
    } catch (error: any) {
      console.error("Error fetching client secret:", error.message);
    }
  };
  useEffect(() => {
    fetchClientSecret();
  }, []);

  return (
    <TouchableOpacity onPress={onCheckout} style={styles.container}>
      <Text style={{ fontSize: 20 }}>Checkout</Text>
    </TouchableOpacity>
  );
};

export default StripePayment;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "teal",
    justifyContent: "center",
    alignItems: "center",
  },
});
