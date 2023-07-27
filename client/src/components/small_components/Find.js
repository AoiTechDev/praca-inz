import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "../../styles/search-styles.css";
import { alpha, styled } from "@mui/material/styles";
import React, {useState} from "react";
import { SubmitButton } from "./SubmitButton";
import "animate.css";
import { FindInputs } from "./FindInputs";

import { NotFoundError } from "./Errors/NotFoundError";
import { EmptyInputsError } from "./Errors/EmptyInputsError";

export const Find = ({
  label,
  state,
  getFun,
  name,
  handleChange,
  formData,
  value,
  server,
  Link,
  isFetch,
  searchState,
  restData,
  mainCharacterData,
  tmpCharacterData,
  guildData,
  tmpGuildData
}) => {
  const [isGuildEmpty, setIsGuildEmpty ] = useState(false);
  const [isCharacterEmpty, setIsCharacterEmpty] = useState(false)
 
    return (
    <div
      className={
        isFetch
          ? "nav-inputs-container animate__animated animate__bounceInRight"
          : "inputs-container  animate__animated animate__zoomInDown animate__slow"
      }
    >
      {!isFetch && <div className="label "> Find {state}</div>}
      <div
        className={
          isFetch
            ? "nav-inputs"
            : "inputs animate__animated animate__fadeInDown animate__delay-1s"
        }
      >
        
       
        <FindInputs
          label={label}
          name={name}
          handleChange={handleChange}
          value={value}
        />
        <FindInputs
          label={"Server"}
          name={server}
          handleChange={handleChange}
          value={server === "Server" ? formData.Server : formData.GuildServer}
        />
       
        <SubmitButton state={state} getFun={getFun} Link={Link} isFetch={isFetch} formData={formData} setIsCharacterEmpty={setIsCharacterEmpty} setIsGuildEmpty={setIsGuildEmpty}/>
        {state === 'Player' ? (!isCharacterEmpty &&  <NotFoundError tmpCharacterData={tmpCharacterData} tmpGuildData={tmpGuildData}  guildData={guildData} state={state}/>) :
           (!isGuildEmpty &&  <NotFoundError tmpCharacterData={tmpCharacterData} tmpGuildData={tmpGuildData}  guildData={guildData} state={state}/>) 
        }
         <EmptyInputsError  isCharacterEmpty={isCharacterEmpty} isGuildEmpty={isGuildEmpty} state={state}/>
      </div>
    </div>
  );
};
