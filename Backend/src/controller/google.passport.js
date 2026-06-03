import passport from "passport"
import {Strategy as GoogleStrategy} from "passport-google-oauth20"
import user from "../models/user.model.js"
console.log("Callback URL:", `${process.env.URL}/auth/google/callback`)
passport.use(
    new GoogleStrategy(
        {
            clientID:process.env.GOOGLE_CLIENT_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET,
            callbackURL:`${process.env.BACKEND_URL}/auth/google/callback`
        }
        ,async (accessToken,refreshToken,profile,done) => {
            try{
const email = profile.emails[0].value
const existingUser = await user.findOne({email})
console.log("Existing user:", existingUser);

if(existingUser){
      if(!existingUser.firstName){
        existingUser.firstName = profile.displayName || "Google User"
    }
    existingUser.googleId = profile.id
    existingUser.email = profile.emails[0].value
    console.log("Email:", email);

    existingUser.avatar =profile.photos[0].value

    existingUser.provider= "google"
    existingUser.isEmailVerified= true
    await existingUser.save()
    return done(null,existingUser)
}
const fullName = profile.displayName?.trim() || ""
const names = fullName.split(" ")
const firstName =names[0] ||  "Google User"
console.log(firstName)
console.log(fullName)
const lastName = names.slice(1).join(" ")
const newUser = await user.create({
    firstName,lastName,email,provider:"google",avatar:profile.photos[0].value,googleId:profile.id,isEmailVerified:true
})
return done(null,newUser)
            }
            catch(err){
                console.log(err)
                    return done(err, null)

            }
        }
    )
)