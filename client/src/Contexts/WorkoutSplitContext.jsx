import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

const WorkoutSplitContext = createContext();

export const WorkoutSplitProvider = ({ children }) => {

    const { session, user_id } = useAuth()

    const [userID, setUserId] = useState(null)
    const [splits, setSplits] = useState(null);

    const getSplits = async () => {

        setUserId(session.user.id)
        
        if(userID) {
            const response = await fetch('http://localhost:4000/api/workoutSplits/getSplits', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({userID})
            })
            const json = await response.json()

            if(!response.ok) {
                return
            }

            setSplits(json.response)
        }
    }

    useEffect(() => {  
        if(session) {
            getSplits()
        }   
    }, [session]);

    return (
        <WorkoutSplitContext.Provider value={{ splits, setSplits }}>
        {children}
        </WorkoutSplitContext.Provider>
    );
};

export const useWorkoutSplit = () => useContext(WorkoutSplitContext);