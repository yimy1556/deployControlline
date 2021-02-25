import React from 'react';
import Collapse from '@material-ui/core/Collapse';
import { List } from '@material-ui/core';
import CustomRouterLink from 'src/view/layout/menu/CustomRouterLink';
import IteMenu from 'src/view/layout/menu/IteMenu';


function SubMemu(props){
  const { subMenu, open, url } = props;
  return(
    <Collapse in={open} timeout='auto' unmountOnExit>
      <List>
        {
          subMenu.map((item) => (
            <CustomRouterLink
              key={item.path}
              to={item.path}
            >
              <IteMenu  
                menu={item}
                url={url}
                menus={subMenu} 
                subMenu={true}
              />
            </CustomRouterLink>
          ))
        }
      </List> 
    </Collapse>
  );
}

export default SubMemu;
