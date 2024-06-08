import DraggableComponent from "../Components/DraggableComponent";
import { v4 as uuidv4 } from "uuid";
import { useDraggedEvent } from "../../Contexts/DraggedEventContext";

const SplitDaysRenderer = ({ item }) => {

    const { setDraggedEvent } = useDraggedEvent()

    return ( 
        <div className="flex flex-row justify-evenly">
             {item && item.map(day => {
                return <DraggableComponent key={uuidv4()} name={day} draggable onDrag={() => setDraggedEvent(JSON.parse(day))}/>
             })}
        </div>
     );
}
 
export default SplitDaysRenderer;