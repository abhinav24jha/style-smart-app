import { Text, View } from "react-native";
import React, { useEffect } from "react";
import { SplashScreen} from "expo-router";
import { useFonts } from "expo-font";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {

  const [fontsLoaded, error] = useFonts({
    "BalooBhai2-Bold": require("../assets/fonts/BalooBhai2-Bold.ttf"),
    "BalooBhai2-ExtraBold": require("../assets/fonts/BalooBhai2-ExtraBold.ttf"),
    "BalooBhai2-Medium": require("../assets/fonts/BalooBhai2-Medium.ttf"),
    "BalooBhai2-Regular": require("../assets/fonts/BalooBhai2-Regular.ttf"),
    "BalooBhai2-SemiBold": require("../assets/fonts/BalooBhai2-SemiBold.ttf"),
  });

  useEffect( () => {
    if(error) throw error;

    if(fontsLoaded){
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error])

  if(!fontsLoaded && !error) {
    return null;
  }


  return (
    <View>
      <Text>
        RootLayout
      </Text>
    </View>
  )
}

export default RootLayout