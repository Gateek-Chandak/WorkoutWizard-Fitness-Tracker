import UserHeader from "../Components/UserHeader";

const GoalsLog = () => {
    return ( 
        <div className="bg-bg h-dvh">
            <UserHeader />
            <button className="text-textMain my-5 h-12 w-12 rounded-3xl backdrop-brightness-110 hover:scale-110 hover:cursor-pointer transition-transform duration-200 hover:backdrop-brightness-200 z-50" > +</button>
        </div>
     );
}
 
export default GoalsLog;