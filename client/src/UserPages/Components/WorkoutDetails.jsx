import { add, format, parseISO } from 'date-fns';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; 
import WizardLogo from '../../../images/wizard.png'
import { useAuth } from '../../Contexts/AuthContext';
import { useEvents } from '../../Contexts/EventsContext';


const WorkoutDetails = ( { addDetails, setAddDetails, deleteEvent, workoutInfo, setWorkoutInfo }) => {

    const {events, setEvents} = useEvents()
    const { session, user_id } = useAuth()

    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(null)
    const [generateAI, setGenerateAI] = useState(false)
    const [difficulty, setDifficulty] = useState('medium'); 
    const [numOfExercises, setNumOfExercises] = useState(5)

    const handleDifficultyChange = (event) => {
        const value = parseInt(event.target.value);
        let newDifficulty = 'medium';

        if (value === 1) {
        newDifficulty = 'easy';
        } else if (value === 3) {
        newDifficulty = 'hard';
        }

        setDifficulty(newDifficulty);
    };

    const handleNumberChange = (event) => {
        const value = parseInt(event.target.value);

        setNumOfExercises(value);
    };


    const toggleGenerateAI = () => {
        setGenerateAI(!generateAI)
    }

    const autoWorkout = async (content, e) => {
        e.preventDefault()
        setGenerateAI(false)
        setLoading(true)

        if (!difficulty) {
            setError("Please Set A Difficulty")
            setTimeout(() => {
                setError(null)
            }, [4000])
            return
        } else if (!numOfExercises) {
            setError("Please Select The Amount Of Exercises you would liike")
            setTimeout(() => {
                setError(null)
            }, [4000])
            return
        }

        try {
            const response = await fetch('https://workout-wizard-fitness-tracker.vercel.app/api/openAIRoutes/generate-response', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({content, difficulty, numOfExercises})
            })
            const json = await response.json()
            if(!response.ok) {
                return
            }
            console.log(addDetails)
            setAddDetails((prevDetails) => ({...prevDetails, info: {...prevDetails.info, details: null}}))
            console.log(addDetails)
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
            const response = await fetch('https://workout-wizard-fitness-tracker.vercel.app/api/events/updateEvents', {
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

    const setToggle = () => {
        setAddDetails(false)
        setWorkoutInfo(null)
    }


    return ( 
        <div className="my-6 mr-5 rounded-xl w-2/5 bg-gray-200 flex flex-col justify-start gap-10 border-2 border-white" >
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
                <button className="relative -top-5 left-3 w-7 my-5 rounded-3xl backdrop-brightness-125 hover:scale-105 hover:cursor-pointer transition-transform duration-200 hover:backdrop-brightness-150 hover:text-red-700 z-50 h-7 text-black m-1" onClick={setToggle}>X</button>
            </div>
            <div className='h-full'>  
                {loading ? <div className='flex justify-center items-center flex-col h-full'>
                                <img src={WizardLogo} className='w-24 h-auto' alt="" />
                                <h6 className=''>Loading</h6>
                           </div> :

                            addDetails.info.details ? 
                                    addDetails.info.details &&<ul className='flex justify-between items-center flex-col h-full'>
                                        {addDetails.info.details.map(workout => {
                                            return <li key={uuidv4()} className='border-b border-gray-300 w-3/4 pb-5 text-center text-xs md:text-md'>{workout.order}. {workout.name} {workout.setsReps} </li>
                                        })}
                                    </ul>  :
                                    workoutInfo &&<ul className='flex justify-between items-center flex-col h-full'>
                                    {workoutInfo.map(workout => {
                                        return <li key={uuidv4()} className='border-b border-gray-300 w-3/4 text-center text-xs md:text-md'>{workout.order}. {workout.name} {workout.setsReps} </li>
                                    })}
                                </ul>
                }
            </div>
            {error && <h1 className='text-red-400 text-xxl text-center p-3'>{error}</h1>}
            <div className='border-t border-gray-300 rounded-md top flex justify-center items-center p-1'>
                <button onClick={toggleGenerateAI} className='h-10 text-xs text-purple-900 m-auto my-1 w-2/5 rounded-full hover:scale-105 hover:cursor-pointer transition-transform duration-200 hover:bg-purple-50 active:scale-100'>Consult the Workout Wizard </button>
            </div>
            {generateAI && <div className='fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50'>
                <form onSubmit={(e) => autoWorkout(addDetails.info.title, e)} className='flex flex-col gap-3 shadow-textMain p-3 w-2/5 h-fit bg-gray-300 rounded-3xl'>
                    <div className='flex flex-row items-center'>       
                        <button className="inline relative -top-4 left-0 w-7 my-5 rounded-3xl backdrop-brightness-105 hover:scale-105 hover:cursor-pointer transition-transform duration-200 hover:backdrop-brightness-110 hover:text-red-700 z-50 h-7 text-black m-1" onClick={toggleGenerateAI}>X</button>
                        <h1 className='w-10/12 text-center relative left-2 -top-4 text-purple-500 text-xl'>Workout Wizard</h1>
                    </div>
                   
                    <div className={`flex flex-col items-center gap-2`}>
                        <h6 className='text-black text-sm text-center'>Number of Exercises</ h6>
                        <input
                            type="range"
                            min="3"
                            max="7"
                            value={numOfExercises}
                            onChange={handleNumberChange}
                            className={`sliderNum w-2/5 bg-gray-400 appearance-none rounded-xl`}
                        />
                        <span className='text-2xl'>{numOfExercises}</span>
                    </div>
                    <div className={`slider-container`}>
                        <h6 className='text-black text-sm mt-5'>Intensity</ h6>
                        <input
                            type="range"
                            min="1"
                            max="3"
                            value={difficulty === 'easy' ? 1 : difficulty === 'medium' ? 2 : 3}
                            onChange={handleDifficultyChange}
                            className={`slider ${difficulty}`}
                        />
                        <div className="slider-labels">
                            <span className='text-green-600'>Easy</span>
                            <span className='text-orange-600'>Medium</span>
                            <span className='text-red-600'>Hard</span>
                        </div>
                    </div>
                    <button type="submit" className='h-10 text-xs mt-6 text-white bg-purple-500 m-auto my-1 w-2/5 rounded-full hover:scale-105 hover:cursor-pointer transition-transform duration-200 hover:backdrop-brightness-105 active:scale-100'>Generate Workout</button>
                </form>
            </div> }
        </div> 
     );
}
 
export default WorkoutDetails;