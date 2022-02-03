const express = require("express"),
  router = express.Router(),
  bcrypt = require("bcryptjs"),
  passport = require("passport");

const { getDatabase, ref, set, onValue } = require("firebase/database");
const { use } = require("passport");

router.get("/", (req, res, next) => {
  if (req.query.fail)
    res.render("login", { message: "Usuário ou senha inválidos" });
  else res.render("login", { message: null });
});

router.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/edit",
    failureRedirect: "/login?fail=true",
  })
);

router.post("/register", function (req, res) {
  const db = getDatabase();
  const users = ref(db, "users");
  onValue(users, (snapshot) => {
    let allUsers = snapshot.val();

    if (allUsers == null) {
      allUsers = [];
    }

    console.log(allUsers);

    const user = {
      _id: req.body.username,
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
      nomeCompleto: "",
      imgs: {
        pfp: "",
        background: "",
        custom_icons: ["", ""],
        profilePhotos: ["", "", "", ""],
      },
      redes: {
        facebook: "",
        tiktok: "",
        github: "",
        spotify: "",
        website: "",
        wpp: "",
      },
      sobremim: "",
      stts: "",
      customButton: {
        title: "",
        link: "",
        icon: "",
      },
      local: "",
      dataNasc: "",
      files: {
        soundURL: "",
      }
    };

    const checkUnique = () => {
      return allUsers.find((item) => item.username === user.username);
    };

    if (allUsers == undefined) {
    } else {
      if (checkUnique())
        return res.send(
          "usuário existente/registrado, volte para a tela de login para entrar"
        );
    }

    //Saporra ta quebrada aq kkkj, dps eu mexo

    allUsers.push(user);

    set(ref(db, "users"), allUsers).then(() => {
      console.log("registrado");
    });
  });
});

module.exports = router;
