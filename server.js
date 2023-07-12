const cluster = require("node:cluster");
const express = require("express");
const os = require("os");

const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  const app = express();
  const port = 8000;

  app.get("/", (req, res) => {
    res.send(`Hello World! - ${process.pid}`);
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}
