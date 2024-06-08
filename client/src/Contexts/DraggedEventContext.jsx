import { createContext, useContext, useEffect, useState } from 'react';

const DraggedEventContext = createContext();

export const DraggedEventProvider = ({ children }) => {

  const [draggedEvent, setDraggedEvent] = useState(null)

  return (
    <DraggedEventContext.Provider value={{ draggedEvent, setDraggedEvent }}>
      {children}
    </DraggedEventContext.Provider>
  );
};

export const useDraggedEvent = () => useContext(DraggedEventContext);