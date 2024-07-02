import {
  Animated,
  Button,
  FlatList,
  LayoutChangeEvent,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
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
import { API, Auth } from "aws-amplify";
import Itemcard from "@/components/cards/Itemcard";

type Props = {};

interface IServiceDTO {
  created_on: string;
  description: string;
  id: string;
  image_name: string;
  is_location_required: boolean;
  item_prices: string[];
  items: string[];
  locations: string[];
  price_range: string[];
  sequence: number;
  service_frequency: string;
  service_name: string;
  status: string;
}

const quotes = (props: Props) => {
  //dropdown
  const [expanded, setExpanded] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  const toggleDropdown = () => {
    const finalValue = expanded ? 0 : 200;
    Animated.timing(animation, {
      toValue: finalValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setExpanded(!expanded);
  };
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [selectedService, setSelectedService] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [address, setAddress] = useState(null);
  const [services, setServices] = useState<IServiceDTO[]>([]);
  const [serviceItems, setServiceItems] = useState<any>([]);
  const [serviceTerms, setServiceTerms] = useState("Choose Service");
  const [singleServiceItem, setSingleServiceItem] = useState();
  const [states, setStates] = useState<any>({});
  const serviceNames = services.map((service) => ({
    label: service.service_name,
    value: service.service_name,
  }));

  const [serviceterm, setServiceterm] = useState("");

  const Selectbox = () => {
    const handleServiceterm = (item: string) => {
      setServiceterm(item);
    };
    const checkactive = () => {
      if (serviceTerms === serviceterm) {
        return true;
      }
      return false;
    };
    return (
      <TouchableOpacity
        onPress={() => handleServiceterm(serviceTerms)}
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
          {serviceTerms}
        </Text>
      </TouchableOpacity>
    );
  };

  const getServices = async () => {
    const session: any = await Auth.currentSession().catch((e) => {
      console.log(e);
    });
    const myInit = {
      headers: {
        Authorization: session.idToken.jwtToken,
      },
    };
    try {
      const response = await API.get("services", ``, myInit);
      setServices(response.services);
    } catch (error) {
      console.log(error);
    }
  };
  const getSingleService = async (id: string) => {
    const session: any = await Auth.currentSession().catch((e) => {
      console.log(e);
    });
    const myInit = {
      headers: {
        Authorization: session.idToken.jwtToken,
      },
    };
    try {
      const response = await API.get("services", `/${id}`, myInit);
      setSingleServiceItem(response);
      const states = response.locations.map((item: any) => item.state_name);
      const uniqueStates = new Set(states);

      const uniqueStatesArray = [...uniqueStates];
      const stateNames = uniqueStatesArray.map((item: any) => ({
        label: item,
        value: item,
      }));
      setStates(stateNames);
      console.log(stateNames);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const service = services.find((s) => s.service_name === selectedService);
    setServiceItems(service?.items);

    if (service) {
      getSingleService(service?.id);

      setServiceTerms(service?.service_frequency);
    }
  }, [selectedService]);
  useEffect(() => {
    getServices();
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
          Get Quote
        </Text>
      </View>
      {/* body */}
      <ScrollView showsVerticalScrollIndicator={false} style={styles.body}>
        <View style={{ gap: 25, marginBottom: 40 }}>
          {/* Please select a service */}
          <View style={{ gap: 10 }}>
            <Text style={styles.coloredheader}>Please select a service</Text>
            <View style={{ gap: 5 }}>
              <Text style={styles.label}>Service</Text>
              <View style={styles.inputcon}>
                <RNPickerSelect
                  onValueChange={(value) => setSelectedService(value)}
                  items={serviceNames}
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
              <TouchableOpacity activeOpacity={0.8} style={styles.inputcon}>
                <View
                  style={[
                    globalstyles.rowview,
                    { justifyContent: "space-between" },
                  ]}
                >
                  <Text
                    style={{
                      fontFamily: Fonts.pop400,
                      fontSize: 12,
                      lineHeight: 22,
                      color: "#64748B",
                    }}
                  >
                    Items
                  </Text>
                  {/* <TouchableOpacity
                    onPress={toggleDropdown}
                    activeOpacity={0.8}
                  >
                    <FontAwesome6 name="angle-down" size={24} color="#64748B" />
                  </TouchableOpacity> */}
                </View>
                <Animated.View
                  style={[styles.dropdownContent, { minHeight: animation }]}
                >
                  <ScrollView>
                    {serviceItems &&
                      serviceItems.map(
                        (item: any, index: React.Key | null | undefined) => (
                          <View style={{ marginBottom: 10 }} key={index}>
                            <Itemcard
                              title={item.name}
                              content={item.description}
                            />
                          </View>
                        )
                      )}
                  </ScrollView>
                </Animated.View>
              </TouchableOpacity>
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
          {/* state and city */}
          <View style={[globalstyles.rowview, { gap: 10 }]}>
            <View style={{ gap: 5, flex: 1 }}>
              <Text style={styles.label}>State</Text>
              <View style={[styles.inputcon]}>
                <RNPickerSelect
                  onValueChange={(value) => setSelectedService(value)}
                  items={states}
                  useNativeAndroidPickerStyle={false}
                  placeholder={{ label: "Select State", color: "#64748B" }}
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
            <View style={{ gap: 5, flex: 1 }}>
              <Text style={styles.label}>City</Text>
              <View style={[styles.inputcon]}>
                <RNPickerSelect
                  onValueChange={(value) => setSelectedService(value)}
                  items={serviceNames}
                  useNativeAndroidPickerStyle={false}
                  placeholder={{ label: "Select City", color: "#64748B" }}
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
          {/* Please select the service term */}
          <View style={{ gap: 10 }}>
            <Text style={styles.coloredheader}>
              Please select the service term
            </Text>
            <View>
              <Selectbox />
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
    maxWidth: 150,
    marginRight: 8,
  },
  selectboxactive: {
    padding: 10,
    borderRadius: 6,
    backgroundColor: Colors.primary,
    minWidth: 75,
    maxWidth: 150,
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
    marginBottom: 70,
  },
  btntext: {
    color: "#fff",
    fontFamily: Fonts.pop600,
    fontSize: 14,
    textAlign: "center",
  },
  dropdownContent: {
    // overflow: "scroll",
    // backgroundColor: "red",
    // borderWidth: 1,
    marginTop: 10,
    borderColor: "#ccc",
  },
  contentText: {
    fontSize: 14,
    color: "#333",
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
});
