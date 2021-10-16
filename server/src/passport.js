// Import dependencies
import { Strategy, ExtractJwt } from 'passport-jwt';
import userModel from './models/User.js';

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRETORKEY;

module.exports = passport => {
    passport.use(
        new Strategy(opts, (jwt_payload, done) => {
            userModel.findById(jwt_payload.id)
              .then(user => {
                if (user) {
                  return done(null, user);
                }
                return done(null, false);
              })
              .catch(err => console.log(err));
        })
    );
}