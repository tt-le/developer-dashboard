var express = require('express');
const {Client} = require('kubernetes-client');
const _ = require('lodash');

module.exports = function(app) {
  var router = express.Router();

  router.get('/', function (req, res, next) {
    const client = new Client({version: '1.13'});

    const qs = {labelSelector: 'group=catalyst-tools'};
    client.api.v1.namespace(process.env.NAMESPACE || 'tools').configmaps.get({qs})
      .then(result => {
        return _.assign({}, process.env, ...(_.get(result, 'body.items', []).map(configmap => configmap.data)));
      }, error => {
        console.error('Error reading config maps: ', error);
        return process.env;
      })
      .then(env => {
        res.json({
          gitlab: "https://"+(env.REGION || 'us-south') + ".git.cloud.ibm.com",
          che: env.CHE_URL || "https://che.openshift.io/dashboard/",
          jenkins: env.JENKINS_URL,
          pipeline: env.PIPELINE_URL,
          argocd: env.ARGOCD_URL,
          artifactory: env.ARTIFACTORY_URL,
          sonarqube: env.SONARQUBE_URL,
          pact: env.PACTBROKER_URL,
          tekton: env.TEKTON_URL,
          ta: env.TA_URL,
        });

      });
  });

  app.use("/urls", router);
};
