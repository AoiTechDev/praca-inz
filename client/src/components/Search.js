import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "../styles/search-styles.css";
import React from "react";

function Search({
  handleChange,
  getPlayer,
  isFetch,
  Link,
  searchState,
  setSeatchState,
  getGuild,
  formData,
  getPets
}) {
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

  function changeSearchHandler(e) {
    let test = e.target.className;  

    if (test === "char" || test.slice(9, 13) === "char") {
      setSeatchState("character");
    }
    if (test === "guil" || test.slice(9, 13) === "guil") {
      setSeatchState("guild");
    }
    if (test === "comp" || test.slice(9, 13) === "comp") {
      setSeatchState("compr");
    }
  }
  return (
    <div
      className="search"
      style={{
        justifyContent: !isFetch ? "center" : "space-between ",
      }}
    >
      {isFetch && (
        <div className="nav">
          <Link to="/" className="nav-item char" onClick={changeSearchHandler}>
            <div className="char">Character</div>
          </Link>
          <Link
            to="guild"
            className="nav-item guil"
            onClick={changeSearchHandler}
          >
            {" "}
            <div className="guil">Guild Finder</div>
          </Link>
          <Link
            to="comparison"
            className="nav-item comp"
            onClick={changeSearchHandler}
          >
            <div className="comp"> Comparison</div>
          </Link>
          {/* <Link to ="dungeons" className="nav-item"><div > Dungeons</div></Link>
        <Link to ="/raids" className="nav-item"><div >Raids</div></Link>
        <Link to ="/pvp" className="nav-item"><div >PVP</div></Link>
        <Link to ="/collection" className="nav-item"><div>Collection</div></Link> */}
        </div>
      )}
      <ThemeProvider theme={theme}>
        {searchState === "character" ? (
          <div className="character">
            <TextField
              id="outlined-basic"
              label="Nickname"
              variant="outlined"
              name="Nickname"
              value={formData.Nickname}
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
              value={formData.Server}
              sx={{
                ...TestInput,
              }}
              autoComplete="off"
            />
            <Button
              variant="contained"
              type="submit"
              onClick={() => getPlayer()}
              className="find-player-btn"
              size="large"
            >
              Find Player
            </Button>
          </div>
        ) : searchState === "guild" ? (
          <div className="character">
            <TextField
              id="outlined-basic"
              label="Guild Name"
              variant="outlined"
              name="Guildname"
              value={formData.Guildname}
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
              value={formData.Server}
              onChange={handleChange}
              sx={{
                ...TestInput,
              }}
              autoComplete="off"
            />
            <Button
              variant="contained"
              type="submit"
              onClick={getGuild}
              className="find-player-btn"
              size="large"
            >
              Find Guild
            </Button>
          </div>
        ) : (
          searchState === "compr" && <div className="compr"></div>
        )}
      </ThemeProvider>
    </div>
  );
}

export default Search;
