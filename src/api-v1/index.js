import express from 'express';
import { verifyToken } from '../auth/verify';
import { sign } from 'jsonwebtoken';

export default ({ db }) => {
  const api = express.Router();

  api.get('/healthcheck', verifyToken, (req, res) => {
    res.status(200).json('OK');
  });

  // Check if user is in the db
  const checkUser = async (req, res, next) => {
    // TO DO: user find query from database
    let user = 'abc';
    if (!user) {
      return res.status(404).send('User not found');
    } else {
      req.user = user;
      next();
    }
  }

  api.post(
    '/login',
    checkUser,
    (req, res) => {
      try {
        sign(req.user, 'h%#0^**Q52yB0y%b', null, async (err, jwt) => {
          res.status(200).json({
            user: req.user,
            jwt: jwt,
          });
        });
      } catch (error) {
        res.status(500).send(error.message);
      }
    },
  );

  return api;
};