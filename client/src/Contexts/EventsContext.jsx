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
            console.log('getting events...')
            const response = await fetch('http://localhost:4000/api/events/getEvents', {
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
            const e = await json.response[0].events;
            setEvents(e)
        } 
    }

    const createEvents = async () => {
        if (!events && userID) {
            const response = await fetch('http://localhost:4000/api/events/createEvents', {
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
    }

    // const updateEvents = async () => {
    //     console.log(events)
    //     setUserId(session.user.id)
    //     console.log("user_id: ", userID)
        
    //     console.log('creating new event')
    //     if(userID) {
    //         console.log("ok")
    //         const response = await fetch('http://localhost:4000/api/events/createEvents', {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json'
    //                 },
    //                 body: JSON.stringify({userID, events})
    //             })
    //         const json = await response.json()

    //         if(!response.ok) {
    //             return
    //         }
    //         console.log('Created new event', json)
    //         return
    //     }   

    //     if(events.length >= 1) {
    //         console.log("updating events")
    //         if(userID) {
    //             const response = await fetch('http://localhost:4000/api/events/updateEvents', {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json'
    //                 },
    //                 body: JSON.stringify({userID, events})
    //             })
    //             const json = await response.json()
    
    //             if(!response.ok) {
    //                 return
    //             }
    //             console.log('NEW EVENTS', json)
    //         }
    //     } 
    // }

    useEffect(() => {
        if(session) {
            createEvents()
            getEvents()
        }
    }, [session])

    return (
        <EventsContext.Provider value={{ events, setEvents }}>
        {children}
        </EventsContext.Provider>
    );
};

export const useEvents = () => useContext(EventsContext);