//guest for if user is login then he couldn't allow to go to register or login page by sim[ple localhost://login orlocalhost://register

function guest(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  return res.redirect("/")
}

module.exports = guest