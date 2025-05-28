import { useEffect, useRef, useState } from "react";
import { LuChevronDown } from "react-icons/lu";

const SelectDropdown = ({ options, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-sm text-black dark:text-white outline-none bg-white dark:bg-gray-500 border border-slate-100 dark:border-slate-400 px-2.5 py-3 rounded-md mt-2 flex items-center justify-between cursor-pointer"
      >
        {value
          ? options.find((opt) => opt.value === value)?.label
          : placeholder}
        <span className="ml-2">
          {isOpen ? (
            <LuChevronDown className="rotate-180 transition duration-200" />
          ) : (
            <LuChevronDown className="transition duration-200" />
          )}
        </span>
      </button>

      {isOpen && (
        <div className="absolute w-full text-black dark:text-white bg-white dark:bg-gray-400 border border-slate-100 dark:border-slate-400 rounded-md mt-1 shadow-md z-10 sm:max-h-60 max-h-56 overflow-y-auto">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className="px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-600 cursor-pointer text-sm sm:text-base"
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectDropdown;
