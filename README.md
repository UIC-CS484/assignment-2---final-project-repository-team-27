# Assignment 2

The assignment is still in progress. I need time until Monday. I emailed the professor, he told he will forward it to the TA. Being in a single member team, it is really hard for me. Thank you so much for undertanding TA. I owe you one.

## Backend

The server has been built using node.js and express.js and passport.js. It has end points right now primarily for signin, signup.

### `npm start` starts the server

cd into the backend folder and type 'npm start'. This will start the server.
Please start the server before starting the frontend.
Keep this open in one terminal window.

### `npm test` starts the test scripts

cd into the backend folder and type 'npm test'.
There is a file called validation.test.js. This validates the inputs entered by the user in the sign up form.

## Frontend

The frontend has been built using React.js.

### `npm start` starts the react scripts

cd into the frontend folder and type 'npm start'. This starts the react scripts and runs the app in development mode.
The server runs on port 3000. Since react defaults to port 3000, it will ask if it is okay to run in a different port, please say yes or type 'y' when prompted in the terminal. This will run it on port 3001.
Open [http://localhost:3001](http://localhost:3001) to view it in the browser.

### `npm test` starts the test scripts

cd into the frontend folder and type 'npm test'. This will run a react test script.
The file that is run is the app.test.js present inside the containers folder.
This basically checks if the app.js contains a div element with class name of 'App'.
Although this seems like a basic test, it is absolutely vital, as this div element is the parent frontend element that contains everything.

## Implementation

If the username/password is incorrect, right now it is printed in the logs. In a future update, I will print it on the screen.