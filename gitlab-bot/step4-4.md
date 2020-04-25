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
