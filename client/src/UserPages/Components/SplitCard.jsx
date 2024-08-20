import { useWorkoutSplit } from '../../Contexts/WorkoutSplitContext';
import { useAuth } from '../../Contexts/AuthContext';
import { useState } from 'react';

const SplitCard = ( {id, name, handleSelectedSplit, setIsOpen} ) => {

    const { user_id } = useAuth()
    const { splits, setSplits } = useWorkoutSplit()
    const [error, setError] = useState(null)

    const handleClick = () => {
        handleSelectedSplit(name)
        setIsOpen(false)
    }

    const handleDeleteSplit = async () => {
        if(!id || !user_id) {
            setError('Cannot delete at the moment')
            setTimeout(() => {
                setError(null)
            }, [3000])
            return 
        }
        const response = await fetch(`https://workout-wizard-fitness-tracker.vercel.app/api/workoutSplits/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({user_id})
            })
        if(!response.ok) {
            return
        } 
        setSplits(splits.filter(split => split.id !== id))
    }

    return ( 
        <div className='bg-bg flex justify-between items-center w-full gap-2'>
            <button className=" w-5 h-5 flex items-center justify-center hover:scale-110 hover:cursor-pointer transition-transform duration-200 text-red-400 hover:text-red-500" onClick={handleDeleteSplit}>x</button>
            <button className="text-left text-gray-100 hover:text-gray-400 hover:scale-105 hover:cursor-pointer transition-transform duration-200" onClick={handleClick}>{name}</button>
            <h6 className='text-red-500'>{error}</h6>
        </div>
        
        
     );
}
 
export default SplitCard;