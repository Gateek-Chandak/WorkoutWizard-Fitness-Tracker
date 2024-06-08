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
                
            }
    }

    return ( 
        <div>
            <div className="flex flex-row m-2">
                <button className="border border-black m-2 h-11 py-2 px-4" onClick={toggleAddingWorkout}>{addingWorkout ? '-' : '+'}</button>
                <div className="border border-black m-2 p-2 w-fit">
                    <button onClick={toggleDropdown} className="dropdown-toggle">
                        <h6 className="inline">Routines</h6>
                        {isOpen ? <ChevronUpIcon className="size-6 text-black inline p-1" /> : <ChevronDownIcon className="size-6 text-black inline p-1" />}
                    </button>
                    {isOpen ? 
                        ((splits.length > 0) ? 
                            <ul className="flex flex-col list-none">
                                {splits && splits.map(split => {
                                    return <SplitCard key={uuidv4()} id={split.id} name={split.split_name} handleSelectedSplit={handleSelectedSplit}/>
                                })}
                            </ul>
                        :
                            <h6>Make a new Routine</h6>)
                        
                    : 
                        null}
                </div>
                <div className="w-2/3">
                    {selectedSplit && selectedSplit.map((item) => {
                        return  <div key={uuidv4()} className=''>
                                    <h1>{item.split_name}</h1>
                                    <SplitDaysRenderer item={item.items} />
                                </div>
                    })} 
                </div>
            </div>
            {addingWorkout && <WorkoutSplitForm /> }
        </div>
     );
}
 
export default WorkoutSplitManager;