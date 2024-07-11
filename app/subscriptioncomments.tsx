import {
  ActivityIndicator,
  Alert,
  Animated,
  FlatList,
  Image,
  KeyboardAvoidingView,
  PanResponder,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Fonts } from "@/constants/Fonts";
import { Entypo, Feather } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { globalstyles } from "@/styles/common";
import { Colors } from "@/constants/Colors";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { API, Auth } from "aws-amplify";
import { Helpers } from "@/utils/helpers";

type Props = {};
interface Chat {
  item: {
    id: string;
    message: string;
    direction: boolean;
    date: string;
    reply_id: string;
    reply_message: { message: string };
  };
}
const subscriptioncomments = (props: Props) => {
  const { id }: any = useLocalSearchParams();
  const [comments, setComments] = useState<any>([]);
  const [messageText, setMessageText] = useState("");
  const flatListRef = useRef<FlatList | null>(null);
  const [page, setPage] = useState(1);
  const [lastFetchedDate, setLastFetchedDate] = useState("0");
  const [replyID, setReplyID] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [requestloading, setRequestLoading] = useState(false);
  const holdTimeout = useRef<NodeJS.Timeout | null>(null);
  const [itemReply, setItemReply] = useState(false);
  const [replyMessage, setReplyMessage] = useState({
    status: false,
    message: "",
  });

  const handleHold = () => {
    setItemReply(true);
    // Call your desired function here
  };
  const handleStartReply = (item: { message: string; id: string }) => {
    setReplyMessage({ status: true, message: item.message });
    setReplyID(item.id);
  };
  const handleEndReply = () => {
    setReplyMessage({ status: false, message: "" });
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        holdTimeout.current = setTimeout(handleHold, 500);
      },
      onPanResponderRelease: () => {
        if (holdTimeout.current) {
          clearTimeout(holdTimeout.current);
        }
      },
      onPanResponderTerminate: () => {
        if (holdTimeout.current) {
          clearTimeout(holdTimeout.current);
        }
      },
    })
  ).current;

  //@ts-ignore
  // console.log(comments);
  const Chatbox = ({ item }: Chat) => {
    let ismyMessage;
    const isMyMessage = () => {
      return item.direction == false;
    };
    ismyMessage = isMyMessage();
    const date = new Date(item?.date);

    const localTime = date.toLocaleTimeString([], { hour12: true });

    return (
      <>
        {/* notmymessage */}
        {!ismyMessage && (
          <View style={[{ marginTop: 25 }]}>
            <TouchableOpacity
              onPress={() => handleStartReply(item)}
              activeOpacity={0.8}
              style={[
                globalstyles.rowview,
                {
                  gap: 12,
                  paddingVertical: 5,
                },
              ]}
            >
              <Image
                source={require("@/assets/images/avatar.png")}
                style={styles.profile}
              />
              <View style={{ maxWidth: "80%" }}>
                <Text style={styles.time}>{localTime}</Text>

                <Text style={[styles.chatcon]}>{item.message}</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
        {/* ismymessage */}
        {ismyMessage && (
          <View style={{ marginTop: 25 }}>
            <Text style={{ textAlign: "center", color: "gray", fontSize: 14 }}>
              {Helpers.formatDate(item.date)}
            </Text>
            <View
              style={[
                globalstyles.rowview,
                {
                  paddingVertical: 5,
                  gap: 12,
                },
              ]}
            >
              <View style={{ maxWidth: "80%" }}>
                <Text style={styles.timeforme}>{localTime}</Text>
                <View style={[styles.chatconforme]}>
                  {item.reply_id !== "0" && item.reply_id !== null && (
                    <View style={[styles.replymessagecon]}>
                      <Text style={[styles.replymessage]}>
                        {item.reply_message?.message}
                      </Text>
                    </View>
                  )}
                  <Text style={[styles.chatconforme]}>{item.message}</Text>
                </View>
              </View>
              <Image
                source={require("@/assets/images/avatar.png")}
                style={styles.profile}
              />
            </View>
          </View>
        )}
      </>
    );
  };
  // console.log(comments);
  const getSubscriptionComments = async () => {
    const session: any = await Auth.currentSession().catch((e) => {
      console.log(e);
    });
    const myInit = {
      headers: {
        Authorization: session.idToken.jwtToken,
      },
    };
    const last_datetime = lastFetchedDate;
    const limit = 20;
    try {
      const response = await API.get(
        "subscription-comments",
        `/${id}/${limit}/${last_datetime}`,
        myInit
      );
      const invertedcomments = response?.subscription_comments.reverse();
      setComments(invertedcomments);
      // setLastFetchedDate(invertedcomments[invertedcomments.length - 1]?.date);
    } catch (error) {
      console.log(error);
    }
  };

  const handleContentSizeChange = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: false });
    }
  };
  const handleMessageChange = (text: string) => {
    setMessageText(text);
  };
  const validateMessage = (text: string) => {
    if (text.trim() !== "") {
      return true;
    } else {
      return false;
    }
  };
  const sendComment = async () => {
    const session: any = await Auth.currentSession().catch((e) => {
      console.log(e);
    });
    const submitdata = {
      subscription_id: id,
      reply_id: replyID,
      message: messageText,
    };
    const myInit = {
      body: submitdata,
      headers: {
        Authorization: session.idToken.jwtToken,
      },
    };
    setRequestLoading(true);
    try {
      if (validateMessage(messageText)) {
        const result = await API.post("subscription-comments", ``, myInit);
        console.log(result);
        if (result) {
          setMessageText("");
          getSubscriptionComments();
        }
      }
    } catch (error) {
      console.log("error from sending message: " + error);
    } finally {
      setReplyMessage({ status: false, message: "" });
      setRequestLoading(false);
    }
  };
  useEffect(() => {
    getSubscriptionComments();
  }, []);
  const handleEndReached = () => {
    // if (loading) return;
  };
  useEffect(() => {
    getSubscriptionComments();
  }, [page]);
  const [isTop, setIsTop] = useState(true);
  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;

    if (offsetY <= 0 && !isTop) {
      setIsTop(true);
      if (comments.length >= 20) {
        setLastFetchedDate(comments[comments.length - 1].date);
        setPage(page + 1);
      }
    } else if (offsetY > 0 && isTop) {
      setIsTop(false);
    }
  };
  return (
    <SafeAreaView
      style={{ backgroundColor: Colors.primary, flex: 1, paddingBottom: 10 }}
    >
      <StatusBar style="light" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
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
            Subscription Comments
          </Text>
        </View>
        {/* body */}
        <View style={[styles.body, { display: "flex" }]}>
          {comments && comments.length > 0 ? (
            <FlatList
              ref={flatListRef}
              data={comments}
              renderItem={Chatbox}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              inverted={false}
              onScroll={handleScroll}
              onContentSizeChange={handleContentSizeChange}
              onEndReached={handleEndReached}
              onEndReachedThreshold={0.5}
              ListFooterComponent={
                loading ? <ActivityIndicator size="large" /> : null
              }
            />
          ) : (
            <View style={[globalstyles.centerview, { height: "100%" }]}>
              <Text style={{ textAlign: "center" }}>
                No Comment history. You can start a discussion
              </Text>
            </View>
          )}
          {replyMessage.status && (
            <View style={{ marginBottom: 10 }}>
              <Text style={[styles.chatcon]}>{replyMessage.message}</Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleEndReply}
                style={{ alignSelf: "flex-end" }}
              >
                <Entypo name="reply" size={12} color="black" />
                <Text style={{ fontFamily: Fonts.pop400, fontSize: 14 }}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={[globalstyles.rowview, styles.actioncontainer]}>
            <TextInput
              value={messageText}
              onChangeText={(text) => handleMessageChange(text)}
              placeholder="Write your message"
              placeholderTextColor={"#797C7B80"}
              style={styles.textinput}
            />
            <TouchableOpacity
              disabled={requestloading}
              activeOpacity={0.8}
              onPress={sendComment}
              style={styles.sendcon}
            >
              <Text style={styles.send}>
                {requestloading ? "Sending..." : "Send"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default subscriptioncomments;

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
    marginTop: "auto",
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
    // maxWidth: "80%",
  },
  replymessagecon: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 12,
  },
  replymessage: {
    color: "#55626B",
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
