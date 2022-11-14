require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
require("./auth");
var axios = require("axios");
var test = require("./routes");
const OauthClient = require("./getToken.js");
const BNET_ID = process.env.BNET_OAUTH_CLIENT_ID;
const BNET_SECRET = process.env.BNET_OAUTH_CLIENT_SECRET;
const EU_BLIZZARD = "https://eu.api.blizzard.com";
if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require("node-localstorage").LocalStorage;
  localStorage = new LocalStorage("./scratch");
}

const app = express();

app.use(cors());
// configure Express
app.use(cookieParser());
app.use(
  session({
    secret: "5WNB9V6heoFK09gM8KzNjvZzRzwQX5dh", // Change this value to a unique value for your application!
    saveUninitialized: true,
    resave: true,
  })
);

axios
  .post(
    "https://oauth.battle.net/token?grant_type=client_credentials",
    {},
    {
      auth: {
        username: BNET_ID,
        password: BNET_SECRET,
      },
    }
  )
  .then(function (response) {
    localStorage.setItem("token", response.data.access_token);
    console.log(localStorage.getItem("token"));
  })
  .catch(function (error) {
    console.log(error);
  });

app.get("/itest", (req, res) => {
  console.log(req.query.server);
});

app.get("/eq_media", (req, res) => {
  url = `https://eu.api.blizzard.com/data/wow/media/item/${req.query.id}`;
  axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Battlenet-Namespace": "static-eu",
      },
      params: {
        locale: "en_US",
      },
    })
    //.then((response) => console.log(response.data))
    .then((response) => res.json(response.data))
    .catch((err) => console.error(err));
});

async function getItem(id) {
  url = `https://eu.api.blizzard.com/data/wow/media/item/${id}`;
  return await axios.get(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Battlenet-Namespace": "static-eu",
    },
    params: {
      locale: "en_US",
    },
  });
}

async function axiosGet(url) {
  return await axios.get(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Battlenet-Namespace": "profile-eu",
    },
    params: {
      locale: "en_US",
    },
  });
}

async function characterData(nickname, server) {
  //urlMedia = `${EU_BLIZZARD}/profile/wow/character/${server}/${nickname}/character-media`;
  urlProfileInfo = `${EU_BLIZZARD}/profile/wow/character/${server}/${nickname}`;

  return await axios.all([ axiosGet(urlProfileInfo)]);
}
async function allCharacterData(nickname, server) {
  urlMedia = `${EU_BLIZZARD}/profile/wow/character/${server}/${nickname}/character-media`;
  urlProfileInfo = `${EU_BLIZZARD}/profile/wow/character/${server}/${nickname}`;
  urlStatistic = `${EU_BLIZZARD}/profile/wow/character/${server}/${nickname}/statistics`;
  urlEq = `${EU_BLIZZARD}/profile/wow/character/${server}/${nickname}/equipment`;

  return await axios.all([
    axiosGet(urlMedia),
    axiosGet(urlProfileInfo),
    axiosGet(urlStatistic),
    axiosGet(urlEq),
  ]);
}
app.get("/character", (req, res) => {
  allCharacterData(req.query.nickname, req.query.server)
    .then(
      axios.spread((media, profile, stats, eq) => {
        const promises = [];

        eq.data.equipped_items.map((item) => {
          promises.push(
            getItem(item.item.id).then((response) => response.data)
          );
        });

        Promise.all(promises).then((response) => {
          res.json({
            media: media.data,
            profile: profile.data,
            stats: stats.data,
            eq: eq.data,
            media_eq: response,
          });
        });
        //Promise.all(promises).then((res) => console.log(res));
      })
    )
    .catch(function (error) {
      console.log(error);
    });
});

app.get("/guild_member", (req, res) => {
  urlRoster = `${EU_BLIZZARD}/data/wow/guild/${req.query.server}/${req.query.guildname}/roster`;
  axiosGet(urlRoster).then((roster) => {
    const promises = [];
    console.log(roster);
    roster.data.members.map((member) => {
      console.log(member);
      urlProfileInfo = `${EU_BLIZZARD}/profile/wow/character/${req.query.server}/${member.name}`;
      promises.push(axiosGet(urlProfileInfo));
    });

    Promise.all(promises).then(() => {
      res.json({
        profile: profile,
      });
    });
  });
});

app.get("/guild", (req, res, next) => {
  urlGuild = `${EU_BLIZZARD}/data/wow/guild/${req.query.server}/${req.query.guildname}`;
  urlRoster = `${EU_BLIZZARD}/data/wow/guild/${req.query.server}/${req.query.guildname}/roster`;
  axios
    .all([axiosGet(urlGuild), axiosGet(urlRoster)])

    .then(
      axios.spread((guild, roster) => {
        const promises = [];

        roster.data.members.map((member) => {
          //console.log(member.character.name);,
          let lower_name = member.character.name.toLowerCase();
          urlProfileInfo = `${EU_BLIZZARD}/profile/wow/character/${req.query.server}/${lower_name}`;

          promises.push(
            axiosGet(urlProfileInfo).then(
              response => response.data
            )
          );
        });

        Promise.all(promises)
          .then((response) => {
            res.json({
              guild: guild.data,
              roster: roster.data,
              roster_profile: response,
            });
          })
          .catch((error) => {
            if (error.response) {
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              console.log(error.request);
            } else {
              console.log("Error", error.message);
            }
            console.log(error.config);
          });
      })
    );
});

app.use(function (err, req, res, next) {
  console.error(err);
  res.send("<h1>Internal Server Error</h1>");
});

const server = app.listen(9000, function () {
  console.log("Listening on port %d", server.address().port);
});
