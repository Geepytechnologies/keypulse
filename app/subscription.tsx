import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Fonts } from "@/constants/Fonts";
import { Feather } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import { globalstyles } from "@/styles/common";
import { Colors } from "@/constants/Colors";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { API, Auth } from "aws-amplify";
import BillingCard from "@/components/cards/BillingCard";
import { useStripe } from "@stripe/stripe-react-native";
import Modal from "react-native-modal";
import CheckoutModal from "@/components/modals/CheckoutModal";
import RazorpayCheckout from "react-native-razorpay";
import { Keys } from "@/constants/Keys";

type Props = {};

const subscription = (props: Props) => {
  const [page, setPage] = useState(1);
  const [updateUI, setUpdateUI] = useState(false);
  const [paymentsheetloading, setPaymentSheetLoading] = useState(false);
  const [billingItem, setBillingItem] = useState<any>();
  const [billingdata, setBillingData] = useState<any>({
    billings: [],
    total: "",
    totalPages: 0,
    currentPage: page,
  });
  const [loading, setLoading] = useState(false);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [secret, setSecret] = useState("");
  const [isCheckoutModalVisible, setCheckoutModalVisible] = useState(false);
  const [userProfile, setUserProfile] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    country: "",
    email: "",
  });
  console.log(billingItem);
  const toggleCheckoutModalwithitem = (item: any) => {
    setBillingItem(item);
    setCheckoutModalVisible(!isCheckoutModalVisible);
  };
  const toggleCheckoutModal = () => {
    setCheckoutModalVisible(!isCheckoutModalVisible);
  };
  const Backdrop = () => {
    return <View style={{ flex: 1, backgroundColor: "black" }}></View>;
  };
  const getBilings = async () => {
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
      const res = await API.get(
        "billing-history",
        `/pages/${page || `0`}`,
        myInit
      );
      setBillingData({
        billings: res.billing_history,
        total: res.total,
        currentPage: page,
        totalPages: Math.ceil(res.total / 10),
      });
      // console.log(res);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  const getProfile = async () => {
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
      const res = await API.get("profile", ``, myInit);
      const { name, phone, country, email } = res;
      const name_arr = name.split(" ");
      setUserProfile({
        first_name: name_arr[0],
        last_name: name_arr[1],
        phone,
        country,
        email,
      });
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getProfile();
  }, []);
  useEffect(() => {
    getBilings();
  }, [updateUI]);
  //After Payment
  const updateBillingHistory = async () => {
    const session: any = await Auth.currentSession().catch((e) => {
      console.log(e);
    });
    const submitdata = { id: billingItem.id };
    const myInit = {
      body: submitdata,
      headers: {
        Authorization: session.idToken.jwtToken,
      },
    };
    setLoading(true);
    try {
      const result = await API.put("billing-history", ``, myInit);
      if (result) {
        // router.push("managesubscription");
        console.log("billing updated successfully");
      }
    } catch (e: any) {
      // Alert.alert("Could not cancel quote");
      console.log("error updating billing", e.message);
    } finally {
      setLoading(false);
    }
  };

  //Razorpay checkout
  const razorpayCheckout = () => {
    var options: any = {
      description: "Online payment for your quote",
      image: "@/assets/logo.jpg",
      currency: "USD",
      key: Keys.razorKey,
      amount: (Number(billingItem.amount_paid) * 100).toFixed(0),
      name: `Billing ${billingItem.id} payment`,
      order_id: billingItem.razor_order_id,
      prefill: {
        email: userProfile.email,
        contact: userProfile.phone,
        name: `${userProfile.first_name} ${userProfile.last_name}`,
      },

      theme: { color: Colors.primary },
    };
    RazorpayCheckout.open(options)
      .then((data) => {
        // handle success
        updateBillingHistory();
        Alert.alert("Success", "Your Order was confirmed.");
        setUpdateUI(!updateUI);
        toggleCheckoutModal();
        console.log(`Success: ${data.razorpay_payment_id}`);
        router.push("subscription");
      })
      .catch((error) => {
        Alert.alert("Error", "Payment failed.");
        toggleCheckoutModal();
        console.log(`Error: ${error.code} | ${error.description}`);
      });
  };
  //Stripe checkout
  const stripeCheckout = async (id: string) => {
    await fetchClientSecret(id);
    const { error: paymentsheetError } = await presentPaymentSheet();
    if (paymentsheetError) {
      console.log("Payment failed:", paymentsheetError);
      Alert.alert(paymentsheetError.code, paymentsheetError.message);
    } else {
      console.log("Payment successful!");
      setUpdateUI(!updateUI);
      Alert.alert("Success", "Your Order was confirmed.");
    }
  };

  const InitializePaymentsheet = async (secret: string) => {
    const { error } = await initPaymentSheet({
      merchantDisplayName: "keypulse",
      paymentIntentClientSecret: secret,
      returnURL: "keypulse://stripe-redirect",
    });
    if (error) {
      console.log("frominitialize", error.message);
    }
  };

  const fetchClientSecret = async (id: string) => {
    setPaymentSheetLoading(true);
    try {
      const session: any = await Auth.currentSession().catch((e) => {
        console.log(e);
      });
      const myInit = {
        body: { id: id },
        headers: { Authorization: session.idToken.jwtToken },
      };
      const res = await API.post("billing_secret", ``, myInit);
      await InitializePaymentsheet(res.paymentIntent);
      return res.paymentIntent;
    } catch (error: any) {
      console.log("Error fetching client secret:", error.message);
    } finally {
      setPaymentSheetLoading(false);
    }
  };
  useFocusEffect(
    useCallback(() => {
      getBilings();

      return;
    }, [])
  );
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
          Billing History
        </Text>
      </View>
      {/* body */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[styles.body, { display: "flex" }]}
      >
        <View style={{ marginBottom: 100 }}>
          {billingdata.billings.length > 0 ? (
            billingdata.billings.map(
              (item: any, index: React.Key | null | undefined) => (
                <BillingCard
                  key={index}
                  item={item}
                  toggleModal={() => toggleCheckoutModalwithitem(item)}
                  razorpayCheckout={razorpayCheckout}
                  stripeCheckout={() => stripeCheckout(item.id)}
                  paymentsheetloading={paymentsheetloading}
                />
              )
            )
          ) : (
            <View style={[globalstyles.centerview]}>
              <Text style={{ fontFamily: Fonts.pop400, fontSize: 18 }}>
                No Billing History
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
      <Modal
        style={{ margin: 0 }}
        isVisible={isCheckoutModalVisible}
        onBackdropPress={toggleCheckoutModal}
        swipeDirection={["down"]}
        onSwipeComplete={toggleCheckoutModal}
        propagateSwipe={true}
        customBackdrop={<Backdrop />}
      >
        <CheckoutModal
          toggleModal={toggleCheckoutModal}
          callRazorpay={razorpayCheckout}
          callStripe={() => stripeCheckout(billingItem.id)}
        />
      </Modal>
    </SafeAreaView>
  );
};

export default subscription;

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#fff",
    padding: 20,
    marginTop: 22,
    height: "100%",
  },
  label: {
    color: "#000000",
    fontFamily: Fonts.pop600,
    fontSize: 12,
  },
  inputcon: {
    paddingHorizontal: 19,
    paddingVertical: 18,
    borderRadius: 8,
    borderColor: "#E2E8F0",
    borderWidth: 1,
    backgroundColor: "#fff",
  },
  btn: {
    backgroundColor: "black",
    borderRadius: 40.5,
    paddingVertical: 19,
  },
  btntext: {
    color: "#fff",
    fontFamily: Fonts.pop600,
    fontSize: 14,
    textAlign: "center",
  },
});
