import {EyeOutlined} from '@ant-design/icons';
import {Table} from 'antd';

import React from 'react';

const helpRequestsData = [
  {
    topic: "My carrots are yellow",
    responses: 1,
    date: new Date("2011-09-01")
  },
  {
    topic: "My carrots are yellow",
    responses: 1,
    date: new Date("2011-09-20")
  },
  {
    topic: "My carrots are yellow",
    responses: 1,
    date: new Date("2011-09-22")
  }
]

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
    dataIndex: 'responses',
    key: 'responses',
  },
  {
    title: () => {
      return <div style={{fontWeight: 'bold'}}>Date</div>;
    },
    dataIndex: 'date',
    key: 'date',
    render: (date: Date) => (
      <>{date.toLocaleDateString()}</>
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

const FarmersSummary = () => {
  return (
    <>
      <h1 className={"dashboard-h1"}>Help requests</h1>
      <Table dataSource={helpRequestsData} columns={helpRequestsDataColumns} pagination={{pageSize: 2}}/>
    </>
  );
}

export default FarmersSummary;