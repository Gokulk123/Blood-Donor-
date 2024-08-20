import * as yup from "yup";

export const NewDonorschema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  phone: yup.string().matches(/^[0-9]{10}$/, "Phone number must be 10 digits").required("Phone number is required"),
  district: yup.string().required("District is required"),
  bloodGroup: yup.string().required("Blood group is required"),
});