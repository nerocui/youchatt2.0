import * as express from 'express';
import * as io from 'socket.io';
import * as passport from 'passport';
import * as uniqid from 'uniqid';
import * as cookieSession from 'cookie-session';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { key } from '../config/api_key';
import { db } from '../db';
import { UserModel } from '../types';

// Create a new express application instance
const app: express.Application = express();
db.users.init();

passport.serializeUser((user: UserModel, done: any) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done: any) => {
  db.users.findById(id)
    .then(user => {
      done(null, user);
    });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: key.googleClientId,
      clientSecret: key.googleClientSecret,
      callbackURL: '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      const existUser = await db.users.findByEmail(profile.emails[0].value);
      if (existUser) {
        console.log(existUser);
        done(null, existUser);
      } else {
        console.log('lets create a user');
        const user: UserModel = {
          id: uniqid(),
          email: profile.emails[0].value,
          username: profile.displayName,
          first_name: profile.name.givenName,
          last_name: profile.name.familyName,
          initials: profile.name.givenName[0] + profile.name.familyName[0],
          profile_pic: profile.photos[0].value,
        };
        db.users.add(user)
          .then(user => {
            console.log("Created user: ", user);
            done(null, user);
          })
      }
    }
  )
);

app.use(
  cookieSession({
    maxAge: 30*24*60*60*1000,
    keys: [key.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

app.get(
  '/auth/google/callback',
  passport.authenticate('google'),
  (req, res) => {
    res.redirect('/main');
  }
);

app.get('/api/current_user', (req, res) => {
  res.send(req.user);
});

app.get('/api/logout', (req, res) => {
  req.logout();
  res.send(req.user);
})

app.listen(5000, function () {
  console.log('Example app listening on port 5000!');
});
