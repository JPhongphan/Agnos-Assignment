import PusherServer from "pusher";
import PusherClient from "pusher-js";

let pusherServerInstance: PusherServer | null = null;
let pusherClientInstance: PusherClient | null = null;

//NOTE: This is the pusher credentials for the development environment
const APP_PUSHER_ID = "2122692";
const APP_PUSHER_KEY = "11789d4ba7ae96d569af";
const APP_PUSHER_SECRET = "a1b221f2db0c28f0c0f5";
const APP_PUSHER_CLUSTER = "ap1";

export const getPusherServer = () => {
  if (!pusherServerInstance) {
    const appId = APP_PUSHER_ID;
    const key = APP_PUSHER_KEY;
    const secret = APP_PUSHER_SECRET;
    const cluster = APP_PUSHER_CLUSTER;
    if (!appId || !key || !secret || !cluster) {
      throw new Error(
        "Missing Pusher env: set APP_PUSHER_ID, APP_PUSHER_KEY, APP_PUSHER_SECRET, APP_PUSHER_CLUSTER in .env",
      );
    }
    pusherServerInstance = new PusherServer({
      appId,
      key,
      secret,
      cluster,
      useTLS: true,
    });
  }
  return pusherServerInstance;
};

export const getPusherClient = () => {
  if (typeof window !== "undefined") {
    if (!pusherClientInstance) {
      const key = APP_PUSHER_KEY;
      const cluster = APP_PUSHER_CLUSTER;

      if (!key || !cluster) {
        throw new Error("Key or cluster is missing");
      }

      pusherClientInstance = new PusherClient(key, {
        cluster,
        forceTLS: true,
      });
    }
    return pusherClientInstance;
  }
  return null;
};
