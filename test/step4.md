Lets begin by initialising the express server. Copy the following code to
`bot.js`:

```js
require("dotenv").config()
const express = require("express");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 5000;

const app = express();
app.use(bodyParser.json());

const server = app.listen(PORT);
console.log("App started");
```{{copy}}

> TODO: Add dotenv explanation

This will start the application on port ???? or 5000 and start listening.
However, at the moment the application doesn't handle any incoming requests.
There are no specified handlers.

## Receiving requests from Gitlab

The webhooks from Gitlab will send POST requests with information attached in
the body of the request. Let's create an endpoint for receiving these requests.

Add the following to the end of the file:


```js
// Listen for POST requests on root of the server
app.post("/", async (req, res) => {
  const payload = req.body;
  return res.status(200).json({ message: "ok!" });
});
```{{copy}}

We now have an endpoint listening for post requests on the root of your server.
When a request is received the body of it is printed to the console and a status
200 response is sent back to the server, indicating success.

## Checking type of event

It's possible to activate multiple different event to trigger a webhook. You can
read more about different events on Gitlab's documentation
[here](https://docs.gitlab.com/ee/user/project/integrations/webhooks.html#events).

Independent on which you chose when setting it up we need to check what kind it
is so that the bot can act accordingly. The event type is included in the body
of the POST request as `event_type`. Let's create a function handling issue
events and call it with the payload.

```js
// Listen for POST requests on root of the server
app.post("/", async (req, res) => {
  const payload = req.body;
  // TODO: Step1 Check type of hook event
  if (payload.event_type === "issue") {
    console.log("Call newIssueCreated");
    handleIssueEvent(payload);
  }
  return res.status(200).json({ message: "ok!" });
});
```{{copy}}

## Check if it's the users first issue
