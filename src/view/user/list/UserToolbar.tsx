import { Button, Tooltip } from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';
import DeleteIcon from '@material-ui/icons/Delete';
import { i18n } from 'src/i18n';
import actions from 'src/modules/user/list/userListActions';
import selectors from 'src/modules/user/list/userListSelectors';
import userSelectors from 'src/modules/user/userSelectors';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import ToolbarWrapper from 'src/view/shared/styles/ToolbarWrapper';

function UserToolbar(props) {
  const dispatch = useDispatch();

  const hasPermissionToCreate = useSelector(
    userSelectors.selectPermissionToCreate,
  );

  const hasPermissionToDestroy = useSelector(
    userSelectors.selectPermissionToDestroy,
  );

  const loading = useSelector(selectors.selectLoading);
  const selectedKeys = useSelector(
    selectors.selectSelectedKeys,
  );

  const doDestroyAllSelected = () => {
    dispatch(actions.doDestroyAllSelected());
  };

  const renderDestroyButton = () => {
    if (!hasPermissionToDestroy) {
      return null;
    }

    const disabled = !selectedKeys.length || loading;

    const button = (
      <Button
        variant="contained"
        color="primary"
        type="button"
        disabled={disabled}
        onClick={doDestroyAllSelected}
        startIcon={<DeleteIcon />}
        size="small"
      >
        {i18n('common.destroy')}
      </Button>
    );

    if (disabled) {
      return (
        <Tooltip title={i18n('common.mustSelectARow')}>
          <span>{button}</span>
        </Tooltip>
      );
    }

    return button;
  };

  return (
    <ToolbarWrapper>
      {hasPermissionToCreate && (
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/user/new"
          startIcon={<EmailIcon />}
          size="small"
        >
          {i18n('user.invite')}
        </Button>
      )}

      {renderDestroyButton()}
    </ToolbarWrapper>
  );
}

export default UserToolbar;
