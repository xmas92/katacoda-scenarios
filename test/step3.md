Now let's start with creating a directory for the bot and initialise a new node
application. The bot will be written with the node web application framework
[express](https://expressjs.com/).

First create the directory `mkdir my-bot`{{execute}}

Then lets create a `package.json` file describing the project with `touch
package.json`{{execute}}.

Copy and paste the content below into the `package.json` file.

```json
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
```
{{copy}


After that's done we need to add the dependencies for the bot with the
following command: `npm install express body-parser
@gitbeaker/node`{{execute}}. These are all dependencies needed for this
project.

In order for us to ease the development we'll also add a development dependency
[`nodemon`](https://nodemon.io/). This is done with the following command: `npm
install nodemon --save-dev`{{execute}}.

Finally we'll to create a new file for the application with `touch
bot.js`{{execute}}.

In the next step we'll start filling out `bot.js` and thus begin crafting our
bot.
