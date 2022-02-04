import React from 'react';
import {Col, Divider, Row} from 'antd';
import {ClockCircleOutlined, CommentOutlined} from '@ant-design/icons';
import {purple} from '@ant-design/colors';

export interface MyHelpRequestsShortItemProps {
  id: string
  title: string
  commentCount: number
  lastCommentDate: Date
  createDateTime: Date
  author: {
    name: string
    surname: string
  }
}

const MyHelpRequestsShortItem = (props: { item: MyHelpRequestsShortItemProps }) => {
  const item = props.item
  return (
    <>
      <Row className={"list-item"}>
        <Col style={{width: "100%"}}>
          <Row justify={'space-between'}>
            <div style={{fontWeight: "normal"}} className={"dashboard-list-item-title "}>
              {item.title}
            </div>
            <span style={{marginRight: "10px"}}>
              <CommentOutlined style={{color: purple.primary, marginRight: "3px"}}/>
              <span className={"dashboard-item-attribute"} style={{marginRight: "10px"}}>{item.commentCount}</span>

              <ClockCircleOutlined style={{color: purple.primary, marginRight: "3px"}}/>
              <span className={"dashboard-item-attribute"}>{item.lastCommentDate.toLocaleDateString()}</span>
            </span>
          </Row>
        </Col>
      </Row>
      <Divider style={{margin: "10px 0"}}/>
    </>
  );
};

export default MyHelpRequestsShortItem;