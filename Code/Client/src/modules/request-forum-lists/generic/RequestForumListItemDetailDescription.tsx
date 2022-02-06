import React from 'react';
import {Col, Row} from 'antd';

interface RequestForumListItemDetailDescriptionProps {
  description?: string;
  createdBy?: string;
  createdOn?: string | Date;
  inModal?: boolean;
}

const RequestForumListItemDetailDescription = (props: RequestForumListItemDetailDescriptionProps) => {
  return (
    <>
      <Row style={!props.inModal ? {padding: "0 35px 0 35px"} : {}}>
        <Col style={{width: "100%"}}>
          <Row>
            <Col>
              <p style={
                !props.inModal ? {textAlign: 'justify', margin: "20px 0 0 0"}
                  : {textAlign: 'justify'}}
              >
                {props?.description}
              </p>
            </Col>
          </Row>
          <Row justify={'end'}>
            <Col style={{margin: "10px 0 0", display: "flex", flexWrap: "wrap"}}>
          <span className={"dashboard-item-author"}>
            {props?.createdBy}
          </span>
              <span className={"dashboard-item-attribute-bold"}>&nbsp;|&nbsp;</span>
              <span className={"dashboard-item-attribute-bold"}>
            {props?.createdOn && new Date(props.createdOn).toLocaleString()}
          </span>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default RequestForumListItemDetailDescription;