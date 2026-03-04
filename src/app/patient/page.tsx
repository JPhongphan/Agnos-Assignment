"use client";
import React from "react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FORM_ITEMS } from "@/app/patient/constants/form-constant";
import { patientFormSchema, TPatientFormSchema } from "@/types/patient";

import HeaderComponent from "@/components/header.component";

export default function PatientPage() {
  const formItems = FORM_ITEMS;

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
    (field: string, value: string, required: boolean, isFocused: boolean) => {
      fetch("/api/pusher", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: field,
          value: value,
          required: required,
          isFocused: isFocused,
        }),
      });
    },
    [],
  );

  const handleOnFocus = useCallback(
    (field: string, value: string, required: boolean, isFocused: boolean) => {
      fetch("/api/pusher", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: field,
          value: value,
          required: required,
          isFocused: isFocused,
        }),
      });
      console.log(field, isFocused);
    },
    [],
  );

  return (
    <div className="w-full h-full flex flex-col my-8">
      <HeaderComponent
        bgColor="bg-header-patient"
        title="Patient Form"
        description="Please fill in the form below to submit your information."
      />
      <div className="w-full flex-1 rounded-b-[20px] bg-white shadow-md p-8">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-4 form-container"
        >
          {formItems.map((item, index) => (
            <React.Fragment key={item.key}>
              {index === 10 ? (
                <div className="w-full  col-span-2 mb-4 border-t border-[#e8e8e8] pt-8 flex items-center gap-2">
                  <img
                    src="/assets/icons/icon-persontwo.svg"
                    alt="Person"
                    className="w-6 h-6"
                  />
                  <h3 className="text-[18px] font-semibold">
                    Emergency Contact
                  </h3>
                </div>
              ) : null}
              <div
                className={`col-span-1 form-group ${
                  item.inputType === "textarea"
                    ? "col-span-2 "
                    : "md:col-span-1 col-span-2"
                }`}
              >
                <label
                  htmlFor={item.key}
                  className="font-medium flex items-center gap-1"
                >
                  {item.icon ? (
                    <img
                      src={`/assets/icons/${item.icon}`}
                      alt={item.label}
                      className="w-4 h-4"
                    />
                  ) : null}
                  {item.label}
                  {item.required ? (
                    <small className="text-[#ff6363]">*</small>
                  ) : (
                    " (Optional)"
                  )}
                </label>
                {item.inputType === "input" ? (
                  <input
                    className={
                      errors[item.key as keyof TPatientFormSchema]
                        ? "invalid"
                        : ""
                    }
                    type={item.type}
                    id={item.key}
                    onFocus={(e) => {
                      handleOnFocus(
                        item.key as string,
                        e.target.value,
                        item.required,
                        true,
                      );
                    }}
                    {...register(item.key as keyof TPatientFormSchema, {
                      onBlur: (e) => {
                        handleOnFocus(
                          item.key as string,
                          e.target.value,
                          item.required,
                          false,
                        );
                      },
                      onChange: (e) => {
                        handleInputChange(
                          item.key as string,
                          e.target.value,
                          item.required,
                          true,
                        );
                      },
                    })}
                    placeholder={item.placeholder}
                  />
                ) : null}
                {item.inputType === "textarea" ? (
                  <textarea
                    className={
                      errors[item.key as keyof TPatientFormSchema]
                        ? "invalid border-red-500"
                        : ""
                    }
                    id={item.key}
                    onFocus={(e) => {
                      handleOnFocus(
                        item.key as string,
                        e.target.value,
                        item.required,
                        true,
                      );
                    }}
                    {...register(item.key as keyof TPatientFormSchema, {
                      onBlur: (e) => {
                        handleOnFocus(
                          item.key as string,
                          e.target.value,
                          item.required,
                          false,
                        );
                      },
                      onChange: (e) => {
                        handleInputChange(
                          item.key as string,
                          e.target.value,
                          item.required,
                          true,
                        );
                      },
                    })}
                  />
                ) : null}
                {item.inputType === "select" ? (
                  <select
                    className={
                      errors[item.key as keyof TPatientFormSchema]
                        ? "invalid"
                        : ""
                    }
                    id={item.key}
                    onFocus={(e) => {
                      handleOnFocus(
                        item.key as string,
                        e.target.value,
                        item.required,
                        true,
                      );
                    }}
                    {...register(item.key as keyof TPatientFormSchema, {
                      onBlur: (e) => {
                        handleOnFocus(
                          item.key as string,
                          e.target.value,
                          item.required,
                          false,
                        );
                      },
                      onChange: (e) => {
                        handleInputChange(
                          item.key as string,
                          e.target.value,
                          item.required,
                          true,
                        );
                      },
                    })}
                  >
                    {item.options?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : null}
                <p
                  className={`text-xs ${
                    errors[item.key as keyof TPatientFormSchema]
                      ? "text-[#ff6363]"
                      : "text-transparent"
                  }`}
                >
                  {errors[item.key as keyof TPatientFormSchema]?.message ||
                    "&nbsp;"}
                </p>
              </div>
            </React.Fragment>
          ))}
          <div className="col-span-2 flex justify-end">
            <button
              type="submit"
              className="md:w-[200px] w-full  bg-[#2563eb] text-white p-2 rounded-md cursor-pointer hover:bg-[#2563eb]/80 transition-all duration-300"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
