var express = require('express');

module.exports = function(app) {
  var router = express.Router();

  router.get('/', function (req, res, next) {
    res.json({
      gitlab: "https://"+(process.env.REGION || 'us-south') + ".git.cloud.ibm.com",
      jenkins: process.env.JENKINS_URL,
      argocd: process.env.ARGOCD_URL,
      artifactory: process.env.ARTIFACTORY_URL,
      sonarqube: process.env.SONARQUBE_URL,
      pact: process.env.PACTBROKER_URL,
    });
  });

  app.use("/urls", router);
};
