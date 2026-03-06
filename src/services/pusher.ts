"use client";

import { getPusherClient } from "@/libs/pusher-websocket";

export type PusherConnectionStatus =
  | "initialized"
  | "connecting"
  | "connected"
  | "unavailable"
  | "failed"
  | "disconnected"
  | "reconnecting"
  | "error";

type ConnectionStatusCallback = (status: PusherConnectionStatus) => void;

export function subscribeToPusherConnectionStatus(
  callback: ConnectionStatusCallback,
): () => void {
  if (typeof window === "undefined") {
    callback("error");
    return () => {};
  }

  const pusher = getPusherClient();
  if (!pusher) {
    callback("error");
    return () => {};
  }

  const { connection } = pusher;

  const handleStateChange = (states: { current: string }) => {
    const status = states.current as PusherConnectionStatus;
    callback(status);
  };

  connection.bind("state_change", handleStateChange);
  callback(connection.state as PusherConnectionStatus);

  return () => {
    connection.unbind("state_change", handleStateChange);
  };
}

export function getPusherClientFromService() {
  return getPusherClient();
}
