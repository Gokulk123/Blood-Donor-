import * as yup from "yup";

export const SearchDonorSchema = yup.object().shape({
  districtId: yup.string().required("District is required"),
  bloodGroupId: yup.string().required("Blood group is required"),
});