## Configuration for Running Server

To run the tools server you need to prepare you runtime env with the follow
 ENV variables set. 

### To Override some default settings add the following envs to your deployment 

```
DASHBOARD_TITLE=GSI Lab Sandbox
DASHBOARD_PREFIX=IBM
CLOUD_TITLE=Azure Console
CLOUD_URL=https://azure.microsoft.com/en-us/
LINKS_URL=public/data/links.json
```

### Default
```
PIPELINE_URL=dummy
ARGOCD_URL=dummy
ARTIFACTORY_URL=dummy
SONARQUBE_URL=dummy
PACTBROKER_URL=dummy
APIEDITOR_URL=dummy
GITHUB_URL=dummy
IR_URL=dummy
LOGDNA_URL=dummy
SYSDIG_URL=dummy
JAEGER_URL=dummy
```

### Full Set
```
JENKINS_URL=dummy
PIPELINE_URL=dummy
ARGOCD_URL=dummy
ARTIFACTORY_URL=dummy
SONARQUBE_URL=dummy
PACTBROKER_URL=dummy
TEKTON_URL=dummy
TA_URL=dummy
APIEDITOR_URL=dummy
CODEREADY_URL=dummy
GITHUB_URL=dummy
INTEGRATION_URL=dummy
MCM_URL=dummy
DATA_URL=dummy
AUTOMATION_URL=dummy
GRAFANA_URL=dummy
PROMETHEUS_URL=dummy
LOGDNA_URL=dummy
SYSDIG_URL=dummy
IR_URL=dummy
JAEGER_URL=dummy
```
