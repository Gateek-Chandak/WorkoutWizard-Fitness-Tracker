import { useState } from "react";
import { useAuth } from "../../Contexts/AuthContext";
import { v4 as uuidv4 } from 'uuid';
import { useWorkoutSplit } from "../../Contexts/WorkoutSplitContext";
import { CirclePicker } from 'react-color';
import { split } from "postcss/lib/list";

const WorkoutSplitForm = ( {setAddingWorkout }) => {

    const { splits, setSplits } = useWorkoutSplit()
    const { session, user_id } = useAuth();
    const [splitName, setSplitName] = useState('')
    const [item, setItem] = useState('')
    const [colour, setColour] = useState('#FFF');
    const [splitItems, setSplitItems] = useState([])
    const [email, setEmail] = useState(session.user.email)
    const [error, setError] = useState(null)

    const handleAddItem = (e) => {
        e.preventDefault();
        if (item === '') {
            setError('Cannot have empty day')
            setTimeout(() => {
                setError(null)
            }, [5000])
            return
        } else if (splitItems.filter(item => item.colour === colour).length > 0) {
            setError('Choose a unique colour')
            setTimeout(() => {
                setError(null)
            }, [5000])
            return
        } else if (colour === '#FFF') {
            setError('Select a colour')
            setTimeout(() => {
                setError(null)
            }, [5000])
            return
        } else if (splitItems.length >= 5) {
            setError('Cannot have more than 5 items')
            setTimeout(() => {
                setError(null)
            }, [5000])
            return
        } else if (item.length >= 10) {
            setError('Must be less than 10 characters')
            setTimeout(() => {
                setError(null)
            }, [5000])
            return
        } 


        setSplitItems([...splitItems, {name: item, colour: colour}]);
        setItem(''); 
        setColour("#FFF");
        setError(null);
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!session) {
            setError('Session not active')
            return
        } 

        setEmail(session.user.email)          

        if(splitName.length < 2) {
            setError('Name must be at least 2 characters long')
            setTimeout(() => {
                console.log(splits)
                setError(null)
            }, [5000])
            return 
        } else if (splits && splits.some(split => split['split_name'] === splitName)) {
            setError('Name already exists')
            setTimeout(() => {
                setError(null)
            }, [5000])
            return
        } else if (splitItems.length < 1) {
            setError('Split must be have at least one item')
            setTimeout(() => {
                setError(null)
            }, [5000])
            return
        } else if (!user_id) {
            setError('Invalid Credentials')
            setTimeout(() => {
                setError(null)
            }, [5000])
            return
        }
        try {
            const split = {
                split_name: splitName,
                items: splitItems,
                email,
                user_id
            }
            const response = await fetch('http://localhost:4000/api/workoutSplits/addSplits', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(split)
            })
            setSplits([...splits, split])
            setError(null)
            setSplitName('')
            setSplitItems([])
            setColour("#FFF")
            setAddingWorkout(false)
        } catch (err) {
            setError('Invalid Input')
            console.log(err)
        }
    }

    return ( 
        <form onSubmit={handleSubmit} className='flex flex-col gap-3 shadow-textMain p-3 w-full h-fit bg-gray-300 rounded-3xl'>
            <div className="flex flex-row items-center justify-center">
                <input
                    className="text-2xl text-center focus:outline-none focus:placeholder-slate-500 h-10 rounded-sm p-2 bg-transparent text-black w-fit placeholder:italic placeholder:text-lg placeholder:text-black border-b border-black placeholder:text-center"
                    type="text"
                    value={splitName}
                    placeholder="Name your routine"
                    onChange={(e) => setSplitName(e.target.value)}
                />
            </div>
            <div className="bg-gray-300 flex flex-row gap-5 items-center mx-7">
                <input
                    className="focus:outline-none h-8 px-5 p-5 w-2/3 shadow-md rounded-md text-black placeholder:italic placeholder:text-xs"
                    type="text"
                    value={item}
                    placeholder="Add Event"
                    onChange={(e) => setItem(e.target.value)}
                />
                <button className="border-black bg-bg border rounded-full w-24 m-3 p-2 flex justify-center text-sm hover:scale-105 hover:cursor-pointer transition-transform duration-100 "onClick={handleAddItem}>Add</button>
            </div>
            <div className="inline-flex justify-center bg-transparent m-4 mt-7">
                <CirclePicker
                color={colour}
                onChangeComplete={(newColor) => setColour(newColor.hex)}
                />
            </div>
            <ul className="grid grid-cols-3 gap-3 p-2 m-auto">
                {(splitItems.length > 0) && splitItems.map((item) => (
                    <div key={uuidv4()} className="flex flex-row gap-5 items-center">
                        <li>{item.name}</li>
                        <div className="rounded-full w-5 h-5" style={{ backgroundColor: item.colour}}></div>
                    </div>

                ))}
            </ul>
            <div className="flex flex-row w-full justify-center gap-5 items-center m-auto my-3">
                <button type="submit" className="inline p-3 px-4 w-fit bg-green-400 border rounded-full border-none hover:scale-110 hover:cursor-pointer transition-transform duration-200">Submit</button>
                <button onClick={() => setAddingWorkout(false)} className="inline p-3 px-4 w-fit bg-red-400 border rounded-full border-none hover:scale-110 hover:cursor-pointer transition-transform duration-200 ">Cancel</button>
            </div>
            {error && <h1 className="text-red-500 text-xl text-center m-3 ">{error}</h1>}
        </form>
     );
}
 
export default WorkoutSplitForm;