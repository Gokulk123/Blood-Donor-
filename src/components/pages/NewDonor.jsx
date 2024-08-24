import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  CardActions,
  Button,
  Grid,
  MenuItem,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { NewDonorschema } from "../Validation/NewDonor";
import { getCommonMasterData } from "../../api/api";
// import '../css/NewDonor.css';

const NewDonor = () => {
  const [districtDropdownData, setDistrictDropdownData] = useState([]);
  const [bloodGroupDropdownData, setBloodGroupDropdownData] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(NewDonorschema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  useEffect(() => {
    getCommonMasterData('http://127.0.0.1:8000/master/districts')
      .then((data) => {
        if (data) {
          setDistrictDropdownData(data); // Update the state with the fetched data
        }
      })
      .catch((error) => {
        console.error("Failed to fetch districts:", error);
      });

      getCommonMasterData('http://127.0.0.1:8000/master/blood_groups')
      .then((data) => {
        if (data) {
          setBloodGroupDropdownData(data); // Update the state with the fetched data
        }
      })
      .catch((error) => {
        console.error("Failed to fetch districts:", error);
      });
  }, []);

  return (
    <div>
      <Card
        sx={{
          maxWidth: 600, // Medium width
          minHeight: 500, // Medium height
          margin: "auto",
          padding: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transition: "background-color 0.5s ease",
        }}
      >
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography sx={{ fontSize: "16px", fontWeight: 600 }} variant="h6">
              Create New Donor
            </Typography>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Name"
                  variant="standard"
                  {...register("name")}
                  error={!!errors.name}
                  helperText={errors.name ? errors.name.message : ""}
                  id="standard-basic"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email"
                  variant="standard"
                  {...register("email")}
                  error={!!errors.email}
                  helperText={errors.email ? errors.email.message : ""}
                  id="standard-basic"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  variant="standard"
                  {...register("phone")}
                  error={!!errors.phone}
                  helperText={errors.phone ? errors.phone.message : ""}
                  id="standard-basic"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="District"
                  variant="standard"
                  {...register("district")}
                  error={!!errors.district}
                  helperText={errors.district ? errors.district.message : ""}
                  select
                  id="standard-basic"
                >
                  {districtDropdownData?.map((district) => (
                    <MenuItem key={district.id} value={district.id}>
                      {district.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Blood Group"
                  variant="standard"
                  {...register("bloodGroup")}
                  error={!!errors.bloodGroup}
                  helperText={
                    errors.bloodGroup ? errors.bloodGroup.message : ""
                  }
                  select
                  id="standard-basic"
                >
                  {bloodGroupDropdownData?.map((bloodGroup) => (
                    <MenuItem key={bloodGroup.id} value={bloodGroup.id}>
                      {bloodGroup.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}></Grid>
            </Grid>
            <CardActions sx={{ mt: 2, justifyContent: "center" }}>
              <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>
            </CardActions>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewDonor;
