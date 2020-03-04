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

    app.use("/tools", router);

};
