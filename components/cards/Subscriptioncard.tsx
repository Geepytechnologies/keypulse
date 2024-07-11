import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Fonts } from "@/constants/Fonts";
import { Helpers } from "@/utils/helpers";
import { router } from "expo-router";
import { Colors } from "@/constants/Colors";
import { globalstyles } from "@/styles/common";
import { API, Auth } from "aws-amplify";

type Props = {
  getSubscriptions: any;
  item: {
    id: string;
    billing_date: string;
    amount: string;
    payment_link: string;
    status: string;
    customer_phone: string;
    staff_phone: string;
    recipient_phone: string;
    care_take_phones: string;
    care_taker_phones: string;
    service: {
      service_name: string;
    };
  };
};
export enum Status {
  Active = "#10AC16",
  On_Hold = "#FFBB6A",
  Cancelled = "red",
}
const statuscolor = (item: any) => {
  switch (item.status) {
    case "Active":
      return Status.Active;
    case "On Hold":
      return Status.On_Hold;
    case "Cancelled":
      return Status.Cancelled;
    default:
      return;
  }
};
const Subscriptioncard = ({ item, getSubscriptions }: Props) => {
  const [loading, setLoading] = useState(false);
  const cancelSubscription = async (subscriptionID: string) => {
    const session: any = await Auth.currentSession().catch((e) => {
      console.log(e);
    });
    const myInit = {
      body: { id: subscriptionID },
      headers: {
        Authorization: session.idToken.jwtToken,
      },
    };
    setLoading(true);
    try {
      const response = await API.put("subscriptions", ``, myInit);
      if (response) {
        Alert.alert("Success", "Subscription");
        getSubscriptions();
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={[globalstyles.rowview, styles.container, { gap: 12 }]}>
      <View
        style={[
          {
            backgroundColor: statuscolor(item),
            width: 10,
            height: "100%",
            borderRadius: 10,
          },
        ]}
      ></View>
      <View style={{ flex: 1 }}>
        <View>
          <Text style={[styles.header]}>Subscription Id</Text>
          <Text style={[styles.content]}>S-{item.id}</Text>
        </View>
        <View>
          <Text style={[styles.header]}>Service name</Text>
          <Text style={[styles.content]}>
            {item.service?.service_name || ""}
          </Text>
        </View>
        <View>
          <Text style={[styles.header]}>Billing Date</Text>
          <Text style={[styles.content]}>
            {Helpers.getFormattedSubDate(item.billing_date)}
          </Text>
        </View>
        <View>
          <Text style={[styles.header]}>Subscription Amount</Text>
          <Text style={[styles.content]}>{item.amount}</Text>
        </View>
        <View>
          <Text style={[styles.header]}>Status</Text>
          <Text style={[styles.content]}>{item.status}</Text>
        </View>
        <View>
          <Text style={[styles.header]}>Payment Link</Text>
          <Text style={[styles.content]}>{item.payment_link || ""}</Text>
        </View>
        <View>
          <Text style={[styles.header]}>Customer phone</Text>
          <Text style={[styles.content]}>{item.customer_phone || ""}</Text>
        </View>
        <View>
          <Text style={[styles.header]}>Recipient phone</Text>
          <Text style={[styles.content]}>{item.recipient_phone || ""}</Text>
        </View>
        <View>
          <Text style={[styles.header]}>Staff phone</Text>
          <Text style={[styles.content]}>{item.staff_phone || ""}</Text>
        </View>
        {item?.care_take_phones &&
        item.care_take_phones.split(":").length > 0 ? (
          item.care_taker_phones.split(":").map((phone: string) => (
            <View>
              <Text style={[styles.header]}>Care Taker</Text>
              <Text style={[styles.content]}>{phone}</Text>
            </View>
          ))
        ) : (
          <></>
        )}
        {/* buttons */}
        <View style={[globalstyles.rowview, { gap: 10 }]}>
          {item.status !== "Cancelled" && (
            <TouchableOpacity
              disabled={loading}
              style={{
                backgroundColor: Colors.primary,
                borderRadius: 16,
                padding: 16,
                flex: 1,
              }}
              onPress={() => cancelSubscription(item.id)}
              activeOpacity={0.8}
            >
              <Text style={styles.actiontext}>
                {loading ? "Processing..." : "Cancel"}
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={{
              backgroundColor: "black",
              borderRadius: 16,
              padding: 16,
              flex: 1,
            }}
            onPress={() =>
              router.push({
                pathname: "subscriptioncomments",
                params: { id: item.id },
              })
            }
            activeOpacity={0.8}
          >
            <Text style={styles.actiontext}>Comments</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Subscriptioncard;

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
    gap: 5,
    padding: 15,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    borderColor: "#E2E8F0",
    elevation: 5,
  },

  header: {
    fontSize: 16,
    fontFamily: Fonts.pop500,
  },
  content: {
    fontSize: 14,
    fontFamily: Fonts.pop400,
    color: "black",
    opacity: 0.7,
  },
  actiontext: {
    color: "white",
    fontFamily: Fonts.pop600,
    lineHeight: 20,
    textAlign: "center",
  },
});
