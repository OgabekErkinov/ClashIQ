import { schema } from "@hookform/resolvers/ajv/src/__tests__/__fixtures__/data.js";
import * as yup from "yup";

export const loginSchema = yup.object({
  username: yup.string().max(20).notRequired(),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
  rePassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .notRequired(),
});

export type FormFields = yup.InferType<typeof schema>;

