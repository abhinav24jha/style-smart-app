import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { styled } from 'nativewind';
import { icons } from "../../constants";
import { getWeatherData } from '../weather';
import { useWardrobe } from '../WardrobeContext'; // Ensure correct import path
import { useSchedule } from '../ScheduleContext';

// Styled button using nativewind
const StyledButton = styled(TouchableOpacity);

const Home = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recommendation, setRecommendation] = useState(null); // State to hold the outfit recommendation
  const [currentRecommendationIndex, setCurrentRecommendationIndex] = useState(0); // Track current outfit index
  const { wardrobeItems } = useWardrobe(); // Fetch wardrobe items from context
  const { scheduleLabel, isSynced } = useSchedule(); // Fetch schedule label and sync status from context


  // Function to fetch weather data
  const fetchWeather = async () => {
    try {
      const weatherData = await getWeatherData('Waterloo, CA'); // Fetch weather for specified location
      setWeather(weatherData);
      setLoading(false);
    } catch (error) {
      console.error('Error loading weather data:', error);
      setLoading(false);
    }
  };

  // Function to classify weather based on temperature
  const classifyWeather = (temperature) => {
    if (temperature < 10) return "Cold";
    if (temperature >= 10 && temperature < 18) return "Cool";
    if (temperature >= 18 && temperature < 25) return "Mild";
    if (temperature >= 25 && temperature < 30) return "Warm";
    if (temperature >= 30) return "Hot";
    return "Mild"; // Default label
  };


  // Function to fetch outfit recommendation
  const fetchRecommendation = async () => {
    // Check if wardrobe items exist before making API call
    if (wardrobeItems.tops.length === 0 || wardrobeItems.bottoms.length === 0) {
      console.warn('No wardrobe items available for recommendation.');
      return; // Exit if no wardrobe items are available
    }

    // Classify weather based on temperature
    const weatherLabel = classifyWeather(weather.temperature);  

    console.log('Weather Label:', weatherLabel); // Log weather label
    console.log('Schedule Label:', scheduleLabel); // Log schedule label

    if (!weatherLabel || !scheduleLabel) {
      console.error('Weather and schedule labels are required but not available.');
      return;
    }

    try {
      const response = await fetch('http://192.168.2.22:5002/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tops: wardrobeItems.tops,
          bottoms: wardrobeItems.bottoms,
          weather: weatherLabel,
          schedule: scheduleLabel,
        }),
      });

      if (!response.ok) {
        // Attempt to parse error message from the response body
        const errorDetails = await response.json().catch(() => ({})); // Gracefully handle parsing errors
        console.error('Failed to fetch recommendation:', response.status, response.statusText, errorDetails);
        return;
      }

      const data = await response.json();
      setRecommendation(data);
      setCurrentRecommendationIndex(0); // Reset index on new fetch
    } catch (error) {
      console.error('Error fetching recommendation:', error);
    }
  };

  // Function to fetch the next outfit recommendation
  const fetchNextRecommendation = async () => {
    try {
      const response = await fetch('http://192.168.2.22:5002/next_recommendation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          current_index: currentRecommendationIndex, // Pass the current index
        }),
      });

      if (!response.ok) {
        console.error('No more recommendations available');
        return;
      }

      const data = await response.json();
      setRecommendation(data);
      setCurrentRecommendationIndex(data.next_index); // Update to the next index
    } catch (error) {
      console.error('Error fetching next recommendation:', error);
    }
  };

  useEffect(() => {
    // Fetch initial weather data
    fetchWeather();

    // Set up polling interval to update weather data every 10 minutes (600000 milliseconds)
    const intervalId = setInterval(fetchWeather, 600000);

    // Clean up interval on component unmount 
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    // Only fetch recommendations if both weather and schedule label are set
    if (weather && isSynced && scheduleLabel) {
      fetchRecommendation();
    }
  }, [weather, wardrobeItems, isSynced, scheduleLabel]); // Watch for scheduleLabel changes as well

  if (loading) {
    return <ActivityIndicator size="large" color="#2222d7" />;
  }

  if (!weather) {
    return <Text>Error loading weather data.</Text>;
  }

  const { temperature, windSpeed, highTemp, lowTemp, weatherCondition } = weather;

  return (
    <ScrollView className="flex-1 p-4 bg-bg_color">
      {/* Weather Section */}
      <View className="bg-red_one rounded-xl p-4 mb-4 mt-2">
        <View className="flex-row justify-between items-start mb-2">
          <Text className="text-[22px] font-bold text-white">Today's Weather</Text>
          <View className="flex-row items-center space-x-2">
            <Text className="text-[22px] font-bold text-white">{temperature}°C</Text>
          </View>
        </View>

        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-bg_color text-[16px]">{weatherCondition}</Text>
        </View>
        <View className="flex-row justify-between">
          <View className="flex-row items-center">
            <Image source={icons.wind} className="" />
            <Text className="text-bg_color ml-1 text-[16px]">{windSpeed} m/s</Text>
          </View>
          <Text className="text-bg_color text-[16px]">High: {highTemp}°C</Text>
          <Text className="text-bg_color text-[16px]">Low: {lowTemp}°C</Text>
        </View>
      </View>

      {/* Outfit Recommendation Section */}
      <View className="bg-[#F7F8EF] rounded-[10px] p-4 shadow w-[386px] h-[375px]">
        <Text className="text-[22px] font-bold mb-5">Today's Outfit Recommendation</Text>
        {recommendation ? (
          <View className="flex-row justify-between mb-4">
            <View className="bg-[#6F4A4A] rounded-[10px] w-[164px] h-[190px] mt-[10px] justify-center">
              <Image
                source={{ uri: recommendation.recommended_upper_image }}
                className="w-full h-full rounded-lg"
                resizeMode="cover"
              />
            </View>
            <View className="bg-[#6F4A4A] rounded-[10px] w-[164px] h-[190px] mt-[10px] justify-center">
              <Image
                source={{ uri: recommendation.recommended_lower_image }}
                className="w-full h-full rounded-lg mt-[-60]"
                resizeMode="cover"
              />
            </View>
          </View>
        ) : (
          <View className="flex-row justify-between mb-4">
            <View className="bg-[#6F4A4A] rounded-[10px] w-[164px] h-[190px] mt-[10px] justify-center">
            </View>
            <View className="bg-[#6F4A4A] rounded-[10px] w-[164px] h-[190px] mt-[10px] justify-center">
            </View>
          </View>
        )}

        {/* <Text className="mt-[20px] font-b_regular text-[16px]">
          A cozy green sweatshirt with black trousers for a relaxed yet polished look.
        </Text> */}
        <View className="flex-row justify-between mt-[6px]">
          {/* Placeholder buttons for feedback */}
          <StyledButton className="mt-[22px]">
            <Image source={icons.thumbs_up} className="w-[33px] h-[33px]" />
          </StyledButton>
          <StyledButton className="mt-[22px]" onPress={fetchNextRecommendation}>
            <Image source={icons.again} className="w-[33px] h-[33px]" />
          </StyledButton>
          <StyledButton className="mt-[22px]">
            <Image source={icons.thumbs_down} className="w-[33px] h-[33px]" />
          </StyledButton>
        </View>
      </View>

      {/* Tip of the Day Section */}
      <View className="bg-[#F3E8D2] rounded-xl p-4 mt-6">
        <View className="flex-row items-center space-x-4">
          <Image source={icons.lightbulb} className="w-[40px] h-[40px]" />
          <View className="w-[386px] h-[65px]">
            <Text className="font-b_bold text-[18px] mt-2">Tip of the Day</Text>
            <Text className="font-b_regular text-text_color text-[14px]">Mix textures to add depth to your outfit.</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;
