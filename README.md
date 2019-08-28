## Youchatt 2.0
Rewrite in express + react + postgres, using typescript

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
