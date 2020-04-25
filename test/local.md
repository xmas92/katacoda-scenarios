First note that in any step where you see a like this

`[[HOST_SUBDOMAIN]]-XX-[[KATACODA_HOST]].environments.katacoda.com`

where XX is a number you can replace that with `localhost:XX`. 

Now the following command can be used to start a local gitlab docker container which is the same as the one used in this tutorial.

`docker run --detach \
  --hostname localhost \
  --env GITLAB_OMNIBUS_CONFIG="external_url 'http://localhost/'; gitlab_rails['initial_root_password'] = 'password';" \
  --publish 443:443 --publish 80:80 --publish 2289:22 \
  --name gitlab \
  --restart always \
  --volume /tmp/gitlab/config:/etc/gitlab \
  --volume /tmp/gitlab/logs:/var/log/gitlab \
  --volume /tmp/gitlab/data:/var/opt/gitlab \
  gitlab/gitlab-ce:latest`{{copy}}

  Don't forget to remove the container after you are done.

  `docker rm -f gitlab`{{copy}}