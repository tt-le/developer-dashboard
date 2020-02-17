import React from 'react';
import ResourceCard from '../ResourceCard';
import ArticleCard from '../ArticleCard';
import CodePatternCard from '../CodePatternCard';
import _ from 'lodash';

import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Tabs,
  Tab,
  CodeSnippet
} from 'carbon-components-react';
import CodePatternCard from "../CodePatternCard";

const props = {
  tabs: {
    selected: 0,
    triggerHref: '#',
    role: 'navigation',
  },
  tab: {
    href: '#',
    role: 'presentation',
    tabIndex: 0,
  },
  multiline: () => ({
    showMoreText:
      'Text for "show more" button (showMoreText)',
    showLessText:
      'Text for "show less" button (showLessText)',
    onClick: 'onClick',
  }),

};

export default class LandingPage extends React.Component {

    // Configure the App
    constructor(props) {
        super(props);

        this.state = {
          links: [],
          componentUrls: [],
          cluster: {},
        };
    }


    // Load the Data into the Project
    componentDidMount() {

      fetch("/urls")
        .then(response => response.json())
        .then(data => {
          console.log('urls', data);
          this.setState(Object.assign(
            {},
            this.state,
            {componentUrls: data},
          ));
        });
      fetch("/activation/links")
          .then(response => response.json())
          .then(data => {
            console.log('activation links: ', data);
            this.setState(Object.assign(
                {},
                this.state,
                {links: data},
            ));
          });
      fetch("/cluster")
          .then(response => response.json())
          .then(data => {
            console.log('cluster info: ', data);
            this.setState(Object.assign(
                {},
                this.state,
                {cluster: data},
            ));
          });
    }

render() {

  function getArticles(data) {

    if (_.isUndefined(data))
      return [];

    let articles = [];

    // Outer loop to create parent
    data.forEach(function(article,index){

      var subtitle = article.subtitle ? article.subtitle : "";

      //Create the parent and add the children
      articles.push(

        <div className="bx--no-gutter-md--left bx--col-lg-4 bx--col-md-4">
            <ArticleCard
              title={article.title}
              author={article.author}
              subTitle = {subtitle}
              href={article.href}
              color={article.color}
              actionIcon="arrowRight"
              >
          </ArticleCard>
        </div>
      );
    });

    return articles;

  }

  function getCodePatterns(data) {

    if (_.isUndefined(data))
      return [];

    let codepatterns = []

    // Outer loop to create parent
    data.forEach(function(codepatterns,index){
      //Create the parent and add the children
      codepatterns.push(
        <div className="bx--no-gutter-md--left bx--col-lg-4 bx--col-md-4">
            <CodePatternCard
                title={codepatterns.title}
                subTitle={codepatterns.subtitle}
                language={codepatterns.language}
                href={codepatterns.href}
                color={codepatterns.color}
                actionIcon="launch"
            >
          </CodePatternCard>
        </div>
      );
    });

    return starterkits;

  }

  const multilineProps = props.multiline();

  const { links, isLoading, error, componentUrls = {} } = this.state;

  //var links= this.state.links ? this.state.links : [] ;

  function buildUrl(val) {
    const host = window.location.hostname;
    const protocol = window.location.protocol || "http:";

    return componentUrls[val] || protocol + "//" + host.replace("dashboard", val);
  }

  function isComponentAvailable(val) {
    return !!componentUrls[val];
  }


  if (error) {
        return <p>{error.message}</p>;
  }

  if (isLoading) {
        return <p>Loading ...</p>;
  }

  return (
    <div className="bx--grid bx--grid--full-width landing-page">
      <div className="bx--row landing-page__banner">
        <div className="bx--col-lg-16">
          <Breadcrumb noTrailingSlash aria-label="Page navigation">
            <BreadcrumbItem>
              <a href="https://github.com/ibm-garage-cloud/">Project Info</a>
            </BreadcrumbItem>
          </Breadcrumb>
          <h1 className="landing-page__heading">
            Development Cluster Dashboard
          </h1>
        </div>
      </div>
      <div className="bx--row landing-page__r2">
        <div className="bx--col bx--no-gutter">
          <Tabs className="top" {...props.tabs} aria-label="Tab navigation">
            <Tab {...props.tab} label="Dashboard">
              <div className="bx--grid bx--grid--no-gutter bx--grid--full-width">
                <div className="bx--row landing-page__tab-content">
                  <div className="bx--col-md-4 bx--col-lg-7">
                    <h2 className="landing-page__subheading">
                      Tools Dashboard
                    </h2>
                    <p className="landing-page__p">
                      The tools dashboard gives you easy access to the provisioned tools in your development
                      Kubernetes clusters..
                    </p>
                    <img
                      className="landing-page__illo"
                      src={`${process.env.PUBLIC_URL}/dashboard.svg`}
                      alt="illustration"
                    />
                    <p></p>
                  </div>
                  <div className="bx--col-md-4 bx--offset-lg-1 bx--col-lg-8">
                      <div style={{"background-color": "#000", color: "#fff", padding: "10px 10px", "display": this.state.cluster.CLUSTER_TYPE ? "block" : "none", "margin-bottom": "10px"}}>
                        <ul style={{"padding": "5px 10px"}}>
                          <li style={{"padding": "5px 0"}}><strong>CLUSTER_TYPE:</strong> {this.state.cluster.CLUSTER_TYPE}</li>
                          <li style={{"padding": "5px 0"}}>WEB_CONSOLE: <a style={{color: "#fff"}} href={this.state.cluster.SERVER_URL + "/console"}>{this.state.cluster.SERVER_URL}/console</a></li>
                          <li style={{"padding": "5px 0"}}>REGION: {this.state.cluster.REGION}</li>
                          <li style={{"padding": "5px 0"}}>RESOURCE_GROUP: {this.state.cluster.RESOURCE_GROUP}</li>
                          <li style={{"padding": "5px 0"}}>IMAGE_REGISTRY: {this.state.cluster.REGISTRY_URL + "/" + this.state.cluster.REGISTRY_NAMESPACE}</li>
                        </ul>
                      </div>
                  <div className="bx--row resource-card-group">

                    <div className="bx--column bx--col-md-4  bx--no-gutter-sm">
                      <ResourceCard
                        subTitle="Edit code with a web IDE"
                        title="Eclipse Che"
                        aspectRatio="2:1"
                        href={buildUrl('che')}
                        >
                          <img
                          className="resource-img"
                          src={`${process.env.PUBLIC_URL}/eclipse-che.png`}
                          alt="illustration"
                        />
                        </ResourceCard>
                    </div>
                    <div className="bx--column bx--col-md-4  bx--no-gutter-sm">
                      <ResourceCard
                          subTitle="Manage your Source Code"
                          title="Git Lab"
                          aspectRatio="2:1"
                          href={buildUrl('gitlab')}
                      >
                        <img
                            className="resource-img"
                            src={`${process.env.PUBLIC_URL}/gitlab-logo.png`}
                            alt="illustration"
                        />
                      </ResourceCard>
                    </div>

                    <div className="bx--column bx--col-md-4  bx--no-gutter-sm">
                      <ResourceCard
                          subTitle="Manage piplines with Kabanero Enterprise Tekton"
                          title="Tekton"
                          aspectRatio="2:1"
                          actionIcon="arrowRight"
                          hidden={!isComponentAvailable('tekton')}
                          href={buildUrl('tekton')}
                      >
                        <img
                            className="resource-img"
                            src={`${process.env.PUBLIC_URL}/tekton.png`}
                            alt="illustration"
                        />
                      </ResourceCard>
                    </div>

                    <div className="bx--column bx--col-md-4  bx--no-gutter-sm">
                      <ResourceCard
                          subTitle="Help modernize you JEE apps with Transformation Advisor"
                          title="Transformation Advisor"
                          aspectRatio="2:1"
                          actionIcon="arrowRight"
                          hidden={!isComponentAvailable('ta')}
                          href={buildUrl('ta')}
                      >
                        <img
                            className="resource-img"
                            src={`${process.env.PUBLIC_URL}/ta.svg`}
                            alt="illustration"
                        />
                      </ResourceCard>
                    </div>






                    <div className="bx--column bx--col-md-4 bx--no-gutter-sm">
                      <ResourceCard
                          subTitle="Managed your build pipelines"
                          title="Jenkins CI"
                          aspectRatio="2:1"
                          actionIcon="arrowRight"
                          hidden={!isComponentAvailable('jenkins')}
                          href={buildUrl('jenkins')}
                      >​
                        <img
                            className="resource-img"
                            src={`${process.env.PUBLIC_URL}/jenkins.png`}
                            alt="Jenkins CI"
                        />​
                      </ResourceCard>
                      <ResourceCard
                          subTitle="Managed your build pipelines"
                          title="OpenShift pipeline"
                          aspectRatio="2:1"
                          actionIcon="arrowRight"
                          hidden={!isComponentAvailable('pipeline')}
                          href={buildUrl('pipeline')}
                      >​
                        <img
                            className="resource-img"
                            src={`${process.env.PUBLIC_URL}/openshift.png`}
                            alt="Openshift CI"
                        />​
                      </ResourceCard>
                    </div>
                    <div className="bx--column bx--col-md-4 bx--no-gutter-sm">
                      <ResourceCard
                        subTitle="Managed your CD with GitOps"
                        title="Argo CD"
                        aspectRatio="2:1"
                        actionIcon="arrowRight"
                        hidden={!isComponentAvailable('argocd')}
                        href={buildUrl('argocd')}
                        >​
                        <img
                          className="resource-img"
                          src={`${process.env.PUBLIC_URL}/argo-cd.png`}
                          alt="Argo CD"
                        />​
                      </ResourceCard>
                    </div>
                    <div className="bx--column bx--col-md-4 bx--no-gutter-sm">
                      <ResourceCard
                      subTitle="Store your assets and dependencies"
                      title="Artifactory"
                      actionIcon="arrorRight"
                      aspectRatio="2:1"
                      hidden={!isComponentAvailable('artifactory')}
                      href={buildUrl('artifactory')}
                      >​
                    <img
                        className="resource-img"
                        src={`${process.env.PUBLIC_URL}/artifactory.png`}
                        alt="illustration"
                      />
                    </ResourceCard>
                    </div>
                    <div className="bx--column bx--col-md-4  bx--no-gutter-sm">
                      <ResourceCard
                        subTitle="Analyse and test your code"
                        title="SonarQube"
                        aspectRatio="2:1"
                        actionIcon="arrowRight"
                        hidden={!isComponentAvailable('sonarqube')}
                        href={buildUrl('sonarqube')}
                        >                    ​
                        <img
                          className="resource-img"
                          src={`${process.env.PUBLIC_URL}/sonarqube-dark.png`}
                          alt="illustration"
                        />

                      </ResourceCard>
                    </div>
                    <div className="bx--column bx--col-md-4  bx--no-gutter-sm">
                      <ResourceCard
                        subTitle="Test your microservice contracts"
                        title="Pact Testing"
                        aspectRatio="2:1"
                        hidden={!isComponentAvailable('pact')}
                        href={buildUrl('pact')}
                        >
                          <img
                          className="resource-img"
                          src={`${process.env.PUBLIC_URL}/pact.png`}
                          alt="illustration"
                        />
                        </ResourceCard>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Tab>
            <Tab {...props.tab} label="Activation">
              <div className="bx--grid bx--grid--no-gutter bx--grid--full-width">
                <div className="bx--row landing-page__tab-content">
                  <div className="bx--col-lg-16">
                    <h2 className="landing-page__subheading">
                        Garage Method Development
                    </h2>
                    <br></br>
                    <p>
                    Use the following links to help you deep dive in IBM Cloud Garage development best practices
                    </p>
                    <br></br>
                    <div className="bx--row">
                      {getArticles(links.gmd)}
                    </div>

                    <h2 className="landing-page__subheading">
                        Cloud-native Development
                    </h2>
                    <br></br>
                    <p>
                    Use the following links to help you deep dive in Cloud Native Development
                    </p>
                    <br></br>
                    <div className="bx--row">
                      {getArticles(links.cnd)}
                    </div>

                    <h2 className="landing-page__subheading">
                        Cloud-native Deployment
                    </h2>
                    <br></br>
                    <p>
                    Use the following links to help you deep dive in Cloud Native Deployment
                    </p>
                    <br></br>
                    <div className="bx--row">
                      {getArticles(links.cndp)}
                    </div>

                  </div>
                </div>
              </div>
            </Tab>
            <Tab {...props.tab} label="Code Patterns">
              <div className="bx--grid bx--grid--no-gutter bx--grid--full-width">
                <div className="bx--row landing-page__tab-content">
                  <div className="bx--col-lg-16">

                    <h2 className="landing-page__subheading">
                        Code Patterns Git Repositories
                    </h2>

                    <div>
                      <p>
                      Follow the commands below to install the Cloud Native Toolkit CLI tools. This has been designed
                      to help you work with your project code. Login to the IBM Cloud account and configure your
                      command line for access to either IBM Kubernetes Service or Red Hat OpenShift.
                      </p>
                      <br></br>
                      <p>
                      To use the Code Pattern Code Repositories, click on the link and generate a template into your own git organization.
                      Then clone it onto your local machine and then use igc pipeline to register it with your Continuous Integration Server.
                      </p>

                      <br></br>

                      <CodeSnippet type="multi" {...multilineProps} style={{display: this.state.cluster.CLUSTER_TYPE === "kubernetes" ? "block" : "none"}}>
                      {
`
ibmcloud login -r ${this.state.cluster.REGION} -g ${this.state.cluster.RESOURCE_GROUP}
kubectl get pods
npm i -g @garage-cloud/ibm-garage-cloud-cli
git clone <code pattern>
cd <code pattern>
igc pipeline -n <namespace> | --tekton
`}
                      </CodeSnippet>
                      <CodeSnippet type="multi" {...multilineProps} style={{display: this.state.cluster.CLUSTER_TYPE === "openshift" ? "block" : "none"}}>
                        {
                          `
oc login
oc get pods
npm i -g @garage-cloud/ibm-garage-cloud-cli
git clone <code pattern>
cd <code pattern>
igc pipeline -n <namespace> | --tekton
`}
                      </CodeSnippet>
                    </div>

                    <p className="new-line">
                    Use the following code patterns to create your own git repos. This will help you to accelerate the start of your project
                    <br></br>
                    </p>
                    <br></br>
                    <div className="bx--row">
                      {getStarterKits(links.starterkits)}
                    </div>

                    <h2 className="landing-page__subheading">
                      Other Templates
                    </h2>
                    <br></br>
                    <p>
                      Use the following templates to configure GitOps and integrate IBM Cloud services into your applications
                    </p>
                    <br></br>

                    <div className="bx--row">
                      {getStarterKits(links.argocd)}
                    </div>

                  </div>
                </div>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
      <div className="bx--row landing-page__r3">
        <div className="bx--col-md-4 bx--col-lg-4">
          <h3 className="landing-page__label">IBM Garage Links</h3>
        </div>
        <div className="bx--col-md-4 bx--col-lg-4"><a href="https://ibm-garage-cloud.github.io/ibm-garage-developer-guide/contributing" rel="noopener noreferrer" target="_blank">Contribution</a></div>
        <div className="bx--col-md-4 bx--col-lg-4"><a href="https://www.ibm.com/cloud/garage/practices/overview" rel="noopener noreferrer" target="_blank">Garage Method</a></div>
      </div>
    </div>
  );
}};

