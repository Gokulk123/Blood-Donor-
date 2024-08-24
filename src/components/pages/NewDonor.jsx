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
import '../css/NewDonor.css';

const NewDonor = () => {
  const [districtDropdownData, setDistrictDropdownData] = useState([]);
  const [bloodGroupDropdownData, setBloodGroupDropdownData] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm({
    resolver: yupResolver(NewDonorschema),
  });

   const [donorData, setDonorData] = useState({
    name: "",
    email: "",
    mobile: "",
    bloodGroupId: "",
    districtId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDonorData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

 const onSubmit = async () => {
  try {
    const response = await fetch("http://127.0.0.1:8000/user/new-donor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(donorData),
    });

    if (response.ok) {
      const data = await response.json();
      setMessage(data.message || "New donor created successfully.");
      setError("");
      reset();
    } else {
      const errorData = await response.json();
      setMessage("");
      setError(errorData.error || "Failed to create donor.");
    }
  } catch (error) {
    setMessage("");
    setError("An error occurred while creating the donor.");
  }
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
                  error={!!errors.name && !donorData.name}
                  helperText={!donorData.name && errors.name ? errors.name.message : ""}
                  id="standard-basic"
                  onChange={handleChange}
                  value={donorData.name || ""}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email"
                  variant="standard"
                  {...register("email")}
                  error={!!errors.email && !donorData.email}
                  helperText={!donorData.email && errors.email ? errors.email.message : ""}
                  id="standard-basic"
                  onChange={handleChange}
                  value={donorData.email || ""}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  variant="standard"
                  {...register("mobile")}
                  error={!!errors.mobile && !donorData.mobile}
                  helperText={!donorData.mobile && errors.mobile ? errors.mobile.message : ""}
                  id="standard-basic"
                  onChange={handleChange}
                  value={donorData.mobile || ""}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="District"
                  variant="standard"
                  {...register("districtId")}
                  error={!!errors.districtId && !donorData.districtId}
                  helperText={!donorData.districtId && errors.districtId ? errors.districtId.message : ""}
                  select
                  id="standard-basic"
                  onChange={handleChange}
                  value={donorData.districtId || ""}
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
                  {...register("bloodGroupId")}
                  error={!!errors.bloodGroupId && !donorData.bloodGroupId}
                  helperText={
                    !donorData.bloodGroupId && errors.bloodGroupId ? errors.bloodGroupId.message : ""
                  }
                  select
                  id="standard-basic"
                  onChange={handleChange}
                  value={donorData.bloodGroupId || ""}
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
          {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
        </CardContent>
      </Card>
    </div>
  );
};

export default NewDonor;
