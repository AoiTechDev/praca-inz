import React from "react";

export const SubmitButton = ({ state, getFun, Link, isFetch, formData, setIsCharacterEmpty, setIsGuildEmpty}) => {
  
  return (
    <Link to={state === 'Guild' ? 'guild' : '/'} className={isFetch ? 'nav-submit-btn-container' : "submit-btn-container"}>
      <button className={isFetch ? 'nav-submit-btn' : "submit-btn"} onClick={() => {
        if(state === 'Player'){
          if(formData.Nickname === '' || formData.Server === ''){
            setIsCharacterEmpty(true);
          }else{
            getFun();
            setIsCharacterEmpty(false);
          }
        } else{
          if(formData.Guild === '' || formData.GuildServer === ''){
            setIsGuildEmpty(true);
          }else{
            getFun();
            setIsGuildEmpty(false);
          }
        }
      
      }}>
        {" "}
        Find {state}
      </button>{" "}
    </Link>
  );
};
