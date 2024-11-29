const jwt = require("jsonwebtoken"),
  passport = require("passport");

require("../passport"); 

let generateJWTToken = (user) => { 
  return jwt.sign(user, process.env.JWT_SECRET, {
    subject: user.Username,
    expiresIn: "7d",
    algorithm: "HS256" 
  });
};

module.exports = (router) => {
  router.post("/login", (req, res) => { 
    passport.authenticate("local", { session: false }, (error, user, info) => {
      if (error || !user) {
        return res.status(400).json({
          message: "Invalid username or password",
          user: user
        });
      }
      req.login(user, { session: false }, (error) => {
        if (error) {
          res.send(error);
        }
        let token = generateJWTToken(user.toJSON());
        return res.json({ user, token });
      });
    })(req, res);
  });
};
