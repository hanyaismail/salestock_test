# salestock_software_engineer_product_test
An app that enable user to browse around Sale Stock product catalog.

##### This project is a full-separation of front-end and back-end where each of them run their own servers on different ports.
##### React.js is used on the front-end and cms, and node.js on the back-end as rest api
##### This App use cloudinary for image upload service

# Setup
You need to have Node.js (min. version 8.2.1) installed, you can download it on https://nodejs.org/en/

* Clone this repository to your project folder.
* open 2 terminal and go to the project folder directory. One terminal is used for run the front-end(client) and the other one for run the back-end(rest api server). 
* Run the front-end(client) and back-end(server) separatly, with the following step:

frontend - terminal A
```
cd frontend
npm install
npm start
```
the client should run on port 3000

backend-rest - terminal B
```
cd backend-rest
npm install
node index.js
```
the server run on port 5000

Open browser and go to localhost:3000

# USING CMS
cd cms
npm install
npm start