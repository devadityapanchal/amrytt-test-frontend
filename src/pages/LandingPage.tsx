import React from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Container,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from "@mui/system";

const Navbar: any = styled(AppBar)(({ theme }) => ({
  marginBottom: "20px",
  background: "linear-gradient(to right, #00c6ff, #0072ff)",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  transition: "background 0.3s ease-in-out",
  "&:hover": {
    background: "linear-gradient(to right, #0072ff, #00c6ff)",
  },
}));

const NavButton = styled(Link)(({ theme }) => ({
  marginLeft: "20px",
  textDecoration: "none",
  color: "inherit",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
}));

const ContentContainer = styled(Container)({
  marginTop: "20px",
});

const ImageCard = styled(Card)({
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
  },
});

const LandingPage = () => {
  return (
    <div>
      <Navbar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Company Name
          </Typography>
          <NavButton to="/login">Login</NavButton>
          <NavButton to="/register">Register</NavButton>
        </Toolbar>
      </Navbar>
      <ContentContainer>
        <Typography variant="h4" gutterBottom>
          About Us
        </Typography>
        <Typography variant="body1" paragraph>
          Welcome to our SaaS platform! Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Sed nisi. Nulla quis sem at nibh elementum imperdiet.
          Duis sagittis ipsum.
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <ImageCard>
              <CardMedia
                component="img"
                height="200"
                image="https://via.placeholder.com/300"
                alt="Image 1"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Image 1
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Description of Image 1.
                </Typography>
              </CardContent>
            </ImageCard>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <ImageCard>
              <CardMedia
                component="img"
                height="200"
                image="https://via.placeholder.com/300"
                alt="Image 2"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Image 2
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Description of Image 2.
                </Typography>
              </CardContent>
            </ImageCard>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <ImageCard>
              <CardMedia
                component="img"
                height="200"
                image="https://via.placeholder.com/300"
                alt="Image 3"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Image 3
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Description of Image 3.
                </Typography>
              </CardContent>
            </ImageCard>
          </Grid>
        </Grid>
      </ContentContainer>
    </div>
  );
};

export default LandingPage;
