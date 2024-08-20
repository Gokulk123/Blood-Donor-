import React, { useState } from "react";
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

const SearchDonor = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SearchDonorSchema),
  });

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Sample data for the table
  const sampleData = Array.from({ length: 50 }, (_, index) => ({
    name: `Donor ${index + 1}`,
    district: `District ${(index % 3) + 1}`,
    bloodGroup: `Blood Group ${(index % 8) + 1}`,
  }));

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when rows per page changes
  };

  // Calculate the rows to display on the current page
  const paginatedRows = sampleData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const onSubmit = (data) => {
    console.log("Filter data:", data);
    // Implement filtering based on the `data` and update the table as needed
  };

  return (
    <Card
      sx={{
        width: { md: "800px", sm: "500px", xs: "400px" }, // Full width of the viewport
        margin: "0", // Remove default margin
        borderRadius: 2, // Rounded corners
        boxShadow: 3, // Shadow for card
        height: { md: "500px", sm: "650px", xs: "600px" },
      }}
    >
      <CardContent
        sx={{
          padding: 4, // Padding inside the card
          display: "flex",
          flexDirection: "column",
          alignItems: "center", // Center content horizontally,
        }}
      >
        <Typography
          sx={{ fontSize: { xs: "20px", md: "24px" }, fontWeight: 600, mb: 3 }} // Responsive font size
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
                  {...register("district")}
                  error={!!errors.district}
                  sx={{ fontSize: { xs: "14px", sm: "16px" }, height: "56px" }} // Responsive font size and height
                >
                  <MenuItem value="district1">District 1</MenuItem>
                  <MenuItem value="district2">District 2</MenuItem>
                  <MenuItem value="district3">District 3</MenuItem>
                </Select>
                {errors.district && (
                  <Typography color="error" variant="caption">
                    {errors.district.message}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            <Grid item sm={12} md={4} xs={12}>
              <FormControl fullWidth variant="outlined" size="medium">
                <InputLabel>Blood Group</InputLabel>
                <Select
                  label="Blood Group"
                  {...register("bloodGroup")}
                  error={!!errors.bloodGroup}
                  sx={{ fontSize: { xs: "14px", sm: "16px" }, height: "56px" }} // Responsive font size and height
                >
                  <MenuItem value="A+">A+</MenuItem>
                  <MenuItem value="A-">A-</MenuItem>
                  <MenuItem value="B+">B+</MenuItem>
                  <MenuItem value="B-">B-</MenuItem>
                  <MenuItem value="AB+">AB+</MenuItem>
                  <MenuItem value="AB-">AB-</MenuItem>
                  <MenuItem value="O+">O+</MenuItem>
                  <MenuItem value="O-">O-</MenuItem>
                  {/* Add more options as needed */}
                </Select>
                {errors.bloodGroup && (
                  <Typography color="error" variant="caption">
                    {errors.bloodGroup.message}
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
          flexGrow: 1, // Allow the content to expand and use available space
          padding: 1,
          overflow: "auto", // Ensure scrolling if content overflows
        }}
      >
        <Typography
          sx={{ fontSize: "20px", fontWeight: 600, mb: 2 }}
          variant="h6"
        >
          Donor List
        </Typography>
        <DonorList paginatedRows={paginatedRows}  count={sampleData.length}
         rowsPerPage = {rowsPerPage} page={page} handleChangePage={handleChangePage}
         handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </CardContent>
    </Card>
    // <Card
    //   sx={{
    //     width: '100%', // Full width for better responsiveness
    //     maxWidth: '1500px', // Maximum width for large screens
    //     margin: "auto",
    //     display: 'flex',
    //     flexDirection: 'column',
    //     boxShadow: 3,
    //     borderRadius: 2,
    //     marginTop: {md: '70px', xs:'60px'}
    //   }}
    // >
    //   <CardContent sx={{
    //       maxHeight: '500px', // Set a max height to enable scrolling
    //       overflowY: 'auto', // Enable vertical scrolling
    //       padding: 4,
    //     }}>
    //     <Typography
    //       sx={{ fontSize: { xs: "20px", md: "24px" }, fontWeight: 600, mb: 3, justifyContent:'left' }} variant="h5"
    //     >
    //       Filter Donors
    //     </Typography>
    //     <form onSubmit={handleSubmit(onSubmit)}>
    //       <Grid container spacing={3}>
    //         <Grid item xs={12} md={6}>
    //           <FormControl fullWidth variant="outlined" size="medium">
    //             <InputLabel>District</InputLabel>
    //             <Select
    //               label="District"
    //               {...register("district")}
    //               error={!!errors.district}
    //               sx={{ fontSize: { xs: "14px", sm: "16px" }, height: "56px" }} // Responsive font size and height
    //             >
    //               <MenuItem value="district1">District 1</MenuItem>
    //               <MenuItem value="district2">District 2</MenuItem>
    //               <MenuItem value="district3">District 3</MenuItem>
    //               {/* Add more options as needed */}
    //             </Select>
    //             {errors.district && (
    //               <Typography color="error" variant="caption">
    //                 {errors.district.message}
    //               </Typography>
    //             )}
    //           </FormControl>
    //         </Grid>
    //         <Grid item xs={12} md={6}>
    //           <FormControl fullWidth variant="outlined" size="medium">
    //             <InputLabel>Blood Group</InputLabel>
    //             <Select
    //               label="Blood Group"
    //               {...register("bloodGroup")}
    //               error={!!errors.bloodGroup}
    //               sx={{ fontSize: { xs: "14px", sm: "16px" }, height: "56px" }} // Responsive font size and height
    //             >
    //               <MenuItem value="A+">A+</MenuItem>
    //               <MenuItem value="A-">A-</MenuItem>
    //               <MenuItem value="B+">B+</MenuItem>
    //               <MenuItem value="B-">B-</MenuItem>
    //               <MenuItem value="AB+">AB+</MenuItem>
    //               <MenuItem value="AB-">AB-</MenuItem>
    //               <MenuItem value="O+">O+</MenuItem>
    //               <MenuItem value="O-">O-</MenuItem>
    //               {/* Add more options as needed */}
    //             </Select>
    //             {errors.bloodGroup && (
    //               <Typography color="error" variant="caption">
    //                 {errors.bloodGroup.message}
    //               </Typography>
    //             )}
    //           </FormControl>
    //         </Grid>
    //       </Grid>
    //       <CardActions sx={{ mt: 3, justifyContent: "center" }}>
    //         <Button variant="contained" color="primary" type="submit">
    //           Apply Filters
    //         </Button>
    //       </CardActions>
    //     </form>
    //   </CardContent>
    //   <CardContent sx={{
    //       flexGrow: 1, // Allow the content to expand and use available space
    //       padding: 4,
    //       overflow: 'auto', // Ensure scrolling if content overflows
    //     }}>
    //     <Typography sx={{ fontSize: "20px", fontWeight: 600, mb: 2 }}
    //       variant="h6"
    //     >
    //       Donor List
    //     </Typography>
    //     <DonorList paginatedRows={paginatedRows}  count={sampleData.length}
    //      rowsPerPage = {rowsPerPage} page={page} handleChangePage={handleChangePage}
    //      handleChangeRowsPerPage={handleChangeRowsPerPage}
    //     />
    //   </CardContent>
    // </Card>
  );
};

export default SearchDonor;
