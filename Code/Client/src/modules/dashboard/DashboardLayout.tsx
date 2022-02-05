import React from 'react';
import strings from '../../values/strings';
import {useNavigate} from 'react-router';
import DefaultLayout from '../layout/DefaultLayout';
import HorizontalNavbar from '../navbar/HorizontalNavbar';
import {Layout} from 'antd';
import {Content, Footer, Header} from 'antd/es/layout/layout';
import colors from '../../values/colors';
import Logo from '../other/Logo';
import '../../stylesheets/common.less';
import {HomeOutlined, UserOutlined} from '@ant-design/icons';
import SiderNavbarResponsive from '../navbar/SiderNavbarResponsive';
import {useAppSelector} from '../../store/hooks';
import {logout, selectAuthenticated, selectAuthInfo, selectRoleNavigation} from '../../store/auth/authSlice';
import {Role} from '../../model/Role';
import {NavbarItem} from '../navbar/NavbarProperties';
import links from '../../values/links';
import {Route, Routes} from 'react-router-dom';
import PMUser from "../policy-maker/PMUser";
import PMDashboard from "../policy-maker/PMDashboard";
import FarmersList from "../policy-maker/FarmersList";
import FarmerProductionData from '../production-data/FarmerProductionData';
import {useLogout} from '../../api/logoutHooks';
import FarmerDashboard from '../farmer-dashboard/FarmerDashboard';
import PMFarmersSummary from '../farmers-summary/PMFarmersSummary';
import MyFarmersSummary from '../farmers-summary/MyFarmersSummary';
import MyHelpRequestList from '../request-forum-lists/my-help-requests/MyHelpRequestList';
import MyHelpRequestListItemDetail from '../request-forum-lists/my-help-requests/MyHelpRequestListItemDetail';
import HelpRequestList from '../request-forum-lists/help-requests/HelpRequestList';
import HelpRequestListItemDetail from '../request-forum-lists/help-requests/HelpRequestListItemDetail';

const DashboardLayout = () => {
  const navigate = useNavigate();
  const authenticated = useAppSelector(selectAuthenticated);
  const authInfo = useAppSelector(selectAuthInfo);
  const roleNavigation = useAppSelector(selectRoleNavigation);
  const logout = useLogout()

  const logo = {
    key: "0",
    node: <Logo/>,
    icon: <HomeOutlined/>,
    action: () => navigate(links.DASHBOARD.URL),
  }

  const horizontalMenuItems: NavbarItem[] = [
    {
      key: "user",
      node:
        <div>
          <UserOutlined style={{padding: "5px"}}/>
          <>{authInfo.name}</>
        </div>,
      action: () => navigate(links.DASHBOARD.URL + links.SUMMARY.URL)
    },
    {
      key: "logout",
      node: strings.SIGN_OUT,
      action: () => logout(),
    }
  ]

  const sidebarMenuItems: { [name in Role]: NavbarItem[] } = {
    farmer: [
      {
        key: "summary",
        node: strings.SIDEBAR.SUMMARY,
        action: () => navigate(links.DASHBOARD.URL + links.SUMMARY.URL),
      },
      {
        key: "production_data",
        node: strings.SIDEBAR.PRODUCTION_DATA,
        action: () => navigate(links.DASHBOARD.URL + links.PRODUCTION_DATA.URL),
      },
      {
        key: "my_help_requests",
        node: strings.SIDEBAR.MY_HELP_REQUESTS,
        action: () => navigate(links.DASHBOARD.URL + links.MY_HELP_REQUESTS.URL),
      },
      {
        key: "provide_help",
        node: strings.SIDEBAR.PROVIDE_HELP,
        action: () => navigate(links.DASHBOARD.URL + links.PROVIDE_HELP.URL),
      },
      {
        key: "forum",
        node: strings.SIDEBAR.FORUM,
        action: () => navigate(links.DASHBOARD.URL + links.FORUM.URL),
      },
    ],
    policy_maker: [
      {
        key: "farmers",
        node: strings.SIDEBAR.FARMERS,
        action: () => navigate(links.DASHBOARD.URL + links.FARMERS.TYPE.ALL),
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
                <Content style={{padding: "15px"}}>
                    <div style={{minHeight: "100%", backgroundColor: colors.WHITE}}>
                        <Routes>
                          {roleNavigation.role === Role.FARMER &&
                          <>
                              <Route path={"/"} element={<FarmerDashboard/>}/>
                              <Route path={links.SUMMARY.URL} element={<MyFarmersSummary/>}/>
                              <Route path={links.PRODUCTION_DATA.URL} element={<FarmerProductionData/>}/>
                              <Route path={links.MY_HELP_REQUESTS.URL} element={<MyHelpRequestList/>}/>
                              <Route path={links.MY_HELP_REQUESTS_DETAIL.URL} element={<MyHelpRequestListItemDetail/>}/>
                              <Route path={links.PROVIDE_HELP.URL} element={<HelpRequestList/>}/>
                              <Route path={links.PROVIDE_HELP_DETAIL.URL} element={<HelpRequestListItemDetail/>}/>
                              <Route path={links.PROVIDE_HELP.URL} element={<></>}/>
                          </>
                          }
                          {roleNavigation.role === Role.POLICY_MAKER &&
                          <>
                              <Route path={"/"} element={<PMDashboard/>}/>
                              <Route path={links.SUMMARY.URL} element={<PMUser/>}/>
                              <Route path={links.FARMERS.URL} element={<FarmersList/>}/>
                              <Route path={links.FARMERS_FARMER.PARAM} element={<PMFarmersSummary/>}/>
                          </>
                          }
                        </Routes>
                    </div>
                </Content>
                <Footer style={{textAlign: 'center'}}>DREAM 2022</Footer>
            </Layout>
        </>
      }
    </DefaultLayout>
  );
};

export default DashboardLayout;