import React, {useState} from 'react';
import {Avatar, Breadcrumb, Card, Col, Divider, Image, Layout, List, Menu, Row} from 'antd';
import "./Dashboard.less"
import {Link} from 'react-router-dom';
import Sider from 'antd/es/layout/Sider';
import {DesktopOutlined, PieChartOutlined, UserOutlined,} from '@ant-design/icons';

const {SubMenu} = Menu;
const {Header, Content, Footer} = Layout;


const productionData = [
    {
        type: 'Carrot',
        amount: 1,
        date: new Date()
    },
    {
        type: 'Carrot',
        amount: 2,
        date: new Date()
    },
    {
        type: 'Carrot',
        amount: 3,
        date: new Date()
    }
];
const helpRequestsData = [
    {
        topic: 'Lorem ipsum dolor sit amet',
        numberOfResponses: 0,
        date: new Date()
    },
    {
        topic: 'Lorem ipsum dolor sit amet',
        numberOfResponses: 3,
        date: new Date()
    },
    {
        topic: 'Lorem ipsum dolor sit amet',
        numberOfResponses: 2,
        date: new Date()
    }
];
const tips = [
    {
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget mauris ante. Nullam sollicitudin commodo accumsan.'
    },
    {
        content: "Fusce eget iaculis lectus, vel laoreet sem. Integer laoreet nec nunc sit amet elementum."
    },
    {
        content: "Donec in mi id justo iaculis accumsan a id lectus. Donec efficitur orci felis, a ornare ex consectetur id."
    },
    // {
    //     content: "Uspendisse eros tellus, porta volutpat iaculis sit amet, suscipit at nibh. Sed malesuada nisl eu varius fermentum."
    // }
]


const Dashboard = () => {
    const [collapsed, setCollapsed] = useState(false)

    return (
        <Layout style={{minHeight: '100vh'}}>
            <Sider collapsible collapsed={collapsed} onCollapse={(collapsed) => setCollapsed(collapsed)}>
                <div className="logo"/>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1" icon={<PieChartOutlined/>}>
                        Option 1
                    </Menu.Item>
                    <Menu.Item key="2" icon={<DesktopOutlined/>}>
                        Option 2
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="dashboard-site-layout">
                <Header className="dashboard-site-layout-background" style={{padding: 0}}>
                    <Menu className="dashboard-menu" mode="horizontal" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1">
                            <div className={"flex-center"}>
                                <Avatar size={32} icon={<UserOutlined/>}/>
                                <span style={{margin: '0 10px'}}>Jarnail Singh</span>
                            </div>
                        </Menu.Item>
                        <Menu.Item key="2">Sign out</Menu.Item>
                    </Menu>
                </Header>
                <Content style={{margin: '0 16px'}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{padding: 12, minHeight: 360}}>
                        <Row gutter={[24, 24]}>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                <Card style={{minHeight: '200px'}} title={"Summary"} headStyle={{fontSize: '16px'}}>
                                    <h3>Wednesday, 8.12.2021</h3>
                                    <Divider style={{margin: '12px'}}/>
                                    <Row>
                                        <Col span={12}>
                                            <Row>
                                                <Col span={8}>
                                                    <Image style={{width: '100', height: '100'}}
                                                           src={"https://ssl.gstatic.com/onebox/weather/64/cloudy.png"}/>
                                                </Col>
                                                <Col span={16}>
                                                    <h2 style={{margin: '0 4px'}}>15°C</h2>
                                                    <h4 style={{margin: '0 6px'}}>22mm</h4>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col span={12}
                                             style={{display: 'flex', justifyContent: 'right', alignItems: 'start'}}>
                                            <h3 style={{margin: '0'}}>Mavala, Adilabad</h3>
                                        </Col>
                                    </Row>
                                    <Divider style={{margin: '12px'}}/>
                                    <Row>
                                        <Col span={16}>
                                            <h3>Today's water usage:</h3>
                                        </Col>
                                        <Col span={8} style={{textAlign: 'right'}}>
                                            <h3>1.2 m3</h3>
                                        </Col>
                                    </Row>
                                    <Divider style={{margin: '12px'}}/>
                                    <Row>
                                        <Col span={16}>
                                            <h3>Average soil humidity:</h3>
                                        </Col>
                                        <Col span={8} style={{textAlign: 'right'}}>
                                            <h3>1.2 g/kg</h3>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                <Card style={{minHeight: '200px'}} title={"Tips & Suggestions"}
                                      headStyle={{fontSize: '16px'}}>
                                    <List
                                        itemLayout="horizontal"
                                        dataSource={tips}
                                        renderItem={item => (
                                            <List.Item style={{display: "block", padding: '6px'}}>
                                                {item.content}
                                            </List.Item>
                                        )}
                                    />
                                </Card>
                            </Col>
                            <Col span={24}>
                                <Card style={{minHeight: '200px'}} title={"Recent production data"}
                                      headStyle={{fontSize: '16px'}}>
                                    <List
                                        itemLayout="horizontal"
                                        dataSource={productionData}
                                        renderItem={item => (
                                            <List.Item style={{display: "block", padding: '8px'}}>
                                                <Row>
                                                    <Col span={8} style={{textAlign: 'left'}}>
                                                        {item.type}
                                                    </Col>
                                                    <Col span={16} style={{textAlign: 'right'}}>
                                                        {item.amount} kg | {item.date.toLocaleDateString("en-US")}
                                                    </Col>
                                                </Row>
                                            </List.Item>
                                        )}
                                    />
                                    <Link to={"/"} style={{float: 'right'}}>
                                        Manage production data →
                                    </Link>
                                </Card>
                            </Col>
                            <Col span={24}>
                                <Card style={{minHeight: '200px'}} title={"Help requests"}
                                      headStyle={{fontSize: '16px'}}>
                                    <List
                                        itemLayout="horizontal"
                                        dataSource={helpRequestsData}
                                        renderItem={item => (
                                            <List.Item style={{display: "block", padding: '8px'}}>
                                                <Row>
                                                    <Col span={12} style={{textAlign: 'left'}}>
                                                        {item.topic}
                                                    </Col>
                                                    <Col span={12} style={{textAlign: 'right'}}>
                                                        {item.numberOfResponses} responses
                                                        | {item.date.toLocaleDateString("en-US")}
                                                    </Col>
                                                </Row>
                                            </List.Item>
                                        )}
                                    />
                                    <Link to={"/"} style={{float: 'right'}}>
                                        Manage help requests →
                                    </Link>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </Content>
                <Footer style={{textAlign: 'center'}}>DREAM ©2022</Footer>
            </Layout>
        </Layout>
        // <Layout className="dashboard-layout">
        //     {/*<Header className={"dashboard-header"}>*/}
        //     {/*    <NavBar/>*/}
        //     {/*    /!*<Menu className="dashboard-menu" mode="horizontal" defaultSelectedKeys={['1']}>*!/*/}
        //     {/*    /!*    <Menu.Item key="0">*!/*/}
        //     {/*    /!*        <Logo style={{height: '50px', width: '100px'}}/>*!/*/}
        //     {/*    /!*    </Menu.Item>*!/*/}
        //     {/*    /!*    <Menu.Item key="1">*!/*/}
        //     {/*    /!*        <div className={"flex-center"}>*!/*/}
        //     {/*    /!*            <Avatar size={32} icon={<UserOutlined/>}/>*!/*/}
        //     {/*    /!*            <span style={{margin: '0 10px'}}>Jarnail Singh</span>*!/*/}
        //     {/*    /!*        </div>*!/*/}
        //     {/*    /!*    </Menu.Item>*!/*/}
        //     {/*    /!*    <Menu.Item key="2">Sign out</Menu.Item>*!/*/}
        //     {/*    /!*</Menu>*!/*/}
        //     {/*</Header>*/}
        //     {/*<Row className={"flex-center"}>*/}
        //     {/*    <Col xs={24} sm={24} md={20} lg={16} xl={16}>*/}
        //             <Content className="dashboard-site-layout" style={{padding: '24px 50px', marginTop: 64}}>
        //                 <Row gutter={[12, 12]}>
        //                     <Col xs={24} sm={24} md={12} lg={12} xl={12}>
        //                         <Card style={{minHeight: '200px'}} title={"Summary"} headStyle={{fontSize: '16px'}}>
        //                             <h3>Wednesday, 8.12.2021</h3>
        //                             <Divider style={{margin: '12px'}}/>
        //                             <Row>
        //                                 <Col span={12}>
        //                                     <Row>
        //                                         <Col span={8}>
        //                                             <Image style={{width: '100', height: '100'}}
        //                                                    src={"https://ssl.gstatic.com/onebox/weather/64/cloudy.png"}/>
        //                                         </Col>
        //                                         <Col span={16}>
        //                                             <h2 style={{margin: '0 4px'}}>15°C</h2>
        //                                             <h4 style={{margin: '0 6px'}}>22mm</h4>
        //                                         </Col>
        //                                     </Row>
        //                                 </Col>
        //                                 <Col span={12}
        //                                      style={{display: 'flex', justifyContent: 'right', alignItems: 'start'}}>
        //                                     <h3 style={{margin: '0'}}>Mavala, Adilabad</h3>
        //                                 </Col>
        //                             </Row>
        //                             <Divider style={{margin: '12px'}}/>
        //                             <Row>
        //                                 <Col span={16}>
        //                                     <h3>Today's water usage:</h3>
        //                                 </Col>
        //                                 <Col span={8} style={{textAlign: 'right'}}>
        //                                     <h3>1.2 m3</h3>
        //                                 </Col>
        //                             </Row>
        //                             <Divider style={{margin: '12px'}}/>
        //                             <Row>
        //                                 <Col span={16}>
        //                                     <h3>Average soil humidity:</h3>
        //                                 </Col>
        //                                 <Col span={8} style={{textAlign: 'right'}}>
        //                                     <h3>1.2 g/kg</h3>
        //                                 </Col>
        //                             </Row>
        //                         </Card>
        //                     </Col>
        //                     <Col xs={24} sm={24} md={12} lg={12} xl={12}>
        //                         <Card style={{minHeight: '200px'}} title={"Tips & Suggestions"}
        //                               headStyle={{fontSize: '16px'}}>
        //                             <List
        //                                 itemLayout="horizontal"
        //                                 dataSource={tips}
        //                                 renderItem={item => (
        //                                     <List.Item style={{display: "block", padding: '6px'}}>
        //                                         {item.content}
        //                                     </List.Item>
        //                                 )}
        //                             />
        //                         </Card>
        //                     </Col>
        //                     <Col span={24}>
        //                         <Card style={{minHeight: '200px'}} title={"Recent production data"}
        //                               headStyle={{fontSize: '16px'}}>
        //                             <List
        //                                 itemLayout="horizontal"
        //                                 dataSource={productionData}
        //                                 renderItem={item => (
        //                                     <List.Item style={{display: "block", padding: '8px'}}>
        //                                         <Row>
        //                                             <Col span={8} style={{textAlign: 'left'}}>
        //                                                 {item.type}
        //                                             </Col>
        //                                             <Col span={16} style={{textAlign: 'right'}}>
        //                                                 {item.amount} kg | {item.date.toLocaleDateString("en-US")}
        //                                             </Col>
        //                                         </Row>
        //                                     </List.Item>
        //                                 )}
        //                             />
        //                             <Link to={"/"} style={{float: 'right'}}>
        //                                 Manage production data →
        //                             </Link>
        //                         </Card>
        //                     </Col>
        //                     <Col span={24}>
        //                         <Card style={{minHeight: '200px'}} title={"Help requests"}
        //                               headStyle={{fontSize: '16px'}}>
        //                             <List
        //                                 itemLayout="horizontal"
        //                                 dataSource={helpRequestsData}
        //                                 renderItem={item => (
        //                                     <List.Item style={{display: "block", padding: '8px'}}>
        //                                         <Row>
        //                                             <Col span={12} style={{textAlign: 'left'}}>
        //                                                 {item.topic}
        //                                             </Col>
        //                                             <Col span={12} style={{textAlign: 'right'}}>
        //                                                 {item.numberOfResponses} responses
        //                                                 | {item.date.toLocaleDateString("en-US")}
        //                                             </Col>
        //                                         </Row>
        //                                     </List.Item>
        //                                 )}
        //                             />
        //                             <Link to={"/"} style={{float: 'right'}}>
        //                                 Manage help requests →
        //                             </Link>
        //                         </Card>
        //                     </Col>
        //                 </Row>
        //             </Content>
        //     {/*    </Col>*/}
        //     {/*</Row>*/}
        //     <Footer style={{textAlign: 'center'}}>DREAM ©2022</Footer>
        // </Layout>
    );
};

export default Dashboard;