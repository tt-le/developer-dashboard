const express = require('express');

async function configureServer() {
  const app = new express();

  app.use(express.static('build'));

  const port = process.env.PORT || 8080;

  app.listen(port);
  console.log(`Server listening on port: ${port}`);
}

configureServer().catch(err => console.log('Error running server', err));
