import React from "react";
import {
  PieChart,
  Pie,
  ResponsiveContainer,
} from "recharts";

export const SpecChart = ({ specCountsArr, class_colors, charClassName }) => {
  const color_class_style = class_colors?.find(
    (color) => color?.class === charClassName
  );
  console.log(color_class_style?.color);
  return (
    <ResponsiveContainer height={400}>
      <PieChart width={400} height={400}>
        <Pie
          dataKey="value"
          data={specCountsArr}
          innerRadius={80}
          outerRadius={120}
          fill={color_class_style?.color}
          label={({
            cx,
            cy,
            midAngle,
            innerRadius,
            outerRadius,
            value,
            index,
          }) => {
            const RADIAN = Math.PI / 180;

            const radius = 25 + innerRadius + (outerRadius - innerRadius);

            const x = cx + radius * Math.cos(-midAngle * RADIAN);

            const y = cy + radius * Math.sin(-midAngle * RADIAN);

            return (
              <text
                x={x}
                y={y}
                fill={color_class_style?.color}
                textAnchor={x > cx ? "start" : "end"}
                dominantBaseline="central"
              >
                {specCountsArr[index]?.name} ({value})
              </text>
            );
          }}
          paddingAngle={3}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};
