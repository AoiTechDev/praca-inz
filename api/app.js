require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const _ = require("lodash");
var axios = require("axios");
var axiosThrottle = require("axios-request-throttle");


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
const server = app.listen(9000);
server.timeout = 1000 * 60 * 10;


server.keepAliveTimeout = 61 * 1000;
app.use(cors());

app.use(cookieParser());
app.use(
  session({
    secret: "5WNB9V6heoFK09gM8KzNjvZzRzwQX5dh", 
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
    
    .then((response) => res.json(response.data))
    .catch((err) => res.json(err));
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


async function mainCharacterData(nickname, server) {
  const urlMedia = `${EU_BLIZZARD}/profile/wow/character/${server}/${nickname}/character-media`;
  const urlProfileInfo = `${EU_BLIZZARD}/profile/wow/character/${server}/${nickname}`;
  const urlStatistic = `${EU_BLIZZARD}/profile/wow/character/${server}/${nickname}/statistics`;
  const urlEq = `${EU_BLIZZARD}/profile/wow/character/${server}/${nickname}/equipment`;

  return await axios.all([
    axiosGet(urlMedia),
    axiosGet(urlProfileInfo),
    axiosGet(urlStatistic),
    axiosGet(urlEq),
  ]);
}

async function restCharacterData(nickname, server) {
  const achivCategory = `${EU_BLIZZARD}/data/wow/achievement-category/index`;
  const talents = `${EU_BLIZZARD}/profile/wow/character/${server}/${nickname}/specializations`;
  const dungeons = `${EU_BLIZZARD}/profile/wow/character/${server}/${nickname}/mythic-keystone-profile/season/9`;
  const raids = `${EU_BLIZZARD}/profile/wow/character/${server}/${nickname}/encounters/raids`;
  const mounts = `${EU_BLIZZARD}/profile/wow/character/${server}/${nickname}/collections/mounts`;

  return await axios.all([
    characterAchievements(nickname, server),
    axiosGet(achivCategory, "static-eu"),
    axiosGet(talents),
    axiosGet(dungeons),
    axiosGet(raids),
    axiosGet(mounts),
  ]);
}

async function talentsData(nickname, server) {
  const talents = `${EU_BLIZZARD}/profile/wow/character/${server}/${nickname}/specializations`;

  return await axiosGet(talents);
}
async function achievementsData(nickname, server) {
  const achivCategory = `${EU_BLIZZARD}/data/wow/achievement-category/index`;

  return await axios.all([
    characterAchievements(nickname, server),
    axiosGet(achivCategory, "static-eu"),
  ]);
}
async function dungeonsData(nickname, server) {
  const dungeons = `${EU_BLIZZARD}/profile/wow/character/${server}/${nickname}/mythic-keystone-profile/season/10`;

  return await axiosGet(dungeons);
}

async function raidsData(nickname, server) {
  const raids = `${EU_BLIZZARD}/profile/wow/character/${server}/${nickname}/encounters/raids`;

  return await axiosGet(raids);
}

async function mountsData(nickname, server) {
  const mounts = `${EU_BLIZZARD}/profile/wow/character/${server}/${nickname}/collections/mounts`;

  return await axiosGet(mounts);
}


async function getMount(id) {
  const mount_url = `${EU_BLIZZARD}/data/wow/mount/${id}`;
  return await axiosGet(mount_url, "static-eu");
}

async function getMountMedia(id) {
  const mount_media_url = `${EU_BLIZZARD}/data/wow/media/creature-display/${id}`;
  return await axiosGet(mount_media_url, "static-eu");
}

async function getPets(nickname, server) {
  const pets = `${EU_BLIZZARD}/profile/wow/character/${server}/${nickname}/collections/pets`;
  return await axiosGet(pets);
}

app.get("/talents", (req, res) => {
  const talents = talentsData(req.query.nickname, req.query.server);

  talents.then(async (talents) => {
    let class_talents_arr = [];
    let spec_talents_arr = [];

    talents.data.specializations[0].loadouts.map((idx) => {
      if (idx.is_active) {


        spec_talents_arr = _.reduce(
          idx.selected_spec_talents,
          (promises, talent) => {
            promises.push(
              getSpellMedia(talent.tooltip.spell_tooltip.spell.id)
                .then((response) => response.data)
                .catch(() => undefined)
            );
            return promises;
          },
          []
        );

        class_talents_arr = _.reduce(
          idx.selected_class_talents,
          (promises, talent) => {
            promises.push(
              getSpellMedia(talent.tooltip.spell_tooltip.spell.id)
                .then((response) => response.data)
                .catch(() => undefined)
            );
            return promises;
          },
          []
        );


        // idx.selected_spec_talents.map((index) => {
        //   spec_talents_arr.push(
        //     getSpellMedia(index.tooltip.spell_tooltip.spell.id).then(
        //       (response) => response.data
        //     )
        //     //.catch((err) => res.json(err))
        //   );
        // });

        // idx.selected_class_talents.map((index) => {
        //   class_talents_arr.push(
        //     getSpellMedia(index.tooltip.spell_tooltip.spell.id).then(
        //       (response) => response.data
        //     )
        //     // .catch((err) => {
        //     //   //res.json(err);
        //     //   console.error(err);
        //     // })
        //   );
        // });
      }
    });

    let spec_talents_promises = Promise.all(spec_talents_arr);
    let class_talents_promises = Promise.all(class_talents_arr);

    try {
      let result = Promise.all([spec_talents_promises, class_talents_promises]);
      result.then((response) => {
        // let cos = _.compact(response[0]);
        // console.log(cos);
        res.json({
          spec_talents_media: _.compact(response[0]),
          class_talents_media: _.compact(response[1]),
          talents: talents.data,
        });
      });
    } catch (err) {
      res.json(err)
    }
  });
});

app.get("/achievements", (req, res) => {
  const achievements = achievementsData(req.query.nickname, req.query.server);

  achievements.then(
    axios.spread(async (achiv, achiv_data) => {
      const promises_achiv_arr = [];

      achiv_data.data.root_categories.map((item) => {
        promises_achiv_arr.push(
          getAchiv(item.id).then((response) => response.data)
          
        );
      });

      let achiv_promises = Promise.all(promises_achiv_arr);

      try {
        let result = Promise.all([achiv_promises]);
        result.then((response) => {
          res.json({
            achiv: achiv.data,
            achiv_categories: response[0],
          });
        });
      } catch (err) {
        res.json(err);
        //console.error(err);
      }
    })
  );
});

app.get("/dungeons", (req, res) => {
  dungeons = dungeonsData(req.query.nickname, req.query.server);

  dungeons.then(async (dungeons) => {
    try {
      res.json({
        dungeons: dungeons.data,
      });
    } catch (err) {
      //res.json(err);
      console.error(err);
    }
  });
});

app.get("/raids", (req, res) => {
  raids = raidsData(req.query.nickname, req.query.server);

  raids.then(async (raids) => {
    try {
      res.json({
        raids: raids.data,
      });
    } catch (err) {
      //res.json(err);
      console.error(err);
    }
  });
});

app.get("/mounts", (req, res) => {
  mounts = mountsData(req.query.nickname, req.query.server);

  mounts.then(async (mounts) => {
    const mounts_arr = [];
    const mounts_media_arr = [];

    mounts.data.mounts.map((mount) =>
      mounts_arr.push(
        getMount(mount.mount.id).then((response) => response.data)
      )
    );

    let mounts_promises = Promise.all(mounts_arr);

    await mounts_promises.then((response) =>
      response.map((mount) =>
        mounts_media_arr.push(
          getMountMedia(mount.creature_displays[0].id)
            .then((res) => res.data)
            .catch((err) => res.json(err)
            )
        )
      )
    );

    let mounts_media_promises = Promise.all(mounts_media_arr);

    try {
      let result = Promise.all([mounts_promises, mounts_media_promises]);
      result.then((response) => {
        res.json({
          mounts: response[0],
          mounts_media: response[1],
        });
      });
    } catch (err) {
      
      console.error(err);
    }
  });
});

app.get("/restCharacterInfo", (req, res) => {
  const character = restCharacterData(req.query.nickname, req.query.server);

  character
    .then(
      axios.spread(
        async (achiv, achiv_data, talents, dungeons, raids, mounts) => {
          const promises_achiv_arr = [];
          const class_talents_arr = [];
          const spec_talents_arr = [];
          const mounts_arr = [];
          const mounts_media_arr = [];

          achiv_data.data.root_categories.map((item) => {
            promises_achiv_arr.push(
              getAchiv(item.id)
                .then((response) => response.data)
                .catch((err) => res.json(err))
            );
          });

          talents.data.specializations[0].loadouts.map((idx) => {
            if (idx.is_active) {
              idx.selected_spec_talents.map((index) => {
                spec_talents_arr.push(
                  getSpellMedia(index.tooltip.spell_tooltip.spell.id)
                    .then((response) => response.data)
                    .catch((err) => res.json(err))
                );
              });

              idx.selected_class_talents.map((index) => {
                class_talents_arr.push(
                  getSpellMedia(index.tooltip.spell_tooltip.spell.id)
                    .then((response) => response.data)
                    .catch((err) => {
                      //res.json(err);
                      console.error(err);
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

          let spec_talents_promises = Promise.all(spec_talents_arr);
          let class_talents_promises = Promise.all(class_talents_arr);
          let achiv_promises = Promise.all(promises_achiv_arr);
          let mounts_promises = Promise.all(mounts_arr);

          await mounts_promises.then((response) =>
            response.map((mount) =>
              mounts_media_arr.push(
                getMountMedia(mount.creature_displays[0].id)
                  .then((res) => res.data)
                  .catch(
                    (
                      err //res.json(err)
                    ) => console.error(err)
                  )
              )
            )
          );

          let mounts_media_promises = Promise.all(mounts_media_arr);

          console.log(mounts_media_promises);
          try {
            let result = Promise.all([
              spec_talents_promises,
              class_talents_promises,
              achiv_promises,
              mounts_promises,
              mounts_media_promises,
            ]);
            result.then((response) => {
              res.json({
                achiv: achiv.data,
                spec_talents_media: response[0],
                class_talents_media: response[1],
                achiv_categories: response[2],
                talents: talents.data,
                dungeons: dungeons.data,
                raids: raids.data,
                mounts: response[3],
                mounts_media: response[4],
              });
            });
          } catch (err) {
            //res.json(err);
            console.error(err);
          }
        }
      )
    )
    .catch((err) => {
      //res.json(err);
      console.error(err);
    });
});

app.get("/mainCharacterInfo", (req, res) => {
  const character = mainCharacterData(req.query.nickname, req.query.server);

  character
    .then(
      axios.spread(async (media, profile, stats, eq) => {
        const promises_eq_arr = [];

        eq.data.equipped_items.map((item) => {
          promises_eq_arr.push(
            getItem(item.item.id).then((response) => response.data)
          );
        });

        let eq_promises = Promise.all(promises_eq_arr);

        try {
          let result = Promise.all([eq_promises]);
          result.then((response) => {
            res.json({
              media: media.data,
              profile: profile.data,
              stats: stats.data,
              eq: eq.data,
              media_eq: response[0],
            });
          });
        } catch (error) {
          res.json(error);
        }
      })
    )
    .catch((error) => {
      res.json(error);
    });
});

app.get("/pets", (req, res) => {
  const pets = getPets(req.query.nickname, req.query.server);

  pets.then(async (pet) => {
    const promises = _.reduce(
      pet.data.pets,
      (promises, pet) => {
        promises.push(
          getMountMedia(pet?.creature_display?.id)
            .then((response) => response.data)
            .catch(() => undefined)
        );
        return promises;
      },
      []
    );

    try {
      let result = Promise.all(promises);
      result.then((response) => {
        res.json({
          pets: pet.data,
          pets_media: _.compact(response),
        });
      });
    } catch (error) {
      res.json(error);
    }
  });
});


app.get("/guild", (req, res) => {
  urlGuild = `${EU_BLIZZARD}/data/wow/guild/${req.query.server}/${req.query.guild}`;
  urlRoster = `${EU_BLIZZARD}/data/wow/guild/${req.query.server}/${req.query.guild}/roster`;
  axios
    .all([axiosGet(urlGuild), axiosGet(urlRoster)])

    .then(
      axios.spread((guild, roster) => {
        const promises = _.reduce(
          roster.data.members,
          (promises, member) => {
            let lower_name = member.character.name.toLowerCase();
            urlProfileInfo = `${EU_BLIZZARD}/profile/wow/character/${req.query.server}/${lower_name}`;

            promises.push(
              axiosGet(urlProfileInfo)
                .then((response) => response.data)
                .catch(() => null)
            );
            return promises;
          },
          []
        );

        Promise.all(promises)
          .then((response) => {
            res.json({
              guild: guild.data,
              roster: roster.data,
              roster_profile: _.compact(response),
            });
          })
          .catch((error) => {
           res.json(error)
          });
      })
    )
    .catch(err => {
      res.json(err)
    })
});

app.get("/achivs", (req, res) => {
  getAchiv(req.query.id)
    .then((response) => res.json(response.data))
    .catch((error) => res.json(error));
});

app.use(function (err, req, res, next) {
  console.error(err);
  res.send("<h1>Internal Server Error</h1>");
});
