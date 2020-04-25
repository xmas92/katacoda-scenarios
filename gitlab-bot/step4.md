Lets begin by initialising the express server. Copy the following code to
`my-bot/bot.js`{{open}}:

```js
require("dotenv").config()
const express = require("express");
const bodyParser = require("body-parser");

const PORT = process.env.PORT;

const app = express();
app.use(bodyParser.json());

const server = app.listen(PORT);
console.log(`App started, listening on port ${PORT}`);
```{{copy}}

Notice how we set the variable `PORT`? We're using the `dotenv` package to read
variables from the environment or, as in our case, a `.env` file. This is the
preferred way of keeping secrets away from source control. Read more about it
[here](https://12factor.net/config). We'll use this for reading access tokens
and the URL of the Gitlab instance as well. Create and open the file
`my-bot/.env`{{open}}, `touch .env`{{execute interrupt}}, and add the following
to it. Don't worry we'll fill in the `GITLAB` variables later. Remember to
restart `nodemon` if you had that running with `npm run dev`{{execute}}

```
PORT=5000
GITLAB_HOST=https://[[HOST_SUBDOMAIN]]-80-[[KATACODA_HOST]].environments.katacoda.com/
GITLAB_ACCESS_TOKEN=
```{{copy}}

This will start the application and begin listening on the port specified in
`.env`.  However, at the moment the application doesn't handle any incoming
requests. There are no specified handlers but we'll create one up next.
