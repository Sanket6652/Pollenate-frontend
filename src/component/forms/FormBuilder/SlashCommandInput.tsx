import React, { useState, useRef, useEffect } from "react";

interface SlashCommandInputProps {
  value: string;
  onChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  onBlur: () => void;
  inputRef: (el: HTMLInputElement | null) => void;
  onCommandSelect: (command: string) => void;
  placeholder: string;
}

const SlashCommandInput: React.FC<SlashCommandInputProps> = ({
  value,
  onChange,
  onKeyDown,
  onFocus,
  onBlur,
  inputRef,
  onCommandSelect,
  placeholder,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLUListElement>(null);

  const commands = [
    { name: "Short Answer", icon: "✏️" },
    { name: "Long Answer", icon: "📝" },
    { name: "Multiple Choice", icon: "🔘" },
    { name: "Checkbox", icon: "☑️" },
    { name: "Dropdown", icon: "🔽" },
    { name: "Date", icon: "📅" },
    { name: "PhoneNumber", icon: "🔢" },
    { name: "Image", icon: "" },
    { name: "Rating", icon: "⭐" },
    { name: "File Upload", icon: "📎" },
    { name: "Heading", icon: "📌" },
    { name: "Divider", icon: "➖" },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    setShowDropdown(newValue.endsWith("/"));
  };

  const handleCommandSelect = (command: string) => {
    onCommandSelect(command);
    setShowDropdown(false);
  };

  return (
    <div className="relative w-full">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleInputChange}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        onBlur={onBlur}
        className="w-full p-2 text-lg text-gray-700 bg-gray-100 rounded-md focus:bg-gray-100 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
        style={{ outline: "none", boxShadow: "none", border: "none" }}
        placeholder={placeholder}
      />
      {showDropdown && (
        <ul
          ref={dropdownRef}
          className="absolute z-10 w-64 mt-1 bg-white border rounded-md shadow-lg"
        >
          {commands.map((command) => (
            <li
              key={command.name}
              className="px-3 py-2 cursor-pointer hover:bg-gray-100 flex items-center"
              onClick={() => handleCommandSelect(command.name)}
            >
              <span className="mr-2">{command.icon}</span>
              {command.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SlashCommandInput;
