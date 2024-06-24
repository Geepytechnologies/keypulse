import {
  Button,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { Feather, FontAwesome6 } from "@expo/vector-icons";
import { globalstyles } from "@/styles/common";
import { Fonts } from "@/constants/Fonts";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import RNPickerSelect from "react-native-picker-select";
import Radiofill from "@/assets/images/icons/radio-fill.svg";
import RadioOutline from "@/assets/images/icons/radio-outline.svg";

type Props = {};

const quotes = (props: Props) => {
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [selectedValue, setSelectedValue] = useState(null);
  const [address, setAddress] = useState(null);
  const servicterms = [
    { id: 1, label: "One time" },
    { id: 2, label: "Daily" },
    { id: 3, label: "Weekly" },
    { id: 4, label: "Monthly" },
  ];
  const [serviceterm, setServiceterm] = useState(servicterms[0].label);

  const selectboxref = useRef<FlatList | null>(null);
  const dummyarray = [1, 2, 3, 4];
  const items = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
  ];

  const Selectbox = ({ item, index }: any) => {
    const handleServiceterm = () => {
      setServiceterm(item.label);
    };
    const checkactive = () => {
      if (item.label === serviceterm) {
        return true;
      }
      return false;
    };
    return (
      <TouchableOpacity
        onPress={handleServiceterm}
        activeOpacity={0.8}
        style={
          checkactive() ? styles.selectboxactive : styles.selectboxinactive
        }
      >
        <Text
          style={
            checkactive()
              ? styles.selectboxtextactive
              : styles.selectboxtextinactive
          }
        >
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.primary }}>
      <StatusBar style="light" />
      {/* header */}
      <View
        style={[
          globalstyles.rowview,
          {
            paddingHorizontal: 25,
            justifyContent: "space-between",
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
          }}
        >
          Get Quote
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: "#fff",
            borderRadius: 5,
            paddingHorizontal: 9,
            paddingVertical: 6,
          }}
        >
          <Text
            style={{
              fontFamily: Fonts.nun700,
              fontSize: 12,
              lineHeight: 14,
              color: Colors.primary,
            }}
          >
            All Items
          </Text>
        </TouchableOpacity>
      </View>
      {/* body */}
      <ScrollView style={styles.body}>
        <View style={{ gap: 25, marginBottom: 40 }}>
          {/* Please select a service */}
          <View style={{ gap: 10 }}>
            <Text style={styles.coloredheader}>Please select a service</Text>
            <View style={{ gap: 5 }}>
              <Text style={styles.label}>Service</Text>
              <View style={styles.inputcon}>
                <RNPickerSelect
                  onValueChange={(value) => setSelectedValue(value)}
                  items={items}
                  useNativeAndroidPickerStyle={false}
                  placeholder={{ label: "Select Service", color: "#64748B" }}
                  Icon={() => {
                    return (
                      <FontAwesome6
                        name="angle-down"
                        size={24}
                        color="#64748B"
                      />
                    );
                  }}
                />
              </View>
            </View>
          </View>
          {/* address */}
          <View style={{ gap: 10 }}>
            <Text style={styles.coloredheader}>
              Please provide the address where you need the service
            </Text>
            <View style={{ gap: 5 }}>
              <Text style={styles.label}>Select existing address</Text>
              <TouchableOpacity activeOpacity={0.7} style={styles.inputcon}>
                <View
                  style={[
                    globalstyles.rowview,
                    { justifyContent: "space-between" },
                  ]}
                >
                  <Text>123 ACD Drive Hyderabad, 15</Text>
                  <Radiofill />
                </View>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.7} style={styles.inputcon}>
                <View
                  style={[
                    globalstyles.rowview,
                    { justifyContent: "space-between" },
                  ]}
                >
                  <Text>123 ACD Drive Hyderabad, 15</Text>
                  <RadioOutline />
                </View>
              </TouchableOpacity>
            </View>
            <Text
              style={[
                styles.label,
                { color: Colors.primary, textAlign: "center" },
              ]}
            >
              +Add New Address
            </Text>
          </View>
          {/* Please select the service term */}
          <View style={{ gap: 10 }}>
            <Text style={styles.coloredheader}>
              Please select the service term
            </Text>
            <View>
              <FlatList
                ref={selectboxref}
                data={servicterms}
                renderItem={Selectbox}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </View>
          {/* firstname & lastname */}
          <View style={[globalstyles.rowview, { gap: 10 }]}>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>First name</Text>
              <View style={styles.inputcon}>
                <TextInput placeholder="Type here" />
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Last name</Text>
              <View style={styles.inputcon}>
                <TextInput placeholder="Type here" />
              </View>
            </View>
          </View>
          {/* gender */}
          <View style={[globalstyles.rowview, { gap: 10 }]}>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Gender</Text>
              <View style={styles.inputcon}>
                <TextInput placeholder="Type here" />
              </View>
            </View>
          </View>
          {/* email */}
          <View style={[globalstyles.rowview, { gap: 10 }]}>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Email</Text>
              <View style={styles.inputcon}>
                <TextInput placeholder="Type here" />
              </View>
            </View>
          </View>
          {/* phone */}
          <View style={[globalstyles.rowview, { gap: 10 }]}>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Phone Number</Text>
              <View style={styles.inputcon}>
                <TextInput placeholder="Type here" />
              </View>
            </View>
          </View>
          {/* submit */}
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btntext}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default quotes;

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#fff",
    padding: 25,
    marginTop: 22,
    height: "100%",
  },
  coloredheader: {
    fontFamily: Fonts.nun400,
    fontSize: 16,
    color: Colors.primary,
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
  selectboxinactive: {
    padding: 10,
    borderRadius: 6,
    backgroundColor: "#E2E8F0",
    minWidth: 75,
    marginRight: 8,
  },
  selectboxactive: {
    padding: 10,
    borderRadius: 6,
    backgroundColor: Colors.primary,
    minWidth: 75,
    marginRight: 8,
  },
  selectboxtextinactive: {
    color: "#000",
    fontFamily: Fonts.pop300,
    fontSize: 12,
    textAlign: "center",
  },
  selectboxtextactive: {
    color: "#fff",
    fontFamily: Fonts.pop700,
    fontSize: 12,
    textAlign: "center",
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
