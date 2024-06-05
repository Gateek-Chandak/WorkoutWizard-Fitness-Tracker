import React from 'react';

const DraggableComponent = ({ name, draggable, onDrag, bgColour }) => {
  return (
    <div
      className='border border-black w-36 rounded-full text-center py-1'
      draggable={draggable}
      onDrag={onDrag}
      style={{ background: bgColour }}
    >
      {name}
    </div>
  );
};

export default DraggableComponent;