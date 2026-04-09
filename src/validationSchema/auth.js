import { z } from "zod";
import validator from "validator";

export const signUpSchema =
  z.object({
    firstName: z
      .string()
      .min(2, "First name must be between 2 and 50 characters long.")
      .max(50, "First name must be between 2 and 50 characters long."),

    lastName: z
      .string()
      .min(2, "Last name must be between 2 and 50 characters long.")
      .max(50, "Last name must be between 2 and 50 characters long.")
      .optional(),

    emailId: z
      .string()
      .refine((val) => validator.isEmail(val), {
        message: "Please provide valid email id.",
      }),

    phoneNumber: z
      .string()
      .refine((val) => validator.isMobilePhone(val), {
        message: "Please provide valid phone number.",
      }),

    password: z
      .string()
      .refine(
        (val) =>
          validator.isStrongPassword(val, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
          }),
        {
          message:
            "Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one number, and one symbol",
        }
      ),

    gender: z.enum(["Male", "Female", "Others"]).optional(),
    age: z.number().min(13, "Age must be at least 13").max(100, "Age must be at most 100").optional(),

    photoUrl: z
      .string()
      .optional()
      .refine((val) => !val || validator.isURL(val), {
        message: "Please provide valid URL for photo.",
      }),

    skills: z
      .array(z.string())
      .max(20, "You can add minimum 1 skill and maximum 20 skills.")
      .optional(),

    about: z
      .string()
      .min(10, "About must be a between 10 to 200 characters long.")
      .max(200, "About must be a between 10 to 200 characters long.").optional(),
  })
  .superRefine((data, ctx) => {
    // Required fields only for signup
    // if (isSignup) {
      if (!data.firstName || !data.emailId || !data.phoneNumber || !data.password) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            "firstName, emailId, phoneNumber and password are required fields.",
        });
      }
    // }
  });

  export const updateSchema = z
  .object({
    firstName: z.string().min(2).max(50).optional(),
    lastName: z.string().min(2).max(50).optional(),
    phoneNumber: z.string().optional(),
    password: z.string().optional(),
    photoUrl: z.string().optional(),
    skills: z.array(z.string()).max(20).optional(),
    about: z.string().min(10).max(200).optional(),
  })
  .refine((data) => {
    const NOT_ALLOWED_UPDATES = ["emailId", "createdAt", "updatedAt", "__v"];
    return Object.keys(data).every((k) => !NOT_ALLOWED_UPDATES.includes(k));
  }, {
    message:
      "Invalid updates! You cannot update emailId, createdAt, updatedAt, or __v",
  });