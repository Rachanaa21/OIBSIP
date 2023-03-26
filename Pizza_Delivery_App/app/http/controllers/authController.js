const User = require("../../models/user")
const bcrypt = require("bcrypt")
const passport = require("passport")
const session = require("express-session")

function authController() {

  const _getRedirectUrl = (req) => {
    return req.user.role ==='admin' ? '/admin/orders' : '/customer/orders'
  }
  return {
    login(req, res) {
      res.render("auth/login")
    },
    postLogin(req, res, next) {
      const { email, password } = req.body
      //validate request
      if (!email || !password) {
        req.flash("error", "All fields are required")
        return res.redirect("/login")
      }
      
      passport.authenticate("local", (err, user, info) => {
        if (!user) {
            req.flash("error", info.message)
  
            return res.redirect("/login")
          }

        if (err) {
          req.flash("error", info.message)
          return next(err)
        }
     
        req.logIn(user, (err) => {
          if (err) {
            req.flash("error", info.message)
            return next(err)
          }
          return res.redirect(_getRedirectUrl(req))
        })
      })(req, res, next)
    },
    register(req, res) {
      res.render("auth/register")
    },
    async postRegister(req, res) {
      const { name, email, password } = req.body
      //validate request
      if (!name || !email || !password) {
        req.flash("error", "All fields are required")
        req.flash("name", name)
        req.flash("email", email)

        return res.redirect("/register")
      }

      //check if email exist

      User.exists({ email: email }, (err, result) => {
        if (result) {
          req.flash("error", "User already registerd")
          req.flash("name", name)
          req.flash("email", email)
          return res.redirect("/register")
        }
      });

      //we cant save password to the db directly hence we store it using hashkey
      const hashedPassword = await bcrypt.hash(password, 10)
      //create a user
      const user = new User({
        name,
        email,
        password: hashedPassword,
      });
      user
        .save()
        .then((user) => {
          //login automatically after registartion

          return res.redirect("/")
        })
        .catch((err) => {
          req.flash("error", "Something went wrong")

          return res.redirect("/register")
        })

      
    },
    logout(req,res){
        req.logout()
        return res.redirect('/')
    }
  };
}

module.exports = authController