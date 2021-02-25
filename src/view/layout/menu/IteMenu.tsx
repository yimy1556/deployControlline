import React from 'react';
import clsx from 'clsx';
import {
  makeStyles,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  active: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
  },
  toolbar: theme.mixins.toolbar,
  listItemIcon: {
    minWidth: '48px',
  },
  listItemDisabled: {
    opacity: 0.5,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  }
}));

function itSubMenu(condicion, state){
  if(!condicion) return null;

  return state? <ExpandLess /> : <ExpandMore />;
}

function IteMenu(props) {
  const { menu, setOpen, open, subMenu } = props;
  
  const selectedKeys = () => {
    const { url, menus } = props;
    const match = menus?.find((option) => {
      if (option.exact) {
        return url === option.path;
      }

      return (
        url === option.path ||
        url.startsWith(option.path + '/')
      );
    });

    if (match) {
      return [match.path];
    }

    return [];
  };

  const classes = useStyles();

  return(
    <ListItem 
      button 
      className={subMenu? classes.nested:''}
      onClick={ menu.subMenu ? () => setOpen(!open):() => null}
    >
      <ListItemIcon
        className={clsx({
          [classes.listItemIcon]: true,
          [classes.active]: selectedKeys().includes(
            menu.path,
          ),
        })}
      >
        {menu.icon}
      </ListItemIcon>
      <ListItemText
        className={clsx({
          [classes.active]: selectedKeys().includes(
            menu.path,
          ),
        })}
      >
        {menu.label}
      </ListItemText> 
        {itSubMenu(menu.subMenu, open)}
    </ListItem> 
  )
};

export default IteMenu;

