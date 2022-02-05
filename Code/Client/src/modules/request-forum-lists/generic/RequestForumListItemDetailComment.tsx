import React from 'react';
import {Col, Row} from 'antd';

export interface RequestForumListItemDetailCommentProps {
  author: string;
  authorRole?: string;
  content: string
  createdDate: Date;
  deletable: boolean;
  onDelete?: () => void
}

const RequestForumListItemDetailComment = (props: RequestForumListItemDetailCommentProps) => {
  return (
    <div style={{marginBottom: "5px"}}>
      <Row>
        <Col style={{display: "flex", flexWrap: "wrap"}}>
          <span className={"dashboard-item-author"}>
            {props.author}
          </span>
          <span className={"dashboard-item-attribute-bold"}>&nbsp;|&nbsp;</span>
          <span className={"dashboard-item-attribute-bold"}>
            {props.authorRole}
          </span>
          <span className={"dashboard-item-attribute-bold"}>&nbsp;|&nbsp;</span>
          <span className={"dashboard-item-attribute-bold"}>
            {props.createdDate.toLocaleString()}
          </span>
        </Col>
      </Row>
      <Row>
        <Col style={{width: "100%"}}>
          <p style={{textAlign: 'justify'}}>
            {props.content}
          </p>
        </Col>
      </Row>
    </div>
  );
};

export default RequestForumListItemDetailComment;