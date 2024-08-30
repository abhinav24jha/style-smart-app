import { ScrollView, Text, View, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from 'react'
import { icons, images } from '../constants'
import CustomButton from "../components/CustomButton";
import { Redirect, router } from "expo-router";

const index = () => {
  return (
    <SafeAreaView className="bg-bg_color">
      <ScrollView contentContainerStyle={{ height: "100%" }}>

        <View className="flex-1 justify-center items-center">
          
          <Text className="text-[64px] font-b_bold mt-10">
            Style-Smart
          </Text>
          
          <Text className="text-[24px] font-b_regular ml-16">
            styling your day efforlessly
          </Text>

          <Image
            source={images.green_woman_onboarding}
            className="absolute left-[145px] top-[80px]"
          />

          <Image
            source={images.red_man_onboarding}
            className="absolute left-[-84px] top-[30px]"
          />

          <Image
            source={images.side_image_onboarding_screen}
            className="absolute left-[387px] top-[82px]"
          />

          <Image
            source={icons.squiggly_line}
            className="absolute left-[-3px] top-[405px]"
          />

          {/* <TouchableOpacity className="bg-red_one rounded-[30px] h-[52px] w-[220px] justify-center items-center absolute left-[173px] top-[765px]">
              <Text className="font-b_bold text-[24px] text-bg_color">
                Get Started
              </Text>
          </TouchableOpacity> */}

          <CustomButton
            title="Get Started"
            containerStyles="bg-red_one rounded-[30px] h-[52px] w-[220px] justify-center items-center absolute left-[173px] top-[765px]"
            textStyles="font-b_bold text-[24px] text-bg_color"
            handlePress={() => router.push('./home.jsx')}
          />


        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default index