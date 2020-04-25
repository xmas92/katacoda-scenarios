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
