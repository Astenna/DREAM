import {ArrowLeftOutlined, ClockCircleOutlined, CommentOutlined} from '@ant-design/icons';
import {Col, Divider, Input, Row} from 'antd';
import React from 'react';
import {purple} from '@ant-design/colors';

const {Search} = Input

const HelpRequestList = () => {
  return (
    <>
      <Row style={{padding: "15px 15px 0 15px"}}>
        <Col style={{width: "100%"}}>
          <Row>
            <Col className={"flex-center"} style={{marginRight: "7px"}}>
              <ArrowLeftOutlined/>
            </Col>
            <Col>
              <h1 className={"dashboard-h1"}>
                My help requests
              </h1>
            </Col>
          </Row>
        </Col>
      </Row>
      <Divider style={{margin: "10px 0"}}/>
      <Row style={{padding: "0 35px 0 35px"}}>
        <Col style={{width: "100%"}}>
          <Row>
            <Col>
              <Search placeholder="Search by name" onSearch={() => {
              }} style={{width: 250}}/>
            </Col>
          </Row>
          <Divider style={{margin: "10px 0"}}/>
          {/*here split later*/}
          <Row>
            <Col style={{width: "100%"}}>
              <Row>
                <Col>
                  <h1 className={"dashboard-list-item-title "}>
                    Lorem ipsum blah blah blah blah blah
                  </h1>
                </Col>
              </Row>
              <Row style={{justifyContent: "space-between"}}>
                <Col style={{}}>
                  <span style={{marginRight: "10px"}}>
                    <CommentOutlined style={{color: purple.primary, marginRight: "3px"}}/>
                    <span className={"dashboard-item-attribute"}>1</span>
                  </span>
                  <span>
                    <ClockCircleOutlined style={{color: purple.primary, marginRight: "3px"}}/>
                    <span className={"dashboard-item-attribute"}>28.08.2019</span>
                  </span>
                </Col>
                <Col>
                  <Row>
                    <Col>
                      <span style={{marginRight: "10px"}}>
                        <ClockCircleOutlined style={{color: purple.primary, marginRight: "3px"}}/>
                        <span className={"dashboard-item-attribute"}>28.08.2019 12:46</span>
                      </span>
                    </Col>
                    <Col>
                      <span className={"dashboard-item-author"}>Grzegorz Grzegoski</span>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
          <Divider style={{margin: "10px 0"}}/>
          {/*here split later*/}
        </Col>
      </Row>
    </>
  );
};

export default HelpRequestList;