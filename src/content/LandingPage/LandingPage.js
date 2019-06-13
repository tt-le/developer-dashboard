import React from 'react';
import ResourceCard from '../ResourceCard';
import ArticleCard from '../ArticleCard';

import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Tabs,
  Tab
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
};

const LandingPage = () => {
  
  var cndp = [ 
  {title:"Kubernetes", author:"KataCoda",href:"https://www.katacoda.com/courses/kubernetes/launch-single-node-cluster",color:"dark"},
  {title:"Docker", author:"Web",href:"/",color:"dark"},
  {title:"Istio", author:"Video",href:"https://www.youtube.com/watch?v=1iyFq2VaL5Y",color:"dark"},            
  {title:"DevOps", author:"PDF",href:"/",color:"dark"},            
  {title:"Helm", author:"PDF",href:"/",color:"dark"},            
  {title:"Helm", author:"PDF",href:"/",color:"dark"}            
  ]

  var cnd = [ {title:"Micro services", author:"PDF",href:"/",color:"dark"},
  {title:"API Design", author:"PDF",href:"/",color:"dark"},
  {title:"Pact Testing", author:"PDF",href:"/",color:"dark"},
  {title:"Cloud Overview", author:"PDF",href:"/",color:"dark"},
  {title:"Cloud Databases", author:"PDF",href:"/",color:"dark"}
  ]

  var gmd = [ 
  {title:"Squad Leadership Guide", author:"PDF",href:"/",color:"dark"},
  {title:"Pairing", author:"PDF",href:"/",color:"dark"},
  {title:"Testing Overview", author:"PDF",href:"https://github.ibm.com/garage-catalyst/training-manual-student/blob/master/material/Testing/TDD-overview.pdf",color:"dark"},
  {title:"TDD", author:"PDF",href:"/",color:"dark"},
  {title:"UI Design", author:"PDF",href:"/",color:"dark"},
  {title:"Angular/React", author:"PDF",href:"/",color:"dark"},
  {title:"JavaScript/TypeScript", author:"PDF",href:"/",color:"dark"}
  ]

  function getArticles(data) {

    let articles = []

    // Outer loop to create parent
    data.forEach(function(article,index){
      //Create the parent and add the children
      articles.push(      
        <div className="bx--no-gutter-md--left bx--col-lg-4 bx--col-md-4">
            <ArticleCard
              title={article.title}
              author={article.author}
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

  function buildUrl (val) {
    var host = window.location.hostname;
    var protocol = window.location.protocol || "http:";
    host = protocol+"//"+host.replace("dashboard",val);
    return host;
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

                    <div className="bx--column bx--col-md-4 bx--offset-lg-4 bx--no-gutter-sm">
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
                        alt="illustration"
                      />​
                    </ResourceCard>
                    </div>
                    <div className="bx--column bx--col-md-4 bx--offset-lg-4 bx--no-gutter-sm">
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
                    </div>
                    <div className="bx--row resource-card-group">
                    <div className="bx--column bx--col-md-4 bx--offset-lg-4 bx--no-gutter-sm">
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
                    <div className="bx--column bx--col-md-4 bx--offset-lg-4 bx--no-gutter-sm">
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
                      {getArticles(gmd)}
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
                      {getArticles(cnd)}
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
                      {getArticles(cndp)}
                    </div>

                  </div>
                </div>
              </div>
            </Tab>
            <Tab {...props.tab} label="Starter Kits">
              <div className="bx--grid bx--grid--no-gutter bx--grid--full-width">
                <div className="bx--row landing-page__tab-content">
                  <div className="bx--col-lg-16">
                    Carbon provides styles and components in Vanilla, React,
                    Angular, and Vue for anyone building on the web.
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
};

export default LandingPage;
