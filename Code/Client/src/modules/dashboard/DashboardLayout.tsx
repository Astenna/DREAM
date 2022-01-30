import React from 'react';
import strings from '../../values/strings';
import {useNavigate} from 'react-router';
import DefaultLayout from '../common/layout/DefaultLayout';
import HorizontalNavbar from '../common/navbar/HorizontalNavbar';
import {Layout} from 'antd';
import {Content, Footer, Header} from 'antd/es/layout/layout';
import colors from '../../values/colors';
import Logo from '../common/Logo';
import '../../stylesheets/common.less';
import {HomeOutlined, PieChartOutlined, UserOutlined} from '@ant-design/icons';
import SiderNavbarResponsive from '../common/navbar/SiderNavbarResponsive';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {logout, selectAuthenticated, selectAuthInfo} from '../../store/auth/authSlice';
import {Role} from '../../model/Role';
import {NavbarItem} from '../common/navbar/NavbarProperties';

const DashboardLayout = () => {
  const navigate = useNavigate();
  const authenticated = useAppSelector(selectAuthenticated);
  const authInfo = useAppSelector(selectAuthInfo);
  const dispatch = useAppDispatch()

  const logo = {
    key: "0",
    node: <Logo/>,
    icon: <HomeOutlined/>,
    action: () => navigate("/"),
  }

  const horizontalMenuItems: NavbarItem[] = [
    {
      key: "user",
      node:
        <div>
          <UserOutlined style={{padding: "5px"}}/>
          <>{authInfo.name}</>
        </div>,
      action: () => {
      }
    },
    {
      key: "logout",
      node: strings.SIGN_OUT,
      action: () => dispatch(logout()),
    }
  ]

  const sidebarMenuItems: { [name in Role]: NavbarItem[] } = {
    farmer: [
      {
        key: "1",
        node: strings.LOG_IN,
        icon: <PieChartOutlined/>,
        action: () => navigate("/"),
      },
      {
        key: "2",
        node: strings.SIGN_OUT,
        icon: <PieChartOutlined/>,
        action: () => navigate("/"),
      }
    ],
    policy_maker: []
  }


  return (
    <DefaultLayout>
      {
        (authInfo.role && authenticated) && <>
            <SiderNavbarResponsive logo={logo} menuItems={sidebarMenuItems[authInfo.role]}/>
            <Layout>
                <Header style={{backgroundColor: colors.WHITE, paddingLeft: "70px"}}>
                    <HorizontalNavbar menuItems={horizontalMenuItems}/>
                </Header>
                <Content>
                </Content>
                <Footer style={{textAlign: 'center'}}>DREAM 2022</Footer>
            </Layout>
        </>
      }


    </DefaultLayout>
  );
};

export default DashboardLayout;