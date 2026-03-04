"use client";

import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { patientFormSchema, TPatientFormSchema } from "@/types/patient";
import { FORM_ITEMS } from "@/app/patient/constants/form-constant";

export default function FormComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TPatientFormSchema>({
    resolver: zodResolver(patientFormSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onSubmit = (data: TPatientFormSchema) => {
    fetch("/api/pusher", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  };

  const handleInputChange = useCallback(
    (field: string, value: string, required: boolean) => {
      fetch("/api/pusher", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: field,
          value: value,
          required: required,
        }),
      });
    },
    [],
  );

  const handleOnFocus = useCallback((field: string, isFocused: boolean) => {
    fetch("/api/pusher", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: field, isFocused: isFocused }),
    });
    console.log(field, isFocused);
  }, []);

  const formItems = FORM_ITEMS;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-3 gap-2">
      {formItems.map((item) => (
        <div key={item.key} className="col-span-3 form-group">
          <label htmlFor={item.key}>
            {item.label}
            {item.required ? (
              <small className="text-[#ff6363]">*</small>
            ) : (
              " (Optional)"
            )}
          </label>
          {item.type === "radio" ? (
            <div className="flex items-center gap-2">
              {item.options?.map((option) => (
                <label key={option.value} className="flex items-center gap-2">
                  <input
                    type="radio"
                    value={option.value}
                    {...register(item.key as keyof TPatientFormSchema, {
                      onBlur: () => {
                        handleOnFocus(item.key as string, false);
                      },
                    })}
                    onChange={(e) => {
                      handleInputChange(
                        item.key as string,
                        e.target.value,
                        item.required,
                      );
                    }}
                  />
                  {option.label}
                </label>
              ))}
            </div>
          ) : (
            <input
              type={item.type}
              id={item.key}
              onFocus={() => {
                handleOnFocus(item.key as string, true);
              }}
              {...register(item.key as keyof TPatientFormSchema, {
                onBlur: () => {
                  handleOnFocus(item.key as string, false);
                },
                onChange: (e) => {
                  handleInputChange(
                    item.key as string,
                    e.target.value,
                    item.required,
                  );
                },
              })}
              className={
                errors[item.key as keyof TPatientFormSchema] ? "invalid" : ""
              }
            />
          )}
          <p
            className="text-xs"
            style={{
              color: errors[item.key as keyof TPatientFormSchema]
                ? "#ff6363"
                : "transparent",
            }}
          >
            {errors[item.key as keyof TPatientFormSchema]?.message || "&nbsp;"}
          </p>
        </div>
      ))}
      <button
        type="submit"
        className="col-span-3 bg-[#1787ff] text-white p-2 rounded-md cursor-pointer hover:bg-[#1787ff]/80 transition-all duration-300"
      >
        Submit
      </button>
    </form>
  );
}
