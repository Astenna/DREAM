import React from 'react';
import {Button, Col, Modal, Row} from 'antd';
import {DeleteOutlined, ExclamationCircleOutlined} from '@ant-design/icons';

const {confirm} = Modal;

export interface RequestForumListItemDetailCommentProps {
  author: string;
  authorRole?: string;
  content: string
  createdDate: Date;
  deletable: boolean;
  onDelete?: () => void
}

const RequestForumListItemDetailComment = (props: RequestForumListItemDetailCommentProps) => {

  const showDeleteConfirm = () => {
    confirm({
      title: 'Confirm deletion',
      icon: <ExclamationCircleOutlined/>,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        if (props.onDelete) {
          props.onDelete();
        }
      },
      onCancel() {
      },
    });
  }

  return (
    <div style={{marginBottom: "5px"}}>
      <Row>
        <Col style={{display: "flex", flexWrap: "wrap"}}>
          <span className={"dashboard-item-author"}>
            {props.author}
          </span>

          {
            props.authorRole &&
            <>
                <span className={"dashboard-item-attribute-bold"}>&nbsp;|&nbsp;</span>
                <span className={"dashboard-item-attribute-bold"}>
                  {props.authorRole}
                </span>
            </>
          }
          <span className={"dashboard-item-attribute-bold"}>&nbsp;|&nbsp;</span>
          <span className={"dashboard-item-attribute-bold"}>
            {props.createdDate.toLocaleString()}
          </span>
          {
            props.deletable &&
            <>
                <span className={"dashboard-item-attribute-bold"}>&nbsp;|&nbsp;</span>
                <span>
                      <Button
                          size={"small"}
                          shape={"circle"}
                          icon={<DeleteOutlined/>}
                          onClick={showDeleteConfirm}
                      />
                  </span>
            </>
          }
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