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
