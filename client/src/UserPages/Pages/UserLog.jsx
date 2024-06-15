import UserHeader from "../Components/UserHeader";
import CalendarComponent from "../Components/Calendar";
import WorkoutSplitManager from "../Managers/WorkoutSplitManager";
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment';
import { DndProvider } from 'react-dnd';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import { useState } from "react";
import { useAuth } from "../../Contexts/AuthContext";
import { useEvents } from "../../Contexts/EventsContext";
import WorkoutDetails from "../Components/WorkoutDetails";

const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(Calendar);

const UserLog = () => {

    const {session, user_id} = useAuth()
    const { events, setEvents } = useEvents()

    const [addDetails, setAddDetails] = useState({isOpen: false, info: null})

    const deleteEvent = async () => {

        if(session) {
            const newEvents = events.filter(item => item.start !== addDetails.info.start)
            const response = await fetch('http://localhost:4000/api/events/updateEvents', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({userID: user_id, events: newEvents})
            })
            setEvents(newEvents)
            setAddDetails({isOpen: false, info: null})
        }
    }

    return ( 
        <div className="bg-bg h-dvh">
            <DndProvider backend={HTML5Backend}>
                <UserHeader />
                <WorkoutSplitManager />
                <div className="w-full flex flex-row justify-center">
                    <div className={`${addDetails.isOpen ? `w-3/5`  : 'w-7/12'}`}>
                        <CalendarComponent 
                            DragAndDropCalendar={DragAndDropCalendar} 
                            localizer={localizer}
                            setAddDetails={setAddDetails}/>
                    </div>
                    {addDetails.isOpen && addDetails.info && <WorkoutDetails addDetails={addDetails} setAddDetails={setAddDetails} deleteEvent={deleteEvent}/> }
                </div>
            </DndProvider>
        </div>
            
     );
}
 
export default UserLog;