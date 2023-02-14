import React from "react";
import TextField from "@mui/material/TextField";

const TestInput = {
  "& label.Mui-focused": {
    color: "#ACACAD",
    weight: "500",
  },
  "& text.Mui-focused": {
    color: "#ACACAD",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#ACACAD",
  },

  "& .MuiInputLabel-root": {
    color: "#ACACAD",
    textShadow:
      "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
    letterSpacing: "2px",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#ACACAD",
      weight: "600",
      letterSpacing: "2px",
    },
    "&:hover fieldset": {
      borderColor: "#ACACAD",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#ACACAD",
      weight: "600",
    },
    
  },
  "& .MuiInputBase-input": {
    color: "#ACACAD",
  },
};

export const FindInputs = ({label, handleChange, value, name}) => {
  return (
    <TextField
      className="outlined-basic"
      label={label}
      variant="outlined"
      name={name}
      value={value}
      onChange={handleChange}
      sx={{
        ...TestInput,
      }}
      autoComplete="off"
    />
  );
};
