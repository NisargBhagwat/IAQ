### local System Installation of project

1) Install backend code and frontend code in localsystem.
	* git clone https://github.com/NisargBhagwat/IAQ_Frontend.git
	* git clone https://github.com/NisargBhagwat/IAQ_Backend.git
2) setup env variable in .env file in frontend code and run below command.
* npm run build
3) move build file in backend file code.
4) set env variable in .env file in backend code

### Server setup

#### Install Nodejs 
1) curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
2) sudo apt-get install -y nodejs
3) Check the installation of node and npm using the following commands:
	* node --version && npm --version

#### Install git on ubuntu server
* apt-get install git

#### Clone of backend repo
* git clone https://github.com/NisargBhagwat/IAQ_Backend.git

#### Install node modules and pm2 using the commands below:
* sudo npm i pm2 -g

#### Configuring Nginx as a reverse proxy:
* sudo apt install nginx
* sudo vi /etc/nginx/sites-available/projectName
* Copy the following content to this file:
```
                       server{
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
```
* sudo ln -s /etc/nginx/sites-available/projectName /etc/nginx/sites-enabled

### Start your server
* pm2 start index.js

#### Referance website:
* https://www.codewithharry.com/blogpost/deploy-nodejs-app-on-ubuntu/


### process of Re-Hosting
1) take pull backend code and frontend code in localsystem.
	* git pull https://github.com/NisargBhagwat/IAQ_Frontend.git
	* git pull https://github.com/NisargBhagwat/IAQ_Backend.git

2) setup env variable in .env file in frontend code and run below command.
	* npm run build

3) move build file in backend file code.
	
4) set env variable in .env file in backend code and push the code after commit at backend folder.

5) Now latest backend code with react build is available at git repository

6) take pull of backend repo at server

7) delete current process by pm2 delete index.js

6) run pm2 start index.js
