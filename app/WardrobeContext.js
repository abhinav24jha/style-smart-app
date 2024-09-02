// WardrobeContext.js
import React, { createContext, useState, useContext } from 'react';

const WardrobeContext = createContext();

export const useWardrobe = () => useContext(WardrobeContext);

export const WardrobeProvider = ({ children }) => {
  const [wardrobeItems, setWardrobeItems] = useState({
    tops: [],
    bottoms: [],
    accessories: [],
  });

  const addClothes = (type, items) => {
    setWardrobeItems((prevItems) => ({
      ...prevItems,
      [type]: [...prevItems[type], ...items],
    }));
  };

  // Add this function to remove clothes
  const removeClothes = (type, index) => {
    setWardrobeItems((prevItems) => {
      const updatedItems = prevItems[type].filter((_, i) => i !== index);
      return {
        ...prevItems,
        [type]: updatedItems,
      };
    });
  };

  return (
    <WardrobeContext.Provider value={{ wardrobeItems, addClothes, removeClothes }}>
      {children}
    </WardrobeContext.Provider>
  );
};
