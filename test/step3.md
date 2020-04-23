Now let's start with creating a directory for the bot and initialise a new node
application. The bot will be written with the node web application framework
[express](https://expressjs.com/).

First create the directory `mkdir my-bot`{{execute}}

Then lets create a `package.json` file in the `my-bot` directory describing the
project with `cd my-bot`{{execute}} and then `touch package.json`{{execute}}.

Copy and paste the content below into the `package.json` file.

```
{
  "name": "my-bot",
  "version": "1.0.0",
  "main": "bot.js",
  "scripts": {
    "start": "node bot.js",
    "dev": "nodemon bot.js"
  },
  "license": "MIT",
  "private": false
}
```{{copy}}


After that's done we need to add the dependencies for the bot with the following
command: `npm install express body-parser @gitbeaker/node dotenv`{{execute}}.
These are all dependencies needed for this project.

In order for us to ease the development we'll also add a development dependency
[`nodemon`](https://nodemon.io/). It simply reloads the server when a file is
changed.
This is done with the following command: `npm install nodemon --save-dev`{{execute}}.

Finally we'll to create a new file for the application with `touch bot.js`{{execute}}.

We can now start the bot with the command: `npm run start`{{execute}} or if we
want to reload the server when we make changes to it: `npm run dev`{{execute}}.

In the next step we'll start filling out `bot.js` and thus begin crafting our
bot.
