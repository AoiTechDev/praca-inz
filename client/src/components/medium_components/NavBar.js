import React from "react";
import { Find } from "../small_components/Find";
export const NavBar = ({
  Link,
  setSearchState,
  searchState,
  getGuild,
  handleChange,
  formData,
  isFetch,
  getPlayer
}) => {
  return (
    <div className="nav-bar">
      <div className="nav-btn-container">
        <Link to="/" className="nav-btn-link">
          <div className="nav-btn" onClick={() => setSearchState("character")}>
            {" "}
            Character
          </div>
        </Link>
        <Link to="guild" className="nav-btn-link">
          <div className="nav-btn" onClick={() => setSearchState("guild")}>
            Guild
          </div>
        </Link>
      </div>
      <div className="nav-search">
        {searchState === "guild" ? (
          <Find
            label={"Guild"}
            name={"Guild"}
            state={"Guild"}
            server={"GuildServer"}
            getFun={getGuild}
            handleChange={handleChange}
            formData={formData}
            value={formData.Guild}
            Link={Link}
            isFetch={isFetch}
            searchState={searchState}
          />
        ) : (
          <Find
            label={"Nickname"}
            name={"Nickname"}
            state={"Player"}
            server={"Server"}
            getFun={getPlayer}
            handleChange={handleChange}
            formData={formData}
            value={formData.Nickname}
            Link={Link}
            isFetch={isFetch}
            searchState={searchState}
          />
        )}
      </div>
    </div>
  );
};
