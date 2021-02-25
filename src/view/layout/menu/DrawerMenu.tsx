import React, { useLayoutEffect, useState } from 'react';
import authSelectors from 'src/modules/auth/authSelectors';
import { useDispatch, useSelector } from 'react-redux';
import PermissionChecker from 'src/modules/auth/permissionChecker';
import actions from 'src/modules/layout/layoutActions';
import layoutSelectors from 'src/modules/layout/layoutSelectors';
import menus from 'src/view/menus';
import {
  makeStyles,
  Drawer,
  List,
} from '@material-ui/core';
import IteMenu from 'src/view/layout/menu/IteMenu';
import CustomRouterLink from 'src/view/layout/menu/CustomRouterLink';
import SubMenu from 'src/view/layout/menu/SubMenu';

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
}));

function DrawerMenu(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const currentUser = useSelector(
    authSelectors.selectCurrentUser,
  );
  const menuVisible = useSelector(
    layoutSelectors.selectMenuVisible,
  );
  const permissionChecker = new PermissionChecker(
    currentUser,
  );
  
  const [open, setOpen] = useState(false);
  const { url } = props;
  useLayoutEffect(() => {
    const toggleMenuOnResize = () => {
      (window as any).innerWidth < 576
        ? dispatch(actions.doHideMenu())
        : dispatch(actions.doShowMenu());
    };

    toggleMenuOnResize();

    (window as any).addEventListener(
      'resize',
      toggleMenuOnResize,
    );

    return () => {
      (window as any).removeEventListener(
        'resize',
        toggleMenuOnResize,
      );
    };
  }, [dispatch]);

  const match = (permission) => {
    return permissionChecker.match(permission);
  };

  if (!menuVisible) {
    return null;
  }
  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      anchor="left"
      open={true}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.toolbar}></div>
      <List>
        {menus
        .filter((menu) => match(menu.permissionRequired))
        .map((menu, index) => {
          if(!menu.subMenu){
            return (
              <CustomRouterLink
                key={menu.path}
                to={menu.path}
              >
                <IteMenu
                  menus={menus}
                  url={url}
                  menu={menu} 
                  setOpen={setOpen} 
                  open={open}/>
              </CustomRouterLink>
            )
          }else{
            return (
              <div 
                key={index}
              >
                <IteMenu
                  menu={menu} 
                  setOpen={setOpen} 
                  open={open}/>
                <SubMenu
                  url={url}
                  subMenu={menu.subMenu} 
                  open={open} />
              </div>);
          }
        })} 
      </List>
    </Drawer>
  );
}

export default DrawerMenu;
