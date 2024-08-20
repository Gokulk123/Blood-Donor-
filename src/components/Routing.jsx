import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import { Box, Container } from "@mui/material";

const Home = React.lazy(() => import("./Home"));
const NewDonor = () => <div>New Donor Page</div>;
const About = () => <div>Search donor Page</div>;
const Contact = () => <div>Login Page</div>;

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
              <Route path="/home" color="inherit" element={<Home />} />
              <Route path="/new-donar" element={<NewDonor />} />
              <Route path="/search-donor" element={<About />} />
              <Route path="/login" element={<Contact />} />
            </Routes>
          </Suspense>
        </Container>
      </Box>
    </Router>
  );
}

export default Routing;
