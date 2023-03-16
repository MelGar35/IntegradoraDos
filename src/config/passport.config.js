import passport from "passport"
import jwt from "passport-jwt"


const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
          token = req.cookies["coderCookieToken"];
    }
    return token;
}

const JWTStrategy = jwt.Strategy
const ExtractJWT = jwt.ExtractJwt

const initializePassport = () => {
    passport.use(
      "jwt",
      new JWTStrategy({
        jwtFromRequest : ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: "coderSecret"
      },
      async (jwtPayload, done) => {
        try {
          return done(null, jwtPayload)
        } catch (error) {
          done(error);
        }
      })
    )

}

export default initializePassport
