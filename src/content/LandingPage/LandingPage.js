import React from 'react';
import ResourceCard from '../ResourceCard';

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

  function buildUrl (val){

    var host = window.location.hostname
    host = "//"+host.replace("dashboard",val);
    return host;

  }

  return (
    <div className="bx--grid bx--grid--full-width landing-page">
      <div className="bx--row landing-page__banner">
        <div className="bx--col-lg-16">
          <Breadcrumb noTrailingSlash aria-label="Page navigation">
            <BreadcrumbItem>
              <a href="/">Catalyst Info</a>
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
                      href={buildUrl("jenkins")}
                      >
                    ​
                      <img
                        className="resource-img"
                        src={`${process.env.PUBLIC_URL}/jenkins.png`}
                        alt="illustration"
                      />

                    ​
                    </ResourceCard>
                    </div>
                    <div className="bx--column bx--col-md-4 bx--offset-lg-4 bx--no-gutter-sm">
                      <ResourceCard
                      subTitle="Store you assets and dependencies"
                      title="Artefactory"
                      actionIcon="arrorRight"
                      aspectRatio="2:1"
                      disabled
                      href="https://github.com/IBM/carbon-elements/blob/master/.github/CONTRIBUTING.md"
                      >
                    ​
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
                      href="https://github.com/IBM/carbon-elements/blob/master/.github/CONTRIBUTING.md"
                      >
                    ​
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
                      disabled
                      href="https://github.com/IBM/carbon-elements/blob/master/.github/CONTRIBUTING.md"
                      >

                      <img
                        className="resource-img"
                        src={`${process.env.PUBLIC_URL}/pact.png`}
                        alt="illustration"
                      />

                    ​
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
                    Rapidly build beautiful and accessible experiences. The
                    Carbon kit contains all resources you need to get started.
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
          <h3 className="landing-page__label">The Principles</h3>
        </div>
        <div className="bx--col-md-4 bx--col-lg-4">Carbon is Open</div>
        <div className="bx--col-md-4 bx--col-lg-4">Carbon is Modular</div>
        <div className="bx--col-md-4 bx--col-lg-4">Carbon is Consistent</div>
      </div>
    </div>
  );
};

export default LandingPage;
