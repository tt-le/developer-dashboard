var express = require('express');
const _ = require('lodash');
var fs = require("fs");
const tools = require("../config/tools.json");

module.exports = function (app) {

    var router = express.Router();

    router.get('/', function (req, res, next) {

            try {
                res.json(tools);
            } catch (err) {
                console.error('Error retrieving tools json: ', err);
                res.json({});
            }
        }
    );

    router.get('/icon/:tool', function (req, res, next) {
        var tool = req.params.tool;
        if (!_.isUndefined(tool) ) {
            var detail = _.find(tools, { 'reference': tool });
            if( !_.isUndefined(detail)) {
                var image = detail.iconBase64;
                var base64Data = image.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
                var img = Buffer.from(base64Data, 'base64');
                res.writeHead(200, {
                    'Content-Type': 'image/png',
                    'Content-Length': img.length
                });
                res.end(img);
            } else {
                res.set('Content-Type', 'text/plain');
                res.status(404).send('Not found');
            }

        } else {
            res.set('Content-Type', 'text/plain');
            res.status(404).send('Not found');
        }
    });

    app.use("/tools", router);

};
