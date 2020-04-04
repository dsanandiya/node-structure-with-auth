import express from 'express';
import session from 'express-session';
import cors from 'cors';
import bodyParser from 'body-parser';
import middleware from './middleware/index.js';
import db from './models/index.js';

import api from './api-v1/index.js';

const app = express();

// 3rd party middleware
app.use(
  cors({
    exposedHeaders: ['Link'],
  }),
);

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json({
  limit: '5mb'
}));

app.use(session({ secret: 'h%#0^**Q52yB0y%b' }));

// internal middleware
app.use(middleware({ db }));

// api router
app.use('/v1/', api({ db }));

export default app;
