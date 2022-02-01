import {Table} from 'antd';

import React from 'react';

const productionHistoryData = [
  {
    type: "Carrot",
    amount: "1500 kg",
    date: new Date("July, 2019")
  },
  {
    type: "Potato",
    amount: "12500 kg",
    date: new Date("July, 2019")
  },
  {
    type: "Rice",
    amount: "11000 kg",
    date: new Date("July, 2019")
  },
]

const productionHistoryColumns = [
  {
    title: () => {
      return <div style={{fontWeight: 'bold'}}>Type</div>;
    },
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: () => {
      return <div style={{fontWeight: 'bold'}}>Amount</div>;
    },
    dataIndex: 'amount',
    key: 'amount',
  },
  {
    title: () => {
      return <div style={{fontWeight: 'bold'}}>Date</div>;
    },
    dataIndex: 'date',
    key: 'date',
    render: (date: Date) => (
      <>{date.toLocaleDateString()}</>
      //  TODO: Display in "July, 2019" format
    )
  },
]

const ProductionData = () => {
  return (
    <>
      <h1 className={"dashboard-h1"}>Production data</h1>
      <Table dataSource={productionHistoryData} columns={productionHistoryColumns} pagination={{pageSize: 3}}/>
    </>
  );
}

export default ProductionData;