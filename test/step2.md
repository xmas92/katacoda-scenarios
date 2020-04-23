In this project we're going to create a bot that will respond to issues. This is
a very simple task for a bot so remember you can do much more advanced things.

![overview](./assets/overview.png)

Above you see an overview on what will be covered.  We'll create a bot (server)
which listens for requests from Gitlab.  These requests will be set up as
webhooks that send information triggered by different events such as new
commits, opened pull requests, comments on issues etc. 

When the bot receives an update it will use the API library
[Gitbeaker](https://github.com/jdalrymple/gitbeaker) to communicate with
[Gitlab's official
API](https://gitlab.com/gitlab-org/gitlab/tree/master/doc/api). For this example
the only update which we'll handle is the creation of a new issue. When a new
issue is created by someone for the first time our bot will comment on their
issue.
