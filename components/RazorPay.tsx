import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import RazorpayCheckout from "react-native-razorpay";

type Props = {};

const RazorPay = (props: Props) => {
  const handlePayment = () => {
    var options: any = {
      description: "Credits towards consultation",
      image: "https://i.imgur.com/3g7nmJC.jpg",
      currency: "INR",
      key: "rzp_test_tcVAvRpRvaka56",
      amount: "5000",
      name: "Acme Corp",
      order_id: "order_DslnoIgkIDL8Zt", //Replace this with an order_id created using Orders API.
      prefill: {
        email: "gaurav.kumar@example.com",
        contact: "9191919191",
        name: "Gaurav Kumar",
      },
      theme: { color: "#53a20e" },
    };
    RazorpayCheckout.open(options)
      .then((data) => {
        // handle success
        alert(`Success: ${data.razorpay_payment_id}`);
      })
      .catch((error) => {
        // handle failure
        alert(`Error: ${error.code} | ${error.description}`);
      });
  };
  return (
    <View>
      <TouchableOpacity
        style={{ backgroundColor: "teal" }}
        activeOpacity={0.9}
        onPress={handlePayment}
      >
        <Text style={{ color: "white" }}>RazorPay</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RazorPay;

const styles = StyleSheet.create({});
