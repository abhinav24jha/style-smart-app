import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import { icons } from '../../constants'

const OutfitHistory = () => {
  return (
    <ScrollView className="w-full bg-bg_color">
      <View className="bg-[#F7F8EF] w-[386px] h-[558px] shadow rounded-[10px] ml-6 mt-4">
        <Text className="text-[22px] font-b_bold ml-7 mb-3 mt-6">OutfitHistory</Text>

        <View className="ml-14 flex-row items-center mt-2">
          <Image
            source={icons.calendar}
            className="h-[24px] w-[24px] mr-2"
          />
          <Text className="font-b_regular text-[18px]">
            2024-09-02
          </Text>
        </View>

        <View className="ml-14 flex-row items-center mt-5">
          <Image
            source={icons.calendar}
            className="h-[24px] w-[24px] mr-2"
          />
          <Text className="font-b_regular text-[18px]">
            2024-09-01
          </Text>
        </View>


        <Text className="text-[18px] font-b_regular ml-7 mb-3 mt-[325px]">
          As the days progress, you can see all your outfits here 
        </Text>
      </View>
    </ScrollView>
  )
}

export default OutfitHistory