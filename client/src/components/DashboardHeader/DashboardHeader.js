import React from 'react';
import {
  Header,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
  SkipToContent,
} from 'carbon-components-react/lib/components/UIShell';
import Notification20 from '@carbon/icons-react/lib/notification/20';
import UserAvatar20 from '@carbon/icons-react/lib/user--avatar/20';
import AppSwitcher20 from '@carbon/icons-react/lib/app-switcher/20';
import { Link } from 'react-router-dom';

export default class DashboardHeader extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            settings: {}
        };
    }

    // Load the Data into the Project
    componentDidMount() {

        fetch("/settings")
            .then(response => response.json())
            .then(data => {
                console.log('settings', data);
                this.setState(Object.assign(
                    {},
                    this.state,
                    {settings: data},
                ));
            });
    }

    render() {

        var dashboardPrefix = this.state.settings.DASHBOARD_PREFIX;
        var dashboardTitle = this.state.settings.DASHBOARD_TITLE;
        var cloudTitle = this.state.settings.CLOUD_TITLE;
        var cloudUrl = this.state.settings.CLOUD_URL;

        return (

        <Header aria-label="Tools View">
            <SkipToContent />
            <HeaderName element={Link} to="/" prefix={dashboardPrefix}>
                {dashboardTitle}
            </HeaderName>
            <HeaderNavigation aria-label="Repositories">
                <HeaderMenuItem href={cloudUrl} target="_blank">
                    {cloudTitle}
                </HeaderMenuItem>
            </HeaderNavigation>
            <HeaderNavigation aria-label="Developer Guide">
                <HeaderMenuItem href="https://ibm-garage-cloud.github.io/ibm-garage-developer-guide/" target="_blank">
                    Developer Guide
                </HeaderMenuItem>
            </HeaderNavigation>

            <HeaderNavigation aria-label="Repositories">
                <HeaderMenuItem href="https://github.com/ibm-garage-cloud" target="_blank">
                    Git Org
                </HeaderMenuItem>
            </HeaderNavigation>
            <div className = "toolkit-logo" >
                <img className = "landing-page__illo" src={`${process.env.PUBLIC_URL}/dashboard.svg`}
                     alt = "illustration"/>
            </div>
        </Header>

        )

    }
};
