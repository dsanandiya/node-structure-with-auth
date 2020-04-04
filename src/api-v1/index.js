import express from 'express';
export default ({ db }) => {
  const api = express.Router();

  api.get('/healthcheck', (req, res) => {
    res.status(200).json('OK');
  });

  return api;
};