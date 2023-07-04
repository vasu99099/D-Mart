import * as Yup from "yup";

export const addressSchema = Yup.object({
  FullName: Yup.string()
    .trim()
    .min(2)
    .max(25)
    .required()
    .matches(/^[a-z\s]+$/, "Only alphabetic characters allowed"),
  PinCode: Yup.string()
    .length(6)
    .matches(/^[0-9]{6}/)
    .required(),
  Area: Yup.string().trim().min(2).required(),
  Locality: Yup.string().trim().min(2).required(),
  Floor: Yup.string().trim().min(2).max(25).required(),
  Landmark: Yup.string().trim().min(2),
  city: Yup.string().trim().min(2).max(25).required(),
  state: Yup.string().trim().min(2).max(25).required(),
  Phone: Yup.string().trim().min(10).max(10).required(),
});
