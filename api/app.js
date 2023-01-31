require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");

var axios = require("axios");
var axiosThrottle = require("axios-request-throttle");

var test = require("./routes");
const { response } = require("express");
const BNET_ID = process.env.BNET_OAUTH_CLIENT_ID;
const BNET_SECRET = process.env.BNET_OAUTH_CLIENT_SECRET;
const EU_BLIZZARD = "https://eu.api.blizzard.com";
if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require("node-localstorage").LocalStorage;
  localStorage = new LocalStorage("./scratch");
}

axiosThrottle.use(axios, { requestsPerSecond: 100 });

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
  return await axiosGet(url, "static-eu");
}

async function getSpellMedia(id) {
  url = `${EU_BLIZZARD}/data/wow/media/spell/${id}`;
  return await axiosGet(url, "static-eu");
}

async function getAchiv(id) {
  url = `${EU_BLIZZARD}/data/wow/achievement-category/${id}`;
  //console.log(url)
  return await axiosGet(url, "static-eu");
}

async function axiosGet(url, namespace = "profile-eu") {
  return await axios.get(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Battlenet-Namespace": namespace,
    },
    params: {
      locale: "en_US",
    },
  });
}

async function characterAchievements(nickname, server) {
  urlAchiv = `${EU_BLIZZARD}/profile/wow/character/${server}/${nickname}/achievements`;

  return await axiosGet(urlAchiv);
}

async function allCharacterData(nickname, server) {
  urlMedia = `${EU_BLIZZARD}/profile/wow/character/${server}/${nickname}/character-media`;
  urlProfileInfo = `${EU_BLIZZARD}/profile/wow/character/${server}/${nickname}`;
  urlStatistic = `${EU_BLIZZARD}/profile/wow/character/${server}/${nickname}/statistics`;
  urlEq = `${EU_BLIZZARD}/profile/wow/character/${server}/${nickname}/equipment`;
  test = `${EU_BLIZZARD}/data/wow/achievement-category/index`;
  talents = `${EU_BLIZZARD}/profile/wow/character/${server}/${nickname}/specializations`;
  dungeons = `${EU_BLIZZARD}/profile/wow/character/${server}/${nickname}/mythic-keystone-profile/season/9`;
  raids = `${EU_BLIZZARD}/profile/wow/character/${server}/${nickname}/encounters/raids`;
  mounts = `${EU_BLIZZARD}/profile/wow/character/${server}/${nickname}/collections/mounts`;
  pets = `${EU_BLIZZARD}/profile/wow/character/${server}/${nickname}/collections/pets`;

  return await axios.all([
    axiosGet(urlMedia),
    axiosGet(urlProfileInfo),
    axiosGet(urlStatistic),
    characterAchievements(nickname, server),
    axiosGet(test, "static-eu"),
    axiosGet(urlEq),
    axiosGet(talents),
    axiosGet(dungeons),
    axiosGet(raids),
    axiosGet(mounts),
    axiosGet(pets),
  ]);
}

app.get("/achiv_sub_category", (req, res) => {
  getAchiv(req.query.id)
    .then((response) => res.json(response.data))
    .catch((err) => console.error(err));
});

const errorHandler = (error, req, res, next) => {
  return res.status(404).send(error.message);
};

async function getMount(id) {
  const mount_url = `${EU_BLIZZARD}/data/wow/mount/${id}`;
  return await axiosGet(mount_url, "static-eu");
}

async function getMountMedia(id) {
  const mount_media_url = `${EU_BLIZZARD}/data/wow/media/creature-display/${id}`;
  return await axiosGet(mount_media_url, "static-eu");
}

app.get("/character", (req, res, next) => {
  const character = allCharacterData(req.query.nickname, req.query.server);

  character
    .then(
      axios.spread(
        async (
          media,
          profile,
          stats,
          achiv,
          achiv_data,
          eq,
          talents,
          dungeons,
          raids,
          mounts,
          pets
        ) => {
          const promises_eq_arr = [];
          const promises_achiv_arr = [];
          const class_talents_arr = [];
          const spec_talents_arr = [];
          const mounts_arr = [];
          const mounts_media_arr = [];

          eq.data.equipped_items.map((item) => {
            promises_eq_arr.push(
              getItem(item.item.id).then((response) => response.data)
            );
          });

          achiv_data.data.root_categories.map((item) => {
            promises_achiv_arr.push(
              getAchiv(item.id).then((response) => response.data)
            );
          });

          talents.data.specializations[0].loadouts.map((idx) => {
            if (idx.is_active) {
              idx.selected_spec_talents.map((index) => {
                spec_talents_arr.push(
                  getSpellMedia(index.tooltip.spell_tooltip.spell.id)
                    .then((response) => response.data)
                    .catch((err) => console.error(err.response))
                );
              });

              idx.selected_class_talents.map((index) => {
                class_talents_arr.push(
                  getSpellMedia(index.tooltip.spell_tooltip.spell.id)
                    .then((response) => response.data)
                    .catch((err) => {
                      console.error("Error response: ");
                      console.error(err.response);
                    })
                );
              });
            }
          });

          mounts.data.mounts.map((mount) =>
            mounts_arr.push(
              getMount(mount.mount.id).then((response) => response.data)
            )
          );

          let eq_promises = Promise.all(promises_eq_arr);
          let spec_talents_promises = Promise.all(spec_talents_arr);
          let class_talents_promises = Promise.all(class_talents_arr);
          let achiv_promises = Promise.all(promises_achiv_arr);
          let mounts_promises = Promise.all(mounts_arr);

          await mounts_promises.then((response) =>
            response.map((mount) =>
              mounts_media_arr.push(
                getMountMedia(mount.creature_displays[0].id).then(
                  (res) => res.data
                )
              )
            )
          );

          let mounts_media_promises = Promise.all(mounts_media_arr);

          try {
            let result = Promise.all([
              eq_promises,
              spec_talents_promises,
              class_talents_promises,
              achiv_promises,
              mounts_promises,
              mounts_media_promises,
            ]);
            result.then((response) => {
              res.json({
                media: media.data,
                profile: profile.data,
                stats: stats.data,
                eq: eq.data,
                achiv: achiv.data,
                media_eq: response[0],
                spec_talents_media: response[1],
                class_talents_media: response[2],
                achiv_categories: response[3],
                talents: talents.data,
                dungeons: dungeons.data,
                raids: raids.data,
                mounts: response[4],
                mounts_media: response[5],
                pets: pets.data,
              });
            });
          } catch (error) {
            return next(err);
          }
        }
      )
    )
    .catch((err) => {
      return next(err);
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

app.get("/guild", (req, res) => {
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
            axiosGet(urlProfileInfo).then((response) => response.data)
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

app.use(errorHandler);

app.use(function (err, req, res, next) {
  console.error(err);
  res.send("<h1>Internal Server Error</h1>");
});

const server = app.listen(9000, function () {
  console.log("Listening on port %d", server.address().port);
});
