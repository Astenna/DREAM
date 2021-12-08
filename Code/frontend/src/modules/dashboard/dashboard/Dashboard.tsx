import React from 'react';
import {Breadcrumb, Layout, Menu, PageHeader} from 'antd';
import {HomeOutlined} from '@ant-design/icons';
import "./Dashboard.less"
import {Route} from 'antd/es/breadcrumb/Breadcrumb';

const {Header, Content, Footer} = Layout;

const routes: Route[] = [
    {
        path: '',
        breadcrumbName: 'Home',
    }
];

const Dashboard = () => {
    return (
        <Layout className="dashboard-layout">
            <Header style={{position: 'fixed', zIndex: 1, width: '100%'}}>
                <div className="logo">
                    LOGO
                </div>
                <Menu className="dashboard-menu" theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                    <Menu.Item key="1">nav 1</Menu.Item>
                    <Menu.Item key="2">nav 2</Menu.Item>
                    <Menu.Item key="3">nav 3</Menu.Item>
                </Menu>
            </Header>
            <Content className="dashboard-site-layout" style={{padding: '0 50px', marginTop: 64}}>
                <PageHeader
                    className="site-page-header"
                    title="Dashboard"
                    // breadcrumb={{ routes }}
                />
                <div className="dashboard-site-layout-background" style={{padding: 24, minHeight: 380}}>
                    Content
                </div>
            </Content>
            <Footer style={{textAlign: 'center'}}>DREAM ©2021</Footer>
        </Layout>
    );
};

export default Dashboard;