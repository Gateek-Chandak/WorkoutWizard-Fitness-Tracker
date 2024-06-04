import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import DraggableComponent from './DraggableComponent';
import '../../styles/CalendarStyles.css'

const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(Calendar);

const CalendarComponent = () => {
    const [events, setEvents] = useState([]); /* start, end, title, allDay */

    const moveEvent = ({ event, start, end }) => {
        const updatedEvents = events.map(existingEvent =>
        existingEvent === event ? { ...existingEvent, start, end } : existingEvent
        );
        setEvents(updatedEvents);
    };

    const [draggedEvent, setDraggedEvent] = useState(null)

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
        <DndProvider backend={HTML5Backend}>
            <div className='m-4 flex flex-row gap-5'>
                <DraggableComponent name="Chest/Triceps" draggable onDragStart={() => setDraggedEvent({title: 'Chest/Triceps'})}/>
                <DraggableComponent name="Back" draggable onDragStart={() => setDraggedEvent({title: 'Back'})}/>
                <DraggableComponent name="Shoulders/Biceps" draggable onDragStart={() => setDraggedEvent({title: 'Shoulders/Biceps'})}/>
                <DraggableComponent name="Legs" draggable onDragStart={() => setDraggedEvent({title: 'Legs'})}/>
                <DraggableComponent name="Rest" draggable onDragStart={() => setDraggedEvent({title: 'Rest'})}/>
            </div>
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
        </DndProvider>
    );
};

export default CalendarComponent;