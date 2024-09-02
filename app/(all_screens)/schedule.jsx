import { View, Text, ScrollView, TouchableOpacity, Alert, Image } from 'react-native'
import React, { useState } from 'react'
import { Calendar } from 'react-native-calendars';
import axios from 'axios';
import { icons } from '../../constants';
import { useSchedule } from '../ScheduleContext'; // Import the context

const Schedule = () => {

  const [selected, setSelected] = useState('');
  const [events, setEvents] = useState([]);
  const { setScheduleLabel, setIsSynced } = useSchedule();

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/events');
      setEvents(response.data.events);
      Alert.alert('Success', 'Events fetched successfully!');

      // Classify schedule after fetching events
      classifySchedule(response.data.events);
      
      // Set sync status to true
      setIsSynced(true);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to fetch events');
    }
  };

  const classifySchedule = async (events) => {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer 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`, // Use your OpenAI API key
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: "Classify the following schedule into one of these labels: Formal, Casual, Sporty, Outdoor, Relaxed. You need to tell me a single label, from the labels I've provided according to the events in the schedule provided."
            },
            {
              role: "user",
              content: `Here are the events: ${events.map(event => `${event.summary} from ${event.start} to ${event.end}`).join(", ")}`
            }
          ],
          temperature: 0.5,
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('OpenAI API responded with error:', errorData);
        return;
      }

      const data = await response.json();
      console.log('OpenAI API response:', data); // Debugging line

      // Additional check to ensure data is not undefined
      if (!data || !data.choices || !data.choices.length) {
        console.error('Invalid response from OpenAI API', data);
        return;
      }

      const classification = data.choices[0]?.message?.content?.trim();
      console.log('Classification:', classification);
      
      if (!classification) {
        console.error('Classification result is undefined');
        return;
      }

      setScheduleLabel(classification); // Update the global schedule label state
    } catch (error) {
      console.error('Error classifying schedule:', error);
    }
  }



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