import React from 'react';
import {Col, Divider, Row} from 'antd';
import {ClockCircleOutlined, CommentOutlined} from '@ant-design/icons';
import {purple} from '@ant-design/colors';
import {Link} from 'react-router-dom';
import links from '../../../values/links';

export interface HelpRequestListItemProps {
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

const HelpRequestListItem = (props: { item: HelpRequestListItemProps }) => {
  const item = props.item
  return (
    <Link
      to={links.DASHBOARD.URL + links.MY_HELP_REQUESTS.URL + `/${item.id}`}
      style={{color: 'initial'}}
    >
      <Row className={"list-item"}>
        <Col style={{width: "100%"}}>
          <Row>
            <Col>
              <h1 className={"dashboard-list-item-title "}>
                {item.title}
              </h1>
            </Col>
          </Row>
          <Row justify={'space-between'}>
            <Col>
              <span style={{marginRight: "10px"}}>
                <CommentOutlined style={{color: purple.primary, marginRight: "3px"}}/>
                <span className={"dashboard-item-attribute"}>{item.commentCount}</span>
              </span>
              <span>
                <ClockCircleOutlined style={{color: purple.primary, marginRight: "3px"}}/>
                <span className={"dashboard-item-attribute"}>{item.lastCommentDate.toLocaleDateString()}</span>
              </span>
            </Col>
            <Col>
              <Row>
                <Col>
                  <span style={{marginRight: "10px"}}>
                    <ClockCircleOutlined style={{color: purple.primary, marginRight: "3px"}}/>
                    <span className={"dashboard-item-attribute"}>{item.lastCommentDate.toLocaleString()}</span>
                  </span>
                </Col>
                <Col>
                  <span className={"dashboard-item-author"}>{`${item.author.name} ${item.author.surname}`}</span>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
      <Divider style={{margin: "10px 0"}}/>
    </Link>
  );
};

export default HelpRequestListItem;