import { Grid } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from "recharts";
const data = [
  { name: "APRIL", uv: 400, pv: 2400, amt: 2400 },
  { name: "MAY", uv: 400, pv: 2400, amt: 2400 },
  { name: "JUNE", uv: 400, pv: 2400, amt: 2400 },
  { name: "JULY", uv: 400, pv: 2400, amt: 2400 }
];

export default function Chart() {
  return (
    <Grid>
      <BarChart width={500} height={300} data={data}>
        <XAxis dataKey="name" stroke="#8884d8" />
        <YAxis />
        <Tooltip wrapperStyle={{ width: 100, backgroundColor: "#ccc" }} />
        <Legend
          width={100}
          wrapperStyle={{
            top: 40,
            right: 20,
            backgroundColor: "#f5f5f5",
            border: "1px solid #d5d5d5",
            borderRadius: 3,
            lineHeight: "40px"
          }}
        />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <Bar dataKey="uv" fill="#f37857" barSize={30} />
        <Bar dataKey="pv" fill="#5137ee" barSize={30} />
      </BarChart>
    </Grid>
  );
}
