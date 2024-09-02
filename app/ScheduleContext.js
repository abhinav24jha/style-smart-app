import React, { createContext, useContext, useState } from 'react';

const ScheduleContext = createContext();

export const ScheduleProvider = ({ children }) => {
  const [scheduleLabel, setScheduleLabel] = useState(null); // Initialize with null
  const [isSynced, setIsSynced] = useState(false); // Track whether events have been synced

  return (
    <ScheduleContext.Provider value={{ scheduleLabel, setScheduleLabel, isSynced, setIsSynced }}>
      {children}
    </ScheduleContext.Provider>
  );
};

export const useSchedule = () => useContext(ScheduleContext);
