import React, {useState} from 'react';
import {Button, Dropdown, Menu} from 'antd';
import {SiderNavbarProperties} from './NavbarProperties';
import Sider from 'antd/es/layout/Sider';
import "./SiderNavbarResponsive.less"
import {UnorderedListOutlined} from '@ant-design/icons';
import strings from '../../values/strings';
import {View} from '../../model/View';
import {useLocation} from 'react-router';

const SiderNavbarResponsive = (props: SiderNavbarProperties) => {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation();
  const view = location.pathname.split("/")[2] as View | undefined

  const handleClick = (key: View) => {
    let action = [props.logo, ...props.menuItems].find(item => item.key === key)?.action
    if (action) {
      action()
    }
  }

  const siderMenuItems = props.menuItems.map((item) =>
    <Menu.Item key={item.key} icon={item.icon}>{item.node}</Menu.Item>)

  const dropDownMenuItems = [
    <Menu.Item key={props.logo.key} icon={props.logo.icon}>{strings.HOME}</Menu.Item>,
    ...siderMenuItems,
  ]

  const dropDownMenu =
    <Menu mode={"vertical"} onClick={k => handleClick(k.key as View)}>{dropDownMenuItems}</Menu>

  return (
    <>
      <Dropdown className={"sider-navbar-dropdown"} overlay={dropDownMenu} placement="bottomRight" arrow>
        <Button className={"sider-navbar-dropdown-button"} shape="circle" icon={<UnorderedListOutlined/>} size="large"/>
      </Dropdown>
      <Sider className={"sider-navbar-sider"} collapsible collapsed={collapsed}
             onCollapse={(collapsed) => setCollapsed(collapsed)}>
        <Menu
          selectedKeys={view ? [view] : []}
          theme="dark"
          mode="vertical"
          onClick={k => handleClick(k.key as View)}
        >
          <Menu.Item
            key={props.logo.key}
            icon={collapsed && props.logo.icon}
            style={{
              display: "flex",
              alignItems: "center",
              height: "64px",
              marginTop: "0"
            }}
          >
            {!collapsed && props.logo.node}
          </Menu.Item>
          {siderMenuItems}
        </Menu>
      </Sider>
    </>
  );
};

export default SiderNavbarResponsive;