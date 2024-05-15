import React, { useCallback } from "react";
import { Formik, Field } from "formik";
import { Button, TextField, Typography, Container, Grid } from "@mui/material";
import { styled } from "@mui/system";
import { useDispatch } from "react-redux";
import { setUserDetails, setLogoutData } from "../redux/slices/AuthSlice";
import { register } from "../services/UserAuthentication";
import { useNavigate } from "react-router-dom";

const Paper = styled("div")({
  marginTop: "theme.spacing(8)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

const FormContainer = styled("form")({
  width: "100%",
  marginTop: "theme.spacing(1)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const SubmitButton = styled(Button)({
  margin: "theme.spacing(3, 0, 2)",
  width: "100%",
});

const Register: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = useCallback(
    async (val: any) => {
      const payload = val;
      try {
        await register(payload);
        navigate("/login");
      } catch (error) {
        console.log("error: ", error);
      }
    },
    [dispatch, navigate]
  );

  return (
    <Container style={{ marginTop: "100px" }} component="main" maxWidth="xs">
      <Paper>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
          }}
          onSubmit={handleRegister}
        >
          {({ isSubmitting, handleSubmit }) => (
            <FormContainer onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Field
                    as={TextField}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="firstName"
                    label="First Name"
                    name="firstName"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    as={TextField}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                  />
                </Grid>
              </Grid>
              <Field
                as={TextField}
                variant="outlined"
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
              <Field
                as={TextField}
                variant="outlined"
                margin="normal"
                fullWidth
                id="password"
                label="Password"
                name="password"
                type="password"
                autoComplete="current-password"
              />
              <SubmitButton
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                Register
              </SubmitButton>
            </FormContainer>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default Register;
