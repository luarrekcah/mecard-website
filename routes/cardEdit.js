const express = require("express"),
  router = express.Router();
const { getDatabase, ref, set, update, onValue } = require("firebase/database");

router.get("/", (req, res, next) => {
  res.render("cardEdit", { user: req.user });
});

router.post("/", (req, res, next) => {
  const db = getDatabase();
  const users = ref(db, "users");
  onValue(users, (snapshot) => {
    let allUsers = snapshot.val();
    const objIndex = allUsers.findIndex((obj) => obj._id == req.body.meId);
    allUsers[objIndex] = {
      _id: req.body.meId,
      username: req.body.meId,
      email: req.body.email,
      password: allUsers[objIndex].password,
      nomeCompleto: req.body.nomeCompleto,
      imgs: {
        pfp: req.body.pfp,
        background: req.body.background,
        custom_icons: [req.body.i1, req.body.i2],
        profilePhotos: [req.body.pf1, req.body.pf2, req.body.pf3, req.body.pf4],
      },
      redes: {
        facebook: req.body.facebook,
        tiktok: req.body.tiktok,
        github: req.body.github,
        spotify: req.body.github,
        website: req.body.website,
        wpp: req.body.wpp,
      },
      sobremim: req.body.sobremim,
      stts: req.body.stts,
      customButton: {
        title: req.body.bdt,
        link: req.body.bdl,
        icon: req.body.bdi,
      },
      local: req.body.local,
      dataNasc: req.body.dataNasc,
      files: {
        soundURL: req.body.lS,
      },
    };
    try {
      update(ref(db, "users/" + objIndex), allUsers[objIndex]).then(() => {
        console.log("registrado");
        res.write("Usuario Atualizado.");
        return res.send();
      });
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
  });
});

module.exports = router;
