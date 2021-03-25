import Permissions from 'src/security/permissions';
const permissions = Permissions.values;

const privateRoutes = [
  {
    path: '/',
    loader: () =>
      import('src/view/dashboard/DashboardPage'),
    permissionRequired: null,
    exact: true,
  },
  {
    path: '/control_line',
    loader: () => import('src/view/process/list/ProcessPage'),
    permissionRequired: null,
    exact: true,
  },
  {
    path: '/control_line/new_control_line',
    loader: () => import('src/view/process/view/ProcessViewPage'),
    permissionRequired: null,
    exact: true,
  },
  {
    path: '/control_line/:id/edit_control_line',
    loader: () => import('src/view/process/view/ProcessViewPage'),
    permissionRequired: null,
    exact: true,
  },
  {
    path: '/checkpoint',
    loader: () => import('src/view/checkpoint/list/CheckpointPage'),
    permissionRequired: null,
    exact: true,
  },
  {
    path: '/control_line_execution',
    loader: () => import('src/view/ops/list/OpsPage'),
    permissionRequired: null,
    exact: true,
  },
  {
    path: '/faults',
    loader: () => import('src/view/fault/list/FaultPage'),
    permissionRequired: null,
    exact: true,
  },
  {
    path: '/settings',
    loader: () => import('src/view/settings/MenuSettings'),
    permissionRequired: null,
    exact: true,
  },
].filter(Boolean);

const publicRoutes = [
  {
    path: '/auth/signin',
    loader: () => import('src/view/auth/SigninPage'),
  },
].filter(Boolean);

const emptyPermissionsRoutes = [
  {
    path: '/auth/empty-permissions',
    loader: () =>
      import('src/view/auth/EmptyPermissionsPage'),
  },
].filter(Boolean);

const simpleRoutes = [
  {
    path: '/403',
    loader: () =>
      import('src/view/shared/errors/Error403Page'),
  },
  {
    path: '/500',
    loader: () =>
      import('src/view/shared/errors/Error500Page'),
  },
  {
    path: '**',
    loader: () =>
      import('src/view/shared/errors/Error404Page'),
  },
].filter(Boolean);

export default {
  privateRoutes,
  publicRoutes,
  emptyPermissionsRoutes,
  simpleRoutes,
};
