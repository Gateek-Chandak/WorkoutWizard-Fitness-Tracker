import UserHeader from "../Components/UserHeader";
import CalendarComponent from "../Components/Calendar";
import WorkoutSplitManager from "../Managers/WorkoutSplitManager";
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment';
import { DndProvider } from 'react-dnd';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(Calendar);

const UserLog = () => {

    return ( 
        <DndProvider backend={HTML5Backend}>
            <UserHeader />
            <WorkoutSplitManager />
            <CalendarComponent 
                               DragAndDropCalendar={DragAndDropCalendar} 
                               localizer={localizer}/>
        </DndProvider>
            
     );
}
 
export default UserLog;