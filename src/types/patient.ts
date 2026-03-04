import { z } from "zod";

export const patientFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name is required"),
  dob: z.string().min(1, "Date of birth is required"),
  gender: z
    .string({
      error: "Gender is required",
    })
    .min(1, "Gender is required"),
  phoneNumber: z
    .string()
    .min(10, "Phone number is required")
    .max(10, "Phone number must be 10 digits"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(1, "Address is required"),
  preferredLanguage: z.string().min(1, "Preferred language is required"),
  nationality: z.string().min(1, "Nationality is required"),
  contactName: z.string().optional(),
  relationship: z.string().optional(),
  religion: z.string().optional(),
});

export type TPatientFormSchema = z.infer<typeof patientFormSchema>;

// export interface IPatientFormData {
//   firstName: string;
//   middleName?: string;
//   lastName: string;
//   dob: string;
//   gender: TGender;
//   phoneNumber: string;
//   email: string;
//   address: string;
//   preferredLanguage: string;
//   nationality: string;
//   emergencyContact?: IEmergencyContactData;
//   religion?: string;
//   status: TStatus;
// }

// export interface IEmergencyContactData {
//   name: string;
//   relationship: string;
// }

// type TGender = "male" | "female" | "other";
// type TStatus = "active" | "inactive" | "submitted";
