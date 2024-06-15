import { add, format, parseISO } from 'date-fns';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; 
import WizardLogo from '../../../images/wizard.png'
import { useAuth } from '../../Contexts/AuthContext';
import { useEvents } from '../../Contexts/EventsContext';


const WorkoutDetails = ( { addDetails, setAddDetails, deleteEvent }) => {

    const {events, setEvents} = useEvents()
    const { session, user_id } = useAuth()

    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [workoutInfo, setWorkoutInfo] = useState(null)
    const [success, setSuccess] = useState(null)

    const autoWorkout = async (content) => {
        setLoading(true)
        try {
            const response = await fetch('http://localhost:4000/api/openAIRoutes/generate-response', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({content})
            })
            const json = await response.json()
            if(!response.ok) {
                return
            }
            setWorkoutInfo(json.response)
            setLoading(false)
    
        } catch (error) {
            console.log(error)
            setLoading(false)
            setError("Could not generate")
            setWorkoutInfo(null)
        }
    }

    const saveWorkout = async () => {
        if (!workoutInfo && !addDetails.info.details) {
            setError("No Workout Found")
            setTimeout(() => {
                setError(null)
            }, [5000])
            return 
        }
        if(session) {
            const newEvents = events.map(item => (item.start === addDetails.info.start) ? { ...item, details: workoutInfo } : item)
            const response = await fetch('http://localhost:4000/api/events/updateEvents', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({userID: user_id, events: newEvents})
            })
            setEvents(newEvents)
            setSuccess(true)
        }
    }

    return ( 
        <div className="my-5 mr-5 rounded-xl w-2/5 bg-gray-200 flex flex-col justify-start gap-10 border-2 border-white" >
            <div className="text-center flex flex-row w-full p-3 border-b border-gray-300 rounded-md">
                <div className="w-11/12 flex flex-row gap-3 ">
                    <div className="w-9/12 relative rounded-xl p-3" style={ addDetails.isOpen ? { background: addDetails.info.colour } : null }>
                        <h1 className="relative text-lg text-center m-1" >{addDetails.info.title}</h1> 
                        <h1 className="text-md text-gray-50">{(typeof addDetails.info.start === "string") ? format(parseISO(addDetails.info.start.substring(0, 10)), 'EEE, MMMM d, yyyy') : String(addDetails.info.start).substring(0, 15)}</h1>
                    </div >

                    <div className="w-3/12 flex flex-col items-center gap-2">
                        <button className="w-full h-10 bg-red-700 text-xs text-white p-1 rounded-full hover:scale-105 hover:cursor-pointer transition-transform duration-200 hover:bg-red-600 active:scale-100" onClick={deleteEvent}>delete</button>
                        <button className="w-full h-10 bg-green-700 text-xs text-white p-1 rounded-full hover:scale-105 hover:cursor-pointer transition-transform duration-200 hover:bg-green-500 active:scale-100" onClick={saveWorkout}>{success ? "saved": "save"}</button>
                    </div>
                  
                </div>
                <button className="relative -top-5 left-3 w-7 my-5 rounded-3xl backdrop-brightness-125 hover:scale-105 hover:cursor-pointer transition-transform duration-200 hover:backdrop-brightness-150 hover:text-red-700 z-50 h-7 text-black m-1" onClick={() =>  setAddDetails(false)}>X</button>
            </div>
            <div className='h-3/4'>  
                {loading ? <div className='flex justify-center items-center flex-col h-full'>
                                <img src={WizardLogo} className='w-24 h-auto' alt="" />
                                <h6 className=''>Loading</h6>
                           </div> :

                            addDetails.info.details ? 
                                    addDetails.info.details &&<ul className='flex justify-between items-center flex-col h-full'>
                                        {addDetails.info.details.map(workout => {
                                            return <li key={uuidv4()} className='border-b border-gray-400'>{workout.order}. {workout.name} {workout.setsReps} </li>
                                        })}
                                    </ul>  :
                                    workoutInfo &&<ul className='flex justify-between items-center flex-col h-full'>
                                    {workoutInfo.map(workout => {
                                        return <li key={uuidv4()} className='border-b border-gray-400'>{workout.order}. {workout.name} {workout.setsReps} </li>
                                    })}
                                </ul>
                }
            </div>
            {error && <h1 className='text-red-400 text-xxl text-center absolute right-64 p-3 backdrop-brightness-50'>{error}</h1>}
            <div className='border-t border-gray-300 rounded-md top flex justify-center items-center p-1'>
                <button onClick={() => autoWorkout(addDetails.info.title)} className='h-10 text-xs text-purple-900 m-auto my-1 w-2/5 rounded-full hover:scale-105 hover:cursor-pointer transition-transform duration-200 hover:bg-purple-50 active:scale-100'>Consult the Workout Wizard </button>
            </div>
        </div> 
     );
}
 
export default WorkoutDetails;