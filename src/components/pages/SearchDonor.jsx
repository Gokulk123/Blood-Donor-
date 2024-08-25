import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  CardActions,
  Button,
  Grid,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SearchDonorSchema } from "../Validation/SearchDonor";
import DonorList from "./DonorList";
import { getCommonMasterData } from "../../api/api";
import { BLOOD_GROUPS, DISTRICTS, GET_DONORS } from "../../common/url/url";

const SearchDonor = () => {
  const [districtDropdownData, setDistrictDropdownData] = useState([]);
  const [bloodGroupDropdownData, setBloodGroupDropdownData] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SearchDonorSchema),
  });

  const [donors, setDonors] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedRows = donors.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const onSubmit = (data) => {
    fetch(`${GET_DONORS}?districtId=${data?.districtId}&bloodGroupId=${data?.bloodGroupId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setDonors(data.data);
      })
      .catch((error) => {
        setDonors([]);
      });
  };

  useEffect(() => {
    getCommonMasterData(DISTRICTS)
      .then((data) => {
        if (data) {
          setDistrictDropdownData(data);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch districts:", error);
      });

    getCommonMasterData(BLOOD_GROUPS)
      .then((data) => {
        if (data) {
          setBloodGroupDropdownData(data);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch districts:", error);
      });
  }, []);

  return (
    <Card
      sx={{
        width: { md: "800px", sm: "500px", xs: "400px" },
        margin: "0",
        borderRadius: 2,
        boxShadow: 3,
        height: { md: "500px", sm: "650px", xs: "600px" },
      }}
    >
      <CardContent
        sx={{
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{ fontSize: { xs: "20px", md: "24px" }, fontWeight: 600, mb: 3 }}
          variant="h5"
        >
          Find Donors
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <Grid container spacing={3}>
            <Grid item sm={12} md={4} xs={12}>
              <FormControl fullWidth variant="outlined" size="medium">
                <InputLabel>District</InputLabel>
                <Select
                  label="District"
                  {...register("districtId")}
                  error={!!errors.districtId}
                  sx={{ fontSize: { xs: "14px", sm: "16px" }, height: "56px" }}
                >
                  {districtDropdownData?.map((district) => (
                    <MenuItem key={district.id} value={district.id}>
                      {district.name}
                    </MenuItem>
                  ))}
                </Select>
                {errors.districtId && (
                  <Typography color="error" variant="caption">
                    {errors.districtId.message}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            <Grid item sm={12} md={4} xs={12}>
              <FormControl fullWidth variant="outlined" size="medium">
                <InputLabel>Blood Group</InputLabel>
                <Select
                  label="Blood Group"
                  {...register("bloodGroupId")}
                  error={!!errors.bloodGroupId}
                  sx={{ fontSize: { xs: "14px", sm: "16px" }, height: "56px" }}
                >
                  {bloodGroupDropdownData?.map((bloodGroup) => (
                    <MenuItem key={bloodGroup.id} value={bloodGroup.id}>
                      {bloodGroup.name}
                    </MenuItem>
                  ))}
                </Select>
                {errors.bloodGroupId && (
                  <Typography color="error" variant="caption">
                    {errors.bloodGroupId.message}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            <Grid item sm={12} md={4} xs={12}>
              <CardActions sx={{ justifyContent: "center" }}>
                <Button variant="contained" color="primary" type="submit">
                  Apply Filters
                </Button>
              </CardActions>
            </Grid>
          </Grid>
        </form>
      </CardContent>
      <CardContent
        sx={{
          flexGrow: 1,
          padding: 1,
          overflow: "auto",
        }}
      >
        <Typography
          sx={{ fontSize: "20px", fontWeight: 600, mb: 2 }}
          variant="h6"
        >
          Donor List
        </Typography>
        <DonorList
          paginatedRows={paginatedRows}
          count={donors.length}
          rowsPerPage={rowsPerPage}
          page={page}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </CardContent>
    </Card>
  );
};

export default SearchDonor;
