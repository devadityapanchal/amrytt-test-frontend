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
import Creatable from "react-select/creatable";

const initialValues = {
  firstName: "",
  lastName: "",
  profile: null,
  age: "",
  gender: "",
  hobbies: [],
};

const genders = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

const hobbiesOptions = [
  { value: "reading", label: "Reading" },
  { value: "cooking", label: "Cooking" },
  { value: "sports", label: "Sports" },
  // Add more hobby options as needed
];

const AddProfile = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
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

      return errors;
    },
    onSubmit: (values) => {
      console.log("Form submitted with values:", values);
      onClose();
    },
  });

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
        }}
      >
        <Typography variant="h6" gutterBottom>
          Add New Profile
        </Typography>
        <form onSubmit={formik.handleSubmit}>
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
          {/* Profile Image Selector */}
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
          {/* Gender Select */}
          <FormControl
            fullWidth
            error={formik.touched.gender && Boolean(formik.errors.gender)}
          >
            <FormLabel>Gender</FormLabel>
            <Select
              options={genders}
              value={genders.find(
                (option) => option.value === formik.values.gender
              )}
              onChange={(option) =>
                formik.setFieldValue("gender", option?.value)
              }
            />
            {formik.touched.gender && formik.errors.gender && (
              <FormHelperText>{formik.errors.gender}</FormHelperText>
            )}
          </FormControl>
          {/* Hobbies Select */}
          <FormControl
            fullWidth
            error={formik.touched.hobbies && Boolean(formik.errors.hobbies)}
          >
            <FormLabel>Hobbies</FormLabel>
            <Creatable
              options={hobbiesOptions}
              isMulti
              value={hobbiesOptions.filter((option) =>
                (formik.values.hobbies as string[]).includes(option.value)
              )}
              onChange={(options) =>
                formik.setFieldValue(
                  "hobbies",
                  options.map((option) => option.value)
                )
              }
            />
            {formik.touched.hobbies && formik.errors.hobbies && (
              <FormHelperText>{formik.errors.hobbies}</FormHelperText>
            )}
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Submit
          </Button>
          <Button variant="contained" color="inherit" sx={{ mt: 2, ml: 2 }}>
            close
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default AddProfile;
