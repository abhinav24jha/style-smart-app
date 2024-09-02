import { View, Text, ScrollView, TouchableOpacity, Alert, Image } from 'react-native'
import React, { useState } from 'react'
import { Calendar } from 'react-native-calendars';
import axios from 'axios';
import { icons } from '../../constants';

const Schedule = () => {

  const [selected, setSelected] = useState('');
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/events');
      setEvents(response.data.events);
      Alert.alert('Success', 'Events fetched successfully!');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to fetch events');
    }
  };


  return (
    <ScrollView 
      contentContainerStyle={{ alignItems: 'center', paddingBottom: 150 }} className="p-4 bg-bg_color flex-1">
      <View>
        <Calendar
          onDayPress={day => {
            setSelected(day.dateString);
          }}
          markedDates={{
            [selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
          }}
          style={{
            borderWidth: 1,
            borderColor: '#d1d8e0',
            height: 350,
            width: 400,
            borderRadius: 10,
            paddingTop: 18,
          }}
          theme={{
            backgroundColor: '#F7F8EF',
            calendarBackground: '#FEFFF5',
            textSectionTitleColor: '#cbcdb6',
            selectedDayBackgroundColor: '#ED3352',
            selectedDayTextColor: '#FEFFF5',
            todayTextColor: '#00aeff',
            dayTextColor: '#2d4150',
            textDisabledColor: '#cbcdb6',
          }}
          />
        </View>
        <TouchableOpacity className="w-[302px] h-[60px] bg-red_two rounded-[10px] justify-center mt-8" onPress={fetchEvents}>
          <Text className="text-bg_color text-center font-b_semibold text-[18px]">Sync with Google Calendar</Text>
        </TouchableOpacity>

        <View className="bg-[#F7F8EF] w-11/12 rounded-[10px] p-3 mt-12">

          <Text className="text-[20px] font-b_bold ml-2 mt-2">
            Today's Events
          </Text>

          {events.map((event, index) => (
            <View key={index} className="m-4 p-5 bg-red-100 rounded-[10px] shadow">
              <Text className="font-b_semibold text-[18px] mb-4 text-red-800">{event.summary}</Text>
              <View className="flex-row items-center">
                <Image
                  source={icons.clock}
                  className="h-[20px] w-[20px] mr-3"
                />
                <Text className="text-[16px] text-red-600">{`${event.start} - ${event.end}`}</Text>
              </View>
            </View>
          ))}

        </View>
        
    </ScrollView>
  )
}

export default Schedule