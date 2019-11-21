var express = require('express');
const _ = require('lodash');
const kubernetesClient = require('./kubernetes-client');

module.exports = function(app) {
  var router = express.Router();

  router.get('/', function (req, res, next) {
    try {
      const client = kubernetesClient();

      client.api.v1.namespace(process.env.NAMESPACE || 'tools').configmaps('ibmcloud-config').get()
          .then(result => {
            console.log('Got result: ', result.body.data);
            return result.body.data;
          }, error => {
            console.error('Error reading config maps: ', error);
            return {};
          })
          .then(data => {
            res.json(data);
          });
    } catch (err) {
      console.error('Error getting kubernetes client: ', err);
      res.json({});
    }
  });

  app.use("/cluster", router);
};
