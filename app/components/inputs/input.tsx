"use client";

import React from "react";
import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled: boolean;
  required?: boolean;
  borderBottom?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}
const Input: React.FC<InputProps> = ({
  id,
  label,
  type,
  disabled,
  required,
  register,
  errors,
  borderBottom,
}) => {
  return (
    <div className="w-full relative">
      <input
        autoComplete="off"
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=""
        type={type}
        className={`peer w-full pt-6 outline-none bg-white font-light transition disabled:opacity-70 disabled:cursor-not-allowed 
        ${borderBottom ? "border-b-2 py-2" : "border-2 rounded-md p-4"}
        ${errors[id] ? "border-rose-400" : "border-slate-300"}
        ${errors[id] ? "focus:border-rose-400" : "focus:border-[#0070f4]"}
        focus:border-[#0070f4]`}
      />
      <label
        htmlFor={id}
        className={`absolute cursor-text duration-150 tranform -translate-y-4 top-5 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4
        ${borderBottom ? "left-0" : "left-4"}
        ${errors[id] ? "text-rose-500" : "text-slate-500"}
        `}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
