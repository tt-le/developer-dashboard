var express = require('express');

module.exports = function(app) {
  var router = express.Router();

  router.get('/', function (req, res, next) {
    res.json({
      jenkins: process.env.JENKINS_URL,
      argocd: process.env.ARGOCD_URL,
      artefactory: process.env.ARTEFACTORY_URL,
      sonarqube: process.env.SONARQUBE_URL,
      pact: process.env.PACTBROKER_IRL,
    });
  });

  app.use("/urls", router);
};



