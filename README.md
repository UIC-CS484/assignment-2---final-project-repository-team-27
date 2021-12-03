# Assignment 3

The assignment is complete. It satisfies all requirements.

## Production mode

Please note that the app has been deployed so it will not work in development mode as ports and urls in the .env file have been changed.
Heroku has some weird sleep mode in the free plan, so it may take a while for the website to load. Please be patient.
This is the url to the frontend - [https://cryptoversefront.herokuapp.com/](https://cryptoversefront.herokuapp.com/)
This is the url to the backend - [https://cryptoverseback.herokuapp.com/](https://cryptoverseback.herokuapp.com/)

## Backend

The server has been built using node.js and express.js.

### `npm start` starts the server

cd into the backend folder and type 'npm install' followed by 'npm start'. This will start the server.
The server runs on port 3001. Please start the server before starting the frontend.
Keep this open in one terminal window.

### `npm test` starts the test scripts

cd into the backend folder and type 'npm test'.
There is a file called validation.test.js. This validates the inputs entered by the user in the sign up form.

### `erd diagram` represents the database schema implemented <br/><br/>

![erd diagram](./backend/images/erd_diagram.drawio.png)

### `charts`

I am using a library called react-sparklines for the charting requirement. I get sparkline data from the api which is then fed into the
react-sparklines library, and this renders a chart based on the latest array of prices of the cryptocurrency.

### `session`

I am using a library called 'knex' to facilitate database operations. express-session supports a library called connect-session-knex, I
use this to store the session in the database.

## Frontend

The frontend has been built using React.js.

### `npm start` starts the react scripts

cd into the frontend folder and type 'npm install' followed by 'npm start'. This starts the react scripts and runs the app in development mode.
React defaults to port 3000.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test` starts the test scripts

cd into the frontend folder and type 'npm test'. This will run a react test script.
The file that is run is the app.test.js present inside the containers folder.
This basically checks if the app.js contains a div element with class name of 'App'.
Although this seems like a basic test, it is absolutely vital, as this div element is the parent frontend element that contains everything.

### `responsiveness`

All the pages in the application are responsive to all layouts.