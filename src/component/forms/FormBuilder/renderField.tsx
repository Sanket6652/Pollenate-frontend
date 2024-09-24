import React from "react";
import { FormField } from "./types";
import SlashCommandInput from "./SlashCommandInput";

interface RenderFieldProps {
  field: FormField;
  index: number;
  handleInputChange: (index: number, value: string) => void;
  handleKeyPress: (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => void;
  handleFocus: (index: number) => void;
  handleBlur: () => void;
  setInputRef: (el: HTMLInputElement | null, index: number) => void;
  handleCommandSelect: (command: string, index: number) => void;
  focusedField: number | null;
}

export const renderField = ({
  field,
  index,
  handleInputChange,
  handleKeyPress,
  handleFocus,
  handleBlur,
  setInputRef,
  handleCommandSelect,
  focusedField,
}: RenderFieldProps) => {
  switch (field.type) {
    case "Date":
      return (
        <input
          type="date"
          value={field.label}
          onChange={(e) => handleInputChange(index, e.target.value)}
          onFocus={() => handleFocus(index)}
          onBlur={() => handleBlur()}
          className="w-full p-2 text-lg text-gray-700 bg-gray-100 rounded-md focus:bg-gray-100 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
        />
      );
    case "Heading1":
      return (
        <h1 className="text-4xl font-bold">
          <input
            className="bg-gray-100 outline-none shadow-none"
            placeholder="Heading 1 "
          ></input>
        </h1>
      );
    case "Heading2":
      return (
        <h2 className="text-3xl font-semibold">
          <input
            className="bg-gray-100 outline-none shadow-none"
            placeholder="Heading 2"
          ></input>
        </h2>
      );
    case "Heading3":
      return (
        <h3 className="text-2xl font-medium">
          <input
            className="bg-gray-100 outline-none shadow-none"
            placeholder="Heading 3"
          ></input>
        </h3>
      );
    case "Image":
      return (
        <div className="bg-gray-200 h-32 flex items-center justify-center">
          Image Placeholder
        </div>
      );
    case "Divider":
      return <hr className="my-4 border-black bg-black border-t-2" />;

    case "Checkbox":
      return (
        <div className="flex items-center">
          <input type="checkbox" className="mr-2" />
          <label>{field.label}</label>
        </div>
      );
    case "PhoneNumber":
      return (
        <input
          type="tel"
          value={field.label}
          onChange={(e) => handleInputChange(index, e.target.value)}
          placeholder="Phone Number"
          className="w-full p-2 text-lg text-gray-700 bg-gray-100 rounded-md focus:bg-gray-100 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
        />
      );
    case "Rating":
      return <div className="flex">⭐⭐⭐⭐⭐</div>;
    case "Dropdown":
      return (
        <select className="w-full p-2 text-lg text-gray-700 bg-gray-100 rounded-md focus:bg-gray-100 focus:ring-2 focus:ring-blue-500 transition-all duration-200">
          {field.options?.map((option, i) => (
            <option key={i} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    case "FileUpload":
      return (
        <input
          type="file"
          className="w-full p-2 text-lg text-gray-700 bg-gray-100 rounded-md focus:bg-gray-100 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
        />
      );
    case "Short Answer":
      return (
        <div className="space-y-2">
          <input
            type="text"
            value={field.label}
            onChange={(e) => handleInputChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyPress(e, index)}
            onFocus={() => handleFocus(index)}
            onBlur={handleBlur}
            ref={(el) => setInputRef(el, index)}
            placeholder="Question"
            className="w-full p-2 text-lg text-gray-700 bg-gray-100 rounded-md focus:bg-gray-100 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          />
          <input
            type="text"
            placeholder="Short Answer"
            className="w-full p-2 text-lg text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          />
        </div>
      );

    default:
      return (
        <SlashCommandInput
          value={field.label}
          onChange={(value) => handleInputChange(index, value)}
          onKeyDown={(e) => handleKeyPress(e, index)}
          onFocus={() => handleFocus(index)}
          onBlur={() => handleBlur()}
          inputRef={(el) => setInputRef(el, index)}
          onCommandSelect={(command) => handleCommandSelect(command, index)}
          placeholder={
            focusedField === index || field.label !== ""
              ? "Write Something, '/' for commands"
              : ""
          }
        />
      );
  }
};
