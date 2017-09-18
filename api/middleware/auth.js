const session = require('express-session');
const redis = require('redis');
const RedisStore = require('connect-redis')(session);
const config = require('config')['redis'];
const colors = require('colors');

const logErrors = process.env.NODE_ENV !== 'production'; // enable error handling for express session
const client = redis.createClient(6379, config.host);
client.on('connect', () => console.log('Connected to Redis'));
client.on('error', err => console.log('Redis has an error: '.red, err));

module.exports.session = session({
  store: new RedisStore({ client, logErrors }),
  secret: 'no-line',
  resave: false,
  rolling: true,
  saveUninitialized: false,
  cookie: { maxAge: 60 * 1000 * 15 },
  unset: 'destroy',
  name: '_sess'
});

module.exports.verify = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/signin');
};

module.exports.isAuthorized = async (req, res, next) => {
  // let isAuthorized = false;
  
  // // ensure user is admin of the store
  // if (req.isAuthenticated() && req.user) {
  //   let loggedInUser = await Admin.findById(req.user.id);
  //   isAuthorized = !!loggedInUser && user.storeId === req.body.id;
  // }
  
  // if (!req.isAuthenticated() || !isAuthorized) {
  //   return res.sendStatus(401); 
  // }
  next();
};