const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./src/api');
const app = express();
const port = 3000;

const startServer = () => {
  app.use(cors());
  app.use(bodyParser.json());

  routes(app);

  app.listen(port, err => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    console.log(`Server listening on port: ${port}`);
  });
};

startServer();
