import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Input = ({ value, onChange, label, placeholder, type }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);
  return (
    <div>
      <label htmlFor={label} className="text-[13px] text-slate-800 dark:text-slate-300">{label}</label>
      <div className="input-box">
        <input
          type={
            type == "password" ? (showPassword ? "text" : "password") : type
          }
          placeholder={placeholder}
          id={label}
          value={value}
          onChange={(e) => onChange(e)}
          autoComplete="off"
          className="w-full bg-transparent outline-none dark:cursor-default text-black dark:text-white"
        />

        {type == "password" && (
          <>
            {showPassword ? (
              <FaRegEye
                size={22}
                className="text-primary dark:text-white cursor-pointer"
                onClick={() => toggleShowPassword()}
              />
            ) : (
              <FaRegEyeSlash
                size={22}
                className="text-slate-400 dark:text-slate-100 cursor-pointer"
                onClick={() => toggleShowPassword()}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Input;
