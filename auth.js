const bcrypt = require("bcryptjs"),
  localStrategy = require("passport-local").Strategy;

const { getDatabase, ref, onValue } = require("firebase/database");

require("./database");

module.exports = (passport) => {
  const db = getDatabase();
  const users = ref(db, "users");
  onValue(users, (snapshot) => {
    const users = snapshot.val();

    v

    passport.use(
      new localStrategy(
        { usernameField: "username", passwordField: "password" },
        (username, password, done) => {
          try {
            const user = findUser(username);
            if (!user) return done(null, false);

            const isValid = bcrypt.compareSync(password, user.password);

            if (!isValid) return done(null, false);
            return done(null, user);
          } catch (err) {
            console.log(err);
            return done(err, false);
          }
        }
      )
    );
  });
};
