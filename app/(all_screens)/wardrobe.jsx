import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons'; // For the delete icon
import { icons } from '../../constants';

const Tab = ({ label, isActive, onPress }) => (
  <TouchableOpacity
    className={`px-4 py-2 rounded h-[40px] ${isActive ? 'bg-bg_color' : 'bg-transparent'}`}
    onPress={onPress}
  >
    <Text className={`text-[14px] ${isActive ? 'font-b_bold' : 'font-b_regular'}`}>{label}</Text>
  </TouchableOpacity>
);

export default function Wardrobe() {
  const [activeTab, setActiveTab] = useState('tops');
  const [wardrobeItems, setWardrobeItems] = useState({
    tops: [],
    bottoms: [],
    accessories: [],
  });

  // State to track visible delete button
  const [visibleDeleteButtonIndex, setVisibleDeleteButtonIndex] = useState(null); 
  // State to track current page
  const [currentPage, setCurrentPage] = useState(0); 

  const itemsPerPage = 6; // Number of items per page

  const handleAddNewItem = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Permission Denied', 'Permission to access the gallery is required!');
      return;
    }

    // Launch image picker with multiple selection enabled
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true, // Enable multiple selection
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const newImageUris = result.assets.map(asset => asset.uri); // Extract URIs of selected images
      setWardrobeItems((prevItems) => ({
        ...prevItems,
        [activeTab]: [...prevItems[activeTab], ...newImageUris], // Add all selected image URIs
      }));
    }
  };

  const handleRemoveItem = (index) => {
    setWardrobeItems((prevItems) => {
      const updatedItems = prevItems[activeTab].filter((_, i) => i !== index);
      // Check if current page is still valid after removal
      if (currentPage > 0 && updatedItems.length <= currentPage * itemsPerPage) {
        setCurrentPage(currentPage - 1); // Go to previous page if current one becomes invalid
      }
      // Reset currentPage if no items remain
      if (updatedItems.length === 0) {
        setCurrentPage(0);
      }
      return {
        ...prevItems,
        [activeTab]: updatedItems,
      };
    });
    setVisibleDeleteButtonIndex(null); // Hide the delete button after removing the item
  };

  const toggleDeleteButton = (index) => {
    setVisibleDeleteButtonIndex(visibleDeleteButtonIndex === index ? null : index);
  };

  const displayedItems = wardrobeItems[activeTab].slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handleNextPage = () => {
    if ((currentPage + 1) * itemsPerPage < wardrobeItems[activeTab].length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    // Reset to the first page if the number of items in the active tab is less than or equal to items per page
    if (wardrobeItems[activeTab].length <= itemsPerPage) {
      setCurrentPage(0);
    }
  }, [activeTab, wardrobeItems]);

  return (
    <ScrollView 
      contentContainerStyle={{ alignItems: 'center', paddingBottom: 150 }} className="p-4 bg-bg_color flex-1" 
      keyboardShouldPersistTaps="handled"
      scrollEnabled={true}>
      {/* Your Wardrobe Section */}
      <View className="w-full p-5 mb-6 bg-[#F7F8EF] rounded-[10px] shadow">
        <Text className="text-[22px] font-b_bold mb-4">Your Wardrobe</Text>

        <View className="flex-row mb-4 rounded-[10px] bg-[#D9D9D9] h-[50px] items-center justify-between">

          <View className="ml-2">
            <Tab label="Tops" isActive={activeTab === 'tops'} onPress={() => setActiveTab('tops')} />
          </View>

          
          <View className="ml-2">
            <Tab label="Bottoms" isActive={activeTab === 'bottoms'} onPress={() => setActiveTab('bottoms')} />
          </View>
          

          <View className="mr-2">
            <Tab label="Accessories" isActive={activeTab === 'accessories'} onPress={() => setActiveTab('accessories')} />
          </View>
          
        </View>

        <View className="flex-row flex-wrap justify-between mb-6">
          {displayedItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              className="bg-[#8D6E63] rounded-lg mb-4 w-[48%] overflow-hidden relative"
              onPress={() => toggleDeleteButton(index)} // Toggle the visibility of the delete button
            >
              <Image
                source={{ uri: item }}
                className="w-full h-36"
                resizeMode="cover"
              />
              {/* Delete button appears only when toggled */}
              {visibleDeleteButtonIndex === index && (
                <TouchableOpacity
                  className="absolute top-1 right-1 bg-white rounded-full p-1"
                  onPress={() => handleRemoveItem(index)}
                >
                  <AntDesign name="closecircle" size={20} color="red" />
                </TouchableOpacity>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Pagination Controls */}
        <View
          className={`flex-row w-full mb-4 ${
            currentPage === 0 ? 'justify-end' : 'justify-between'
          }`}
        >
          {currentPage > 0 && (
            <TouchableOpacity className="px-4 py-2 bg-text_color rounded-[10px]" onPress={handlePreviousPage}>
              <Text className="text-bg_color font-b_regular">Previous</Text>
            </TouchableOpacity>
          )}
          {(currentPage + 1) * itemsPerPage < wardrobeItems[activeTab].length && (
            <TouchableOpacity className="px-4 py-2 bg-text_color rounded-[10px]" onPress={handleNextPage}>
              <Text className="text-bg_color font-b_regular">Next</Text>
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity className="w-full py-3 bg-red_two rounded-[10px]" onPress={handleAddNewItem}>
          <Text className="text-bg_color text-center font-b_semibold text-[16px]">+ Add new items</Text>
        </TouchableOpacity>
      </View>

      {/* Wardrobe Insights Section */}
      <View className="w-full p-4 bg-[#f8c374] rounded-[10px] shadow-2xl">
        <Text className="text-[22px] font-b_bold mb-3">Wardrobe Insights</Text>
        <View className="flex-row justify-between">

          <View className="bg-[#F3E8D2] flex-1 mr-4 rounded-[10px] w-[158px] h-[115px] mb-2">
            <View className="ml-5 mt-3">
              <Image
                source={icons.trending_up}
                className="w-[24px] h-[24px] mb-1"
              />
              <Text className="font-b_semibold text-[18px]">Most Worn</Text>
              <Text className="text-[14px] font-b_regular">Black T-shirt</Text>
              <Text className="text-[14px] font-b_regular mt-[-4px]">(15 times)</Text>
            </View>
          </View>

          <View className="bg-[#F3E8D2] flex-1 mr-2 rounded-[10px] w-[158px] h-[115px] mb-2">
            <View className="ml-5 mt-3">
              <Image
                source={icons.bar_graph}
                className="w-[24px] h-[24px] mb-1"
              />
              <Text className="font-b_semibold text-[18px]">Least Used</Text>
              <Text className="text-[14px] font-b_regular">Blue Formal Shirt</Text>
              <Text className="text-[14px] font-b_regular mt-[-4px]">(1 time)</Text>
            </View>
          </View>

        </View>

      </View>
    </ScrollView>
  );
}