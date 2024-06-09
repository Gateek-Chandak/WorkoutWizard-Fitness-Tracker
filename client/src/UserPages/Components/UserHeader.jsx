import supabase from "../../AuthPages/SupabaseClient";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from '../../Contexts/AuthContext';
import { ProfilePicture } from "../../AuthPages/LogIn";
import { useState } from "react";

const UserHeader = () => {

    const { setSession } = useAuth();
    const navigate = useNavigate();

    const [isClicked, setIsClicked] = useState(false)

    const handleSignOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
        console.error('Error signing out:', error);
        } else {
        setSession(null);
        navigate('/');
        }
    };    

    const handleToggle = () => {
        setIsClicked(!isClicked)
    }

    return ( 
        <div className="header flex flex-row h-16 border-b-2 border-highlights bg-bg">
            <Link to="/user-log" className="text-white w-6/12 flex items-center px-24 bg-bg">logo</Link>
            <ul className="text-white w-6/12 list-none flex flex-row gap-20 items-center justify-center bg-bg">
                <Link to="/user-log" className="text-highlights bg-transparent hover:scale-110 hover:cursor-pointer transition-transform duration-200">Log</Link>
                <li className="text-highlights bg-transparent hover:scale-110 hover:cursor-pointer transition-transform duration-200">Goals</li>
                <li className="text-highlights bg-transparent hover:scale-110 hover:cursor-pointer transition-transform duration-200">Nutrition</li>
                <div className="flex flex-col items-center bg-transparent">   
                    <button className="bg-transparent" onClick={handleToggle}>
                        <ProfilePicture onClick={handleToggle}/>
                    </button>
                    {isClicked && <button onClick={handleSignOut} className="text-white bg-highlights rounded-full px-3 py-2 absolute top-20">sign out</button>}
                </div>
            </ul>
      
        </div>
     );
}
 
export default UserHeader;