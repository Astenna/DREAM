import {Col, Descriptions, Divider, Row} from "antd";
import React from "react";
import DeleteAccount from "../farmers-summary/DeleteAccount";

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

          <DeleteAccount/>
        </Col>
      </Row>
    </>
  )
}

export default PMUser;