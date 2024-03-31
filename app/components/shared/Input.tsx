"use client";
import React from "react";
import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";
import { MdOutlineLock, MdOutlineLockOpen } from "react-icons/md";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  onclick?: () => void;
  placeholder?: string;
}
const Input: React.FC<InputProps> = ({
  id,
  label,
  type,
  disabled,
  required,
  register,
  errors,
  onclick,
  placeholder,
}) => {
  return (
    <div className="w-full my-2">
      <label htmlFor={id} className="text-lg">
        {label}
        <span className={`text-rose-600 ${required ? "visible" : "invisible"}`}>
          *
        </span>
      </label>
      <input
        id={id}
        type={type}
        disabled={disabled}
        {...register(id, { required })}
        className={`border p-3 block rounded-md w-full focus-visible:border-main focus-visible:outline-none ${
          errors[id] ? "border-rose-400" : "border-slate-300"
        }
        ${errors[id] ? "focus:border-rose-400" : "focus:border-[#F8853E]"}`}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
