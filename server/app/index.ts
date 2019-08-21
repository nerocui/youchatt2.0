import * as express from 'express';
import * as io from 'socket.io';
import * as passport from 'passport';
import * as uniqid from 'uniqid';
import * as cookieSession from 'cookie-session';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { key } from '../config/api_key';
import { db } from '../db';
import { UserModel, RequestModel } from '../types';
import * as algoliasearch from 'algoliasearch';

// Create a new express application instance
const app: express.Application = express();
db.users.init();
db.requests.create();
const client = algoliasearch(key.algoliaApplicationID, key.algoliaAdminKey);
const index = client.initIndex('dev_USERS');

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
            index.addObject({
              objectID: user.id,
              ...user
            });
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
});

app.post('/api/request/add', (req, res) => {
  //TODO: Add auth check in prod
  const {id, to_user_id} = req.query;
  if (!(id && to_user_id)) {
    res.status(400);
    res.send('Bad Request');
  }
  const request: RequestModel = {
    id: req.query.id,
    to_user_id: req.query.to_user_id,
  };
  db.requests.add(request)
    .then(request => {
      res.status(201);
      res.send(request);
    }).catch(e => {
      console.log('Error: ', e);
      res.status(500);
      res.send('Fail to process request');
    });
});

app.post('/api/request/accept', async (req, res) => {
  //TODO: Add auth check in prod
  const {id} = req.query;
  if (!id) {
    res.status(400);
    res.send('Bad Request');
  }
  let request: RequestModel;
  try {
    request = await db.requests.getOneWithId(id);
    const user: UserModel = await db.users.addFriend(req.user.id, request.to_user_id);
    db.requests.remove(id);
    res.status(201);
    res.send(user);
  } catch(e) {
    console.log('Error: ', e);
    res.status(500);
    res.send('Fail to process request');
  }
});

app.post('/api/request/decline', async (req, res) => {
  //TODO: Add auth check in prod
  const {id} = req.query;
  if (!id) {
    res.status(400);
    res.send('Bad Request');
  }
  try {
    db.requests.remove(id);
    res.status(201);
    res.send('Removed Request');
  } catch(e) {
    console.log('Error: ', e);
    res.status(500);
    res.send('Fail to process request');
  }
});

app.get('/api/friend/all', async (req, res) => {
  //TODO: Add auth check in prod
  try {
    const users = await db.users.getAllFriend(req.user.id);
    res.status(200);
    res.send(users);
  } catch(e) {
    console.log('Error: ', e);
    res.status(500);
    res.send('Fail to get friends');
  }
});

app.listen(5000, function () {
  console.log('Example app listening on port 5000!');
});
