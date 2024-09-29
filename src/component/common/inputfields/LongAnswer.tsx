import React from "react";
import { FormField } from "../../forms/FormBuilder/types";

interface LongAnswerProps {
  field: FormField;
  index: number;
  handleInputChange: (index: number, value: string) => void;
  handleKeyPress: (
    e: React.KeyboardEvent<HTMLTextAreaElement>,
    index: number
  ) => void;
  handleFocus: (index: number) => void;
  handleBlur: () => void;
  setInputRef: (el: HTMLTextAreaElement | null, index: number) => void;
}

const LongAnswer: React.FC<LongAnswerProps> = ({
  field,
  index,
  handleInputChange,
  handleKeyPress,
  handleFocus,
  handleBlur,
  setInputRef,
}) => {
  return (
    <div className="mb-4 w-full">
      <textarea
        id={`long-answer-${index}`}
        className="w-full p-4 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        rows={4}
        value={ ""}
        onChange={(e) => handleInputChange(index, e.target.value)}
        onKeyDown={(e) => handleKeyPress(e, index)}
        onFocus={() => handleFocus(index)}
        onBlur={handleBlur}
        ref={(el) => setInputRef(el, index)}
        placeholder="Enter your response here..."
      />
    </div>
  );
};

export default LongAnswer;
