"use client";

import React from "react";
import Link from "next/link";
import { usePusherConnection } from "@/contexts/pusher-context";

export default function NavbarComponent() {
  const { connectionStatus } = usePusherConnection();
  const linkItems = [
    {
      label: "Staff View",
      href: "/staff",
    },
    {
      label: "Patient Form",
      href: "/patient",
    },
  ];

  const renderLinkItems = linkItems.map((item, index) => (
    <React.Fragment key={item.label}>
      <Link
        href={item.href}
        target="_blank"
        className=" border border-gray-300 px-4 py-2 rounded-md md:w-[130px] w-full font-semibold text-center relative transition-all duration-300 hover:bg-gray-100"
      >
        {index === 0 && (
          <div
            className={`w-[10px] h-[10px] rounded-full absolute top-[6px] right-[5px] transition-all duration-300 
              ${connectionStatus === "connected" ? "bg-green-500" : "bg-gray-500"}`}
          />
        )}
        {item.label}
      </Link>
    </React.Fragment>
  ));

  return (
    <nav className="w-full bg-white shadow-md p-8  justify-between items-center md:flex-row flex flex-col">
      <h1 className="text-[#1c1c1c] text-2xl font-bold shrink-0">
        Agnos Assignment
      </h1>
      <div className="flex items-center gap-4 mt-4 md:mt-0 md:w-auto w-full">
        {renderLinkItems}
      </div>
    </nav>
  );
}
