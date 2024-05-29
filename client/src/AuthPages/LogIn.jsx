import AuthHeader from "./AuthHeader";
import { useNavigate } from "react-router-dom";
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useEffect } from "react";
import { useAuth } from '../Contexts/AuthContext'
import supabase from './SupabaseClient';


const LogIn = () => {

    const { session } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (session) {
            navigate('/user-log');
        }
    }, [session, navigate]);

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