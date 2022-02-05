import React from 'react';
import {Col, Row} from 'antd';

export interface HelpRequestListItemDetailCommentProps {
  item: {
    author: { role: string; surname: string; name: string };
    createDateTime: Date;
    description: string
  }
}

const HelpRequestListItemDetailComment = (props: HelpRequestListItemDetailCommentProps) => {
  const item = props.item
  return (
    <div style={{marginBottom: "5px"}}>
      <Row>
        <Col style={{display: "flex", flexWrap: "wrap"}}>
          <span className={"dashboard-item-author"}>
            {`${item.author.name} ${item.author.surname}`}
          </span>
          <span className={"dashboard-item-attribute-bold"}>&nbsp;|&nbsp;</span>
          <span className={"dashboard-item-attribute-bold"}>
            {item.author.role}
          </span>
          <span className={"dashboard-item-attribute-bold"}>&nbsp;|&nbsp;</span>
          <span className={"dashboard-item-attribute-bold"}>
            {item.createDateTime.toLocaleString()}
          </span>
        </Col>
      </Row>
      <Row>
        <Col style={{width: "100%"}}>
          <p style={{textAlign: 'justify'}}>
            {item.description}
          </p>
        </Col>
      </Row>
    </div>
  );
};

export default HelpRequestListItemDetailComment;