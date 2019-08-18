import * as express from 'express';
import * as io from 'socket.io';
import * as passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { key } from '../config/api_key';
import { db } from '../db';

// Create a new express application instance
const app: express.Application = express();
db.users.init();

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
      } else {
        console.log('lets create a user');
      }
    }
  )
);

/**
 * 
 * User Profile:  { id: '105047239642470460740',
  displayName: 'Zhuowen Cui',
  name: { familyName: 'Cui', givenName: 'Zhuowen' },
  emails: [ { value: 'zhuowencui@gmail.com', verified: true } ],
  photos:
   [ { value:
        'https://lh6.googleusercontent.com/-PeHwnt1UBI0/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3reUoYoEo8x2ucUJblxrnhAt0W4gMQ/photo.jpg' } ],
  provider: 'google',
  _raw:
   '{\n  "sub": "105047239642470460740",\n  "name": "Zhuowen Cui",\n  "given_name": "Zhuowen",\n  "family_name": "Cui",\n  "picture": "https://lh6.googleusercontent.com/-PeHwnt1UBI0/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3reUoYoEo8x2ucUJblxrnhAt0W4gMQ/photo.jpg",\n  "email": "zhuowencui@gmail.com",\n  "email_verified": true,\n  "locale": "en"\n}',
  _json:
   { sub: '105047239642470460740',
     name: 'Zhuowen Cui',
     given_name: 'Zhuowen',
     family_name: 'Cui',
     picture:
      'https://lh6.googleusercontent.com/-PeHwnt1UBI0/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3reUoYoEo8x2ucUJblxrnhAt0W4gMQ/photo.jpg',
     email: 'zhuowencui@gmail.com',
     email_verified: true,
     locale: 'en' } }
 */

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

app.get('/auth/google/callback', passport.authenticate('google'));

app.listen(5000, function () {
  console.log('Example app listening on port 5000!');
});
