# Assignment 3

The assignment is almost complete. Thank you for your understanding.

## Backend

The server has been built using node.js and express.js and passport.js. It has end points right now primarily for signin, signup and to handleAPI call.

### `npm start` starts the server

cd into the backend folder and type 'npm start'. This will start the server.
Please start the server before starting the frontend.
Keep this open in one terminal window.

### `npm test` starts the test scripts

cd into the backend folder and type 'npm test'.
There is a file called validation.test.js. This validates the inputs entered by the user in the sign up form.

### `erd diagram` represents the database schema implemented <br/><br/>

![erd diagram](./backend/images/erd_diagram.drawio.png)

## Frontend

The frontend has been built using React.js.

### `npm start` starts the react scripts

cd into the frontend folder and type 'npm start'. This starts the react scripts and runs the app in development mode.
The server runs on port 3001. React defaults to port 3000.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test` starts the test scripts

cd into the frontend folder and type 'npm test'. This will run a react test script.
The file that is run is the app.test.js present inside the containers folder.
This basically checks if the app.js contains a div element with class name of 'App'.
Although this seems like a basic test, it is absolutely vital, as this div element is the parent frontend element that contains everything.

## Implementation

I have used a library called react-sparklines for the charting requirement.
I'm still working on the sessions part, it still does not work as of now.
However, all the other features work very well.
If the username/password is incorrect, right now it is printed in the logs. In a future update, I will print it on the screen.