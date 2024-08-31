import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Avatar } from '@rneui/themed';
import { styled } from 'nativewind';
import { images } from "../../constants"
import { icons } from "../../constants"
import { getWeatherData } from '../weather';

// Styled button using nativewind
const StyledButton = styled(TouchableOpacity);

const Home = () => {

  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const weatherData = await getWeatherData('Waterloo, CA');
        setWeather(weatherData);
        setLoading(false);
      } catch (error) {
        console.error('Error loading weather data:', error);
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!weather) {
    return <Text>Error loading weather data.</Text>;
  }

  const { temperature, windSpeed, highTemp, lowTemp, weatherCondition } = weather;

  return (
    <ScrollView className="flex-1 p-4 bg-bg_color">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-5 mt-12">
        <View className="flex-row items-center space-x-3 pl-4">
          <Avatar
            rounded
            source={images.profile_picture}
            size="medium"
          />
          <View>
            <Text className="text-text_color font-b_regular text-[13px]">Welcome back</Text>
            <Text className="text-[20px] font-b_bold mt-[-4]">Abhinav</Text>
          </View>
        </View>
        <StyledButton className="p-4">
          <Image
            source={icons.menu}
            className=""
          />
        </StyledButton>
      </View>

      {/* Weather Card */}
      <View className="bg-red_one rounded-xl p-4 mb-4">

        <View className="flex-row justify-between items-start mb-2">
          <Text className="text-[22px] font-bold text-white">
            Today's Weather
          </Text>
          <View className="flex-row items-center space-x-2">
            {/* <Image
              source={icons.sun}  // Replace with the correct weather icon
              className="w-6 h-6"
            /> */}
            <Text className="text-[22px] font-bold text-white">
              {temperature}°C
            </Text> 
          </View>
        </View>
        
        <View className="flex-row justify-between items-center mb-4">
          <View className="flex-row items-center space-x-2">
          </View>
          <Text className="text-bg_color text-[16px]">{weatherCondition}</Text>
        </View>
        <View className="flex-row justify-between">
          <View className="flex-row items-center">
            <Image
              source={icons.wind}
              className=""
            /> 
            <Text className="text-bg_color ml-1 text-[16px]">{windSpeed} m/s</Text>
          </View>
          <Text className="text-bg_color text-[16px]">
            High: {highTemp}°C
          </Text>
          <Text className="text-bg_color text-[16px]">
            Low: {lowTemp}°C
          </Text>
        </View>
      </View>

      {/* Outfit Recommendation */}
      <View className="bg-[#F7F8EF] rounded-[10px] p-4 shadow-2xl w-[386px] h-[421px]">
        <Text className="text-[22px] font-bold mb-4">Today's Outfit Recommendation</Text>
        <View className="flex-row justify-between mb-4">
          <View className="bg-[#6F4A4A] rounded-[10px] w-[164px] h-[190px] mt-[10px]">
            <Image
              source={{ uri: 'YOUR_OUTFIT_IMAGE_PLACEHOLDER' }}
              className="w-full h-28 rounded-lg"
              resizeMode="cover"
            />
          </View>
          <View className="bg-[#6F4A4A] rounded-[10px] w-[164px] h-[190px] mt-[10px]">
            <Image
              source={{ uri: 'YOUR_OUTFIT_IMAGE_PLACEHOLDER' }}
              className="w-full h-28 rounded-lg"
              resizeMode="cover"
            />
          </View>
        </View>
        <Text className="mt-[20px] font-b_regular text-[16px]">
          A cozy green sweatshirt with black trousers for a relaxed yet polished look.
        </Text>
        <View className="flex-row justify-between mt-[6px]">
          {/* Placeholder buttons for feedback */}
          <StyledButton className="mt-[22px]">
            <Image
              source={icons.thumbs_up}
              className="w-[33px] h-[33px]"
            />
          </StyledButton>
          <StyledButton className="mt-[22px]">
            <Image
              source={icons.again}
              className="w-[33px] h-[33px]"
            />
          </StyledButton>
          <StyledButton className="mt-[22px]">
            <Image
              source={icons.thumbs_down}
              className="w-[33px] h-[33px]"
            />
          </StyledButton>
        </View>
      </View>

       {/* Tip of the Day */}
      <View className="bg-[#F3E8D2] rounded-xl p-4 mt-6">
        <View className="flex-row items-center space-x-4">
          <Image
              source={icons.lightbulb}
              className="w-[33px] h-[33px]"
          />
          <View className="w-[386px] h-[50px]">
            <Text className="font-b_bold text-[18px]">Tip of the Day</Text>
            <Text className="font-b_regular text-text_color text-[14px]">Mix textures to add depth to your outfit.</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;
