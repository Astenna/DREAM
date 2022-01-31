import {Button, Col, Descriptions, Divider, Row} from "antd";
import React from "react";

const userData = {
  name: "Assish Rai",
  email: "pmaker@pmaker.it"
}

const PMUser = () => {
  return (
    <>
      <Row style={{padding: "15px 15px 0 15px"}}>
        <Col style={{width: "100%", margin: "0 10px"}}>
          <Row>
            <Col>
              <h1 className={"dashboard-h1"}>
                Policy maker: {userData.name}
              </h1>
            </Col>
          </Row>

          <Divider style={{margin: "10px 0"}}/>

          <Col style={{width: "50%"}}>
            <Descriptions column={1} bordered>
              <Descriptions.Item label="Name">{userData.name}</Descriptions.Item>
              <Descriptions.Item label="E-mail">{userData.email}</Descriptions.Item>
            </Descriptions>
          </Col>

          <Row style={{padding: "20px 0 5px 0"}}>
            <Col>
              <h1 className={"dashboard-h1"}>
                Delete account
              </h1>
            </Col>
          </Row>
          <Row>
            <Col>
              By clicking the button below you can delete your account completely. Please note, that this action is
              irreversible.
            </Col>
          </Row>
          <Button type={"primary"} style={{margin: "15px 0"}} danger>
            Delete account
            {/*  TODO: Add on click action*/}
          </Button>
        </Col>
      </Row>
    </>
  )
}

export default PMUser;