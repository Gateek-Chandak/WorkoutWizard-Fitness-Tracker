import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import DraggableComponent from './DraggableComponent';

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
            case 'gateek':
                bgColour = 'blue'
                break
            case 'afnan':
                bgColour = 'red'
                break
            default:
                bgColour = 'green'
        }
        const style = {
            backgroundColor: bgColour, // Set the background color
            borderRadius: '1px', // Optional: Add border radius for rounded corners
            color: 'black', // Optional: Set text color
            border: 'none', // Optional: Remove event border
            height: '68px'
          };

          return {
            style,
          };
      };

    return (
        <DndProvider backend={HTML5Backend}>
        <div className="m-4">
            <DraggableComponent name="gateek" draggable onDragStart={() => setDraggedEvent({title: 'gateek'})}/>
            <DraggableComponent name="afnan" draggable onDragStart={() => setDraggedEvent({title: 'afnan'})}/>
            <DragAndDropCalendar
            localizer={localizer}
            events={events}
            onEventDrop={moveEvent}
            draggableAccessor="isDraggable"
            eventPropGetter={eventPropGetter}
            onDropFromOutside={onDropFromOutside}
            defaultView="month"
            views={['month']}
            style={{ height: 550, width: 800 }}
            className="border rounded-md p-2 text-highlights bg-white"
            />
        </div>
        </DndProvider>
    );
};

export default CalendarComponent;