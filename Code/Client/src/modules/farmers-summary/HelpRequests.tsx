import {EyeOutlined} from '@ant-design/icons';
import {Table} from 'antd';

import React from 'react';
import {GetRequestsResponse} from '../../model/api/GetRequest';

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
    key: 'link',
    render: (link: string) => (
      <a><EyeOutlined href={link}/></a>
    ),
  },
]

const HelpRequests = (props: { data: GetRequestsResponse | undefined }) => {
  return (
    <>
      <h1 className={"dashboard-h1"}>Help requests</h1>
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