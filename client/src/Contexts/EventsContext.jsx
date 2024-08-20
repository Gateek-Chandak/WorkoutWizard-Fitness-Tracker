import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

const EventsContext = createContext();

export const EventsProvider = ({ children }) => {

    const { session, user_id } = useAuth()

    const [userID, setUserId] = useState(null)
    const [events, setEvents] = useState(null)

    const getEvents = async () => {

        setUserId(session.user.id)
        if(userID) {
            const response = await fetch('https://workout-wizard-fitness-tracker.vercel.app/api/events/getEvents', {
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
            if(await json.response[0].events) {
                const e = await json.response[0].events;
                setEvents(e)
            } else {
                createEvents()
            }
           
        } else {
            setEvents(null)
        }
    }

    const createEvents = async () => {
        if (userID) {
            const response = await fetch('https://workout-wizard-fitness-tracker.vercel.app/api/events/createEvents', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({userID, events: []})
            })
            const json = await response.json()
            if(!response.ok) {
                return
            }
            setEvents([])
        }
        getEvents()
    }

    useEffect(() => {
        if(session) {
            createEvents()
        }
    }, [session])

    return (
        <EventsContext.Provider value={{ events, setEvents }}>
        {children}
        </EventsContext.Provider>
    );
};

export const useEvents = () => useContext(EventsContext);