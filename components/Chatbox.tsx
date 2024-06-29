import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { globalstyles } from "@/styles/common";

type Props = {};
interface Chat {
  item: {
    id: string;
    message: string;
  };
}

const Chatbox = ({ item }: Chat) => {
  let ismyMessage;
  const isMyMessage = () => {
    return item.id == "2";
  };
  ismyMessage = isMyMessage();
  return (
    <>
      {/* notmymessage */}
      {!ismyMessage && (
        <View
          style={[
            globalstyles.rowview,
            { alignSelf: "flex-start" },
            { marginTop: 25, gap: 12 },
          ]}
        >
          <Image
            source={require("@/assets/images/avatar.png")}
            style={styles.profile}
          />
          <View>
            <Text style={styles.time}>16:45</Text>

            <View style={[styles.chatcon, { gap: 8 }]}>
              <Text style={styles.chat}>{item.message}</Text>
            </View>
          </View>
        </View>
      )}
      {/* ismymessage */}
      {ismyMessage && (
        <View
          style={[
            globalstyles.rowview,
            { alignSelf: "flex-end" },
            { marginTop: 25, gap: 12 },
          ]}
        >
          <View>
            <Text style={styles.timeforme}>16:45</Text>

            <View style={[styles.chatconforme, { gap: 8 }]}>
              <Text style={styles.chatforme}>{item.message}</Text>
            </View>
          </View>
          <Image
            source={require("@/assets/images/avatar.png")}
            style={styles.profile}
          />
        </View>
      )}
    </>
  );
};

export default Chatbox;

const styles = StyleSheet.create({
  chatcon: {
    backgroundColor: "#DDDDDD",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    borderTopRightRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  chatconforme: {
    backgroundColor: Colors.primary,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  chat: {
    color: "#55626B",
    fontFamily: Fonts.pop400,
    fontSize: 12,
    lineHeight: 12,
    letterSpacing: 0.12,
  },
  chatforme: {
    color: "#fff",
    fontFamily: Fonts.pop400,
    fontSize: 12,
    lineHeight: 12,
    letterSpacing: 0.12,
  },
  timeforme: {
    fontFamily: Fonts.pop400,
    color: "#797C7B80",
    fontSize: 10,
    lineHeight: 10,
    textAlign: "right",
  },
  time: {
    fontFamily: Fonts.pop400,
    color: "#797C7B80",
    fontSize: 10,
    lineHeight: 10,
  },
  profile: {
    width: 36,
    height: 36,
    borderRadius: 50,
  },
});
