import {
  Animated,
  Button,
  FlatList,
  KeyboardAvoidingView,
  LayoutChangeEvent,
  Platform,
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
import GenderBox from "@/components/GenderBox";
import { Helpers } from "@/utils/helpers";
import { dropdownData } from "@/utils/dropdownOptions";
import SelectableItemCard from "@/components/cards/SelectableItemCard";
import Toast from "react-native-toast-message";

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
  const [loading, setLoading] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [services, setServices] = useState<IServiceDTO[]>([]);
  const [serviceItems, setServiceItems] = useState<any>([]);
  const [serviceTerms, setServiceTerms] = useState("Choose Service");
  const [cities, setCities] = useState<any>({});
  const [states, setStates] = useState<any>({});
  const serviceNames = services.map((service) => ({
    label: service.service_name,
    value: service.service_name,
    key: service.id,
  }));
  const [servicedetails, setServicedetails] = useState<any>({
    service: {},
    items: [],
    options: [],
    fields: [],
    locations: [],
    frequencies: [],
  });
  const [additionalFields, setAdditionalFields] = useState({ date: "" });
  const [formDetails, setFormDetails] = useState({
    state: "",
    location_id: "",
    city_name: "",
    service_id: "",
    service_term: "",
    recipient_firstname: "",
    recipient_lastname: "",
    recipient_age: "",
    recipient_address1: "",
    recipient_address2: "",
    recipient_city: "",
    recipient_state: "",
    recipient_country: "IN",
    recipient_phone: "",
  });
  const [serviceterm, setServiceterm] = useState("");
  const [errors, setErrors] = useState<{
    state: string;
    location_id: string;
    city_name: string;
    service_term: string;
    recipient_firstname: string;
    recipient_lastname: string;
    recipient_age: string;
    recipient_address1: string;
    recipient_city: string;
    recipient_state: string;
    recipient_phone: string;
  }>();

  const validateForm = () => {
    let valid = true;
    const newErrors: any = {};

    if (!formDetails.state.trim()) {
      newErrors.state = "Please select state to continue";
      valid = false;
    }

    if (!formDetails.location_id.trim()) {
      newErrors.location_id = "location_id is required";
      valid = false;
    }
    if (
      formDetails.location_id.trim() == "Other" &&
      !formDetails.city_name.trim()
    ) {
      newErrors.city_name = "City Name is required";
      valid = false;
    }
    if (!formDetails.service_term.trim()) {
      newErrors.service_term = "Please select a service term";
      valid = false;
    }
    if (!formDetails.recipient_firstname.trim()) {
      newErrors.recipient_firstname = "Please enter recipient first name";
      valid = false;
    }
    if (!formDetails.recipient_lastname.trim()) {
      newErrors.recipient_lastname = "Please enter recipient last name";
      valid = false;
    }
    if (!formDetails.recipient_age.trim()) {
      newErrors.recipient_age = "Please enter recipient age";
      valid = false;
    }
    if (!formDetails.recipient_address1.trim()) {
      newErrors.recipient_address1 = "Please enter recipient Address line 1";
      valid = false;
    }
    if (!formDetails.recipient_city.trim()) {
      newErrors.recipient_city = "Please enter recipient City";
      valid = false;
    }
    if (!formDetails.recipient_state.trim()) {
      newErrors.recipient_state = "Please enter recipient State";
      valid = false;
    }
    if (!formDetails.recipient_phone.trim()) {
      newErrors.recipient_phone = "Please enter recipient Phone Number";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const Selectbox = () => {
    const handleServiceterm = (item: string) => {
      setServiceterm(item);
      setFormDetails({ ...formDetails, service_term: item });
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
  const getFieldSubmitArr = (fields: any) => {
    let fieldSubmitArr = [];
    for (let i = 0; i <= fields.length; ++i) {
      if (i === fields.length) {
        return fieldSubmitArr;
      } else {
        fieldSubmitArr.push({
          service_field_id: fields[i].id,
          value: fields[i].field_name,
        });
      }
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
      const states = response.locations.map((item: any) => item.state_name);
      const uniqueStates = new Set(states);

      const uniqueStatesArray = [...uniqueStates];
      const stateNames = uniqueStatesArray.map((item: any, index: any) => ({
        label: item,
        value: item,
        key: index,
      }));
      setStates(stateNames);
      setServicedetails({
        service: response.service,
        items: response.items,
        options: response.options,
        fields: response.fields,
        locations: response.locations,
        frequencies: response.service.service_frequency,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (name: string, value: any) => {
    if (name == "city") {
      const locationdata = servicedetails.locations.filter(
        (loc: { city: string; state_name: string }) =>
          loc.city === value && loc.state_name === formDetails.state
      );
      setFormDetails({
        ...formDetails,
        city_name: locationdata[0]?.city,
        location_id: locationdata[0]?.location_id,
      });
    } else {
      setFormDetails({ ...formDetails, [name]: value });
    }
  };

  const toggleItemSelected = (idx: any) => {
    const updatedOptions = servicedetails.options.map(
      (option: { selected: any }, index: number) =>
        index === idx ? { ...option, selected: !option.selected } : option
    );
    setServicedetails({ ...servicedetails, options: updatedOptions });
  };

  // get Cities
  useEffect(() => {
    const cities = servicedetails.locations
      .filter(
        (loc: { state_name: string }) => loc.state_name == formDetails.state
      )
      .map((item: any) => item.city);
    const uniqueCities = new Set(cities);

    const uniqueCitiesArray = [...uniqueCities];
    const cityNames = uniqueCitiesArray.map((item: any) => ({
      label: item,
      value: item,
    }));
    const updatedCityNames = [...cityNames, { label: "Other", value: "Other" }];
    setCities(updatedCityNames);
  }, [formDetails.state]);
  //validation

  // submit form
  const handleSubmit = async () => {
    const quote_items = servicedetails.options
      .filter((opt: any) => opt.selected)
      .map((opt: any) => ({
        service_id: opt.service_id,
        service_item_id: opt.id,
      }));
    const submitdata = {
      location_id:
        formDetails.location_id === "Other" ? "" : formDetails.location_id,
      city_name: formDetails.city_name,
      service_id: formDetails.service_id,
      service_term: serviceterm,
      recipient_name: `${formDetails.recipient_firstname} ${formDetails.recipient_lastname}`,
      recipient_age: formDetails.recipient_age,
      recipient_address_line_1: formDetails.recipient_address1,
      recipient_address_line_2: formDetails.recipient_address2,
      recipient_city: formDetails.recipient_city,
      recipient_state: formDetails.recipient_state,
      recipient_country: formDetails.recipient_country,
      recipient_phone_number: formDetails.recipient_phone,
      quote_items,
      quote_values: getFieldSubmitArr(servicedetails.fields),
    };
    const session: any = await Auth.currentSession().catch((e) => {
      console.log(e);
    });
    const myInit = {
      body: submitdata,
      headers: {
        Authorization: session.idToken.jwtToken,
      },
    };
    setLoading(true);
    try {
      console.log(submitdata);
      if (validateForm()) {
        const result = await API.post("quotes", "", myInit);
        if (result) {
          router.push("myquotes");
          Toast.show({
            type: "success",
            text1: "Success",
            text2: "Quote Saved",
          });
        }
      }
    } catch (error: any) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Oops!!!",
        text2: error.message || "Failed to submit quote",
      });
    } finally {
      setLoading(false);
    }
  };
  const handleAdditionalFields = (key: string, value: any) => {
    setAdditionalFields({ ...additionalFields, [key]: value });
  };
  //get service items
  useEffect(() => {
    const service = services.find((s) => s.service_name === selectedService);
    setServiceItems(service?.items);

    if (service) {
      setFormDetails({ ...formDetails, service_id: service?.id });

      getSingleService(service?.id);

      setServiceTerms(service?.service_frequency);
    }
  }, [selectedService]);

  //Get all services
  useEffect(() => {
    getServices();
  }, []);
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
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
                  </View>
                  <View
                    style={[styles.dropdownContent, { minHeight: animation }]}
                  >
                    {serviceItems &&
                      serviceItems.map(
                        (item: any, index: React.Key | null | undefined) => (
                          <View style={{ marginBottom: 10 }} key={item.id}>
                            <Itemcard
                              title={item.name}
                              content={item.description}
                            />
                          </View>
                        )
                      )}
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            {/* address */}
            {/* <View style={{ gap: 10 }}>
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
            </View> */}
            {/* state and city */}
            <View style={[globalstyles.rowview, { gap: 10 }]}>
              {/* state */}
              <View style={{ gap: 5, flex: 1 }}>
                <Text style={styles.label}>State</Text>
                <View style={[styles.inputcon]}>
                  <RNPickerSelect
                    onValueChange={(value) => handleChange("state", value)}
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
                {errors && errors.state && (
                  <Text style={globalstyles.error}>{errors.state}</Text>
                )}
              </View>
              {/* city */}
              <View style={{ gap: 5, flex: 1 }}>
                <Text style={styles.label}>City</Text>
                <View style={[styles.inputcon]}>
                  <RNPickerSelect
                    onValueChange={(value) => handleChange("city", value)}
                    items={cities}
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
                {errors && errors.location_id && (
                  <Text style={globalstyles.error}>{errors.location_id}</Text>
                )}
              </View>
            </View>
            {/* other city name */}
            {/* city */}
            {formDetails.city_name == "other" && (
              <View style={{ gap: 5, flex: 1 }}>
                <Text style={styles.label}>City Name</Text>
                <View style={[styles.inputcon]}>
                  <TextInput
                    onChangeText={(value) => handleChange("city", value)}
                    placeholder="Enter your city name here"
                  />
                </View>
                {errors && errors.city_name && (
                  <Text style={globalstyles.error}>{errors.city_name}</Text>
                )}
              </View>
            )}
            {/* more parameters */}
            {servicedetails.fields &&
              servicedetails.fields.map((item: any, index: any) => (
                <View style={{ gap: 5, flex: 1 }}>
                  <Text style={[styles.label, { textTransform: "capitalize" }]}>
                    {Helpers.namify(item.field_name)}
                  </Text>
                  {item.field_type === "text" || item.field_type === "num" ? (
                    <View style={[styles.inputcon]}>
                      <RNPickerSelect
                        onValueChange={() => {}}
                        items={states}
                        useNativeAndroidPickerStyle={false}
                        placeholder={{
                          label: "Select Condition",
                          color: "#64748B",
                        }}
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
                  ) : item.field_type === "desc" ? (
                    <View style={[styles.inputcon]}></View>
                  ) : item.field_type === "bool" ? (
                    <View style={[styles.inputcon]}></View>
                  ) : item.field_type === "dd" ? (
                    <View style={[styles.inputcon]}>
                      <RNPickerSelect
                        onValueChange={() => {}}
                        items={dropdownData[item.field_name].map(
                          (item: any) => ({
                            label: item,
                            value: item,
                          })
                        )}
                        useNativeAndroidPickerStyle={false}
                        placeholder={{
                          label: "Select Condition",
                          color: "#64748B",
                        }}
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
                  ) : item.field_type === "date" ? (
                    <View style={[styles.inputcon]}>
                      <TextInput
                        placeholder="Add Date"
                        onChangeText={(text) =>
                          handleAdditionalFields("date", text)
                        }
                      />
                    </View>
                  ) : (
                    <></>
                  )}
                </View>
              ))}
            {/* Please select the service term */}
            <View style={{ gap: 10 }}>
              <Text style={styles.coloredheader}>
                Please select the service term
              </Text>
              <View>
                <Selectbox />
              </View>
              {errors && errors.service_term && (
                <Text style={globalstyles.error}>{errors.service_term}</Text>
              )}
            </View>
            {/* optional options */}
            {servicedetails.options.length > 0 && (
              <View>
                <Text style={[styles.coloredheader, { marginBottom: 10 }]}>
                  Select optional service items
                </Text>

                {servicedetails.options.map(
                  (item: any, index: React.Key | null | undefined) => (
                    <View style={{ marginBottom: 10 }} key={index}>
                      <SelectableItemCard
                        selected={item.selected}
                        toggleSelection={() => toggleItemSelected(index)}
                        title={item.name}
                        content={item.description}
                      />
                    </View>
                  )
                )}
              </View>
            )}
            {/* firstname & lastname */}
            <View style={[globalstyles.rowview, { gap: 10 }]}>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>First name</Text>
                <View style={styles.inputcon}>
                  <TextInput
                    onChangeText={(text) =>
                      handleChange("recipient_firstname", text)
                    }
                    placeholder="Type here"
                  />
                </View>
                {errors && errors.recipient_firstname && (
                  <Text style={globalstyles.error}>
                    {errors.recipient_firstname}
                  </Text>
                )}
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>Last name</Text>
                <View style={styles.inputcon}>
                  <TextInput
                    onChangeText={(text) =>
                      handleChange("recipient_lastname", text)
                    }
                    placeholder="Type here"
                  />
                </View>
                {errors && errors.recipient_lastname && (
                  <Text style={globalstyles.error}>
                    {errors.recipient_lastname}
                  </Text>
                )}
              </View>
            </View>
            {/* age */}
            <View style={[globalstyles.rowview, { gap: 10 }]}>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>Age</Text>
                <View style={styles.inputcon}>
                  <TextInput
                    onChangeText={(text) => handleChange("recipient_age", text)}
                    placeholder="Type here"
                  />
                </View>
                {errors && errors.recipient_age && (
                  <Text style={globalstyles.error}>{errors.recipient_age}</Text>
                )}
              </View>
            </View>
            {/* address line 1 */}
            <View style={[globalstyles.rowview, { gap: 10 }]}>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>Address Line 1</Text>
                <View style={styles.inputcon}>
                  <TextInput
                    onChangeText={(text) =>
                      handleChange("recipient_address1", text)
                    }
                    placeholder="Type here"
                  />
                </View>
                {errors && errors.recipient_address1 && (
                  <Text style={globalstyles.error}>
                    {errors.recipient_address1}
                  </Text>
                )}
              </View>
            </View>
            {/* address line 2 */}
            <View style={[globalstyles.rowview, { gap: 10 }]}>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>Address Line 2</Text>
                <View style={styles.inputcon}>
                  <TextInput
                    onChangeText={(text) =>
                      handleChange("recipient_address2", text)
                    }
                    placeholder="Type here"
                  />
                </View>
              </View>
            </View>
            {/* city */}
            <View style={[globalstyles.rowview, { gap: 10 }]}>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>City</Text>
                <View style={styles.inputcon}>
                  <TextInput
                    onChangeText={(text) =>
                      handleChange("recipient_city", text)
                    }
                    placeholder="Enter Recipient city here"
                  />
                </View>
                {errors && errors.recipient_city && (
                  <Text style={globalstyles.error}>
                    {errors.recipient_city}
                  </Text>
                )}
              </View>
            </View>
            {/* state */}
            <View style={[globalstyles.rowview, { gap: 10 }]}>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>State</Text>
                <View style={styles.inputcon}>
                  <TextInput
                    onChangeText={(text) =>
                      handleChange("recipient_state", text)
                    }
                    placeholder="Enter Recipient state here"
                  />
                </View>
                {errors && errors.recipient_state && (
                  <Text style={globalstyles.error}>
                    {errors.recipient_state}
                  </Text>
                )}
              </View>
            </View>
            {/* phone */}
            <View style={[globalstyles.rowview, { gap: 10 }]}>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>Phone Number</Text>
                <View style={styles.inputcon}>
                  <TextInput
                    onChangeText={(text) =>
                      handleChange("recipient_phone", text)
                    }
                    placeholder="Type here"
                  />
                </View>
                {errors && errors.recipient_phone && (
                  <Text style={globalstyles.error}>
                    {errors.recipient_phone}
                  </Text>
                )}
              </View>
            </View>
            {/* submit */}
            <TouchableOpacity
              disabled={loading}
              onPress={handleSubmit}
              style={styles.btn}
            >
              <Text style={styles.btntext}>
                {loading ? "Processing..." : "Submit"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
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
