import React from 'react';
import strings from '../../values/strings';
import {useLocation, useNavigate} from 'react-router';
import DefaultLayout from '../common/layout/DefaultLayout';
import HorizontalNavbar from '../common/navbar/HorizontalNavbar';
import {Layout} from 'antd';
import {Content, Footer, Header} from 'antd/es/layout/layout';
import colors from '../../values/colors';
import Logo from '../common/Logo';
import '../../stylesheets/common.less';
import {HomeOutlined, UserOutlined} from '@ant-design/icons';
import SiderNavbarResponsive from '../common/navbar/SiderNavbarResponsive';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {logout, selectAuthenticated, selectAuthInfo, selectRoleNavigation} from '../../store/auth/authSlice';
import {Role} from '../../model/Role';
import {NavbarItem} from '../common/navbar/NavbarProperties';
import links from '../../values/links';

const DashboardLayout = () => {
  const navigate = useNavigate();
  const authenticated = useAppSelector(selectAuthenticated);
  const authInfo = useAppSelector(selectAuthInfo);
  const roleNavigation = useAppSelector(selectRoleNavigation);
  const dispatch = useAppDispatch()
  const location = useLocation()

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
      action: () => navigate(links.SUMMARY.URL)
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
        key: "summary",
        node: strings.SIDEBAR.SUMMARY,
        action: () => navigate(links.SUMMARY.URL),
      },
      {
        key: "production_data",
        node: strings.SIDEBAR.PRODUCTION_DATA,
        action: () => navigate(links.PRODUCTION_DATA.URL),
      },
      {
        key: "my_help_requests",
        node: strings.SIDEBAR.MY_HELP_REQUESTS,
        action: () => navigate(links.MY_HELP_REQUESTS.URL),
      },
      {
        key: "provide_help",
        node: strings.SIDEBAR.PROVIDE_HELP,
        action: () => navigate(links.PROVIDE_HELP.URL),
      },
      {
        key: "forum",
        node: strings.SIDEBAR.FORUM,
        action: () => navigate(links.FORUM.URL),
      },
    ],
    policy_maker: [
      {
        key: "farmers",
        node: strings.SIDEBAR.FARMERS,
        action: () => navigate("/farmers"),
      },
    ]
  }


  return (
    <DefaultLayout>
      {
        (authenticated && roleNavigation.role) &&
        <>
            <SiderNavbarResponsive
                logo={logo}
                menuItems={sidebarMenuItems[roleNavigation!.role]}
            />
            <Layout>
                <Header style={{backgroundColor: colors.WHITE, paddingLeft: "70px"}}>
                    <HorizontalNavbar
                        menuItems={horizontalMenuItems}
                    />
                </Header>
                <Content>
                  {location.pathname}
                </Content>
                <Footer style={{textAlign: 'center'}}>DREAM 2022</Footer>
            </Layout>
        </>
      }
    </DefaultLayout>
  );
};

export default DashboardLayout;