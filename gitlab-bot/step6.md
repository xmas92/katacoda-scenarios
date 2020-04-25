The last part of this bot is to comment on the issue with a welcoming message.
That's done in the function `welcomeNewUser` as follows:

```js
// Add a comment on the issue welcoming the author
async function welcomeNewUser(projectId, issueId, authorName) {
  const body = `TODO: Add a nice warm welcoming message to the author`;

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
