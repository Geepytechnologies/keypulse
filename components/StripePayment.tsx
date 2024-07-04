import React, { useEffect } from "react";
import { Button, View, StyleSheet, Alert } from "react-native";
import { initStripe, useStripe } from "@stripe/stripe-react-native";
import { API, Auth } from "aws-amplify";
import { Keys } from "@/constants/Keys";

const StripePayment = () => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const quoteId = "FYVBC3UZNU";

  useEffect(() => {
    const initStripeAndPaymentSheet = async () => {
      try {
        await initStripe({
          publishableKey: Keys.stripePublishableKey,
          merchantIdentifier: "merchant.identifier",
        });

        const secret = await fetchClientSecret(); // Fetch client secret from server
        const { error } = await initPaymentSheet({
          merchantDisplayName: "Example, Inc.",
          paymentIntentClientSecret: secret,
        });

        if (error) {
          console.error("Error initializing PaymentSheet:", error);
          // Handle error
        }
      } catch (error) {
        console.error("Error setting up Stripe:", error);
        // Handle setup error
      }
    };

    initStripeAndPaymentSheet();
  }, []);

  const fetchClientSecret = async () => {
    try {
      const session: any = await Auth.currentSession();
      const myInit = {
        body: { id: quoteId },
        headers: { Authorization: session.idToken.jwtToken },
      };
      const res = await API.post("quote-stripe", ``, myInit);
      console.log("Secret:", res.clientSecret);
      return res.clientSecret; // Return the client secret
    } catch (error) {
      console.error("Error fetching client secret:", error);
      throw error;
    }
  };

  const handleCheckout = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      console.error("Payment failed:", error);
      Alert.alert("Payment failed", error.message);
    } else {
      console.log("Payment successful!");
      Alert.alert("Payment successful", "Your payment was successful.");
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Checkout" onPress={handleCheckout} />
    </View>
  );
};

export default StripePayment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
