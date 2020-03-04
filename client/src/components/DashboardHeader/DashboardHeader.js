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

const DashboardHeader = () => (
  <Header aria-label="Tools Dashboard">
    <SkipToContent />
    <HeaderName element={Link} to="/" prefix="IBM">
      Garage - Cloud-Native Toolkit
    </HeaderName>
    <HeaderNavigation aria-label="Repositories">
      <HeaderMenuItem href="https://cloud.ibm.com/" target="_blank">
        IBM Cloud Console
      </HeaderMenuItem>
    </HeaderNavigation>
    <HeaderNavigation aria-label="Developer Guide">
        <HeaderMenuItem href="https://ibm-garage-cloud.github.io/ibm-garage-developer-guide/" target="_blank">
        Developer Guide
        </HeaderMenuItem>
    </HeaderNavigation>

    <HeaderNavigation aria-label="Code Pattern Repos">
          <HeaderMenuItem href="https://github.com/orgs/IBM/teams/ibm-garage-cloud/repositories" target="_blank">
              Code Pattern Repository
          </HeaderMenuItem>
    </HeaderNavigation>
      <HeaderNavigation aria-label="Repositories">
          <HeaderMenuItem href="https://github.com/ibm-garage-cloud" target="_blank">
              Git Org
          </HeaderMenuItem>
      </HeaderNavigation>
    <HeaderGlobalBar>
      <HeaderGlobalAction aria-label="User Avatar">
        <UserAvatar20 />
      </HeaderGlobalAction>
    </HeaderGlobalBar>
  </Header>
);

export default DashboardHeader;
