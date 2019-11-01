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
              <a href="https://w3.ibm.com/w3publisher/ibm-cloud-garage-catalyst">Project Info</a>
            </BreadcrumbItem>
          </Breadcrumb>
          <h1 className="landing-page__heading">
            Development Cluster Dashboard
          </h1>
          <div hidden={!isComponentAvailable('tekton')}>
            Supports&nbsp;
            <img src={`${process.env.PUBLIC_URL}/kabanero.png` } alt="logo" width="125px"></img>
          </div>
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
                  </div>
                  <div className="bx--col-md-4 bx--offset-lg-1 bx--col-lg-8">
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
            <Tab {...props.tab} label="Starter Kits">
              <div className="bx--grid bx--grid--no-gutter bx--grid--full-width">
                <div className="bx--row landing-page__tab-content">
                  <div className="bx--col-lg-16">

                    <h2 className="landing-page__subheading">
                        Starter Kit Templates
                    </h2>

                    <div>
                      <p>
                      Follow the commands below to install the IBM Garage for Cloud CLI tools. This has been designed
                      to help you work with your project code. Login to the IBM Cloud account and configure your
                      command line for access to either IBM Kubernetes Service or Red Hat OpenShift.
                      </p>
                      <br></br>
                      <p>
                      To use the Starter Kit templates, click on the link and generate a template into your own git organization.
                      Then clone it onto your local machine and then use igc pipeline to register it with your Jenkins server.
                      </p>

                      <br></br>

                      <CodeSnippet type="multi" {...multilineProps}>
                      {
`
ibmcloud login | oc login ! login to you kube cluster
kubectl get nodes | oc get nodes
npm i -g @garage-catalyst/ibm-garage-cloud-cli
git clone <generated startkit template>
cd <generated startkit template>
code package.json ! rename your project
igc pipeline
`}
                      </CodeSnippet>
                    </div>

                    <p className="new-line">
                    Use the following templates to generate your own git repos. This will help you to accelerate the start of your project
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

