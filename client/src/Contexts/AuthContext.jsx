import { createContext, useContext, useEffect, useState } from 'react';
import supabase from '../AuthPages/SupabaseClient'
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [user_id, setUserID] = useState(null)
  const [redirected, setRedirected] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if(session && !redirected) {
        setRedirected(true)
        navigate('/user-log')
      } else {
        setRedirected(false)
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if(session) {
        setUserID(session.user.id)
      } else {
        navigate('/')
        setRedirected(false)
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ session, setSession, user_id }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);