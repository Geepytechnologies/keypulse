import { SIGNIN, SIGNOUT } from "@/config/slices/userSlice";
import { RootState } from "@/config/store";
import { globalstyles } from "@/styles/common";
import { Auth } from "aws-amplify";
import {
  Slot,
  router,
  useNavigationContainerRef,
  useSegments,
} from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const [loading, setLoading] = useState(true);
  const [fetchedData, setFetchedData] = useState(false);
  const segments = useSegments();
  const authGroup = segments[0] === "(auth)";
  const { currentuser } = useSelector((state: RootState) => state.user);
  const [isNavigationReady, setIsNavigationReady] = useState(false);
  const dispatch = useDispatch();
  const rootNavigation = useNavigationContainerRef();

  // useEffect(() => {
  //   const unsubscribe = rootNavigation.addListener("state", (event) => {
  //     setIsNavigationReady(true);
  //   });
  //   return function cleanup() {
  //     if (unsubscribe) {
  //       unsubscribe();
  //     }
  //   };
  // }, [rootNavigation]);

  const getUser = async () => {
    try {
      const res = await Auth.currentAuthenticatedUser();
      dispatch(SIGNIN(res.attributes));
    } catch (error) {
      dispatch(SIGNOUT());
      // router.replace("(auth)/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (!loading) {
      if (!currentuser && !authGroup) {
        router.replace("(auth)/login");
      }
      if (currentuser) {
        router.replace("(tabs)");
      }
    }
  }, [currentuser, loading]);

  // if (loading) {
  //   return (
  //     <View style={[globalstyles.centerview, { flex: 1 }]}>
  //       <ActivityIndicator />
  //       <Text>Loading...</Text>
  //     </View>
  //   );
  // }
  if (loading) {
    return (
      <View style={[globalstyles.centerview, { flex: 1 }]}>
        <ActivityIndicator />
        <Text>Loading...</Text>
      </View>
    );
  }

  return <>{children}</>;
};

export default React.memo(AuthProvider);
