const {Client, KubeConfig} = require('kubernetes-client');
const Request = require('kubernetes-client/backends/request');

module.exports = function() {

  const kubeconfig = new KubeConfig();
  kubeconfig.loadFromCluster();
  const backend = new Request({kubeconfig});

  return new Client({backend, version: '1.13'});

};
