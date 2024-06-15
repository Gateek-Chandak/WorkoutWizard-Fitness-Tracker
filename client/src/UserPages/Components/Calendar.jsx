import React, { useState, useEffect } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../../styles/CalendarStyles.css'
import { useDraggedEvent } from '../../Contexts/DraggedEventContext';
import { useEvents } from '../../Contexts/EventsContext';
import { useAuth } from '../../Contexts/AuthContext';

const CalendarComponent = ({ DragAndDropCalendar, localizer, setAddDetails}) => {

    const { session, user_id } = useAuth()
    const { events, setEvents } = useEvents()
    const { draggedEvent, setDraggedEvent } = useDraggedEvent()
 /* start, end, title, allDay */


    const moveEvent = ({ event, start, end }) => {
        const updatedEvents = events.map(existingEvent =>
        existingEvent === event ? { ...existingEvent, start, end } : existingEvent
        );
        setEvents(updatedEvents);
    };

    const onDropFromOutside = async ({start, end}) => {
        if(draggedEvent === 'undroppable') {
            return
        } else if (draggedEvent) {
            const newEvents = [...events, {start, end, title: draggedEvent.name, colour: draggedEvent.colour, allDay: true}]
            const response = await fetch('http://localhost:4000/api/events/updateEvents', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({userID: user_id, events: newEvents})
            })
            setEvents(newEvents)
        } else {
            return
        }
    }


    const onSelectEvent = async (event) => {
        console.log(event)
        setAddDetails({isOpen: true, info: event})
        // if(session) {
        //     const newEvents = events.filter(item => item.start !== event.start)
        //     const response = await fetch('http://localhost:4000/api/events/updateEvents', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify({userID: user_id, events: newEvents})
        //     })
        //     setEvents(newEvents)
        // }
    }

    const eventPropGetter = (event) => {
        const style = {
            backgroundColor: event.colour, // Set the background color
            borderRadius: '0px', // Optional: Add border radius for rounded corners
            color: 'black', // Optional: Set text color
            border: 'none', // Optional: Remove event border
            height: '75px'
          }

          return {
            style,
          };
    };
    return (
            <div className="bg-bg px-6 flex justify-center my-5">
                {events && <DragAndDropCalendar
                    localizer={localizer}
                    events={events}
                    onEventDrop={moveEvent}
                    draggableAccessor="isDraggable"
                    eventPropGetter={eventPropGetter}
                    onDropFromOutside={onDropFromOutside}
                    onSelectEvent={onSelectEvent} //Fires selecting existing event
                    onMouseOverEvent={onSelectEvent}
                    onMouseOutEvent={onSelectEvent}
                    defaultView="month"
                    views={['month']}
                    style={{ height: 560, width: '100%' }}
                    className="border border-black rounded-xl bg-gray-200"
                />}
            </div>
    );
};

export default CalendarComponent;