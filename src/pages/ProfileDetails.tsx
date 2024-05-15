import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  Chip,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getProfileDetails } from "../services/Profile";

const ProfileDetails = () => {
  let { id } = useParams();
  const [profileData, setProfileData] = useState<{
    firstName: string;
    lastName: string;
    profile_image: string;
    age: string;
    gender: string;
    hobbies: string[];
    country: string;
    state: string;
    city: string;
  }>({
    firstName: "",
    lastName: "",
    profile_image: "",
    age: "",
    gender: "",
    hobbies: [],
    country: "",
    state: "",
    city: "",
  });

  const {
    firstName,
    lastName,
    profile_image,
    age,
    gender,
    hobbies,
    country,
    state,
    city,
  } = profileData;

  useEffect(() => {
    (async () => {
      const query = {};
      try {
        const result = await getProfileDetails(id as string, query);
        setProfileData(result?.data?.data);
      } catch (error) {
        console.log("error: ", error);
      }
    })();
  }, []);

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Avatar
              alt={`${firstName} ${lastName}`}
              src={`${process.env.REACT_APP_API_URL}images/${profile_image}`}
              sx={{ width: 150, height: 150, margin: "auto" }}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h5" component="div" gutterBottom>
              {`${firstName} ${lastName}`}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Age: {age}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Gender: {gender}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Hobbies:
              {hobbies.map((hobby, index) => (
                <Chip key={index} label={hobby} style={{ margin: "0 4px" }} />
              ))}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Location: {`${city}, ${state}, ${country}`}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ProfileDetails;
