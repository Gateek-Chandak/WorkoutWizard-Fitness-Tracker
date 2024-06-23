import { useState, useEffect } from "react";
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { ChevronUpIcon } from '@heroicons/react/24/outline'
import { useWorkoutSplit } from "../../Contexts/WorkoutSplitContext"
import { v4 as uuidv4 } from 'uuid';
import WorkoutSplitForm from "../Forms/WorkoutSplitForm";
import SplitCard from "../Components/SplitCard";
import { useAuth } from "../../Contexts/AuthContext";;
import SplitDaysRenderer from "../Components/SplitDaysRenderer";

const WorkoutSplitManager = ( ) => {

    const { session, user_id } = useAuth()
    const { splits } = useWorkoutSplit()

    const [addingWorkout, setAddingWorkout] = useState(false)
    const [isOpen, setIsOpen] = useState(false);
    const [selectedSplit, setSelectedSplit] = useState(null)

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const toggleAddingWorkout = () => {
        setAddingWorkout(!addingWorkout);
    };


    const handleSelectedSplit = async (name) => {
        if(!user_id) {
            return 
        }
        const response = await fetch('http://localhost:4000/api/workoutSplits/getSplit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name, user_id})
            })
            const json = await response.json()
            console.log(json)
            if(!response.ok) {
                return
            }
            if(splits) {
                console.log(json.response, "response")
                setSelectedSplit(json.response)
                console.log('selected split', selectedSplit)
            }
    }

    return ( 
        <div className="bg-bg flex justify-center w-full flex-row text-textMain">
            <div className="flex flex-row mx-7 bg-bg w-full justify-between">
                <button className="text-textMain my-5 h-11 w-12 rounded-3xl backdrop-brightness-125 hover:scale-110 hover:cursor-pointer transition-transform duration-200 hover:backdrop-brightness-200 z-50 box2" onClick={toggleAddingWorkout}>{addingWorkout ? '-' : '+'}</button>
                <div className="my-2 w-full h-fit z-10 bg-bg text-center rounded-lg">
                    <button onClick={toggleDropdown} className="dropdown-toggle">
                        <h6 className="mt-3 bg-bg hover:scale-105 hover:cursor-pointer transition-transform duration-200 ">{(selectedSplit && splits && (splits.length > 0)) ? selectedSplit[0].split_name : "Routines"}</h6>
                        {isOpen ? <ChevronUpIcon className="hover:scale-110 hover:cursor-pointer transition-transform duration-200 size-6 text-textMain inline p-1 bg-bg" /> : <ChevronDownIcon className="hover:scale-110 hover:cursor-pointer transition-transform duration-200 size-6 text-textMain inline p-1 bg-bg" />}
                    </button>
                    {isOpen ? 
                        ((splits.length > 0) ? 
                            <ul className="flex flex-col list-none m-auto py-3 px-5 w-1/3 border p-2 border-white shadow-2xl bg-bg">
                                {splits && splits.map(split => {
                                    return <SplitCard key={uuidv4()} id={split.id} name={split.split_name} handleSelectedSplit={handleSelectedSplit}
                                                                     setIsOpen={setIsOpen}/>
                                })}
                            </ul>
                            
                        :
                            <h6 className='bg-bg text-sm'>click + to make a new routine</h6>)
                        
                    : 
                     null}
                     {!isOpen && <div className="">
                        {splits && (splits.length > 0) && selectedSplit && selectedSplit.map((item) => {
                            return  <div key={uuidv4()} className='bg-bg text-center'>
                                        <SplitDaysRenderer item={item.items} />
                                    </div>
                        })} 
                    </div>}
                </div>
            </div>
            {addingWorkout && <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
                <div className="w-2/5">
                    {addingWorkout && <WorkoutSplitForm  setAddingWorkout={setAddingWorkout}/> }
                </div>
            </div>}
        </div>
     );
}
 
export default WorkoutSplitManager;