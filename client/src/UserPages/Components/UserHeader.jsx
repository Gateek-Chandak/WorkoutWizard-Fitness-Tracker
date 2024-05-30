import supabase from "../../AuthPages/SupabaseClient";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from '../../Contexts/AuthContext';

const UserHeader = () => {

    const { setSession } = useAuth();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
        console.error('Error signing out:', error);
        } else {
        setSession(null);
        navigate('/');
        }
    };    

    return ( 
        <div className="header flex flex-row h-16 border-b-2 border-highlights bg-black">
            <Link to="/user-log" className="text-highlights w-1/2 flex items-center px-24">logo</Link>
            <ul className="text-white w-1/2 list-none flex flex-row gap-20 items-center justify-center ">
                <li className="text-highlights">one</li>
                <li className="text-highlights">two</li>
                <li className="text-highlights">three</li>
                <li className="text-highlights">four</li>
                <li className="text-highlights">five</li>
                <button onClick={handleSignOut} className="text-black bg-highlights rounded-full px-3 py-2">sign out</button>  
            </ul>
      
        </div>
     );
}
 
export default UserHeader;