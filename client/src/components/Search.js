import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "../styles/search-styles.css";
import React from "react";


function Search({ handleChange, getPlayer, isFetch, Link }) {
  
  const theme = createTheme({
    palette: {
      primary: {
        main: "#950000",
      },
    },
  });

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
  };

  return (
    <div className="search" style={{
      justifyContent: !isFetch ? 'center' : 'space-between '
    }}>
      {isFetch && <div className="nav">
        <Link to='/'  className="nav-item"><div>Character</div></Link>
        <Link to="/guild" className="nav-item"><div >Guild Finder</div></Link>
        <Link to ="dungeons" className="nav-item"><div > Dungeons</div></Link>
        <Link to ="/raids" className="nav-item"><div >Raids</div></Link>
        <Link to ="/pvp" className="nav-item"><div >PVP</div></Link>
        <Link to ="/collection" className="nav-item"><div>Collection</div></Link>
      </div>}
      <ThemeProvider theme={theme}>
        <div className="inputs">
          <TextField
            id="outlined-basic"
            label="Nickname"
            variant="outlined"
            name="Nickname"
            onChange={handleChange}
            sx={{
              ...TestInput,
            }}
            autoComplete="off"
          />
          <TextField
            id="outlined-basic"
            label="Server"
            variant="outlined"
            name="Server"
            onChange={handleChange}
            sx={{
              ...TestInput,
            }}
            autoComplete="off"
          />
          <Button
            variant="contained"
            type="submit"
            onClick={getPlayer}
            className="find-player-btn"
            size="large"
          >
            Find Player
          </Button>
        </div>
      </ThemeProvider>
    </div>
  );
}

export default Search;
