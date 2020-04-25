Lets begin by initialising the express server. Copy the following code to
`bot.js`:

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
and the URL of the Gitlab instance as well. Create a `.env` file,
`touch .env`{{execute}} and add the following to it. Don't worry we'll fill in
the `GITLAB` variables later.

```
PORT=5000
GITLAB_HOST=https://[[HOST_SUBDOMAIN]]-80-[[KATACODA_HOST]].environments.katacoda.com/
GITLAB_ACCESS_TOKEN=
```{{copy}}

This will start the application and begin listening on the port specified in
`.env`.  However, at the moment the application doesn't handle any incoming
requests. There are no specified handlers but we'll create one up next.

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

It's possible to activate multiple different events to trigger a webhook. You
can read more about the different kinds of events in [Gitlab's own
documentation](https://docs.gitlab.com/ee/user/project/integrations/webhooks.html#events).

Independent on which events you chose when setting it up we need to check what
kind it is so that the bot can act accordingly. The event type is included in
the body of the POST request as `event_type`. Let's create a function handling
issue events and call it with the payload.

```js
// Listen for POST requests on root of the server
app.post("/", async (req, res) => {
  const payload = req.body;
  if (payload.event_type === "issue") {
    handleIssueEvent(payload);
  }

  // Respond to request that we got it
  return res.status(200).json({ message: "ok!" });
});

async function handleIssueEvent(payload) {
  // TODO: Implement
}
```{{copy}}

## Check if new issue is opened

Now we should add logic to the issue handler to check if the two conditions we
care about for the welcoming message. First, the event should be a new issue
created.  Secondly, the author of the issue should not have created any issues
previously.

Here is the implementation of `handleIssueEvent` as well as the signatures of
functions used within it:

```js
// Function responsible for handling events from issues
async function handleIssueEvent(payload) {
  // Extract all information needed from payload
  const projectId = payload.project.id;
  const issueId = payload.object_attributes.iid;
  const action = payload.object_attributes.action;
  const authorId = payload.object_attributes.author_id;
  const authorName = payload.user.name;

  // Only when creating a new issue
  if (action === "open") {
    // Check if authors first issue, if yes comment else do nothing
    const firstIssue = await isUsersFirstIssue(projectId, authorId);
    if (firstIssue) {
      welcomeNewUser(projectId, issueId, authorName);
    }
  }
}

// Return true if it's the users first issue in project, false otherwise
async function isUsersFirstIssue(projectId, userId) {
  // TODO: Implement
}

// Add a comment on the issue welcoming the author
async function welcomeNewUser(projectId, issueId, authorName) {
  // TODO: Implement
}
```{{copy}}

The function `isUsersFirstIssue` contains the logic to check if it's the users
first issue. The function `welcomeNewUser` makes a comment on the issue related
to the event. Both of these functions communicate with the Gitlab API so before
implementing them we need to initialise Gitbeaker.


## Initialise Beaker

First of we need to import the Gitlab library. This is done by adding the
following line in the beginning of the file (together with the other imports):

`const { Gitlab } = require("@gitbeaker/node");`{{copy}}

> Note, there may be an issue with the node version running in your terminal. If
> you get an error with `require("fs").promises` after you've added gitbeaker
> try opening a new terminal. Then confirm that `node -v` returns version 12 or
> higher.


We then need to create a Gitlab instance connecting to Gitlab with an access
token. The creation of the token will be handled in a later step. Paste the
following lines somewhere in the beginning, after starting the server should be
a good location for now.

```js
const api = new Gitlab({
  host: process.env.GITLAB_HOST,
  token: process.env.GITLAB_ACCESS_TOKEN,
});
```{{copy}}

> Note that if you run the server without setting the environment variables
> `GITLAB_HOST` and `GITLAB_ACCESS_TOKEN` in `.env` you will get an error.
> Don't worry about it now, we'll set them in a later step.


## Check if it's the users first issue

Now that we have a connection to the Gitlab API we can check if this is the
users first issue. Here is the implementation of `isUsersFirstIssue`:

```js
// Return true if it's the users first issue in project, false otherwise
async function isUsersFirstIssue(projectId, userId) {
  try {
    const usersIssues = await api.Issues.all({
      projectId: projectId,
      author_id: userId,
    });
    return usersIssues.length === 1;
  } catch (err) {
    console.log("Error", err);
    return false;
  }
}
```{{copy}}

Here we first get an array of all the issues in the project which the user has
authored. If this list only includes one element then we know that it's the
users first issue and return true.

> TODO: Should the api call be explained?

## Comment on the issue

The last part of this bot is to comment on the issue with a welcoming message.
That's done in the function `welcomeNewUser` as follows:

```js
// Add a comment on the issue welcoming the author
async function welcomeNewUser(projectId, issueId, authorName) {
  // TODO: Add a nice warm welcoming message to the author
  const body = ``;

  try {
    await api.IssueNotes.create(projectId, issueId, body);
  } catch (err) {
    console.log(err);
  }
}
```{{copy}}

> If you don't have any fantasy yourself you may use the following message:
> `Welcome ${authorName}! Glad to have you here 🐶`.
>
> Note that it uses [template
> literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
> to embed the authors name into the string.
