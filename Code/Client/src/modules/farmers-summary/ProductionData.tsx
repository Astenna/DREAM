import {Table} from 'antd';

import React from 'react';
import {GetProductionDataResponse} from '../../model/api/GetProductionData';

const productionHistoryColumns = [
  {
    title: () => {
      return <div style={{fontWeight: 'bold'}}>Type</div>;
    },
    dataIndex: 'productionType',
    key: 'productionType',
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
    render: (date: string) => (
      <>{new Date(date).toLocaleDateString()}</>
    )
  },
]

const ProductionData = (props: { data: GetProductionDataResponse | undefined }) => {
  return (
    <>
      <h1 className={"dashboard-h1"}>Production data</h1>
      <Table
        loading={!props.data}
        dataSource={props.data}
        columns={productionHistoryColumns}
        pagination={{pageSize: 3}}
      />
    </>
  );
}

export default ProductionData;