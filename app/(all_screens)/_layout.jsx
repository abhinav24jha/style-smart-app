import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Tabs, Redirect, router } from 'expo-router'
import { images } from "../../constants"
import { styled } from 'nativewind';
import { icons } from "../../constants";
import Menu from '../../components/Menu';

const TabIcon = ({ icon, color, focused }) => {
  return (

  <View
  className={`flex justify-center items-center rounded-full pt-12 `}
  >
    <View
      className={`rounded-full w-10 h-10 items-center justify-center ${focused ? "bg-red_two" : ""}`}
    >
      <Image
        source={icon}
        tintColor={color}
        resizeMode="contain"
        className="w-[24px] h-[24px] pb-10"
      />
    </View>
  </View>
  );
};

const StyledButton = styled(TouchableOpacity);

const AllScreens = () => {

  const [showMenu, setShowMenu] = useState(false)

  // Function to handle navigation from the menu
  const navigateTo = (screen) => {
    setShowMenu(false)
    router.push(`/${screen}`)
  };


  return (
    <>
      <View className='bg-bg_color'>
        <View className="flex-row justify-between items-center mb-5 mt-16">
            
            <View className="flex-row items-center space-x-3 pl-4">
              <Image
                source={images.profile_picture}
              />
              <View>
                <Text className="text-text_color font-b_regular text-[13px]">Welcome back</Text>
                <Text className="text-[20px] font-b_bold mt-[-4]">Abhinav</Text>
              </View>
            </View>
            <StyledButton className="p-4" onPress={() => setShowMenu(!showMenu)}>
              <Image
                source={icons.menu}
                className=""
              />
            </StyledButton>
          </View>
      </View>

      <Tabs
         screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#fefff5",
          tabBarInactiveTintColor: "#fefff5",
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#100F0F",
            borderRadius: 40,
            paddingBottom: 50, // ios only
            overflow: "hidden",
            marginHorizontal: 46,
            marginBottom: 35,
            height: 65,
            width: 337,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            position: "absolute",
          },
        }}
      >
        <Tabs.Screen 
          name='home'
          options={{
            title: "HomePage",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                color={color}
                name="Home"
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen 
          name='wardrobe'
          options={{
            title: "Wardrobe",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.clothes}
                color={color}
                name="Wardrobe"
                focused={focused}
              />
            ),
          }}
        /> 

        <Tabs.Screen 
          name='schedule'
          options={{
            title: "ScheduleIntegration",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.calendar}
                color={color}
                name="Calendar"
                focused={focused}
              />
            ),
          }}
        /> 

        <Tabs.Screen 
          name='outfit-history'
          options={{
            title: "OutfitHistory",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.history}
                color={color}
                name="Wardrobe"
                focused={focused}
              />
            ),
          }}
        />


      </Tabs>

      <Menu isVisible={showMenu} onClose={() => setShowMenu(!showMenu)} navigateTo={navigateTo} />
    </>
  )
}

export default AllScreens