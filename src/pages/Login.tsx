import React, { useCallback } from "react";
import { Formik, Field } from "formik";
import { Button, TextField, Typography, Container, Link } from "@mui/material";
import { styled } from "@mui/system";
import { useDispatch } from "react-redux";
import {
  setUserDetails,
  setLogoutData,
  setAccessToken,
} from "../redux/slices/AuthSlice";
import { login } from "../services/UserAuthentication";
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

const LoginForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = useCallback(
    async (val: any) => {
      const payload = val;
      try {
        const result = await login(payload);
        dispatch(setAccessToken(result.data?.data?.access_token));
        dispatch(setUserDetails(result.data?.data?.user));
        navigate("/dashboard");
      } catch (error) {
        console.log("error: ", error);
      }
    },
    [dispatch, navigate]
  );

  const handleRegisterRedirect = () => {
    navigate("/register");
  };

  return (
    <Container style={{ marginTop: "100px" }} component="main" maxWidth="xs">
      <Paper>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={handleLogin}
        >
          {({ isSubmitting, handleSubmit }) => (
            <FormContainer onSubmit={handleSubmit}>
              <Field
                as={TextField}
                variant="outlined"
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <Field
                as={TextField}
                variant="outlined"
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <SubmitButton
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                Sign In
              </SubmitButton>
              <br />
              <Typography variant="body2" align="center">
                Don't have an account?{" "}
                <Link
                  component="button"
                  variant="body2"
                  onClick={handleRegisterRedirect}
                >
                  Register
                </Link>
              </Typography>
            </FormContainer>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default LoginForm;
