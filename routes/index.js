var express = require('express')
  , passport = require('passport')
  , util = require('util')
  , InstagramStrategy = require('passport-instagram').Strategy;
var router = express.Router();

//Recursos de la investigacion
//https://api.instagram.com/oauth/authorize?client_id=985985281955316&redirect_uri=https://gustavo-exe.github.io/ArJsPokemon/&scope=user_profile,user_media&response_type=code
//https://developers.facebook.com/docs/instagram-basic-display-api/guides/getting-access-tokens-and-permissions
//https://gist.github.com/jeserodz/a7fdae8f45a2b61cf8be

var INSTAGRAM_CLIENT_ID = process.env.CLIENT_ID;
var INSTAGRAM_CLIENT_SECRET = process.env.CLIENT_SECRET;

passport.use(new InstagramStrategy({
  clientID: INSTAGRAM_CLIENT_ID,
  clientSecret: INSTAGRAM_CLIENT_SECRET,
  callbackURL: "https://gustavo-exe.github.io/ArJsPokemon/"
},
function(accessToken, refreshToken, profile, done) {
  User.findOrCreate({ instagramId: profile.id }, function (err, user) {
    return console.log(err);
  });
}
));

router.get('/auth/instagram',
  passport.authenticate('instagram',{scope: 'user_profile'}));

/* router.get('/auth/instagram/callback',(req, res, next)=>{
  return res.status(401).json({"msg" : "Mision cumplida"})
}) */

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;