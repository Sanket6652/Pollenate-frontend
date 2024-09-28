import React from "react";

interface DateProps {
  field: any;
  index: number;
  handleInputChange: (index: number, value: string) => void;
  handleFocus: (index: number) => void;
  handleBlur: () => void;
}

const DateInputField: React.FC<DateProps> = ({
  field,
  index,
  handleInputChange,
  handleFocus,
  handleBlur,
}) => {
  return (
    <input
      type="date"
      value={field.label}
      onFocus={() => handleFocus(index)}
      onBlur={() => handleBlur()}
      className="w-full  p-2 text-lg text-gray-700 bg-gray-100 rounded-md focus:bg-gray-100 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
    />
  );
};

export default DateInputField;
