import { Colors } from "@/constants/Colors";
import { StatusBar } from "expo-status-bar";
import {
  Image,
  StyleSheet,
  Platform,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Menu from "@/assets/images/icons/menu.svg";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { globalstyles } from "@/styles/common";

import { Fonts } from "@/constants/Fonts";
import Banner from "@/components/Banner";
import Quotecard from "@/components/cards/Quotecard";
import Sidebar from "@/components/Sidebar";
import { useSharedValue } from "react-native-reanimated";
import Modal from "react-native-modal";
import { useEffect, useRef, useState } from "react";
import { Link } from "expo-router";
import { API, Auth } from "aws-amplify";

export default function HomeScreen() {
  const [quotes, setQuotes] = useState([]);
  const quoteref = useRef<FlatList | null>(null);
  const sidebarWidth = useSharedValue(0);
  const sidebar = 322;

  const openSidebar = () => {
    sidebarWidth.value = sidebar;
  };
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    openSidebar();
  };
  const Backdrop = () => {
    return <View style={{ flex: 1, backgroundColor: "black" }}></View>;
  };

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
      setQuotes(res.quotes);
      console.log("myresponse", res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getQuotes();
  }, []);
  const Quotecards = ({ item }: any) => <Quotecard item={item} />;
  return (
    <>
      <StatusBar style="light" />
      <SafeAreaView
        edges={["top", "left", "right"]}
        style={{ backgroundColor: Colors.primary }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* header */}
          <View
            style={[
              globalstyles.rowview,
              {
                paddingHorizontal: 25,
                justifyContent: "space-between",
              },
            ]}
          >
            <TouchableOpacity activeOpacity={0.8} onPress={() => toggleModal()}>
              <Menu />
            </TouchableOpacity>
            <View style={[globalstyles.rowview, { gap: 10 }]}>
              <View style={{ position: "relative" }}>
                <MaterialCommunityIcons name="bell" size={24} color="white" />
                <View style={styles.notification}></View>
              </View>
              <Image
                style={styles.profileimg}
                source={require("@/assets/images/avatar1.png")}
              />
            </View>
          </View>

          <View style={styles.bottomsection}>
            {/* banner */}
            <Banner />
            {/* Quote section */}
            <View
              style={[
                globalstyles.rowview,
                { justifyContent: "space-between", marginBottom: 15 },
              ]}
            >
              <Text
                style={{
                  color: "#1E1E1E",
                  fontFamily: Fonts.nun800,
                  fontSize: 14,
                  lineHeight: 16.8,
                }}
              >
                My Quotes
              </Text>
              <Link
                href={"myquotes"}
                style={{
                  fontFamily: Fonts.pop400,
                  textDecorationLine: "underline",
                  fontSize: 10,
                  color: Colors.primary,
                }}
              >
                Show All
              </Link>
            </View>
            <View>
              {quotes.map((item: any, index) => (
                <Quotecard key={item.id} item={item} />
              ))}
              {/* <FlatList
                  ref={quoteref}
                  renderItem={Quotecards}
                  data={quotes}
                  keyExtractor={(item) => item.id}
                  showsVerticalScrollIndicator={false}
                  style={{ marginBottom: 300 }}
                /> */}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      <Modal
        style={{ margin: 0 }}
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        animationIn="slideInLeft"
        animationOut="slideOutLeft"
        swipeDirection={["left"]}
        onSwipeComplete={toggleModal}
        propagateSwipe={false}
        customBackdrop={<Backdrop />}
      >
        {/* sidebar */}
        <Sidebar sidebarWidth={sidebarWidth} toggleModal={toggleModal} />
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  notification: {
    width: 10,
    height: 10,
    borderRadius: 50,
    backgroundColor: "red",
    borderColor: "#fff",
    borderWidth: 2,
    position: "absolute",
    right: 1,
  },
  profileimg: {
    width: 42,
    height: 42,
    borderRadius: 50,
    objectFit: "cover",
    borderWidth: 2,
    borderColor: "white",
  },
  bottomsection: {
    backgroundColor: "white",
    paddingHorizontal: 25,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: 87,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
  },
});
