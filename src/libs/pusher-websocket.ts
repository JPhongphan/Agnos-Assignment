// 1. ต้องติดตั้งทั้งสองตัว: npm install pusher pusher-js
import PusherServer from "pusher"; // สำหรับ Server
import PusherClient from "pusher-js"; // สำหรับ Client (Browser)

let pusherServerInstance: PusherServer | null = null;
let pusherClientInstance: PusherClient | null = null;

// --- สำหรับฝั่ง SERVER (ใช้ใน API Routes เท่านั้น) ---
// ใช้ APP_PUSHER_* จาก .env (ต้องมีครบ)
export const getPusherServer = () => {
  if (!pusherServerInstance) {
    const appId = process.env.APP_PUSHER_ID;
    const key = process.env.APP_PUSHER_KEY;
    const secret = process.env.APP_PUSHER_SECRET;
    const cluster = process.env.APP_PUSHER_CLUSTER;
    if (!appId || !key || !secret || !cluster) {
      throw new Error(
        "Missing Pusher env: set APP_PUSHER_ID, APP_PUSHER_KEY, APP_PUSHER_SECRET, APP_PUSHER_CLUSTER in .env"
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

// --- สำหรับฝั่ง CLIENT (ใช้ในหน้า Staff/Patient) ---
// ใช้ NEXT_PUBLIC_PUSHER_* (ถ้าไม่มี ให้เพิ่มใน .env ด้วยค่าเดียวกับ APP_PUSHER_KEY / APP_PUSHER_CLUSTER)
export const getPusherClient = () => {
  if (typeof window !== "undefined") {
    if (!pusherClientInstance) {
      const key = process.env.NEXT_PUBLIC_PUSHER_KEY ?? process.env.APP_PUSHER_KEY;
      const cluster = process.env.NEXT_PUBLIC_PUSHER_CLUSTER ?? process.env.APP_PUSHER_CLUSTER ?? "ap1";

      if (!key || !cluster) {
        console.error("Pusher Client: set NEXT_PUBLIC_PUSHER_KEY and NEXT_PUBLIC_PUSHER_CLUSTER (or APP_*) in .env");
        return null;
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
