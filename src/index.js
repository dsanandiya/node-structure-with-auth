import http from 'http';
import app from "./app.js";

const server = http.createServer(app);
server.listen(8080, async () => {
  console.log(`Started on port ${server.address().port}`);
});

export default app;
