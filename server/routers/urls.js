var express = require('express');
const _ = require('lodash');
const kubernetesClient = require('./kubernetes-client');

module.exports = function (app) {
    var router = express.Router();

    router.get('/', function (req, res, next) {

            function respondUrls(res,env) {
                return res.json({
                    gitlab: "https://" + (env.REGION || 'us-south') + ".git.cloud.ibm.com",
                    che: env.CHE_URL || "https://che.openshift.io/dashboard/",
                    jenkins: env.JENKINS_URL,
                    pipeline: env.PIPELINE_URL,
                    argocd: env.ARGOCD_URL,
                    artifactory: env.ARTIFACTORY_URL,
                    sonarqube: env.SONARQUBE_URL,
                    pact: env.PACTBROKER_URL,
                    tekton: env.TEKTON_URL,
                    ta: env.TA_URL,
                    swagger: env.SWAGGER_URL
                });
            }

            if (process.env.npm_lifecycle_event === "dev") {
                respondUrls(res,process.env);
            } else {
                try {

                    const client = kubernetesClient();
                    const qs = {labelSelector: 'group=catalyst-tools'};
                    client.api.v1.namespace(process.env.NAMESPACE || 'tools').configmaps.get({qs})
                        .then(result => {
                            return _.assign({}, process.env, ...(_.get(result, 'body.items', []).map(configmap => configmap.data)));
                        }, error => {
                            console.error('Error reading config maps: ', error);
                            return process.env;
                        })
                        .then(env => {
                            respondUrls(res,env);
                        });
                } catch (err) {
                    console.error('Error configuring kubeClient: ', err);
                    res.json({});
                }
            }
        }
    );

    app.use("/urls", router);
};
