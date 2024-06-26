import AuthHeader from "./AuthHeader";
import { useNavigate } from "react-router-dom";
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useEffect } from "react";
import { useAuth } from '../Contexts/AuthContext'
import supabase from './SupabaseClient';


const SignUp = () => {

    const { session } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (session) {
            navigate('/user-log');
        }
    }, [session, navigate]);

    return (
        <div className="bg-bg h-dvh text-white">
            <AuthHeader />
            <div className="flex justify-center items-center relative top-20 bg-bg">
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
                    view="sign_up"
                />
            </div>
        </div>
    );
};
 
export default SignUp;