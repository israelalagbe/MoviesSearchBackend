
const passport = require('passport');
const { ExtractJwt, Strategy} = require('passport-jwt');
const { env } = require('../helpers/env');
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = env('JWT_SECRET');

// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'yoursite.net';
passport.use(new Strategy(opts, function (jwt_payload, done) {
  return done(null,{ id: jwt_payload.sub });
}));
