import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import { icons } from '../../constants'

const OutfitHistory = () => {
  return (
    <ScrollView className="w-full bg-bg_color">
      <View className="bg-[#F3E8D2] w-[386px] h-[558px] shadow rounded-[10px] ml-5 mt-8">
        <Text className="text-[22px] font-b_bold ml-7 mb-3 mt-6">OutfitHistory</Text>

        <View className="ml-16 flex-row items-center mt-4">
          <Image
            source={icons.calendar}
            className="h-[24px] w-[24px] mr-4"
          />
          <Text className="font-b_regular text-[18px]">
            2024-09-02
          </Text>
        </View>


        <Text className="text-[18px] font-b_regular ml-8 mb-3 mt-[325px] mr-7">
          Track all your outfit recommendations here as the days progress.        
        </Text>
      </View>
    </ScrollView>
  )
}

export default OutfitHistory