import passport from "passport"
import {Strategy as GoogleStrategy} from "passport-google-oauth20"
import user from "../models/user.model.js"
passport.use(
    new GoogleStrategy(
        {
            clientID:process.env.GOOGLE_CLIENT_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET,
            callbackURL:'http://localhost:3000/auth/google/callback'
        }
        ,async (accessToken,refreshToken,profile,done) => {
            try{
const email = profile.emails[0].value
const existingUser = await user.findOne({googleId:profile.id})
if(existingUser){
    existingUser.googleId = profile.id
    existingUser.email = profile.emails[0].value
    existingUser.avatar =profile.photos[0].value
    existingUser.provider= "google"
    existingUser.isEmailVerified= true
    await existingUser.save()
    return done(null,existingUser)
}
const newUser = await user.create({
    name:profile.displayName,email,provider:"google",avatar:profile.photos[0].value,googleId:profile.id,isEmailVerified:true
})
return done(null,newUser)
            }
            catch(err){
                console.log(err)
            }
        }
    )
)