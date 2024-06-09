import React from 'react';

const DraggableComponent = ({ name, draggable, onDrag}) => {

  const object = JSON.parse(name);

  return (
    <div
      className='m-2 w-32 rounded-full text-center py-1 hover:scale-110 hover:cursor-pointer transition-transform duration-300 '
      draggable={draggable}
      onDrag={onDrag}
      style={{ background: object.colour }}
    >
      <h6 className='bg-transparent'>{object.name}</h6>
    </div>
  );
};

export default DraggableComponent;