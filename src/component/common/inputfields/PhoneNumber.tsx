import React from 'react';

interface PhoneNumberProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const PhoneNumber: React.FC<PhoneNumberProps> = ({ value, onChange, placeholder = "Phone Number" }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // You can add phone number formatting logic here if needed
    onChange(e.target.value);
  };

  return (
    <input
      type="text"
      value={value}
      onChange={handleInputChange}
      placeholder={placeholder}
      className="w-full p-2 text-lg text-gray-700 bg-gray-100 rounded-md focus:bg-gray-100 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
    />
  );
};

export default PhoneNumber;
