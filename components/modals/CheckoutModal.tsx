import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { globalstyles } from "@/styles/common";

type Props = {
  toggleModal: () => void;
  callRazorpay: () => void;
  callStripe: () => void;
};

const CheckoutModal = ({ toggleModal, callRazorpay, callStripe }: Props) => {
  const handleRazorpay = () => {
    // toggleModal();
    callRazorpay();
  };
  const handleStripe = () => {
    toggleModal();
    callStripe();
  };
  return (
    <View style={styles.container}>
      <View style={[globalstyles.colview, { flex: 1, paddingTop: 20 }]}>
        <Text
          style={{
            fontFamily: Fonts.nun600,
            fontSize: 18,
            lineHeight: 24,
            textAlign: "center",
            maxWidth: "70%",
          }}
        >
          Choose payment option
        </Text>
        {/* bottom */}
        <View
          style={[
            globalstyles.rowview,
            { gap: 16, marginBottom: 40, marginTop: "auto" },
          ]}
        >
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={handleRazorpay}
            style={styles.btn}
          >
            <Text style={styles.btntext}>Razor Payment</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={handleStripe}
            style={styles.btn}
          >
            <Text style={styles.btntext}>Stripe Payment</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CheckoutModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    maxHeight: 250,
    backgroundColor: "#FEFEFE",
    marginTop: "auto",
    padding: 16,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
  },
  btn: {
    display: "flex",
    backgroundColor: "#6c757e",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  btntext: {
    fontSize: 14,
    fontFamily: Fonts.pop700,
    color: "#fff",
    lineHeight: 24,
    textAlign: "center",
  },
});
