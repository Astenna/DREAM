import {Table} from 'antd';

import React from 'react';

const waterUsageData = [
  {
    waterUsage: "1.2 m3",
    date: new Date("2011-09-01")
  },
  {
    waterUsage: "2.8 m3",
    date: new Date("2011-09-02")
  },
  {
    waterUsage: "2.8 m3",
    date: new Date("2011-09-03")
  },
  {
    waterUsage: "10 m3",
    date: new Date("2011-09-04")
  },
  {
    waterUsage: "7.6 m3",
    date: new Date("2011-09-05")
  }
]

const waterUsageDataColumns = [
  {
    title: () => {
      return <div style={{fontWeight: 'bold'}}>Water usage</div>;
    },
    dataIndex: 'waterUsage',
    key: 'waterUsage',
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
]

const WaterUsage = () => {
  return (
    <>
      <h1 className={"dashboard-h1"} style={{padding: "0 0 10px 0"}}>Water usage</h1>
      <div style={{padding: "0 0 5px 0"}}>Average in August, 2019: 3.6 m3</div>
      <Table dataSource={waterUsageData} columns={waterUsageDataColumns} pagination={{pageSize: 4}}/>
    </>
  );
}

export default WaterUsage;