Hi. So you are having some trubble with GitLab. Unfortunate. 

First let us see if the GitLab docker container is actually running.

Run: `docker ps`{{execute}}

You should be able to see a container with the image called `gitlab/gitlab-ce:latest`.

**If you cannot see a container**
If not then something unforseen might have happened during the setup script. 

Double check with `docker ps`{{execute}} again just to make sure you did not just time the last command with a restart cycle. If you still do not see the container we can try manually starting it.

Run: `docker run --detach \
  --hostname [[HOST_SUBDOMAIN]]-80-[[KATACODA_HOST]].environments.katacoda.com \
  --env GITLAB_OMNIBUS_CONFIG="external_url 'https://[[HOST_SUBDOMAIN]]-80-[[KATACODA_HOST]].environments.katacoda.com/'; gitlab_rails['initial_root_password'] = 'password';" \
  --publish 443:443 --publish 80:80 --publish 2289:22 \
  --name gitlab \
  --restart always \
  --volume /gitlab/config:/etc/gitlab \
  --volume /gitlab/logs:/var/log/gitlab \
  --volume /gitlab/data:/var/opt/gitlab \
  gitlab/gitlab-ce:latest`{{execute}}

**If you can see a container**
Now it might just be the case that the Gitlab startup sequence has not yet finished. We can look at the last output of the logs to see if it is still running parts of the initilization sequence. 

Run: `docker logs gitlab`{{execute}}

If you see no error like output it is possible the server has not started yet. Wait a bit and try again.

If there seems to be an error or the server is still not starting after a few minutes we can try restarting it.

Run: `docker restart gitlab`{{execute}}

Wait a few more minuites after this is run. Worst case you will have to restart the katacoda session.