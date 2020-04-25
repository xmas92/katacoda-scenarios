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
authored with the `api.Issues.all()` function. If this list only includes one
element then we know that it's the users first issue and return true.
