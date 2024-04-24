"use client";
import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface SelectOptionProps {
  id: string;
  label: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors?: FieldErrors;
  onclick?: () => void;
  option?: any;
}

const SelectOption: React.FC<SelectOptionProps> = ({
  register,
  id,
  label,
  required = false,
  option,
}) => {
  return (
    <div className="relative h-full w-full">
      <select
        id={id}
        {...register(id, { required: required })}
        className="outline-none text-xl border-slate-300 border-2 rounded-md w-full h-full p-4"
      >
        {option?.map((x: any) => {
          if (x.value != null) {
            return (
              <option key={x.value} value={x.value}>
                {x.name}
              </option>
            );
          }
        })}
      </select>
      <div className="text-gray-500 bg-white h-fit absolute top-0 left-2 -translate-y-3">
        {label}
      </div>
    </div>
  );
};

export default SelectOption;
