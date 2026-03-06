# Agnos Assignment

## Overview

This is a Next.js application that provides a **Patient Form** and a **Staff View** for capturing and monitoring patient information in real time.

- **Patient Form** (`/patient`): Patients fill in a validated form (personal details, contact, emergency contact, etc.). As they type, changes are sent to the backend and broadcast via Pusher.
- **Staff View** (`/staff`): Staff see the same form fields updating live as the patient enters data. An action status card shows whether the session is active, inactive, or saved.

The app uses **React Hook Form** with **Zod** for validation, **Pusher** for real-time sync, and **Tailwind CSS** for styling. The root path `/` redirects to `/patient`.

---

## Setup Instructions

### Prerequisites

- **Node.js** (v18 or later recommended)
- **npm** (or yarn/pnpm)

### Steps

1. **Clone the repository** (if not already done):
   ```bash
   git clone <repository-url>
   cd Agnos-Assignment
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment (optional)**  
   The project can run with built-in development Pusher credentials. For production or custom keys, configure Pusher in your environment or in `src/libs/pusher-websocket.ts` (e.g. via `process.env`):
   - `APP_PUSHER_ID`
   - `APP_PUSHER_KEY`
   - `APP_PUSHER_SECRET`
   - `APP_PUSHER_CLUSTER`

4. **Run the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000). You will be redirected to `/patient`.

5. **Build for production**:
   ```bash
   npm run build
   npm start
   ```

6. **Lint**:
   ```bash
   npm run lint
   ```

---

## Bonus Features

- **Real-time sync**: Patient form field changes (focus, blur, change) are sent to the API and broadcast via Pusher so the Staff View updates live without refresh.
- **Pusher connection status**: A React context exposes Pusher connection state (e.g. connecting, connected, error) for the app to use (e.g. UI indicators).
- **Action status card (Staff View)**: Shows whether the current session is *active* (recent typing), *inactive* (no recent activity), or *saved* (form submitted), with automatic time-based transitions.
- **Form validation**: Client-side validation with Zod and React Hook Form (required fields, email format, phone length, etc.) with inline error messages.
- **Persistence in Staff View**: Current field values are stored in `localStorage` (`staff-submissions`) so they survive page refresh until the form is cleared or submitted.
- **Clear / Submit handling**: “Form clear” and “Submit” actions are broadcast via Pusher so the Staff View clears or shows “saved” state in sync with the patient.
