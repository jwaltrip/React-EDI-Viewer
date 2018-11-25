## MERN Stack + Redux Boilerplate

This is a simple full MERN stack boilerplate with Redux integrated.

It is used by myself to quickly get a full stack MERN + Redux app up and running with minimal setup

### Installation after clone

>Both the front end and back end utilize the same package.json file

After cloning, simply `cd` into the root directory and run either:

`yarn install` or `npm install` (depending on which package manager you prefer)

This will install all the dependencies for both front and back end.

##### Configure the MongoDB connection string

Copy the template file `/server/config/DB.example.js` to `/server/config/DB.js` and enter your MongoDB connection string here

The copied `DB.js` file will be ignored by git (via .gitignore) and will not be pushed to a public repo, keeping your DB connection info safe locally

### How to Use

The Express + MongoDB backend is located in the `/server` dir (and runs on port `4000`)

The React + Redux frontend is located in the `/src` dir (and runs on port `3000`)

#### Start the servers

> Both the front and backend servers can be started together using the concurrently npm module

**To start both the front and back end concurrently:**

`npm run start:dev`

_Note: to kill both servers, type `ctrl+c` **once** into the terminal_

**To start just the Express + MongoDB backend:**

`npm run start:server`

**To start just the React + Redux frontend:**

`npm run start`

