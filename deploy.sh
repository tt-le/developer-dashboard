helm install chart/catalyst-dashboard/ --namespace tools --set ingress.hosts[0]=dashboard.showcase-dev-cluster.us-south.containers.appdomain.cloud,image.pullPolicy=Always --name dashboard
#helm install chart/catalyst-dashboard/ --namespace tools --set ingress.hosts[0]=dashboard.catalyst-team-cluster.us-south.containers.appdomain.cloud,image.pullPolicy=Always --name dashboard
