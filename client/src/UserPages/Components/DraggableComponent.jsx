import React from 'react';

const DraggableComponent = ({ name, draggable, onDragStart }) => {
  return (
    <div
      className='border-2 border-black'
      draggable={draggable}
      onDragStart={onDragStart}
    >
      {name}
    </div>
  );
};

export default DraggableComponent;