import React from 'react';
import {Col, Divider, Row} from 'antd';
import {ClockCircleOutlined, CommentOutlined} from '@ant-design/icons';
import {purple} from '@ant-design/colors';
import {Link} from 'react-router-dom';

export interface RequestForumListItemProps {
  topic: string
  answersCount: number
  createdDate: Date
  author?: string,
  lastAnswerDate?: Date
  lastAnswerAuthor?: string
  link: string,
}

const RequestForumListItem = (props: RequestForumListItemProps) => {
  return (
    <Link
      to={props.link}
      style={{color: 'initial'}}
    >
      <Row className={"list-item"}>
        <Col style={{width: "100%"}}>
          <Row>
            <Col>
              <h1 className={"dashboard-list-item-title "}>
                {props.topic}
              </h1>
            </Col>
          </Row>
          <Row justify={'space-between'}>
            <Col>
              {
                props.author &&
                <span className={"dashboard-item-author"}>
                  {props.author}
                </span>
              }
              <span style={{marginRight: "10px"}}>
                <CommentOutlined style={{color: purple.primary, marginRight: "3px"}}/>
                <span className={"dashboard-item-attribute"}>{props.answersCount}</span>
              </span>
              <span>
                <ClockCircleOutlined style={{color: purple.primary, marginRight: "3px"}}/>
                <span className={"dashboard-item-attribute"}>{props.createdDate.toLocaleDateString()}</span>
              </span>
            </Col>
            <Col>
              <Row>
                {
                  props.lastAnswerDate &&
                  <Col>
                      <span style={{marginRight: "10px"}}>
                        <ClockCircleOutlined style={{color: purple.primary, marginRight: "3px"}}/>
                        <span className={"dashboard-item-attribute"}>{props.lastAnswerDate.toLocaleString()}</span>
                      </span>
                  </Col>
                }
                {
                  props.lastAnswerAuthor &&
                  <Col>
                      <span className={"dashboard-item-author"}>{props.lastAnswerAuthor}</span>
                  </Col>
                }
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
      <Divider style={{margin: "10px 0"}}/>
    </Link>
  );
};

export default RequestForumListItem;