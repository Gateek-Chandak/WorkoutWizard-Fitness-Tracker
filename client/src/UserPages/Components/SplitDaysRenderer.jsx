import DraggableComponent from "../Components/DraggableComponent";
import { v4 as uuidv4 } from "uuid";
import { useDraggedEvent } from "../../Contexts/DraggedEventContext";

const SplitDaysRenderer = ({ item }) => {

    const { setDraggedEvent } = useDraggedEvent()

    return ( 
        <div>
             {item && item.map(day => {
                return <DraggableComponent key={uuidv4()} name={day} draggable onDrag={() => setDraggedEvent({title: day})}/>
             })}
        </div>
     );
}
 
export default SplitDaysRenderer;