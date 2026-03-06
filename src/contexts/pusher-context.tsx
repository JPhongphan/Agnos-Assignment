"use client";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  type PusherConnectionStatus,
  getPusherClientFromService,
  subscribeToPusherConnectionStatus,
} from "@/services/pusher";

type PusherContextValue = {
  connectionStatus: PusherConnectionStatus;
  getPusherClient: typeof getPusherClientFromService;
};
const PusherContext = createContext<PusherContextValue | null>(null);

export function PusherProvider({ children }: { children: React.ReactNode }) {
  const [connectionStatus, setConnectionStatus] =
    useState<PusherConnectionStatus>("initialized");
  useEffect(() => subscribeToPusherConnectionStatus(setConnectionStatus), []);
  const getPusherClient = useCallback(() => getPusherClientFromService(), []);
  const value: PusherContextValue = {
    connectionStatus,
    getPusherClient,
  };
  return (
    <PusherContext.Provider value={value}>{children}</PusherContext.Provider>
  );
}

export function usePusherConnection(): PusherContextValue {
  const context = useContext(PusherContext);
  if (!context) {
    throw new Error("usePusherConnection must be used within a PusherProvider");
  }
  return context;
}
