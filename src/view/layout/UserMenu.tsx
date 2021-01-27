import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Menu,
  MenuItem,
  makeStyles,
  Avatar,
} from '@material-ui/core';
import authSelectors from 'src/modules/auth/authSelectors';
import { getHistory } from 'src/modules/store';
import authActions from 'src/modules/auth/authActions';
import { i18n } from 'src/i18n';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles((theme) => ({
  button: {
    color: theme.palette.getContrastText(
      theme.palette.primary.main,
    ),
  },
  buttonInner: {
    display: 'flex',
    alignItems: 'center',
  },
  text: {
    margin: theme.spacing(0, 0.5, 0, 1),
    display: 'none',
    flexDirection: 'column',
    alignItems: 'flex-start',
    color: theme.palette.getContrastText(
      theme.palette.primary.main,
    ),
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  optionText: {
    margin: theme.spacing(0, 0.5, 0, 1),
  },
}));

function UserMenu(props) {
  const [anchorEl, setAnchorEl] = useState(null);

  const dispatch = useDispatch();
  const classes = useStyles();

  const userText = useSelector(
    authSelectors.selectCurrentUserNameOrEmailPrefix,
  );
  const userAvatar = useSelector(
    authSelectors.selectCurrentUserAvatar,
  );

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const doSignout = () => {
    dispatch(authActions.doSignout());
  };

  const doNavigateToProfile = () => {
    getHistory().push('/profile');
  };

  return (
    <>
      <Button
        className={classes.button}
        onClick={handleClick}
      >
        <div className={classes.buttonInner}>
          {userAvatar && (
            <Avatar src={userAvatar} alt="avatar" />
          )}
          {!userAvatar && <AccountCircleIcon />}
          <div className={classes.text}>
            <div>{userText}</div>
          </div>
        </div>
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={doNavigateToProfile}>
          <PersonOutlineIcon />
          <span className={classes.optionText}>
            {i18n('auth.profile.title')}
          </span>
        </MenuItem>
        <MenuItem onClick={doSignout}>
          <ExitToAppIcon />
          <span className={classes.optionText}>
            {i18n('auth.signout')}
          </span>
        </MenuItem>
      </Menu>
    </>
  );
}

export default UserMenu;
