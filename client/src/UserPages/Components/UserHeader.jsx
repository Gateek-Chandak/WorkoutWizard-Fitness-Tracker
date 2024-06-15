import supabase from "../../AuthPages/SupabaseClient";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from '../../Contexts/AuthContext';
import { ProfilePicture } from "../../AuthPages/LogIn";
import { useState } from "react";
import WizardImg from '../../../images/wizard.png'

const UserHeader = () => {

    const { setSession } = useAuth();
    const navigate = useNavigate();


    return ( 
        <div className="header flex flex-row h-20 border-b-2 border-gray-700 bg-bg">
            <Link to="/user-log" className="text-white w-8/12 flex items-center px-24 bg-bg">
                <img src={WizardImg} alt="" className="w-14 h-14" /> 
                <h1 className="text-purple-300 m-2 mt-4">Workout Wizard</h1>
            </Link>
            <ul className="text-white w-5/12 list-none flex flex-row gap-20 items-center justify-center bg-bg">
                <Link to="/user-log" className="text-highlights bg-transparent hover:scale-110 hover:cursor-pointer transition-transform duration-200">Log</Link>
                <Link to='/goals' className="text-highlights bg-transparent hover:scale-110 hover:cursor-pointer transition-transform duration-200">Goals</Link>
                {/* <li className="text-highlights bg-transparent hover:scale-110 hover:cursor-pointer transition-transform duration-200">Nutrition</li> */}
                <button className="bg-transparent">
                    <ProfilePicture/>
                </button>

            </ul>
      
        </div>
     );
}
 
export default UserHeader;