import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../models/User';

export default function() {
	passport.use(new LocalStrategy(
		(username, password, done) => {
			User.findOne({ username }, (err, user) => {
				if (err) return done(err);

				if (!user) return done(null, false);

				return done(null, user);
			});
		}
	));
}