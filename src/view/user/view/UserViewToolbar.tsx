import React from 'react';
import { Link } from 'react-router-dom';
import { i18n } from 'src/i18n';
import ToolbarWrapper from 'src/view/shared/styles/ToolbarWrapper';
import { useSelector } from 'react-redux';
import userSelectors from 'src/modules/user/userSelectors';
import { Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

function UserViewToolbar(props) {
  const { match } = props;
  
  const hasPermissionToEdit = useSelector(
    userSelectors.selectPermissionToEdit,
  );

  const id = match.params.id;

  return (
    <ToolbarWrapper>
      {hasPermissionToEdit && (
        <Button
          component={Link}
          to={`/user/${id}/edit`}
          variant="contained"
          color="primary"
          type="button"
          startIcon={<EditIcon />}
          size="small"
        >
          {i18n('common.edit')}
        </Button>
      )}
    </ToolbarWrapper>
  );
}

export default UserViewToolbar;
