import React from 'react';
import {Menu} from 'antd';
import './HorizontalNavbarResponsive.less'
import '../../../stylesheets/common.less'
import {NavbarProperties} from './NavbarProperties';

/**
 * Horizontal navbar used in Homepage.
 * @param props Menu items and CSS properties of the Menu component.
 */
const HorizontalNavbar = (props: NavbarProperties) => {

  const handleClick = (key: string) => {
    let action = props.menuItems.find(item => item.key === key)?.action
    if (action) {
      action()
    }
  }

  return (
    <>
      {/*<Row style={{*/}
      {/*  justifyContent: "space-between"*/}
      {/*}}>*/}
      {/*  <Col style={{*/}
      {/*    width: */}
      {/*  }}*/}
      {/*  />*/}
      {/*  <Col style={{*/}
      {/*    flex: "1 1"*/}
      {/*  }}>*/}
      <Menu
        style={{
          ...props.menuBarProperties,
          justifyContent: "flex-end",
          borderBottom: "initial",
        }}
        mode={"horizontal"}
        onClick={k => handleClick(k.key)}
      >
        {props.menuItems.map((item) =>
          <Menu.Item key={item.key}>{item.node}</Menu.Item>)}
      </Menu>
      {/*  </Col>*/}
      {/*</Row>*/}
    </>
  );
};

export default HorizontalNavbar;