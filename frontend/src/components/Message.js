import React from "react";

const Message = ({message , variant}) => {
  return (
    <div className='my-2'>
      <ul className="list-group">
        <p className={`alert alert-${variant}`}>
          {message}
        </p>
      </ul>
    </div>
  );
};

export default Message;
