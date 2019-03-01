# Clout Companion

![cc](https://user-images.githubusercontent.com/21237266/53620683-b5abf200-3ba8-11e9-9b52-ec2907fc4274.gif)

## Features

- A dashboard to help keep track of resell profits
- Paypal, StockX & Grailed fees calculator
- A resources page to help upcoming resellers with their business
- Login integration with Twitter & Facebook

## Tech Stack

- React/ Redux
- Node.js
- MongoDb
- Docker

### Running locally (with Docker)

Install docker [here](https://www.docker.com/get-started)

From the root directory of the project run `docker-compose up --build`

The app should now be serving on http://localhost:3000/

### Running locally (without Docker)

Run `npm install` in both the client and server directories
Uncomment the code in setupProxy.js and comment the existing app.use


***Note: You will need to create a .env file in the server directory with the following content***

```
twitterKey=yourKey
twitterSecret=yourSecret
jwtSecret=yourSecret
```
