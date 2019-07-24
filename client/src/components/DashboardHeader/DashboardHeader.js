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
      Garage - Catalyst Tools
    </HeaderName>
    <HeaderNavigation aria-label="Repositories">
      <HeaderMenuItem href="https://cloud.ibm.com/" target="_blank">
        IBM Cloud Console
      </HeaderMenuItem>
    </HeaderNavigation>
    <HeaderNavigation aria-label="Repositories">
      <HeaderMenuItem href="https://github.com/ibm-garage-cloud" target="_blank">
          Repositories
      </HeaderMenuItem>
    </HeaderNavigation>
    <HeaderGlobalBar>
      <HeaderGlobalAction aria-label="Notifications">
        <Notification20 />
      </HeaderGlobalAction>
      <HeaderGlobalAction aria-label="User Avatar">
        <UserAvatar20 />
      </HeaderGlobalAction>
      <HeaderGlobalAction aria-label="App Switcher">
        <AppSwitcher20 />
      </HeaderGlobalAction>
    </HeaderGlobalBar>
  </Header>
);

export default DashboardHeader;
