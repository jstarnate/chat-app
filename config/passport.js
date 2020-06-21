import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import User from '../models/User'

export default function() {
	const jwtOptions = {
		secretOrKey: process.env.JWT_SECRET,
		jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
	}

	passport.use('signin', new LocalStrategy(
		(username, password, done) => {
			User.findOne({ username }, (err, user) => {
				if (err) return done(err)

				if (!user) return done(null, false)

				return done(null, user)
			})
		}
	))

	passport.use('signup', new LocalStrategy(
		(username, password, done) => {
			return done(null, null)
		}
	))

	passport.use(new JwtStrategy(jwtOptions, async (payload, done) => {
		try {
			const user = await User.findById(payload.sub)

			if (!user) {
				return done(null, false)
			}

			return done(null, user)
		}
		catch (error) {
			done(error, null)
		}
	}))
}