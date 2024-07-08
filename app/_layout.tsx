import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import {
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import {
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import {
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
  Nunito_900Black,
} from "@expo-google-fonts/nunito";

import { useColorScheme } from "@/hooks/useColorScheme";
import { Auth } from "aws-amplify";
import { configure } from "@/utils/amplifyConfiguration";
import { Provider } from "react-redux";
import { store } from "@/config/store";
import AuthProvider from "@/utils/AuthProvider";
import { StripeProvider } from "@stripe/stripe-react-native";
import { Keys } from "@/constants/Keys";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

configure();
export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
    Nunito_900Black,
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  return (
    <Provider store={store}>
      <StripeProvider
        publishableKey={
          "pk_test_51NAhk4EYLaW39pmvmk9S1HIlssiq9t2SbOIwG0gsDPxpVa3XQlJEqeG6MjBTzhGhRpSzlIy9UuB1Zd0MaFcpznRf00DklgJ3N3"
        }
      >
        <AuthProvider>
          <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
          >
            <Stack>
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

              {/* <Stack.Screen name="index" options={{ headerShown: false }} /> */}

              <Stack.Screen
                name="(auth)/signup"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="(auth)/login"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="(auth)/verifyuser"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="(auth)/forgotpassword"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="(auth)/resetpassword"
                options={{ headerShown: false }}
              />
              <Stack.Screen name="myquotes" options={{ headerShown: false }} />
              <Stack.Screen name="items" options={{ headerShown: false }} />
              <Stack.Screen
                name="quotedetails"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="editprofile"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="subscription"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="changepassword"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="managesubscription"
                options={{ headerShown: false }}
              />
              <Stack.Screen name="comments" options={{ headerShown: false }} />
              <Stack.Screen name="you" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
          </ThemeProvider>
        </AuthProvider>
      </StripeProvider>
    </Provider>
  );
}
