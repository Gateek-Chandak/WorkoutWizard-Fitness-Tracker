import { useWorkoutSplit } from '../../Contexts/WorkoutSplitContext';
import { useAuth } from '../../Contexts/AuthContext';
import { useState } from 'react';

const SplitCard = ( {id, name, handleSelectedSplit} ) => {

    const { user_id } = useAuth()
    const { splits, setSplits } = useWorkoutSplit()
    const [error, setError] = useState(null)

    const handleClick = () => {
        handleSelectedSplit(name)
    }

    const handleDeleteSplit = async () => {
        if(!id || !user_id) {
            setError('Please wait a moment')
            setTimeout(() => {
                setError(null)
            }, [3000])
            return 
        }
        const response = await fetch(`http://localhost:4000/api/workoutSplits/delete/${id}`, {
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
        <div>
            <button className="text-middle" onClick={handleClick}>{name}</button>
            <button className="border border-black" onClick={handleDeleteSplit}>-</button>
            <h6 className='text-red-500'>{error}</h6>
        </div>
        
        
     );
}
 
export default SplitCard;