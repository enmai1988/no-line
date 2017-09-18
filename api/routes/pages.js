module.exports.index = (req, res, nextApp) => {
  return nextApp.render(req, res, '/', req.query);
};

module.exports.settings = (req, res, nextApp) => {
  if (req.isAuthenticated()) {
    return nextApp.render(req, res, '/settings', req.query);
  }
  return res.redirect('/signin');
};

module.exports.signin = (req, res, nextApp) => {
  if (req.isAuthenticated()) {
    return res.redirect('/'); // redirect to homepage if user is authenticated 
  }
  return nextApp.render(req, res, '/signin', req.query);
};

module.exports.signout = (req, res) => {
  req.logout();
  return res.redirect('/');
};