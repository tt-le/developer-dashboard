import React from 'react';
import ResourceCard from '../ResourceCard';
import ArticleCard from '../ArticleCard';
import StarterKitCard from '../StarterKitCard';
import _ from 'lodash';

import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Tabs,
  Tab,
  CodeSnippet
} from 'carbon-components-react';

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
            links: []
        };
    }


    // Load the Data into the Project
    componentDidMount() {

        var host = "http://"+window.location.hostname+":"+window.location.port;
        console.log(host);

        fetch(host + "/urls")
          .then(response => response.json())
          .then(data => {
            console.log('urls', data);
            this.setState(Object.assign(
              {},
              this.state,
              {componentUrls: data},
            ));
          });
        fetch(host + "/data/links.json")
          .then(response => response.json())
          .then(data => {
            console.log(data);
            this.setState(Object.assign(
              {},
              this.state,
              {links: data},
            ));
          });
    }

render() {

  function getArticles(data) {

    if (_.isUndefined(data))
      return [];

    let articles = []

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

  function getStarterKits(data) {

    if (_.isUndefined(data))
      return [];

    let starterkits = []

    // Outer loop to create parent
    data.forEach(function(starterkit,index){
      //Create the parent and add the children
      starterkits.push(
        <div className="bx--no-gutter-md--left bx--col-lg-4 bx--col-md-4">
            <StarterKitCard
              title={starterkit.title}
              subTitle={starterkit.subtitle}
              language={starterkit.language}
              href={starterkit.href}
              color={starterkit.color}
              actionIcon="launch"
              >
          </StarterKitCard>
        </div>
      );
    });

    return starterkits;

  }
  function buildUrl (val) {
    const host = window.location.hostname;
    const protocol = window.location.protocol || "http:";

    return componentUrls[val] || protocol + "//" + host.replace("dashboard", val);
  }
  const multilineProps = props.multiline();

  const { links, isLoading, error, componentUrls = {} } = this.state;

  //var links= this.state.links ? this.state.links : [] ;


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
              <a href="https://w3.ibm.com/w3publisher/ibm-cloud-garage-catalyst">Catalyst Info</a>
            </BreadcrumbItem>
          </Breadcrumb>
          <h1 className="landing-page__heading">
            Development Cluster Dashboard
          </h1>
        </div>
      </div>
      <div className="bx--row landing-page__r2">
        <div className="bx--col bx--no-gutter">
          <Tabs {...props.tabs} aria-label="Tab navigation">
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
                      src={`${process.env.PUBLIC_URL}/catalyst-tools-dashboard.svg`}
                      alt="illustration"
                    />
                    <p></p>
                    <br></br>
                    <Button>Learn more...</Button>
                  </div>
                  <div className="bx--col-md-4 bx--offset-lg-1 bx--col-lg-8">
                  <div className="bx--row resource-card-group">

                  <div className="bx--column bx--col-md-4  bx--no-gutter-sm">
                      <ResourceCard
                        subTitle="Edit code with a web IDE"
                        title="Eclipse Che"
                        aspectRatio="2:1"
                        href="https://che.openshift.io/dashboard/"
                        >
                          <img
                          className="resource-img"
                          src={`${process.env.PUBLIC_URL}/eclipse-che.png`}
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
                        href={buildUrl('jenkins')}
                        >​
                        <img
                          className="resource-img"
                          src={`${process.env.PUBLIC_URL}/jenkins.png`}
                          alt="Jenkins CD"
                        />​
                      </ResourceCard>
                    </div>
                    <div className="bx--column bx--col-md-4 bx--no-gutter-sm">
                      <ResourceCard
                        subTitle="Managed your CD with GitOps"
                        title="Argo CD"
                        aspectRatio="2:1"
                        actionIcon="arrowRight"
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
                      title="Artefactory"
                      actionIcon="arrorRight"
                      aspectRatio="2:1"
                      disabled
                      href={buildUrl('artefactory')}
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
                    Use the following links to help you deep dive in IBM Cloud Garage development best practices
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
                    Use the following links to help you deep dive in IBM Cloud Garage development best practices
                    </p>
                    <br></br>
                    <div className="bx--row">
                      {getArticles(links.cndp)}
                    </div>

                  </div>
                </div>
              </div>
            </Tab>
            <Tab {...props.tab} label="Starter Kits">
              <div className="bx--grid bx--grid--no-gutter bx--grid--full-width">
                <div className="bx--row landing-page__tab-content">
                  <div className="bx--col-lg-16">

                    <h2 className="landing-page__subheading">
                        Starter Kit Templates
                    </h2>

                    <div className="code-snippets">
                      <p>
                      Follow the commands below to install the IBM Garage Catalyst CLI tools, these have been designed
                      to help you work with your project code. Login to the IBM Cloud account and configure your
                      Kubernetes access from the operating system command line.
                       <br></br>
                      </p>
                      <br></br>
                      <CodeSnippet type="multi" {...multilineProps}>
                      {
`
npm i -g @garage-catalyst/ibm-garage-cloud-cli
ibmcloud login -a cloud.ibm.com -r <region> -g <resource group>
ibmcloud ks cluster-config --cluster <cluster-name>
kubectl get nodes
`}
                      </CodeSnippet>
                    </div>

                    <div className="code-snippets">
                      <p>
                      To use the Starter Kit templates, click on the link and generate a template into your own git organization.
                      Then clone it onto your local machine and then use igc to register it with your Jenkins CI server.
                      <br></br>
                      </p>
                      <br></br>

                      <CodeSnippet type="multi" {...multilineProps}>
                      {
`
git clone <generated startkit template>
cd <generated startkit template>
igc register 

`}
                      </CodeSnippet>
                    </div>

                    <p className="new-line">
                    Use the following links to generate a repo using the Github template feature. This will help acccelerate the start of your project
                    <br></br>
                    </p>
                    <br></br>
                    <div className="bx--row">
                      {getStarterKits(links.starterkits)}
                    </div>

                    <h2 className="landing-page__subheading">
                      ArgoCD Templates
                    </h2>
                    <br></br>
                    <p>
                      Use the following templates to configure GitOps for your applications using ArgoCD
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
        <div className="bx--col-md-4 bx--col-lg-4"><a href="https://github.ibm.com/garage-catalyst/planning" rel="noopener noreferrer" target="_blank">Planning</a></div>
        <div className="bx--col-md-4 bx--col-lg-4"><a href="https://github.ibm.com/garage-catalyst/planning/blob/master/docs/governance.md" rel="noopener noreferrer" target="_blank">Contribution</a></div>
        <div className="bx--col-md-4 bx--col-lg-4"><a href="https://www.ibm.com/cloud/garage/practices/overview" rel="noopener noreferrer" target="_blank">Garage Method</a></div>
      </div>
    </div>
  );
}};

