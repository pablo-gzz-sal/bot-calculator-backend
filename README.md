# Bot Calculator Backend

## Tech Stack

Node.js: Runtime for server-side JavaScript.

Express: Web framework for building the API.

MongoDB: Database for storing calculation history.

Socket.IO-Client: For real-time WebSocket communication.

## Installation

1. Navigate to the frontend directory:    
    ### `cd bot-calculator-backend`

2. Install dependencies:
    ###  `npm install`

3. Start the development server:
    ###  `npm run dev`

The server will run at [http://localhost:4000](http://localhost:4000)


## API Endpoints

1. POST /api/calculate: Performs a calculation based on the provided command.
2. GET /api/history: Fetches the calculation history.


## Real-Time Events

### Client Emissions:

load_history: Requests the history from the server.

### Server Emissions:

calculation_result: Sends the result of the calculation.

history_loaded: Sends the full history to clients.



## Scripts

###  `npm run dev`  Starts the development server.

###  `npm test`  Starts the testing process with Jest.


## Notes

1. Create a .env file and add PORT and mongoDB connection string as DATABASE_URI
2. Ensure MongoDB is running locally.
3. The frontend and backend communicate via WebSocket on port 4000.

