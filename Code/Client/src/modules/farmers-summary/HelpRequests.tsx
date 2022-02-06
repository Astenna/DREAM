import {EyeOutlined} from '@ant-design/icons';
import {Button, Modal, Table} from 'antd';

import React, {useState} from 'react';
import {GetRequestsResponse} from '../../model/api/GetRequest';
import RequestForumListItemDetailDescription
  from '../request-forum-lists/generic/RequestForumListItemDetailDescription';

const HelpRequests = (props: { data: GetRequestsResponse | undefined }) => {
  const [detailModalVisible, setDetailModalVisible] = useState(false)
  const [detailModeID, setDetailModeID] = useState<number>()
  const chosenItem = props.data?.find(x => x.id === detailModeID)

  const helpRequestsDataColumns = [
    {
      title: () => {
        return <div style={{fontWeight: 'bold'}}>Topic</div>;
      },
      dataIndex: 'topic',
      key: 'topic',
    },
    {
      title: () => {
        return <div style={{fontWeight: 'bold'}}>Responses</div>;
      },
      dataIndex: 'helpResponsesCount',
      key: 'helpResponsesCount',
    },
    {
      title: () => {
        return <div style={{fontWeight: 'bold'}}>Date</div>;
      },
      dataIndex: 'createdOn',
      key: 'createdOn',
      render: (createdOn: string) => (
        <>{new Date(createdOn).toLocaleDateString()}</>
      )
    },
    {
      title: '',
      key: 'id',
      render: (values: any) => (
        <Button shape={"circle"} size={"small"} onClick={() => {
          if (values?.id) {
            setDetailModalVisible(true)
            setDetailModeID(values.id)
          }
        }}>
          <EyeOutlined/>
        </Button>
      ),
    },
  ]

  return (
    <>
      <h1 className={"dashboard-h1"}>Help requests</h1>
      <Modal
        width={600}
        title={chosenItem?.topic}
        visible={detailModalVisible}
        footer={[<Button type={"primary"} onClick={() => setDetailModalVisible(false)}>Close</Button>]}
      >
        <RequestForumListItemDetailDescription
          description={chosenItem?.description}
          createdBy={chosenItem?.createdBy}
          createdOn={chosenItem?.createdOn}
          inModal
        />
      </Modal>
      <Table
        loading={!props.data}
        dataSource={props.data}
        columns={helpRequestsDataColumns}
        pagination={{pageSize: 2}}
      />
    </>
  );
}

export default HelpRequests;