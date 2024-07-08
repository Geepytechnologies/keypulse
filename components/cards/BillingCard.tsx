import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Fonts } from "@/constants/Fonts";

type Props = {
  item: {
    subscription_id: string;
    payment_date: string;
    amount_paid: string;
    last4: string;
    status: string;
  };
};

const BillingCard = ({ item }: Props) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={[styles.header]}>Subscription Id</Text>
        <Text style={[styles.content]}>S-{item.subscription_id}</Text>
      </View>
      <View>
        <Text style={[styles.header]}>Transaction Time</Text>
        <Text style={[styles.content]}>{item.payment_date}</Text>
      </View>
      <View>
        <Text style={[styles.header]}>Transaction Amount</Text>
        <Text style={[styles.content]}>{item.amount_paid}</Text>
      </View>
      <View>
        <Text style={[styles.header]}>Card Info(Last 4 Digit)</Text>
        <Text style={[styles.content]}>{item.last4}</Text>
      </View>
      <View>
        <Text style={[styles.header]}>Transaction Status</Text>
        <Text style={[styles.content]}>{item.status}</Text>
      </View>
    </View>
  );
};

export default BillingCard;

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    gap: 5,
    padding: 15,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    borderColor: "#E2E8F0",
    elevation: 5,
  },

  header: {
    fontSize: 16,
    fontFamily: Fonts.pop500,
  },
  content: {
    fontSize: 14,
    fontFamily: Fonts.pop400,
    color: "black",
    opacity: 0.7,
  },
});
