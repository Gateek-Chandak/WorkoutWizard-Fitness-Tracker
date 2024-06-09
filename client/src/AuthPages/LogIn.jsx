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
    
    useEffect(() => {
        if (session) {
            setPfp(session.user.user_metadata.picture)
        }
    }, [session]);

    return (
        <div className={pfp ? "bg-transparent" : "hidden"}>
            {pfp && <img src={pfp} className="rounded-full h-10 w-10 overflow-hidden bg-transparent" alt="pfp" />}
        </div>
    );

}

const LogIn = () => {

    return (
        <div>
            <AuthHeader />
            <div className="flex justify-center items-center relative top-20">
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

