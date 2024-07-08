import {
  Alert,
  Animated,
  Image,
  PanResponder,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useRef } from "react";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { globalstyles } from "@/styles/common";

type Props = {};
interface Chat {
  item: {
    id: string;
    message: string;
    direction: boolean;
    date: string;
  };
}

const Chatbox = ({ item }: Chat) => {
  let ismyMessage;
  const isMyMessage = () => {
    return item.direction == false;
  };
  ismyMessage = isMyMessage();
  const date = new Date(item.date);

  const localTime = date.toLocaleTimeString([], { hour12: true });
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.extractOffset();
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (e, gestureState) => {
        if (gestureState.dx > 100) {
          Alert.alert("Action Triggered", "You swiped right!");
          // Call your desired function here
          // myFunction();
        }
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      },
    })
  ).current;

  return (
    <>
      {/* notmymessage */}
      {!ismyMessage && (
        <View style={[globalstyles.rowview, { marginTop: 25 }]}>
          <View
            style={[
              globalstyles.rowview,
              {
                justifyContent: "space-between",
                gap: 12,
                paddingVertical: 5,
              },
            ]}
          >
            <Image
              source={require("@/assets/images/avatar.png")}
              style={styles.profile}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.time}>16:45</Text>

              <Text style={[styles.chatcon]}>{item.message}</Text>
            </View>
          </View>
        </View>
      )}
      {/* ismymessage */}
      {ismyMessage && (
        <View style={[{ marginTop: 25 }]}>
          <View
            style={[
              globalstyles.rowview,
              {
                justifyContent: "space-between",
                paddingVertical: 5,
                gap: 12,
              },
            ]}
          >
            <View style={{ flex: 1 }}>
              <Text style={styles.timeforme}>{localTime}</Text>

              <Text style={styles.chatconforme}>{item.message}</Text>
            </View>
            <Image
              source={require("@/assets/images/avatar.png")}
              style={styles.profile}
            />
          </View>
          <Animated.View
            style={{
              transform: [{ translateX: pan.x }],
            }}
            {...panResponder.panHandlers}
          >
            <Text style={{ color: "red" }}>Slide me to the right!</Text>
          </Animated.View>
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
    padding: 12,
    color: "#55626B",
    fontFamily: Fonts.pop400,
    fontSize: 12,
    lineHeight: 12,
    letterSpacing: 0.12,
  },
  chatconforme: {
    backgroundColor: Colors.primary,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    padding: 12,
    color: "#fff",
    fontFamily: Fonts.pop400,
    fontSize: 12,
    lineHeight: 12,
    letterSpacing: 0.12,
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
    backgroundColor: "red",
  },
  timeforme: {
    fontFamily: Fonts.pop400,
    color: "#797C7B80",
    fontSize: 10,
    lineHeight: 14,
    textAlign: "right",
  },
  time: {
    fontFamily: Fonts.pop400,
    color: "#797C7B80",
    fontSize: 10,
    lineHeight: 14,
  },
  profile: {
    width: 36,
    height: 36,
    borderRadius: 50,
  },
});
