"use client";
import React from "react";
import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";
import { MdOutlineLock, MdOutlineLockOpen } from "react-icons/md";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  typePassword?: boolean;
  disabled?: boolean;
  required?: boolean;
  borderBottom?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  onclick?: () => void;
  showLockIcon?: boolean;
  defaultValue?: string;
  list?: any;
}
const Input: React.FC<InputProps> = ({
  id,
  label,
  type,
  typePassword,
  disabled,
  required,
  register,
  errors,
  borderBottom,
  onclick,
  showLockIcon,
  defaultValue,
  list,
}) => {
  return (
    <div className="w-full relative">
      <input
        list={list}
        autoComplete="off"
        id={id}
        key={defaultValue}
        value={defaultValue}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=""
        type={type}
        className={`peer text-xl w-full pt-4 outline-none font-light transition disabled:opacity-70 disabled:cursor-not-allowed 
        ${
          borderBottom
            ? "border-b-2 py-2 bg-transparent"
            : "border-2 rounded-md p-4 bg-white"
        }
        ${errors[id] ? "border-rose-400" : "border-slate-300"}
        ${errors[id] ? "focus:border-rose-400" : "focus:border-[#F8853E]"}
        focus:border-[#F8853E]`}
      />
      <label
        htmlFor={id}
        className={`absolute cursor-text duration-150 tranform -translate-y-8  top-5 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8
        ${borderBottom ? "left-0 bg-transparent" : "left-4 bg-white"}
        ${errors[id] ? "text-rose-500" : "text-slate-500"}
        `}
      >
        {label}
      </label>

      {showLockIcon ? (
        <div
          className="absolute -translate-y-5 top-10 z-10 origin-[0] right-4 cursor-pointer"
          onClick={onclick}
        >
          {!typePassword ? (
            <MdOutlineLock size={20} />
          ) : (
            <MdOutlineLockOpen size={20} />
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Input;
