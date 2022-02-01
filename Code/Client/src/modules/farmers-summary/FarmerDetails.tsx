import {Col, Descriptions, Row} from 'antd';
import React from 'react';
import {Note} from "../../model/Note";


const userData = {
  name: "Assish Rai",
  email: "user@farmer.it",
  note: Note.POSITIVE,
  mandal: "Mavala",
  fullAddress: "Street 1, Mavala 12039"
}

const FarmerDetails = () => {
  return (
    <>
      <Row style={{padding: "15px 0 15px 0"}}>

        <Col style={{width: "50%", padding: "0 20px 0 0"}}>
          <Descriptions column={1} bordered>
            <Descriptions.Item label="Name">{userData.name}</Descriptions.Item>
            <Descriptions.Item label="E-mail">{userData.email}</Descriptions.Item>
            <Descriptions.Item label="Note">{userData.note}</Descriptions.Item>
          </Descriptions>
        </Col>

        <Col style={{width: "50%", padding: "0 0 0 20px"}}>
          <Descriptions column={1} bordered>
            <Descriptions.Item label="Number of help requests">{userData.name}</Descriptions.Item>
            <Descriptions.Item label="Mandal">{userData.mandal}</Descriptions.Item>
            <Descriptions.Item label="Full address">{userData.fullAddress}</Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
    </>
  );
}

export default FarmerDetails;