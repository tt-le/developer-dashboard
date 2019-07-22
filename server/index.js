const express = require('express');

async function configureServer(port) {
  const app = new express();

  app.use(express.static('build'));

  app.listen(port || 8080);
  console.log(`Server listening on port: ${port || 8080}`);
}

configureServer().catch(err => console.log('Error running server', err));
