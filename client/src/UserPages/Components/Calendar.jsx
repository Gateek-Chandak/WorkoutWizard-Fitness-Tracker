import React, { useState, useEffect } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../../styles/CalendarStyles.css'
import { useDraggedEvent } from '../../Contexts/DraggedEventContext';

const CalendarComponent = ({ DragAndDropCalendar, localizer}) => {

    const { draggedEvent, setDraggedEvent } = useDraggedEvent()

    const [events, setEvents] = useState([]); /* start, end, title, allDay */

    const moveEvent = ({ event, start, end }) => {
        const updatedEvents = events.map(existingEvent =>
        existingEvent === event ? { ...existingEvent, start, end } : existingEvent
        );
        setEvents(updatedEvents);
    };

    const onDropFromOutside = ({start, end}) => {
        if(draggedEvent === 'undroppable') {
            return
        } else if (draggedEvent) {
            setEvents(prevEvents=>[...prevEvents, {start, end, title: draggedEvent.title, allDay: true}])
        } else {
            return
        }
    }

    const eventPropGetter = (event) => {
       
        let bgColour = null
        switch(event.title) {
            case 'Chest/Triceps':
                bgColour = 'blue'
                break
            case 'Back':
                bgColour = 'red'
                break
            case 'Shoulders/Biceps':
                bgColour = 'yellow'
                break
            case 'Legs':
                bgColour = 'green'
                break
            case 'Rest':
                bgColour = 'gray'
                break
            default:
                bgColour = 'purple'
        }
        const style = {
            backgroundColor: bgColour, // Set the background color
            borderRadius: '0px', // Optional: Add border radius for rounded corners
            color: 'black', // Optional: Set text color
            border: 'none', // Optional: Remove event border
            height: '75px'
          };

          return {
            style,
          };
      };

    return (
        <div>
            <div className="m-3">
                <DragAndDropCalendar
                    localizer={localizer}
                    events={events}
                    onEventDrop={moveEvent}
                    draggableAccessor="isDraggable"
                    eventPropGetter={eventPropGetter}
                    onDropFromOutside={onDropFromOutside}
                    defaultView="month"
                    views={['month']}
                    style={{ height: 600, width: 700, margin: 5 }}
                    className="border border-black rounded-md p-2 bg-white"
                />
            </div>
        </div>
    );
};

export default CalendarComponent;