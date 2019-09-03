## Youchatt 2.0
Rewrite in express + react + postgres, using typescript

This project is meant for me to practice software engineering skills by building a simple chat app that mimics the features in wechat. This is by no means a product. I will publish what I have learned from this project in my [blog](https://nerocui.com). Part 1 about refactoring the OG code base to a scalable project is already published [here](https://nerocui.com/2019/08/25/how-i-refactored-my-expressjs-codea-chat-app/). 

## Screenshots

![Friend List](https://github.com/nerocui/screenshots/blob/master/Screen%20Shot%202019-09-03%20at%2010.29.32%20AM.png?raw=true)

Friend List

![Profile Page](https://github.com/nerocui/screenshots/blob/master/Screen%20Shot%202019-09-03%20at%2010.29.51%20AM.png?raw=true)

Profile Page

![Search Page](https://github.com/nerocui/screenshots/blob/master/Screen%20Shot%202019-09-03%20at%2010.30.40%20AM.png?raw=true)

User Search Page

## Project Structure
```
─── server
    ├── app
    │   ├── App.ts
    │   └── index.ts -> entry point
    ├── client
    │   ├── index.js -> client entry point
    │   ├── public
    │   │   ├── firebase-messaging-sw.js
    │   │   ├── index.html
    │   └── src
    │       ├── action
    │       │   ├── index.js
    │       │   └── type.js
    │       ├── config
    │       │   └── app.js
    │       ├── data
    │       │   └── loading.json
    │       ├── index.js
    │       ├── index.scss
    │       ├── model
    │       │   ├── Contact.js
    │       │   ├── Message.js
    │       │   ├── Profile.js
    │       │   ├── Request.js
    │       │   └── Thread.js
    │       ├── reducer
    │       │   ├── index.js
    │       │   ├── reducer_auth.js
    │       │   ├── reducer_contact.js
    │       │   ├── reducer_contact_search.js
    │       │   ├── reducer_request.js
    │       │   ├── reducer_thread.js
    │       │   └── reducer_ui.js
    │       ├── serviceWorker.js
    │       ├── setupProxy.js
    │       ├── startup
    │       │   ├── db.js
    │       │   ├── firebase.js
    │       │   └── index.js
    │       ├── style
    │       │   ├── _base.scss
    │       │   ├── _main.scss
    │       │   ├── _variables.scss
    │       │   └── components
    │       │       ├── _animation.scss
    │       │       └── _page.scss
    │       ├── ui
    │       │   ├── components
    │       │   │   ├── appbar
    │       │   │   │   ├── AppBar.jsx
    │       │   │   │   ├── BackButton.jsx
    │       │   │   │   ├── DynamicAppBar.jsx
    │       │   │   │   ├── MenuButton.jsx
    │       │   │   │   └── SearchBar.jsx
    │       │   │   ├── cards
    │       │   │   │   └── SearchResult.jsx
    │       │   │   └── sidemenu
    │       │   │       └── SideMenu.jsx
    │       │   ├── pages
    │       │   │   ├── AllowPermissionPage.jsx
    │       │   │   ├── AuthCallback.jsx
    │       │   │   ├── ChatPage.jsx
    │       │   │   ├── ContactsPage.jsx
    │       │   │   ├── LoadingPage.jsx
    │       │   │   ├── LoginPage.jsx
    │       │   │   ├── MainPage.jsx
    │       │   │   ├── MomentsPage.jsx
    │       │   │   ├── ProfilePage.jsx
    │       │   │   ├── RedirectPage.jsx
    │       │   │   ├── RequestsPage.jsx
    │       │   │   └── SearchPage.jsx
    │       │   └── routes
    │       │       ├── PrivateRoute.jsx
    │       │       ├── PublicRedirectRoute.jsx
    │       │       └── index.jsx
    │       └── utils
    │           └── notification
    │               ├── handler.js
    │               └── type.js
    ├── db
    │   ├── diagnostics.ts
    │   ├── index.ts
    │   ├── repos
    │   │   ├── index.ts
    │   │   ├── messages.ts
    │   │   ├── moments.ts
    │   │   ├── requests.ts
    │   │   └── users.ts
    │   └── sql
    │       ├── comments
    │       │   ├── add.sql
    │       │   ├── create.sql
    │       │   ├── drop.sql
    │       │   ├── empty.sql
    │       │   └── remove.sql
    │       ├── friends
    │       │   ├── add.sql
    │       │   ├── create.sql
    │       │   ├── drop.sql
    │       │   ├── empty.sql
    │       │   └── remove.sql
    │       ├── images
    │       │   ├── add.sql
    │       │   ├── create.sql
    │       │   ├── drop.sql
    │       │   ├── empty.sql
    │       │   └── remove.sql
    │       ├── index.ts
    │       ├── likes
    │       │   ├── add.sql
    │       │   ├── create.sql
    │       │   ├── drop.sql
    │       │   ├── empty.sql
    │       │   └── remove.sql
    │       ├── messages
    │       │   ├── add.sql
    │       │   ├── create.sql
    │       │   ├── drop.sql
    │       │   ├── empty.sql
    │       │   └── remove.sql
    │       ├── moments
    │       │   ├── add.sql
    │       │   ├── create.sql
    │       │   ├── drop.sql
    │       │   ├── empty.sql
    │       │   └── remove.sql
    │       ├── requests
    │       │   ├── add.sql
    │       │   ├── create.sql
    │       │   ├── drop.sql
    │       │   ├── empty.sql
    │       │   └── remove.sql
    │       └── users
    │           ├── add.sql
    │           ├── create.sql
    │           ├── drop.sql
    │           ├── empty.sql
    │           └── init.sql
    ├── middleware
    │   ├── index.ts
    │   └── strategies
    │       └── google.ts
    ├── package.json
    ├── routes
    │   ├── AuthRouter.ts
    │   ├── RequestRouter.ts
    │   └── UserRouter.ts
    ├── services
    │   ├── algolia.ts
    │   ├── firebase.ts
    │   ├── index.ts
    │   └── passport.ts
    ├── tsconfig.json
    └── types
        └── index.ts
```
## Server Tech Stack
- NodeJS
- ExpressJS
- Typescript
- PostgreSQL Database
- Algolia Search
- Firebase Admin
- PassportJS

## Frontend Tech Stack
- ReactJS
- Redux
- React Router
- Firebase
- Algolia Search Client
- Lovefield Relational Database based on IndexedDB

## Feature Highlight
- Push notification from Firebase
- Search index from Algolia
- Offline first design with Lovefield DB
- Native looking UI with Framework7 React

## How To Setup
### API Key
server/config/api_key.ts
```ts
export const key = {
	googleClientId: 'YOUR GOOGLE CLIENTID HERE',
	googleClientSecret: 'YOUR GOOGLE CLIENT SECRET HERE',
	cookieKey: 'SOME RANDOM COOKIE KEY YOU CAN DEFINE HERE',
	algoliaApplicationID: 'YOUR ALGOLIA APPLICATION ID',
	algoliaSearchKey: 'YOUR ALGOLIA SEARCH KEY',
	algoliaAdminKey: 'YOUR ALGOLIA ADMIN KEY',
};
```
server/config/basicchat-dev-firebase-adminsdk-22jr8-c9fe2295e6.json

You can download this file from Firebase Console page
```json
{
  "type": "",
  "project_id": "",
  "private_key_id": "",
  "private_key": "",
  "client_email": "",
  "client_id": "",
  "auth_uri": "",
  "token_uri": "",
  "auth_provider_x509_cert_url": "",
  "client_x509_cert_url": ""
}

```
server/config/db_config.json
```json
{
	"host": "localhost",
	"port": 5432,
	"database": "basic-chat-db-dev",
	"user": "YOUR DB USERNAME HERE",
	"password": "YOUR DB PASSWORD HERE"
}
```
server/client/src/keys/api_keys.js
```js
const keys = {
	algoliaApplicationID: 'YOUR ALGOLIA APPLICATION ID',
	algoliaSearchKey: 'YOUR ALGOLIA SEARCH KEY',
};

export default keys;
```
server/client/src/keys/fire_base_key.js
```js
const firebaseConfig = {
	apiKey: "YOUR FIREBASE API KEY",
	authDomain: "YOUR AUTH DOMAIN",
	databaseURL: "YOUR DATABASE URL",
	projectId: "YOUR PROJECT ID",
	storageBucket: "",
	messagingSenderId: "YOUR MESSAGING SENDER ID",
	appId: "YOUR APP ID"
};

export default firebaseConfig;
```
