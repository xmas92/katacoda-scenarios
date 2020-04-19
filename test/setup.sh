echo "Test"
touch test
echo "[[HOST_SUBDOMAIN]]-80-[[KATACODA_HOST]]" > test
tar -C /gitlab -xzvf ~/gitlab/test.tar.gz &> test
echo "docker run --detach \
  --hostname [[HOST_SUBDOMAIN]]-80-[[KATACODA_HOST]].environments.katacoda.com \
  --env GITLAB_OMNIBUS_CONFIG=\"external_url 'https://[[HOST_SUBDOMAIN]]-80-[[KATACODA_HOST]].environments.katacoda.com/'; gitlab_rails['initial_root_password'] = 'password';\" \
  --publish 443:443 --publish 80:80 --publish 2289:22 \
  --name gitlab \
  --restart always \
  --volume /gitlab/config:/etc/gitlab \
  --volume /gitlab/logs:/var/log/gitlab \
  --volume /gitlab/data:/var/opt/gitlab \
  gitlab/gitlab-ce:latest" > test