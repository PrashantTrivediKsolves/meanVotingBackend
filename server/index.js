import express from 'express';
import 'dotenv/config';

import bodyParser from 'body-parser';

import dotenv from 'dotenv';
import cors from 'cors';

import { connectionUser } from './postges/user.js';


import routeruser from './routes/user.js'

import routercandidate from './routes/candidate.js';
import { connectionCandidate } from './postges/candidate.js';

import { connectionVote } from './postges/vote.js';


import routervote from './routes/vote.js';

// Load environment variables from .env file.....

dotenv.config();

const app = express();

app.use(cors({
  
  origin:"http://localhost:4200",

  credentials:true
}));
// Body-parser parses the HTTP request body, allowing you to 
//access req.body.......

app.use(bodyParser.json());



// Define a simple route to check if the app is running..........

app.get("/", (req, res) => {
  res.send("App is running now........");
});

// Use the port from the environment variables or default to 8001 if not set....

const PORT = process.env.PORT || 8001;

app.use(routeruser);

app.use(routercandidate);

app.use(routervote);


// Start the server......................


app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});


// connection of the user model.

connectionUser();

// connetcion of the candidate model.

connectionCandidate();

// connection of vote model.

connectionVote();