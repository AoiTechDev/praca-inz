import React from "react";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export const SpecChart = ({ specCountsArr, class_colors, charClassName }) => {
    const color_class_style = class_colors?.find(
        (color) => color?.class === charClassName
      );
      console.log(color_class_style)
  return (
    <ResponsiveContainer height={400}>
      <PieChart width={400} height={400}>
        <Pie
          dataKey="value"
          data={specCountsArr}
          innerRadius={80}
          outerRadius={120}
          fill={color_class_style?.color}
          label
          paddingAngle={5}
        />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};
