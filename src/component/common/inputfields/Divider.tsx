import React from 'react';

interface DividerProps {
  className?: string;
}

const Divider: React.FC<DividerProps> = ({ className = '' }) => {
  return <hr className={`h-1/2 my-4 w-full border-black bg-black border-t-2 border-red ${className}`} />;
};

export default Divider;
