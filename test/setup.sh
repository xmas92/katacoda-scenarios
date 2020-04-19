echo "Test"
touch test
echo "[[HOST_SUBDOMAIN]]-80-[[KATACODA_HOST]]" > test
git config --global user.name "Me"
git config --global user.email "user@example.com"
git clone https://github.com/xmas92/katacoda-scenarios.git tmp
mkdir /gitlab
tar -C /gitlab -xzvf tmp/test/assets/test.tar.gz
rm -rf tmp
echo "Run Docker" >> test
docker run --detach \
  --hostname [[HOST_SUBDOMAIN]]-80-[[KATACODA_HOST]].environments.katacoda.com \
  --env GITLAB_OMNIBUS_CONFIG="external_url 'https://[[HOST_SUBDOMAIN]]-80-[[KATACODA_HOST]].environments.katacoda.com/';" \
  --publish 443:443 --publish 80:80 --publish 2289:22 \
  --name gitlab \
  --restart always \
  --volume /gitlab/config:/etc/gitlab \
  --volume /gitlab/logs:/var/log/gitlab \
  --volume /gitlab/data:/var/opt/gitlab \
  gitlab/gitlab-ce:latest || true
echo "Sleep" >> test
sleep 2
echo "update permissions" >> test
docker exec -it gitlab update-permissions
echo "restart" >> test
docker restart gitlab
echo "sleep" >> test
sleep 2
echo "fix gitaly" >> test
docker exec -it gitlab chown -R git:git /var/opt/gitlab/gitaly/
echo "restart" >> test
docker restart gitlab
echo "Done" >> test