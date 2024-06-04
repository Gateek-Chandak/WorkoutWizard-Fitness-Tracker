import UserHeader from "../Components/UserHeader";
import CalendarComponent from "../Components/Calendar";
import WorkoutSplitManager from "../Managers/WorkoutSplitManager";

const UserLog = () => {

    return ( 
        <div>
            <UserHeader />
            <WorkoutSplitManager />
            <CalendarComponent />
        </div>
     );
}
 
export default UserLog;