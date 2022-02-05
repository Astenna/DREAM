import {EyeOutlined} from '@ant-design/icons';
import {Table} from 'antd';

import React from 'react';

const weatherData = [
  {
    weather: "Cloudy",
    degrees: "22°C",
    rainfall: "22 mm",
    date: new Date("2011-09-01")
  },
  {
    weather: "Cloudy",
    degrees: "22°C",
    rainfall: "22 mm",
    date: new Date("2011-09-02")
  },
  {
    weather: "Cloudy",
    degrees: "20°C",
    rainfall: "2 mm",
    date: new Date("2011-09-03")
  },
  {
    weather: "Cloudy",
    degrees: "20°C",
    rainfall: "2 mm",
    date: new Date("2011-09-04")
  },
]

const weatherDataColumns = [
  {
    title: () => {
      return <div style={{fontWeight: 'bold'}}>Weather</div>;
    },
    dataIndex: 'weather',
    key: 'weather',
  },
  {
    title: () => {
      return <div style={{fontWeight: 'bold'}}>Degrees</div>;
    },
    dataIndex: 'degrees',
    key: 'degrees',
  },
  {
    title: () => {
      return <div style={{fontWeight: 'bold'}}>Rainfall</div>;
    },
    dataIndex: 'rainfall',
    key: 'rainfall',
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

const Weather = () => {
  return (
    <>
      <h1 className={"dashboard-h1"}>Weather</h1>
      <Table dataSource={weatherData} columns={weatherDataColumns} pagination={{pageSize: 4}}/>
    </>
  );
}

export default Weather;