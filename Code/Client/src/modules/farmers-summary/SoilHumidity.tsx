import {Table} from 'antd';

import React from 'react';

const soilHumidityData = [
  {
    humidity: "1.2 g/kg",
    date: new Date("2011-09-01")
  },
  {
    humidity: "2.8 g/kg",
    date: new Date("2011-09-02")
  },
  {
    humidity: "2.8 g/kg",
    date: new Date("2011-09-03")
  },
  {
    humidity: "10 g/kg",
    date: new Date("2011-09-04")
  },
  {
    humidity: "7.6 g/kg",
    date: new Date("2011-09-05")
  }
]

const soilHumidityDataColumns = [
  {
    title: () => {
      return <div style={{fontWeight: 'bold'}}>Humidity</div>;
    },
    dataIndex: 'humidity',
    key: 'humidity',
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

const SoilHumidity = () => {
  return (
    <>
      <h1 className={"dashboard-h1"} style={{padding: "0 0 10px 0"}}>Average soil humidity</h1>
      <div style={{padding: "0 0 5px 0"}}>Average in August, 2019: 3.6 g/kg</div>
      <Table dataSource={soilHumidityData} columns={soilHumidityDataColumns} pagination={{pageSize: 4}}/>
    </>
  );
}

export default SoilHumidity;