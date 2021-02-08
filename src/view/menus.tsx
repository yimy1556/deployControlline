import Permissions from 'src/security/permissions';
import { i18n } from 'src/i18n';
import React from 'react';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PersonIcon from '@material-ui/icons/Person';
import AssignmentIcon from '@material-ui/icons/Assignment';
import SettingsIcon from '@material-ui/icons/Settings';

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
    permissionRequired: null,
    icon: <PersonIcon />,
  },
  {
    path: '/process',
    exact: true,
    icon: <DashboardIcon />,
    label: 'Linea de control',
    permissionRequired: null,
  },
  {
    path: '/ops',
    exact: true,
    icon: <AssignmentIcon />,
    label: 'Orden de Producción',
    permissionRequired: null,
  },
  {
    path: '/settings',
    exact: true,
    icon: <SettingsIcon />,
    label: 'Configuraciones',
    permissionRequired: null,
  },



].filter(Boolean);
