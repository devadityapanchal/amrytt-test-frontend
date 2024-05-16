import {
  Modal,
  Box,
  TextField,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import Select from "react-select";
import { useEffect, useState } from "react";
import { City, Country, State } from "country-state-city";
import { createProfile } from "../../services/Profile";
import { useNavigate } from "react-router-dom";

const initialValues = {
  firstName: "",
  lastName: "",
  profile: null,
  age: "",
  gender: "",
  hobbies: [],
  country: null,
  state: null,
  city: null,
};

const AddProfile = ({
  isOpen,
  onClose,
  setRefreshData,
}: {
  isOpen: boolean;
  onClose: () => void;
  setRefreshData: React.Dispatch<React.SetStateAction<Date>>;
}) => {
  const navigate = useNavigate();

  const [countries, setCountries] = useState<
    { value: string; label: string; code: string }[]
  >([]);
  const [states, setStates] = useState<
    { value: string; label: string; code: string; countryCode: string }[]
  >([]);
  const [cities, setCities] = useState<{ value: string; label: string }[]>([]);

  useEffect(() => {
    const allCountries = Country.getAllCountries();
    setCountries(
      allCountries.map((x) => ({
        value: x.name,
        label: x.name,
        code: x.isoCode,
      }))
    );
  }, []);

  const handleCountrySelect = (code: string) => {
    const states = State.getStatesOfCountry(code);
    setStates(
      states.map((x) => ({
        value: x.name,
        label: x.name,
        code: x.isoCode,
        countryCode: code,
      }))
    );
    setCities([]);
  };

  const formik = useFormik({
    initialValues,
    validate: (values) => {
      const errors: { [key: string]: string } = {};

      if (!values.firstName) {
        errors.firstName = "First name is required";
      }

      if (!values.lastName) {
        errors.lastName = "Last name is required";
      }

      if (!values.profile) {
        errors.profile = "Profile image is required";
      }

      if (!values.age) {
        errors.age = "Age is required";
      }

      if (!values.gender) {
        errors.gender = "Gender is required";
      }

      if (values.hobbies.length === 0) {
        errors.hobbies = "At least one hobby is required";
      }

      if (!values.country) {
        errors.country = "Country is required";
      }

      if (!values.state) {
        errors.state = "State is required";
      }

      if (!values.city) {
        errors.city = "City is required";
      }

      return errors;
    },
    onSubmit: async (values, { resetForm }) => {
      console.log("Form submitted with values:", values);
      try {
        const formData = new FormData();
        formData.append("firstName", values.firstName);
        formData.append("lastName", values.lastName);
        formData.append("age", values.age);
        formData.append("gender", values.gender);
        formData.append("hobbies", JSON.stringify(values.hobbies));
        formData.append("country", values.country as any);
        formData.append("state", values.state as any);
        formData.append("city", values.city as any);
        formData.append("profile_image", values.profile as any);

        await createProfile(formData);
        onClose();
        resetForm();
        setRefreshData(new Date());
      } catch (error) {
        console.log("error: ", error);
      }
      onClose();
    },
  });

  const handleStateSelect = (countryCode: string, stateCode: string) => {
    const cities = City.getCitiesOfState(countryCode, stateCode);
    setCities(
      cities.map((x) => ({
        value: x.name,
        label: x.name,
      }))
    );
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      onKeyDown={(event) => event.key === "Escape" && onClose()}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          p: 4,
          bgcolor: "background.paper",
          borderRadius: 4,
          overflowY: "scroll",
          height: "80%",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Add New Profile
        </Typography>
        <Box mt={2} component="form" onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="firstName"
            name="firstName"
            label="First Name"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
          <br />
          <br />
          <TextField
            fullWidth
            id="lastName"
            name="lastName"
            label="Last Name"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
          <br />
          <br />
          <TextField
            fullWidth
            type="file"
            id="profile"
            name="profile"
            onChange={(event: any) =>
              formik.setFieldValue("profile", event.target?.files[0])
            }
            error={formik.touched.profile && Boolean(formik.errors.profile)}
            helperText={formik.touched.profile && formik.errors.profile}
          />
          <br />
          <br />
          <TextField
            fullWidth
            type="number"
            id="age"
            name="age"
            label="Age"
            value={formik.values.age}
            onChange={formik.handleChange}
            error={formik.touched.age && Boolean(formik.errors.age)}
            helperText={formik.touched.age && formik.errors.age}
          />
          <br />
          <br />
          <FormControl
            fullWidth
            error={formik.touched.gender && Boolean(formik.errors.gender)}
          >
            <FormLabel>Gender</FormLabel>
            <Select
              options={
                [
                  { value: "male", label: "Male" },
                  { value: "female", label: "Female" },
                  { value: "other", label: "Other" },
                ] as any
              }
              value={{
                label: formik.values.gender,
                value: formik.values.gender,
              }}
              onChange={(option: any) =>
                formik.setFieldValue("gender", option?.value)
              }
            />
            {formik.touched.gender && formik.errors.gender && (
              <FormHelperText>{formik.errors.gender}</FormHelperText>
            )}
          </FormControl>
          <br />
          <br />
          <FormControl
            fullWidth
            error={formik.touched.hobbies && Boolean(formik.errors.hobbies)}
          >
            <FormLabel>Hobbies</FormLabel>
            <Select
              options={
                [
                  { value: "reading", label: "Reading" },
                  { value: "cooking", label: "Cooking" },
                  { value: "sports", label: "Sports" },
                ] as any
              }
              isMulti
              value={formik.values.hobbies.map((x) => ({ value: x, label: x }))}
              onChange={(options: any) =>
                formik.setFieldValue(
                  "hobbies",
                  options.map((option: any) => option.value)
                )
              }
            />
            {formik.touched.hobbies && formik.errors.hobbies && (
              <FormHelperText>{formik.errors.hobbies}</FormHelperText>
            )}
          </FormControl>
          <br />
          <br />
          <FormControl
            fullWidth
            error={formik.touched.country && Boolean(formik.errors.country)}
          >
            <FormLabel>Country</FormLabel>
            <Select
              options={countries}
              value={countries.find(
                (option) => option.value === formik.values.country
              )}
              onChange={(option) => {
                formik.setFieldValue("country", option?.value);
                handleCountrySelect(option?.code as string);
              }}
            />
            {formik.touched.country && formik.errors.country && (
              <FormHelperText>{formik.errors.country}</FormHelperText>
            )}
          </FormControl>
          <br />
          <br />
          <FormControl
            fullWidth
            error={formik.touched.state && Boolean(formik.errors.state)}
          >
            <FormLabel>State</FormLabel>
            <Select
              options={states}
              value={states.find(
                (option) => option.value === formik.values.state
              )}
              onChange={(option) => {
                formik.setFieldValue("state", option?.value);
                handleStateSelect(
                  option?.countryCode as string,
                  option?.code as string
                );
              }}
            />
            {formik.touched.state && formik.errors.state && (
              <FormHelperText>{formik.errors.state}</FormHelperText>
            )}
          </FormControl>
          <br />
          <br />
          <FormControl
            fullWidth
            error={formik.touched.city && Boolean(formik.errors.city)}
          >
            <FormLabel>City</FormLabel>
            <Select
              options={cities}
              value={cities.find(
                (option) => option.value === formik.values.city
              )}
              onChange={(option) => formik.setFieldValue("city", option?.value)}
            />
            {formik.touched.city && formik.errors.city && (
              <FormHelperText>{formik.errors.city}</FormHelperText>
            )}
          </FormControl>
          <br />
          <br />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Submit
          </Button>
          <Button
            variant="contained"
            color="inherit"
            sx={{ mt: 2, ml: 2 }}
            onClick={onClose}
          >
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddProfile;
