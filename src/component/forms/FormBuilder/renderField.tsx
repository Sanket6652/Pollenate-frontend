import React from "react";
import { FormField } from "./types";
import SlashCommandInput from "./SlashCommandInput";
import ShortAnswer from "../../common/inputfields/ShortAnswer";
import Date from "../../common/inputfields/date";
import StarRating from "@/component/common/inputfields/starrating";
import FileUploader from "../../common/inputfields/FileUploader";
import PhoneNumber from "../../common/inputfields/PhoneNumber";
import Divider from "../../common/inputfields/Divider";
import LongAnswer from "../../common/inputfields/LongAnswer";
import ImageField from "../../common/inputfields/ImageField";

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
  hoveredField: number | null;
  hoverIndex: number | null;
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
  hoveredField,
  hoverIndex
}: RenderFieldProps) => {
  console.log(hoveredField, focusedField, hoverIndex);
  switch (field.type) {
    case "Date":
      return (
        <Date
          field={field}
          index={index}
          handleInputChange={handleInputChange}
          handleFocus={handleFocus}
          handleBlur={handleBlur}
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
        <ImageField
          value={field.value}
          onImageUpload={(file) => {
            // Handle the image upload logic here
            console.log("Image selected:", file);
            // You might want to update the field value with the image URL after upload
            // For now, we'll just use the file name as a placeholder
            handleInputChange(index, URL.createObjectURL(file));
          }}
        />
      );
    case "Divider":
      return <Divider />;

    case "Checkbox":
      return (
        <div className="flex items-center">
          <input type="checkbox" className="mr-2" />
          <label>{field.label}</label>
        </div>
      );
    case "PhoneNumber":
      return (
        <PhoneNumber
          value={field.label}
          onChange={(value) => handleInputChange(index, value)}
          placeholder="Phone Number"
        />
      );
    case "Rating":
      return (
        <StarRating
          onChange={(rating) => console.log(`Selected rating: ${rating}`)}
        />
      );
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
    case "File Upload":
      return (
        <FileUploader
          onChange={(file) => {
            // Handle the file upload logic here
            console.log("File selected:", file);
          }}
        />
      );
    case "Short Answer":
      return (
        <ShortAnswer
          field={field}
          index={index}
          handleInputChange={handleInputChange}
          handleKeyPress={handleKeyPress}
          handleFocus={handleFocus}
          handleBlur={handleBlur}
          setInputRef={setInputRef}
        />
      );
    case "Long Answer":
      return (
        <LongAnswer
          field={field}
          index={index}
          handleInputChange={handleInputChange}
          handleKeyPress={handleKeyPress}
          handleFocus={handleFocus}
          handleBlur={handleBlur}
          setInputRef={setInputRef}
        />
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
              ? "Type '/' for commands"
              : ""
          }
        />
      );
  }
};
