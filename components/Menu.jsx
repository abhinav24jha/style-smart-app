import React from 'react';
import { View, Text, TouchableOpacity, Image, Pressable } from 'react-native';
import { styled } from 'nativewind';
import { icons } from '../constants';

const StyledButton = styled(TouchableOpacity);

const Menu = ({ isVisible, onClose, navigateTo }) => {
  if (!isVisible) return null; // Do not render if the menu is not visible

  return (
    <Pressable 
      className="absolute top-0 left-0 right-0 bottom-0"
      onPress={onClose} // Close menu when pressing on the background
    >
        <View className="bg-bg_color absolute top-0 right-0 w-8/12 h-full p-8 shadow-lg" onStartShouldSetResponder={() => true}>
            <Text className="font-b_bold text-[24px] mb-4 mt-12">Menu</Text>
            
            <StyledButton className="flex-row justify-between items-center mb-4" onPress={() => navigateTo('wardrobe')}>
            <Text className="text-[18px] font-b_regular ml-10">Your Wardrobe</Text>
            <Image
                source={icons.arrow_forward}
                className="w-[24px] h-[24px]"
            />
            </StyledButton>
            
            <StyledButton className="flex-row justify-between items-center mb-4" onPress={() => navigateTo('schedule')}>
            <Text className="text-[18px] font-b_regular ml-10">Schedule</Text>
            <Image
                source={icons.arrow_forward}
                className="w-[24px] h-[24px]"
            />
            </StyledButton>
            
            <StyledButton className="flex-row justify-between items-center mb-4" onPress={() => navigateTo('outfit-history')}>
            <Text className="text-[18px] font-b_regular ml-10">Outfit History</Text>
            <Image
                source={icons.arrow_forward}
                className="w-[24px] h-[24px]"
            />
            </StyledButton>
            
            <StyledButton className="flex-row justify-between items-center mb-4" onPress={() => navigateTo('profile')}>
            <Text className="text-[18px] font-b_regular ml-10">Profile</Text>
            <Image
                source={icons.arrow_forward}
                className="w-[24px] h-[24px]"
            />
            </StyledButton>
            
            {/* <StyledButton className="mt-8" onPress={onClose}>
            <Text className="text-red-500">Close Menu</Text>
            </StyledButton> */}
        </View>
    </Pressable>
  );
};

export default Menu;
