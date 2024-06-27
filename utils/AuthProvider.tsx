import { SIGNIN, SIGNOUT } from "@/config/slices/userSlice";
import { RootState } from "@/config/store";
import { Auth } from "aws-amplify";
import { router, useSegments } from "expo-router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const segments = useSegments();
  const authGroup = segments[0] === "(auth)";
  const { currentuser } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const getUser = async () => {
    try {
      const res = await Auth.currentAuthenticatedUser();
      dispatch(SIGNIN(res.attributes));
    } catch (error) {
      dispatch(SIGNOUT());
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (currentuser) {
      router.replace("(tabs)");
    } else {
      if (!authGroup) {
        router.replace("(auth)/login");
      }
    }
  }, [currentuser, segments]);
  return <>{children}</>;
};

export default AuthProvider;
