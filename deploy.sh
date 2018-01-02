sudo docker build -t dcweb ./dcweb
sudo docker build -t dcapi ./dcapi

sudo docker swarm init
sudo docker stack deploy -c docker-stack.yml digicash