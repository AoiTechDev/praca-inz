import React from "react";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";


export const SpecChart = ({specCountsArr}) => {

    const data01 = [
        { name: "Group A", value: 400 },
        { name: "Group B", value: 300 },
        { name: "Group C", value: 300 },
        { name: "Group D", value: 200 },
        { name: "Group E", value: 278 },
        { name: "Group F", value: 189 },
      ];
      
      const data02 = [
        { name: "holy", value: 1 },
        { name: "prot", value: 3 },
        { name: "retri", value: 5 },
     
      ];
      
    
  return (
    <ResponsiveContainer height={400}>
      <PieChart width={400} height={400}>
       
        <Pie
          dataKey="value"
          data={specCountsArr}
          innerRadius={40}
          outerRadius={80}
          fill="#82ca9d"
          label
        />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};
