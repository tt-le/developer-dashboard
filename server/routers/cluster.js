var express = require('express');
const {Client} = require('kubernetes-client');
const _ = require('lodash');

module.exports = function(app) {
  var router = express.Router();

  router.get('/', function (req, res, next) {
    const client = new Client({version: '1.13'});

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
  });

  app.use("/cluster", router);
};
