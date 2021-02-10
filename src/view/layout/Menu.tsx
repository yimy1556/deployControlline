import React from 'react';
import DrawerMenu from 'src/view/layout/menu/DrawerMenu';

function Menu(props) {
  return (
    <DrawerMenu  url={props.url} />  
  );
}

export default Menu;
