import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { Fonts } from "@/constants/Fonts";
import { globalstyles } from "@/styles/common";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { API, Auth } from "aws-amplify";
import Quotecard from "@/components/cards/Quotecard";

type Props = {};

const myquotes = (props: Props) => {
  const [quotes, setQuotes] = useState([]);

  const getQuotes = async () => {
    const session: any = await Auth.currentSession().catch((e) => {
      console.log(e);
    });
    const myInit = {
      headers: {
        Authorization: session.idToken.jwtToken,
      },
    };
    try {
      const res = await API.get("quotes", "", myInit);
      const filteredquotes = res.quotes.filter(
        (q: any) => q.status !== "Approved"
      );
      setQuotes(filteredquotes);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getQuotes();
  }, []);
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
          My Quotes
        </Text>
      </View>
      {/* body */}
      <ScrollView showsVerticalScrollIndicator={false} style={[styles.body]}>
        <View style={{ paddingBottom: 100 }}>
          {!quotes.length && (
            <View style={[globalstyles.centerview, { flex: 1 }]}>
              <Text
                style={{
                  fontFamily: Fonts.pop400,
                  lineHeight: 22,
                  fontSize: 18,
                }}
              >
                No Quotes
              </Text>
            </View>
          )}
          {quotes.map((item: any, index) => (
            <Quotecard key={item.id} item={item} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default myquotes;

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#fff",
    padding: 25,
    marginTop: 22,
    height: "100%",
  },
});
