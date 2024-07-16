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
  CancelQuote: () => void;
};

const ConfirmQuoteCancellationModal = ({ toggleModal, CancelQuote }: Props) => {
  const Goback = () => {
    toggleModal();
  };
  const handleConfirm = () => {
    toggleModal();
    CancelQuote();
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
          Are you sure you want to cancel quote?
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
            onPress={Goback}
            style={styles.btn}
          >
            <Text style={styles.btntext}>Go Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={handleConfirm}
            style={styles.btnconfirm}
          >
            <Text style={styles.btntextconfirm}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ConfirmQuoteCancellationModal;

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
    borderColor: Colors.primary,
    borderWidth: 1,
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
  },
  btnconfirm: {
    backgroundColor: "green",
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
  },
  btntext: {
    fontSize: 14,
    fontFamily: Fonts.pop700,
    color: Colors.primary,
    lineHeight: 24,
    textAlign: "center",
  },
  btntextconfirm: {
    fontSize: 14,
    fontFamily: Fonts.pop700,
    color: "#FEFEFE",
    lineHeight: 24,
    textAlign: "center",
  },
});
