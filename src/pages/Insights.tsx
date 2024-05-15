import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { getProfileInSights } from "../services/Profile";
import { Line } from "react-chartjs-2";
import { monthMap } from "../helpers";

const Insights: React.FC = () => {
  const [totalProfiles, setTotalProfiles] = useState<number>(0);
  const [graphData, setGraphData] = useState({
    labels: [],
    datasets: [
      {
        label: "profile",
        data: [],
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  });

  useEffect(() => {
    (async () => {
      const query = {};
      try {
        const result = await getProfileInSights(query);
        setTotalProfiles(result?.data?.data?.count || 0);

        const graphLabels = result?.data?.data?.graphData?.map(
          (x: { month: number; year: number }) =>
            `${monthMap[x.month]} ${x.year}`
        );
        const graphDataValues = result?.data?.data?.graphData?.map(
          (x: { count: number }) => x.count
        );

        setGraphData({
          ...graphData,
          labels: graphLabels,
          datasets: [
            {
              ...graphData.datasets[0],
              data: graphDataValues,
            },
          ],
        });
      } catch (error) {
        console.log("error: ", error);
      }
    })();
  }, []);

  console.log(graphData);
  return (
    <div>
      <Grid container spacing={3}>
        {/* First row */}
        <Grid item xs={12} sm={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Total Profiles
              </Typography>
              <Typography variant="h4">{totalProfiles}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={3} marginTop={1}>
        {/* Second row */}
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Profiles by Month
              </Typography>
              <Line data={graphData} key="profiles-by-month-chart" />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Insights;
