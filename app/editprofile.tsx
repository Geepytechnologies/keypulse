import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Fonts } from "@/constants/Fonts";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { globalstyles } from "@/styles/common";
import { Colors } from "@/constants/Colors";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { API, Auth } from "aws-amplify";

type Props = {};

const editprofile = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    country: "",
    email: "",
  });

  const getProfile = async () => {
    const session: any = await Auth.currentSession().catch((e) => {
      console.log(e);
    });
    const myInit = {
      headers: {
        Authorization: session.idToken.jwtToken,
      },
    };
    setLoading(true);

    try {
      const res = await API.get("profile", ``, myInit);
      const { name, phone, country, email } = res;
      const name_arr = name.split(" ");
      setUserProfile({
        first_name: name_arr[0],
        last_name: name_arr[1],
        phone,
        country,
        email,
      });
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  const [errors, setErrors] = useState<{
    first_name: string;
    last_name: string;
    phone: string;
  }>();
  const handleChange = (name: any, value: any) => {
    setUserProfile({ ...userProfile, [name]: value });
  };
  const validateForm = () => {
    let valid = true;
    const newErrors: any = {};

    if (!userProfile.first_name.trim()) {
      newErrors.first_name = "first name is required";
      valid = false;
    }
    if (!userProfile.last_name.trim()) {
      newErrors.last_name = "last name is required";
      valid = false;
    }
    if (!userProfile.phone.trim()) {
      newErrors.phone = "phone is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };
  const updateProfile = async () => {
    const session: any = await Auth.currentSession().catch((e) => {
      console.log(e);
    });
    const myInit = {
      body: {
        name: `${userProfile.first_name} ${userProfile.last_name}`,
        phone: userProfile.phone,
        country: userProfile.country,
      },
      headers: {
        Authorization: session.idToken.jwtToken,
      },
    };
    setLoading(true);
    try {
      if (validateForm()) {
        const response = await API.put("profile", ` `, myInit);
        if (response) {
          getProfile();
          Alert.alert("Successful", "Profile updated successfully");
        }
      } else {
        console.log("Form has errors. Please correct them.");
      }
    } catch (error: any) {
      console.log("error from updating profile", error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getProfile();
  }, []);
  return (
    <SafeAreaView style={{ backgroundColor: Colors.primary }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
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
            Edit Profile
          </Text>
        </View>
        {/* body */}
        <ScrollView style={[styles.body, { display: "flex" }]}>
          <View style={{ gap: 10 }}>
            <Text
              style={{
                fontFamily: Fonts.nun600,
                fontSize: 16,
                color: Colors.primary,
                marginBottom: 20,
              }}
            >
              Update your contact information
            </Text>
            {/* firstname & lastname */}
            <View style={[globalstyles.rowview, { gap: 10 }]}>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>First name</Text>
                <View style={styles.inputcon}>
                  <TextInput
                    onChangeText={(text) => handleChange("first_name", text)}
                    value={userProfile.first_name}
                    placeholder="Type here"
                  />
                </View>
                {errors && errors.first_name && (
                  <Text style={globalstyles.error}>{errors.first_name}</Text>
                )}
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>Last name</Text>
                <View style={styles.inputcon}>
                  <TextInput
                    onChangeText={(text) => handleChange("last_name", text)}
                    value={userProfile.last_name}
                    placeholder="Type here"
                  />
                </View>
                {errors && errors.last_name && (
                  <Text style={globalstyles.error}>{errors.last_name}</Text>
                )}
              </View>
            </View>

            {/* email */}
            <View style={[globalstyles.rowview, { gap: 10 }]}>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>Email</Text>
                <View style={styles.inputcon}>
                  <Text>{userProfile.email}</Text>
                </View>
              </View>
            </View>
            {/* phone */}
            <View style={[globalstyles.rowview, { gap: 10 }]}>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>Phone Number</Text>
                <View style={styles.inputcon}>
                  <TextInput
                    onChangeText={(text) => handleChange("phone", text)}
                    value={userProfile.phone}
                    placeholder="Type here"
                  />
                </View>
                {errors && errors.phone && (
                  <Text style={globalstyles.error}>{errors.phone}</Text>
                )}
              </View>
            </View>
            {/* submit */}
            <TouchableOpacity
              disabled={loading}
              activeOpacity={0.8}
              onPress={updateProfile}
              style={styles.btn}
            >
              <Text style={styles.btntext}>
                {loading ? "Processing..." : "Update"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default editprofile;

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#fff",
    padding: 20,
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
    borderRadius: 8,
    borderColor: "#E2E8F0",
    borderWidth: 1,
    backgroundColor: "#fff",
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
