require("dotenv").config()
const express = require("express");
const bodyParser = require("body-parser");
const Gitlab = require('@gitbeaker/node').Gitlab;

const PORT = 5000;

const app = express();
app.use(bodyParser.json());

// TODO: Uncomment when Gitlab is up and running and you've configured it
const api = new Gitlab({
  host: "http://localhost:32080",
  token: process.env.ACCESS_TOKEN,
});

const server = app.listen(PORT);
console.log("App started");


app.post("/", async (req, res) => {
    const body = req.body;
    // TODO: Step1 Check type of hook event
    if (body.event_type ===  "issue") {
      console.log("Call newIssueCreated")
      newIssueCreated(body)
    }
    return res.status(200).json({message: "ok!"});
});

// Katacoda - Step 2
async function newIssueCreated(payload) {
  const projectId = payload.project.id;
  const issueId = payload.object_attributes.iid;
  const action = payload.object_attributes.action;
  const authorId = payload.object_attributes.author_id;
  const authorName = payload.user.name;
  if (action === "open") {
    console.log("open action")
    // Check if authors first issue, if yes comment else do nothing
    const firstIssue = await isUsersFirstIssue(projectId, authorId);
    if (firstIssue) {
      commentOnIssue(projectId, issueId, authorName)
    }
  }
}

// Return true if it's the users first issue in project, false otherwise
async function isUsersFirstIssue(projectId, userId) {
  try {
    const usersIssues = await api.Issues.all({projectId: projectId, author_id: userId})
    return usersIssues.length === 1 ? true : false;
  } catch (err) {
    console.log("Error", err);
    return false;
  }
}

// Katacoda - Step 3
async function commentOnIssue(projectId, issueId, authorName) {
  const body = `Welcome ${authorName}! Glad to have you here 🐶`;

  try {
    const res = await api.IssueNotes.create(projectId, issueId, body);
    console.log("Success", res);
  } catch (err) {
    console.log(err)
  }
}
