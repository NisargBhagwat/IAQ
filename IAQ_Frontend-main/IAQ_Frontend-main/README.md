### local System Installation of project

Install backend code and frontend code in localsystem.
setup env variable in .env file in frontend code and => npm run build
move build file in backend file code.
set env variable in .env file in backend code
commit backend code and push on github.

### server setup

Install Nodejs => curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
		then => sudo apt-get install -y nodejs

Check the installation of node and npm using the following commands: => node --version && npm --version

Install git on ubuntu server => apt-get install git

take a clone of backend repo

install node modules

Let's install and use pm2 as a process manager. Install pm2 using the commands below: => sudo npm i pm2 -g

Configuring Nginx as a reverse proxy => sudo apt install nginx
									=> sudo vi /etc/nginx/sites-available/projectName
Copy the following content to this file	=> server{
  												server_name 165.232.177.116;

      											location / {
        											proxy_pass http://localhost:3000;
        											proxy_http_version 1.1;
        											proxy_set_header Upgrade $http_upgrade;
        											proxy_set_header Connection 'upgrade';
        											proxy_set_header Host $host;
        											proxy_cache_bypass $http_upgrade;
    												}
												}

sudo ln -s /etc/nginx/sites-available/projectName /etc/nginx/sites-enabled

#referance website =>  https://www.codewithharry.com/blogpost/deploy-nodejs-app-on-ubuntu/