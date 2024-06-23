import AuthHeader from "./AuthHeader";
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useEffect, useState } from "react";
import { useAuth } from '../Contexts/AuthContext'
import supabase from './SupabaseClient';
import '../styles/LogInStyles.css'

export const ProfilePicture = () => {
    const { session } = useAuth();
    const [pfp, setPfp] = useState(null)
    const [isClicked, setIsClicked] = useState(false)
    
    useEffect(() => {
        if (session) {
            setPfp(session.user.user_metadata.picture)
        }
    }, [session]);

    const handleToggle = () => {
        console.log("Is Clicked")
        setIsClicked(!isClicked)
    }

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
        <div className={`w-10 flex flex-col items-center ${pfp ? "bg-transparent" : "hidden"}`}>
            {pfp && <img src={pfp} onClick={handleToggle} className="rounded-full h-10 w-10 overflow-hidden bg-transparent fixed top-5" alt="pfp" />}
            {isClicked && <div className="bg-purple-50 rounded-xl relative top-20 h-32 w-32 p-2 z-50 clip">
                <button onClick={handleSignOut} className="text-black bg-purple-300 rounded-full px-2 text-sm py-3 my-9 z-auto hover:scale-110 hover:cursor-pointer transition-transform duration-20">sign out</button>
            </div>}
        </div>
    );

}

const LogIn = () => {

    return (
        <div className="bg-bg h-dvh text-white">
            <AuthHeader />
            <div className="flex justify-center items-center relative top-20 bg-bg text-white">
                <Auth
                    supabaseClient={supabase}
                    appearance={{ 
                        theme: ThemeSupa,
                        extend: true,
                        className: {
                            button: "log-in-button",
                            anchor: "log-in-anchor",
                            container: "log-in-container",
                            divider: "log-in-divider",
                            label: "log-in-label",
                            input: "log-in-input", 
                            loader: "log-in-loader",
                            message: "log-in-message",
                        }
                    }}
                    providers={['google']}
                />
            </div>
        </div>
    );
};
 
export default LogIn;

