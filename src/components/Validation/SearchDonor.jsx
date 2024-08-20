import * as yup from "yup";

export const SearchDonorSchema = yup.object().shape({
  district: yup.string().required("District is required"),
  bloodGroup: yup.string().required("Blood group is required"),
});