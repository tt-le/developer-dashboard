const {Client} = require('kubernetes-client');
const Request = require('kubernetes-client/backends/request');

export default function() {
  return new Client({backend: new Request(Request.config.getInCluster())});
}
