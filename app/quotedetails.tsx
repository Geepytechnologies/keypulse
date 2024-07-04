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

type Props = {};

const quotedetails = (props: Props) => {
  const { item }: any = useLocalSearchParams();
  const quoteitems = JSON.parse(item);
  const [loading, setLoading] = useState(false);

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
            {quoteitems.status !== "Awaiting Review" && (
              <TouchableOpacity activeOpacity={0.8} style={styles.commentbtn}>
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
