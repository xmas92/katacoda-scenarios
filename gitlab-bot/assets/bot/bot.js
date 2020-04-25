require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const { Gitlab } = require("@gitbeaker/node");

const PORT = process.env.PORT;

const app = express();
app.use(bodyParser.json());

const server = app.listen(PORT);
console.log(`App started, listening on port ${PORT}`);

const api = new Gitlab({
  host: process.env.GITLAB_HOST,
  token: process.env.GITLAB_ACCESS_TOKEN,
});

// Listen for POST requests on root of the server
app.post("/", async (req, res) => {
  const payload = req.body;
  if (payload.event_type === "issue") {
    handleIssueEvent(payload);
  }

  // Respond to request that we got it
  return res.status(200).json({ message: "ok!" });
});

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

// Add a comment on the issue welcoming the author
async function welcomeNewUser(projectId, issueId, authorName) {
  const body = `Welcome ${authorName}! Glad to have you here 🐶`;

  try {
    await api.IssueNotes.create(projectId, issueId, body);
  } catch (err) {
    console.log(err);
  }
}
