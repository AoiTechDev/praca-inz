import React from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export const ClassChart = ({ guildData, setCharClassName, removeAll }) => {
  let guild_class_data = [
    {
      name: "Death Knight",
      color: "#C41E3A",
      count: 0,
    },
    {
      name: "Demon Hunter",
      color: "#A330C9",
      count: 0,
    },
    {
      name: "Druid",
      color: "#FF7C0A",
      count: 0,
    },
    {
      name: "Evoker",
      color: "#33937F",
      count: 0,
    },
    {
      name: "Hunter",
      color: "#AAD372",
      count: 0,
    },
    {
      name: "Mage",
      color: "#3FC7EB",
      count: 0,
    },
    {
      name: "Monk",
      color: "#00FF98",
      count: 0,
    },
    {
      name: "Priest",
      color: "#FFFFFF",
      count: 0,
    },
    {
      name: "Rogue",
      color: "#FFF468",
      count: 0,
    },
    {
      name: "Shaman",
      color: "#0070DD",
      count: 0,
    },
    {
      name: "Warlock",
      color: "#8788EE",
      count: 0,
    },
    {
      name: "Warrior",
      color: "#C69B6D",
      count: 0,
    },
    {
      name: "Paladin",
      color: "#F48CBA",
      count: 0,
    },
  ];

  guildData?.roster_profile?.map((member) => {
    guild_class_data.map((gclass) => {
      if (gclass.name === member?.character_class?.name) {
        gclass.count = gclass.count + 1;
      }
    });
  });

  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x + width / 2
    },${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
      x + width
    }, ${y + height}
  Z`;
  };


  const CustomTooltip = ({ active, payload, label, guild_class_data }) => {
    const tooltip_class_color = guild_class_data.find(
      (color) => color.name === label
    );
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p
            className="class-name-tooltip"
            style={{
              color: tooltip_class_color.color,
            }}
          >
            {label}
          </p>
          <p className="class-count-tooltip">{`Count: ${payload[0].value}`}</p>
        </div>
      );
    }

    return null;
  };

  const getClassNameFromBar = ({payload}) => {
    setCharClassName(payload.name)

  }
  return (
    <ResponsiveContainer width="80%" height={400}>
      <BarChart
        data={guild_class_data}
        margin={{
          top: 20,
          bottom: 5,
        }}
      >
        <XAxis
          dataKey="name"
          tick={false}
          label={{ value: "Classes", fill: "#ACACAD" }}
        />

        <YAxis
          dataKey="count"
          label={{ value: "Count", angle: -90, fill: "#ACACAD" }}
        />
        <Bar
          dataKey="count"
          fill="#8884d8"
        //   shape={<TriangleBar />}
          label={{ position: "top" }}
          onClick={getClassNameFromBar}
          style={{
            cursor: 'pointer'
          }}
        >
          {guild_class_data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={guild_class_data[index].color} />
          ))}
        </Bar>

        <Tooltip
          content={<CustomTooltip guild_class_data={guild_class_data} />}
          cursor={{ fill: "transparent" }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
