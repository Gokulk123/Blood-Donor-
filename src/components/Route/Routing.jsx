import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "../Layout/Navbar";
import { Box, Container } from "@mui/material";

const Home = React.lazy(() => import("../pages/Home"));
const NewDonor = React.lazy(() => import("../pages/NewDonor"));
const SeachDonor = React.lazy(() => import("../pages/SearchDonor"));

function Routing() {
  return (
    <Router basename="/Blood-Donor-Frontend">
      <Navbar />
      <Box
        component="main"
        sx={{ paddingTop: "64px" }} // Adjust this value based on AppBar height
      >
        <Container>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" color="inherit" element={<Home />} />
              <Route path="/home" color="inherit" element={<Home />} />
              <Route path="/new-donar" element={<NewDonor />} />
              <Route path="/search-donor" element={<SeachDonor />} />
              {/* <Route path="/login" element={<Contact />} /> */}
            </Routes>
          </Suspense>
        </Container>
      </Box>
    </Router>
  );
}

export default Routing;
