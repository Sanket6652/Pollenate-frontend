"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { AddIcon, DeleteIcon } from "../Icons";
import { FormField } from "./types";
import { renderField } from "./renderField";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
const FormBuilder = () => {
  const [titleValue, setTitleValue] = useState("");
  const defaultTitle = "Untitled";
  const [fields, setFields] = useState<FormField[]>([
    { id: "1", type: "Text", label: "", question: "" },
  ]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [focusedField, setFocusedField] = useState<number | null>(null);
const [hoveredField, setHoveredField] = useState<string | null>(null);

  const blurTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitleValue(e.target.value);
    },
    []
  );

  const handleInputChange = useCallback((index: number, value: string, field: 'label' | 'question') => {
  setFields((prevFields) => {
    const newFields = [...prevFields];
    newFields[index][field] = value;
    return newFields;
  });
}, []);

  const handleCommandSelect = (command: string, index: number) => {
    setFields((prevFields) => {
      const newFields = [...prevFields];
      newFields[index].type = command as FormField["type"];
      if (command === "Dropdown") {
        newFields[index].options = ["Option 1", "Option 2", "Option 3"];
      }
      return newFields;
    });
  };

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
      if (e.key === "Enter") {
        e.preventDefault();
        addNewField(index + 1);
      } else if (e.key === "ArrowUp" && index > 0) {
        e.preventDefault();
        const prevInput = inputRefs.current[index - 1];
        prevInput?.focus();
        prevInput?.setSelectionRange(
          prevInput.value.length,
          prevInput.value.length
        );
      } else if (e.key === "ArrowDown" && index < fields.length - 1) {
        e.preventDefault();
        const nextInput = inputRefs.current[index + 1];
        nextInput?.focus();
        nextInput?.setSelectionRange(
          nextInput.value.length,
          nextInput.value.length
        );
      } else if (
        e.key === "Backspace" &&
        fields[index].label === "" &&
        index > 0
      ) {
        e.preventDefault();
        handleDeleteField(index);
      }
    },
    [fields]
  );

  useEffect(() => {
    inputRefs.current[fields.length - 1]?.focus();
  }, [fields.length]);

  const setInputRef = useCallback(
    (el: HTMLInputElement | null, index: number) => {
      inputRefs.current[index] = el;
    },
    []
  );

  const handleDeleteField = useCallback((index: number) => {
    setFields((prevFields) => {
      if (prevFields.length === 1) return [{ id: "1", type: "Text", label: "" }];
      const newFields = prevFields.filter((_, i) => i !== index);
      return newFields.map((field, i) => ({ ...field, id: (i + 1).toString() }));
    });
    setTimeout(() => {
      const newIndex = index === 0 ? 0 : index - 1;
      const currentInput = inputRefs.current[newIndex];
      currentInput?.focus();
      currentInput?.setSelectionRange(
        currentInput?.value.length ?? 0,
        currentInput?.value.length ?? 0
      );
    }, 0);
  }, []);
;

  const handleBlur = useCallback(() => {
    blurTimeoutRef.current = setTimeout(() => setFocusedField(null), 100);
  }, []);

  const handleFocus = useCallback((index: number) => {
    if (blurTimeoutRef.current) clearTimeout(blurTimeoutRef.current);
    setFocusedField(index);
  }, []);

  const showButtons = (index: number) =>
    focusedField === index || hoveredField === index;

  const addNewField = useCallback((index: number) => {
    const newField: FormField = {
      id: (fields.length + 1).toString(),
      type: "Text",
      label: "",
      question: "",
    };
    setFields((prevFields) => {
      const newFields = [...prevFields];
      newFields.splice(index + 1, 0, newField);
      return newFields;
    });
    setTimeout(() => inputRefs.current[index + 1]?.focus(), 0);
  }, [fields.length]);
  
  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(fields);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setFields(items);
  };
  return (
    <div className="p-6">
      <h1 className="text-10px font-bold mb-4 justify-center items-center text-center text-gray-700">
        {titleValue || defaultTitle} →
      </h1>
      <div className="space-y-10">
        <input
          type="text"
          value={titleValue}
          onChange={handleTitleChange}
          className="w-full p-3 text-3xl font-bold text-gray-800 bg-transparent border-b-2 border-gray-300 focus:border-blue-500 transition-all duration-200 outline-none shadow-none"
          placeholder="Form Title"
        />
        <div className="space-y-2">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="fields">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                {fields.map((field, index) => (
                  <Draggable key={field.id} draggableId={field.id} index={index}>
                    {(provided) => (
                      <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="relative w-full flex items-center space-x-2 mb-2"
                      onMouseEnter={() => setHoveredField(field.id)}
                      onMouseLeave={() => setHoveredField(null)}
                      >
                        {showButtons(field.id) && (
                          <div className="absolute -left-12 top-1/2 transform -translate-y-1/2 flex">
                            <button
                              onClick={() => addNewField(index)}
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
                        {renderField({
                          field,
                          index,
                          handleInputChange,
                          handleKeyPress,
                          handleFocus,
                          handleBlur,
                          setInputRef,
                          handleCommandSelect,
                          focusedField,
                          
                        })}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
          <button className="bg-black text-white rounded p-2">Submit →</button>
        </div>
      </div>
    </div>
  );
};

export default FormBuilder;
