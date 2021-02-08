# FlashCards App

![screenshot](https://github.com/a1kn/flashcards/blob/main/img/app.png?raw=true)

## Install
1. Setup a `.env` file in the project's root. It should contain the information
   to your Postgres database.

   Example:
   ```
    DB_HOST=localhost
    DB_NAME=flashcards
    DB_USER=flashcards
    DB_PASSWORD=flashcards
2. `npm install` to install packages.
3. `npm run migrate` to initialize the database (if at any point you need to
   rollback, use `npm run rollback`).
4. `npm run seed` to start with some sample data (a necessary step in order to
   initialize the users)
5. `npm run start` to start the server.
6. Find the app at http://localhost:3000

![erd](https://github.com/a1kn/flashcards/blob/main/img/erd.png?raw=true)
