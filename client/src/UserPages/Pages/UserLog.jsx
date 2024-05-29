import UserHeader from "../Components/UserHeader";
import Calendar from "../Components/Calendar"

const UserLog = () => {
    return ( 
        <div>
            <UserHeader />
            <Calendar logs={[]}/>
        </div>
     );
}
 
export default UserLog;