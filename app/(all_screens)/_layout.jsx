import { View, Text, Image} from 'react-native'
import React from 'react'
import { Tabs, Redirect } from 'expo-router'
import { icons } from "../../constants";

const TabIcon = ({ icon, color, focused }) => {
  return (
    // <View className="flex-1 items-center justify-center pt-6">
    //   <Image
    //     source={icon}
    //     resizeMode="contain"
    //     tintColor={color}
    //     className="w-[24px] h-[24px] pb-10"
    //   />
    // </View>

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

const AllScreens = () => {

  return (
    <>
      <Tabs
         screenOptions={{
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
    </>
  )
}

export default AllScreens