"use client";
import React from "react";
import { useEffect, useState } from "react";
import { usePusherConnection } from "@/contexts/pusher-context";
import HeaderComponent from "@/components/header.component";
import ActionStatusCard from "./components/action-status-card";
import { FORM_ITEMS } from "@/app/patient/constants/form-constant";

type TFormDataPayload = {
  key: string;
  value?: string;
  required?: boolean;
  isFocused?: boolean;
};

const formatDateDDMMYYYY = (value?: string) => {
  if (!value) return "";
  const [year, month, day] = value.split("-");
  if (!year || !month || !day) return value;

  return `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`;
};

const formatFieldValue = (
  item: (typeof FORM_ITEMS)[number],
  value?: string,
) => {
  if (!value) return "";

  if (item.type === "date") {
    return formatDateDDMMYYYY(value);
  }

  return value;
};

export default function StaffPage() {
  const { getPusherClient } = usePusherConnection();
  const formItems = FORM_ITEMS;
  const [actionStatus, setActionStatus] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<number>(0);
  const [submissions, setSubmissions] = useState<
    Record<string, { value?: string; required?: boolean; isFocused?: boolean }>
  >({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = window.localStorage.getItem("staff-submissions");
      if (stored) {
        try {
          const parsed = JSON.parse(stored) as Record<
            string,
            { value?: string; required?: boolean; isFocused?: boolean }
          >;
          setSubmissions(parsed);
        } catch {}
      }
    }

    const pusher = getPusherClient();
    if (!pusher) {
      return;
    }

    const channel = pusher.subscribe("patient-form");
    channel.bind("update-form", (data: TFormDataPayload) => {
      if (data.key === "form-clear") {
        setSubmissions({});
        setActionStatus(null);
        localStorage.removeItem("staff-submissions");
        console.log("form-clear");
        return;
      } else if (data.key === "submit") {
        setSubmissions({});
        setActionStatus("saved");
        localStorage.removeItem("staff-submissions");
        return;
      } else {
        setSubmissions((prev) => ({
          ...prev,
          [data.key]: {
            value: data.value,
            required: data.required,
            isFocused: data.isFocused,
          },
        }));
        setLastUpdate(Date.now());
        setActionStatus("active");
      }
    });

    return () => {
      channel.unbind_all();
      pusher.unsubscribe("patient-form");
    };
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(
        "staff-submissions",
        JSON.stringify(submissions),
      );
    }
  }, [submissions]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (actionStatus === "active") {
      timer = setTimeout(() => {
        setActionStatus("inactive");
      }, 5000);
    } else if (actionStatus === "saved") {
      timer = setTimeout(() => {
        setActionStatus(null);
      }, 10000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [actionStatus, lastUpdate]);

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
                  {formatFieldValue(item, submissions[item.key]?.value)}
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
