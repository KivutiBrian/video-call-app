"use server";

import * as Yup from "yup";
import { customEndpoint } from "@directus/sdk";
import directusClient from "../directus";

const serverUserSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("First Name is required")
    .trim(),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Last Name is required")
    .trim(),
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required")
    .trim(),
  password: Yup.string().min(8, "Too Short!").required("Password is required"),
});

export async function signUp(
  prevState: {
    success: boolean;
    message?: string;
    errors?: Record<string, string>;
  },
  formData: FormData
): Promise<{
  success: boolean;
  message?: string;
  errors?: Record<string, string>;
}> {
  const firstName = formData.get("firstname");
  const lastName = formData.get("lastname");
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    // Validate data using Yup on the server
    await serverUserSchema.validate(
      { firstName, email, password },
      { abortEarly: false } // Collect all errors, not just the first one
    );

    console.log(firstName, lastName, email, password);

    // await directusClient.request(
    //   customEndpoint({ path: "authentication/signup", method: "POST" })
    // );

    return { success: true, message: "Signup successful" };
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      // If Yup validation fails, return the errors
      const errors: Record<string, string> = {};
      error.inner.forEach((err) => {
        if (err.path) {
          errors[err.path] = err.message;
        }
      });
      return {
        success: false,
        message: "Server-side validation failed.",
        errors,
      };
    }
    // Handle other unexpected errors
    console.error("Unexpected server error:", error);
    return {
      success: false,
      message: "An unexpected error occurred.",
    };
  }
}
