import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Fonts } from "@/constants/Fonts";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { globalstyles } from "@/styles/common";
import { Colors } from "@/constants/Colors";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import Chatbox from "@/components/Chatbox";
import { API, Auth } from "aws-amplify";

type Props = {};

const comments = (props: Props) => {
  const getQuoteComments = async () => {
    const session: any = await Auth.currentSession().catch((e) => {
      console.log(e);
    });
    const myInit = {
      headers: {
        Authorization: session.idToken.jwtToken,
      },
    };
    const last_datetime = "";
    const quote_id = "1";
    const limit = 50;
    try {
      const response = await API.get(
        "quote-comments",
        `/${quote_id}/${limit}/${last_datetime}`,
        myInit
      );
    } catch (error) {}
  };
  const chatdata = [
    {
      id: "1",
      message: "Money makes the world go round",
    },
    {
      id: "2",
      message:
        "If there was a way I could grow moneyon trees I definitely would not hesitate.",
    },
    {
      id: "3",
      message:
        "If there was a way I could grow moneyon trees I definitely would not hesitate.",
    },
    {
      id: "4",
      message:
        "If there was a way I could grow moneyon trees I definitely would not hesitate.",
    },
  ];
  const Action = () => {
    return (
      <View style={[globalstyles.rowview, styles.actioncontainer]}>
        <TextInput
          placeholder="Write your message"
          placeholderTextColor={"#797C7B80"}
          style={styles.textinput}
        />
        <View style={styles.sendcon}>
          <Text style={styles.send}>Send</Text>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView
      style={{ backgroundColor: Colors.primary, flex: 1, paddingBottom: 10 }}
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
          Comments
        </Text>
      </View>
      {/* body */}
      <View style={[styles.body, { display: "flex" }]}>
        <FlatList
          data={chatdata}
          renderItem={Chatbox}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          inverted={false}
          //   ListFooterComponent={<Action />}
        />
        {/* {chatdata.map((item, index) => (
          <Chatbox item={item} />
        ))} */}
        <Action />
      </View>
    </SafeAreaView>
  );
};

export default comments;

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#fff",
    padding: 20,
    paddingBottom: 70,
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
  textinput: {
    flex: 1,
    color: "#020202",
  },
  actioncontainer: {
    paddingVertical: 11,
    paddingHorizontal: 10,
    borderRadius: 12,
    gap: 12,
    backgroundColor: "#F3F6F6",
    marginTop: 20,
  },
  sendcon: {
    backgroundColor: Colors.primary,
    borderRadius: 41,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    minWidth: 64,
  },
  send: {
    color: "#FFFFFF",
    fontFamily: Fonts.pop600,
    fontSize: 12,
    textAlign: "center",
  },
});
