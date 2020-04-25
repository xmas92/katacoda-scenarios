Back to the file `my-bot/bot.js`{{open}}. The webhooks from Gitlab will send
POST requests with information attached in the body of the request. Let's create
an endpoint for receiving these requests.  Add the following to the end of the
file:

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
