"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { AddIcon, DeleteIcon } from "./Icons";
import SlashCommandInput from './SlashCommandInput';

interface FormField {
  type: string;
  label: string;
}

const FormBuilder = () => {
  const [titleValue, setTitleValue] = useState("");
  const defaulttitle = "Untitled";
  const [fields, setFields] = useState<FormField[]>([{ type: "Text", label: "" }]); // Default field
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [focusedField, setFocusedField] = useState<number | null>(null);
  const deleteButtonRef = useRef<HTMLButtonElement>(null);
  const blurTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [hoveredField, setHoveredField] = useState<number | null>(null);

  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitleValue(e.target.value);
    },
    []
  );

  const handleInputChange = useCallback((index: number, value: string) => {
    setFields((prevFields) => {
      const newFields = [...prevFields];
      newFields[index] = { ...newFields[index], label: value };
      return newFields;
    });
  }, []);
  
  const handleCommandSelect = (command: string) => {
    const newField: FormField = {
      type: command,
      label: `New ${command} Field`,
    };
    setFields([...fields, newField]);
  };

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const newField: FormField = { type: "Text", label: "" };
        setFields((prevFields) => {
          const newFields = [...prevFields];
          newFields.splice(index + 1, 0, newField);
          return newFields;
        });
        setTimeout(() => {
          const newInput = inputRefs.current[index + 1];
          if (newInput) {
            newInput.focus();
          }
        }, 0);
      } else if (e.key === "ArrowUp" && index > 0) {
        e.preventDefault();
        const prevInput = inputRefs.current[index - 1];
        if (prevInput) {
          prevInput.focus();
          const length = prevInput.value.length;
          prevInput.setSelectionRange(length, length);
        }
      } else if (e.key === "ArrowDown" && index < fields.length - 1) {
        e.preventDefault();
        const nextInput = inputRefs.current[index + 1];
        if (nextInput) {
          nextInput.focus();
          const length = nextInput.value.length;
          nextInput.setSelectionRange(length, length);
        }
      } else if (e.key === "Backspace" && fields[index].label === "" && index > 0) {
        e.preventDefault();
        setFields((prevFields) => {
          const newFields = [...prevFields];
          newFields.splice(index, 1);
          return newFields;
        });
        const prevInput = inputRefs.current[index - 1];
        if (prevInput) {
          setTimeout(() => {
            prevInput.focus();
            const length = prevInput.value.length;
            prevInput.setSelectionRange(length, length);
          }, 0);
        }
      }
    },
    [fields]
  );

  useEffect(() => {
    const lastIndex = fields.length - 1;
    inputRefs.current[lastIndex]?.focus();
  }, [fields.length]);

  const setInputRef = useCallback(
    (el: HTMLInputElement | null, index: number) => {
      inputRefs.current[index] = el;
    },
    []
  );

  const handleDeleteField = useCallback((index: number) => {
    setFields((prevFields) => {
      if (prevFields.length === 1) {
        return [{ type: "Text", label: "" }];
      }
      return prevFields.filter((_, i) => i !== index);
    });

    setTimeout(() => {
      const newIndex = index === 0 ? 0 : index - 1;
      const newInput = inputRefs.current[newIndex];
      if (newInput) {
        newInput.focus();
        const length = newInput.value.length;
        newInput.setSelectionRange(length, length);
      }
    }, 0);
  }, []);

  const handleBlur = useCallback((index: number) => {
    blurTimeoutRef.current = setTimeout(() => {
      if (!deleteButtonRef.current?.contains(document.activeElement)) {
        setFocusedField(null);
      }
    }, 100);
  }, []);

  const handleFocus = useCallback((index: number) => {
    if (blurTimeoutRef.current) {
      clearTimeout(blurTimeoutRef.current);
    }
    setFocusedField(index);
  }, []);

  const showButtons = (index: number) => {
    return focusedField === index || hoveredField === index;
  };

  const inputStyle = {
    outline: "none",
    boxShadow: "none",
    border: "none",
  };

  return (
    <div className="p-6">
      <h1 className="text-10px font-bold mb-4 justify-center items-center text-center text-gray-700">
        {titleValue || defaulttitle} →
      </h1>
      <div className="space-y-10">
        <input
          type="text"
          value={titleValue}
          onChange={handleTitleChange}
          className="w-full p-3 text-3xl font-bold text-gray-800 bg-transparent border-b-2 border-gray-300 focus:border-blue-500 transition-all duration-200 outline-none shadow-none"
          style={inputStyle}
          placeholder="Form Title"
        />
        <div className="space-y-2">
          {fields.map((field, index) => (
            <div
              key={index}
              className="relative w-full flex items-center space-x-2 mb-2"
              onMouseEnter={() => setHoveredField(index)}
              onMouseLeave={() => setHoveredField(null)}
            >
              {showButtons(index) && (
                <div className="absolute -left-12 top-1/2 transform -translate-y-1/2 flex ">
                  <button
                    className="p-1 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    <AddIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteField(index)}
                    className="p-1 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    <DeleteIcon className="w-5 h-5" />
                  </button>
                </div>
              )}
              <SlashCommandInput
                value={field.label}
                onChange={(value) => handleInputChange(index, value)}
                onKeyDown={(e) => handleKeyPress(e, index)}
                onFocus={() => handleFocus(index)}
                onBlur={() => handleBlur(index)}
                inputRef={(el) => setInputRef(el, index)}
                onCommandSelect={handleCommandSelect}
                placeholder={
                  focusedField === index || field.label !== ""
                    ? "Write Something , '/' for commands"
                    : ""
                }
              />
            </div>
          ))}
          <button className="bg-black text-white rounded p-2">Submit →</button>
        </div>
      </div>
    </div>
  );
};

export default FormBuilder;
