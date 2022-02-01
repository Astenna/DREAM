import React, {useState} from 'react';
import DefaultLayout from '../layout/DefaultLayout';
import {Content, Header} from 'antd/es/layout/layout';
import {Button, Col, Row, RowProps} from 'antd';
import '../../stylesheets/common.less'
import HorizontalNavbarResponsive from '../navbar/HorizontalNavbarResponsive';
import strings from '../../values/strings'
import colors from '../../values/colors';
import farmPicture from '../../assets/farm.jpg';
import './homepage.less';
import LogInModal from './LogInModal';
import CreateAccountModal from './CreateAccountModal';

/**
 * Homepage of the DREAM app. Can invoke modal dialogs responsible for
 * log in, sign up and password reminding.
 */
const Homepage = () => {
  const [isCreateAccountFormVisible, setCreateAccountFormVisible] = useState(false);
  const [isLogInFormVisible, setLogInFormVisible] = useState(false);

  const menuItems = [
    {
      key: "1",
      node: strings.LOG_IN,
      action: () => setLogInFormVisible(true)
    },
    {
      key: "2",
      node: strings.CREATE_ACCOUNT,
      action: () => setCreateAccountFormVisible(true)
    }
  ]

  return (
    <DefaultLayout style={{minWidth: "350px"}}>
      <LogInModal isVisible={isLogInFormVisible} setVisible={setLogInFormVisible}/>
      <CreateAccountModal isVisible={isCreateAccountFormVisible} setVisible={setCreateAccountFormVisible}/>
      <Header style={{backgroundColor: colors.HOMEPAGE.GRAY, padding: "0 10px"}}>
        <HorizontalNavbarResponsive menuItems={menuItems} menuBarProperties={{backgroundColor: colors.HOMEPAGE.GRAY}}/>
      </Header>
      <Content style={{backgroundColor: colors.WHITE}}>
        <RowBlock className={"flex-center"} style={{backgroundColor: colors.HOMEPAGE.GRAY}}>
          <Col xs={24} sm={22} md={20} lg={16} xl={16} xxl={16}>
            <RowBlock className={"flex-center"}>
              <Col span={24} style={{margin: "50px 0 20px 0"}}>
                <h1 style={{
                  textAlign: "center",
                  fontSize: "60px",
                  fontWeight: "600"
                }}>
                  {strings.DREAM}
                </h1>
              </Col>
            </RowBlock>
            <RowBlock className={"flex-center"}>
              <Col span={24} style={{margin: "0 0 10px 0"}}>
                <h2 style={{textAlign: "center"}}>
                  {strings.DREAM_SHORT_DESCRIPTION}
                </h2>
              </Col>
            </RowBlock>
            <RowBlock className={"flex-center"}>
              <Col span={24} style={{margin: "0 0 10px 0"}}>
                <p style={{textAlign: "center"}}>
                  {strings.DREAM_DESCRIPTION}
                </p>
              </Col>
            </RowBlock>
            <RowBlock className={"flex-center"}>
              <Col span={24} className={"flex-center"} style={{margin: "0 0 50px 0"}}>
                <Button
                  type={"primary"} size={"large"} shape={"round"}
                  onClick={() => setCreateAccountFormVisible(true)}
                >
                  {strings.CREATE_ACCOUNT}
                </Button>
              </Col>
            </RowBlock>
          </Col>
        </RowBlock>
        <RowBlock
          className={"flex-center"}
          style={{backgroundColor: colors.WHITE}}
        >
          <Col span={24}>
            <RowBlock style={{flexWrap: "nowrap"}}>
              <Col
                id={"homepage-farm-image-container"}
                xs={0} sm={0} md={14} xl={14} lg={14}
                style={{
                  justifyContent: 'flex-start',
                  flexDirection: 'column',
                  padding: '40px 30px 30px 50px '
                }}
              >
                <img
                  alt={strings.DREAM_IMAGE_FARM}
                  style={{
                    width: "100%",
                    objectFit: "contain",
                  }}
                  src={farmPicture}
                />
              </Col>
              <Col
                xs={24} sm={24} md={10} xl={10} lg={10}
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  flexDirection: 'column',
                  padding: '30px 50px 30px 30px'
                }}
              >
                <h1 id="homepage-farm-goal-label" style={{fontWeight: "600", fontSize: "30px"}}>
                  {strings.DREAM_GOAL_LABEL}
                </h1>
                <p style={{textAlign: "justify"}}>
                  {strings.DREAM_GOAL}
                </p>
              </Col>
            </RowBlock>
          </Col>
        </RowBlock>
      </Content>
    </DefaultLayout>
  );
};

export default Homepage;

const RowBlock = (props: RowProps) =>
  <Row {...props} style={{...props.style, width: "100%"}}>{props.children}</Row>