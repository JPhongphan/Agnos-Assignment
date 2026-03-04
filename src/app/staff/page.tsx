"use client";
import React from "react";
import { useEffect, useState } from "react";
import { getPusherClient } from "@/libs/pusher-websocket";
import HeaderComponent from "@/components/header.component";
import { FORM_ITEMS } from "@/app/patient/constants/form-constant";
import ActionStatusCard from "./components/action-status-card";

type TFormDataPayload = {
  key: string;
  value?: string;
  required?: boolean;
  isFocused?: boolean;
};

export default function StaffPage() {
  const formItems = FORM_ITEMS;
  const [actionStatus, setActionStatus] = useState<string | null>(null);
  const [submissions, setSubmissions] = useState<
    Record<string, { value?: string; required?: boolean; isFocused?: boolean }>
  >({});

  useEffect(() => {
    const pusher = getPusherClient();
    if (!pusher) {
      return;
    }

    const channel = pusher.subscribe("patient-form");
    channel.bind("update-form", (data: TFormDataPayload) => {
      setSubmissions((prev) => ({
        ...prev,
        [data.key]: {
          value: data.value,
          required: data.required,
          isFocused: data.isFocused,
        },
      }));
      if (actionStatus !== "active") {
        setActionStatus("active");
      }
    });

    return () => {
      channel.unbind_all();
      pusher.unsubscribe("patient-form");
    };
  }, []);

  useEffect(() => {
    if (actionStatus === "active") {
      setTimeout(() => {
        setActionStatus("inactive");
      }, 10000);
    }
  }, [actionStatus]);

  return (
    <div className="w-full h-full flex flex-col my-8">
      <HeaderComponent
        bgColor="bg-header-staff"
        title="Staff View - Real-Time Patient Information"
        description="Live updates as patient enters information."
      />
      <ActionStatusCard status={actionStatus!} />

      <div className="w-full flex-1 rounded-b-[20px] bg-white shadow-md p-8">
        <div className="grid  grid-cols-2 gap-4 form-container">
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
                className={` form-group ${
                  item.inputType === "textarea"
                    ? "col-span-2"
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
                <div
                  className={` border  py-[10px] px-[16px] rounded-lg ${
                    item.inputType === "textarea" ? "h-[70.17px]" : "h-[46.2px]"
                  }  ${
                    submissions[item.key]?.isFocused
                      ? "border-[#47a0ff]"
                      : "border-[#d1d1d1]"
                  }`}
                >
                  {submissions[item.key]?.value ?? ""}
                </div>
                <p className={`text-xs ${"text-transparent"}`}>"&nbsp;"</p>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
