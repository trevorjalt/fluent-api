# fluent Api

Welcome to fluent, an app where you can practice learning a language with the spaced reptition revision technique.

`fluent Api` is the backend for `fluent`.  To see `fluent` in action, check out [fluent](https://benchmark-live.vercel.app/ "fluent").

The `fluent` frontend can be found at: [fluent-client](https://github.com/trevorjalt/fluent-client/ "fluent Client")

## what is spaced repetition?

Spaced repetition is a learning technique which exploits the psychological spacing effect.  Within `fluent`, this means that words that you translate correctly will pop up with increasingly less frequency with consecutive correct answers.  Conversely, get a word wrong and that word will begin to pop up more frequently.

## table of contents.

* [the tech](#the-tech)
  * [backend](#backend)
  * [production](#production)
* [setup](#setup)
  * [requirements](#requirements)
  * [local setup](#local-setup)
* [quick start](#quick-start-scripts)
* [endpoints](#endpoints)
  * [overview](#overview)
  * [authentication](#authentication)
  * [public endpoints](#public-endpoints)
    * [/api/user/](#apiuser)
    * [/api/auth/token/](#apiauthtoken)
  * [protected endpoints](#protected-endpoints)
    * [/api/language/](#apilanguage)
    * [/api/language/head/](#apilanguagehead)
    * [/api/language/guess/](#apilanguageguess)

 
## the tech.

### backend.

* Node and Express
  * Authentication via JWT
  * RESTful Api
* Testing
  * Supertest (integration)
  * Mocha and Chai (unit)
* Database
  * Postgres
  * Knex.js - SQL wrapper

### production.

Deployed via Heroku

## setup.

### requirements.
* Postgres v7.8.2
* Node v12.18.3

### local setup.

Clone this repository to your local machine 

````
git clone https://github.com/trevorjalt/fluent-api fluent-api
````

Change directory into the cloned repository

````
cd fluent-api
````

Make a fresh start of the git history for this project

```` 
rm -rf .git && git init
````

Install the node dependencies 

````
npm install
````

Start the Postgres server

````
pg_ctl start
````

Create the development user

````
createuser -Pw --interactive 
````

Type `kakarot` for the name of the `role` to add

Select `y` when asked if the user should be a super user

Press `return` (enter) for no password

Create the development databases

````
createdb -U kakarot fluent && createdb -U kakarot fluent-test
````

Create a `.env` file in the project root, and include the following:

````
NODE_ENV=development
PORT=8000
TZ='UTC'
MIGRATION_DB_HOST=127.0.0.1
MIGRATION_DB_PORT=5432
MIGRATION_DB_NAME=fluent-test
MIGRATION_DB_USER=kakarot
MIGRATION_DB_PASS=
DB_URL="postgresql://kakarot@localhost/fluent"
TEST_DB_URL="postgresql://kakarot@localhost/fluent-test"
JWT_SECRET="spaced-repetition-jwt-secret"
````

Run the migrations for the development test database

````
npm run migrate:test
````

Update the following in the `.env`

````
MIGRATION_DB_NAME=fluent
````

Run the migrations for the development database

````
npm run migrate
````

Seed the development database

````
psql -U kakarot -d fluent -f ./seeds/seed.tables.sql
````

## quick start scripts.

Run the `fluent` tests

````
npm t
````

Start the application

````
npm start
````

Start nodemon for the application 

````
npm run dev
````

## endpoints.

### overview.

* endpoints
  * /api/user
  * /api/auth 
  * /api/language
  * /api/language/head
  * /api/language/guess 

### authentication.

`fluent` is supported by JWT authentication. A valid `username` and `password` must be posted to the [/api/auth/token/](#apiauthtoken) endpoint.  This will return a bearer token that must be included in the header for all protected endpoints.  To create a valid user, see [/api/user/](#apiuser)

### public endpoints.

#### /api/user/

* `POST`

`request body` requires:

````
{
  name: '',
  username: '',
  password: ''
}
````

#### /api/auth/token

* `POST`

`request body` requires:

````
{
  username: '',
  password: ''
}
````

### protected endpoints.

#### /api/language

* `GET`

`Header` must include a `JWT Token`

`request body` requires

````
{
  language_id: [number],
  user_id: [number]
}
````

#### /api/language/head

* `GET`

`Header` must include a `JWT Token`

`request body` requires

````
{
  language_id: [number]
}
````

#### /api/language/guess

* `POST`

`Header` must include a `JWT Token`

`request body` requires:

````
{
  guess: ''
}
````

## lets get fluent. 