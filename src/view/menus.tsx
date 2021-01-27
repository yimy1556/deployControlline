import Permissions from 'src/security/permissions';
import { i18n } from 'src/i18n';
import React from 'react';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PersonIcon from '@material-ui/icons/Person';

const permissions = Permissions.values;

export default [
  {
    path: '/',
    exact: true,
    icon: <DashboardIcon />,
    label: i18n('dashboard.menu'),
    permissionRequired: null,
  },

  {
    path: '/user',
    label: i18n('user.menu'),
    permissionRequired: permissions.userRead,
    icon: <PersonIcon />,
  },
].filter(Boolean);
