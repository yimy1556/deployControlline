import { i18n } from 'src/i18n';
import React from 'react';
import ColoredChip from 'src/view/shared/ColoredChip';

function UserStatusView(props) {
  const { value } = props;

  if (!value) {
    return null;
  }

  if (value === 'active') {
    return (
      <ColoredChip
        color="green"
        label={i18n('user.status.active')}
      ></ColoredChip>
    );
  }
  if (value === 'inactive') {
    return (
      <ColoredChip
        color="red"
        label={'Inactivo'}
      ></ColoredChip>
    );
  }

  if (value === 'inactive') {
    return (
      <ColoredChip
        color="red"
        label={i18n('user.status.inactive')}
      ></ColoredChip>
    );
  }
  if (value === 'none') {
    return (
      <ColoredChip
        color="red"
        label={'No asignado'}
      ></ColoredChip>
    );
  }
  return (
    <ColoredChip
      color="yellow"
      label={i18n('user.status.invited')}
    ></ColoredChip>
  );
}

export default UserStatusView;
