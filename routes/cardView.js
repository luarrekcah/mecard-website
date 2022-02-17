const express = require("express"),
  router = express.Router();
require("../database");

const { getDatabase, ref, onValue } = require("firebase/database");

router.get("/:id", (req, res, next) => {
  const db = getDatabase(),
    users = ref(db, "users");
  onValue(users, (snapshot) => {
    const users = snapshot.val();
    if (users == null) return res.send("Usuário não existe");
    const user = (username) => {
      return users.find((item) => item.username === username);
    };
    res.render("cardView", { user: user(req.params.id), me: req.user });
  });
});

module.exports = router;
