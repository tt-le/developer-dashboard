var express = require('express');
const rp = require('request-promise');

module.exports = function(app) {

  var router = express.Router();

  router.get('/links', function (req, res, next) {

    var activation =  process.env.LINKS_URL || "https://raw.githubusercontent.com/ibm-garage-cloud/catalyst-dashboard/master/public/data/links.json";

    // Get the Activation links
    rp({
      uri: activation,
      json: true
    }).then((data) => {
        res.json( data );
    })
    .catch((err) => {
      console.log(err)
      res.json({error:err});
    })
  });

  app.use("/activation", router);
};

