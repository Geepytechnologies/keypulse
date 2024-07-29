import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { StatusBar } from "expo-status-bar";
import { globalstyles } from "@/styles/common";
import { Feather } from "@expo/vector-icons";
import { Fonts } from "@/constants/Fonts";
import {
  Link,
  router,
  useFocusEffect,
  useLocalSearchParams,
  useRouter,
} from "expo-router";
import Quotecard, { Status } from "@/components/cards/Quotecard";
import QuotedetailCard from "@/components/cards/QuotedetailCard";
import Commentbox from "@/components/Commentbox";
import { API, Auth } from "aws-amplify";
import { useStripe } from "@stripe/stripe-react-native";
import Modal from "react-native-modal";
import ConfirmQuoteCancellationModal from "@/components/modals/ConfirmQuoteCancellationModal";
import CheckoutModal from "@/components/modals/CheckoutModal";
import { Keys } from "@/constants/Keys";
import { useSelector } from "react-redux";
import { RootState } from "@/config/store";

type Props = {};

const quotedetails = (props: Props) => {
  const { currentuser } = useSelector((state: RootState) => state.user);
  const { item }: any = useLocalSearchParams();
  const quoteitems = JSON.parse(item);
  const [loading, setLoading] = useState(false);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [secret, setSecret] = useState("");
  const [quote, setQuote] = useState<any>();
  const [paymentupdate, setPaymentUpdate] = useState(false);

  const [isModalVisible, setModalVisible] = useState(false);
  const [isCheckoutModalVisible, setCheckoutModalVisible] = useState(false);
  const [userProfile, setUserProfile] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    country: "",
    email: "",
  });

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleCheckoutModal = () => {
    setCheckoutModalVisible(!isCheckoutModalVisible);
  };
  const Backdrop = () => {
    return <View style={{ flex: 1, backgroundColor: "black" }}></View>;
  };
  const ApproveQuote = async () => {
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
      const result = await API.put("quotes", ``, myInit);
      if (result) {
        router.push("managesubscription");
      }
      console.log("quote approved");
    } catch (e: any) {
      Alert.alert("Could not cancel quote");
      console.log("error approving quote", e.message);
    } finally {
      setLoading(false);
    }
  };
  const getQuote = async () => {
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
      const res = await API.get("quotes", "", myInit);
      const selectedQuote = res.quotes.filter(
        (item: any) => item.id == quoteitems.id
      );
      setQuote(selectedQuote[0]);
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getQuote();
  }, [paymentupdate]);

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
  //stripe logic
  const stripeCheckout = async () => {
    const { error: paymentsheetError } = await presentPaymentSheet();
    if (paymentsheetError) {
      console.log("Payment failed:", paymentsheetError);
      Alert.alert(paymentsheetError.code, paymentsheetError.message);
    } else {
      console.log("Payment successful!");
      router.push("managesubscription");

      setPaymentUpdate(!paymentupdate);
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
      console.warn("frominitialize", error.message + ": " + secret);
    }
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
      await InitializePaymentsheet(res.paymentIntent);
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
  useFocusEffect(
    useCallback(() => {
      getQuote();

      return;
    }, [])
  );
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
        {quote && (
          <>
            <View>
              <QuotedetailCard item={quote} />
              {/* buttons */}
              <View style={[globalstyles.rowview, { gap: 8, marginTop: 15 }]}>
                {quote.status == "Awaiting Customer Approval" &&
                  quote.status !== "Cancelled" && (
                    <TouchableOpacity
                      onPress={toggleCheckoutModal}
                      activeOpacity={0.8}
                      style={styles.commentbtn}
                    >
                      <Text style={styles.comment}>Approve</Text>
                    </TouchableOpacity>
                  )}
                {quote.status !== "Cancelled" && (
                  <TouchableOpacity
                    onPress={toggleModal}
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
          </>
        )}
      </ScrollView>
      <Modal
        style={{ margin: 0 }}
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        swipeDirection={["down"]}
        onSwipeComplete={toggleModal}
        propagateSwipe={true}
        customBackdrop={<Backdrop />}
      >
        <ConfirmQuoteCancellationModal
          toggleModal={toggleModal}
          CancelQuote={CancelQuote}
        />
      </Modal>
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
          callStripe={stripeCheckout}
        />
      </Modal>
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
