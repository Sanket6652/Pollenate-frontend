import React from 'react';

interface ShortAnswerProps {
  field: any;
  index: number;
  handleInputChange: (index: number, value: string) => void;
  handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>, index: number) => void;
  handleFocus: (index: number) => void;
  handleBlur: () => void;
  setInputRef: (el: HTMLInputElement | null, index: number) => void;
}

const ShortAnswer: React.FC<ShortAnswerProps> = ({
  field,
  index,
  handleInputChange,
  handleKeyPress,
  handleFocus,
  handleBlur,
  setInputRef,
}) => {
  return (
    <div className="space-y-2 w-full">
      {/* <input
        type="text"
        value={field.label}
        onChange={(e) => handleInputChange(index, e.target.value)}
        onKeyDown={(e) => handleKeyPress(e, index)}
        onFocus={() => handleFocus(index)}
        onBlur={handleBlur}
        ref={(el) => setInputRef(el, index)}
        placeholder="Question"
        className="w-full p-2 text-lg text-gray-700 bg-gray-100 rounded-md focus:bg-gray-100 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
      /> */}
      <input
        type="text"
        placeholder="Short Answer"
        className="w-full p-2 text-lg text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
      />
    </div>
  );
};

export default ShortAnswer;
