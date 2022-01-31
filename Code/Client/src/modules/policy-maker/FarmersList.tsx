import {ArrowLeftOutlined, EyeOutlined, StarOutlined} from '@ant-design/icons';
import {Col, Divider, Input, Row, Table} from 'antd';

import React from 'react';
import colors from "../../values/colors";
import {Note} from "../../model/Note";

const {Search} = Input

const dataSource = [
  {
    name: 'Json Rajesh',
    helpRequests: 32,
    mandal: 'Mavala',
    note: Note.POSITIVE
  },
  {
    name: 'Sam Smith',
    helpRequests: 21,
    mandal: 'Mavala',
    note: Note.NEGATIVE
  },
  {
    name: 'Luke Skywalker',
    helpRequests: 48,
    mandal: 'Mavala',
    note: Note.NEUTRAL
  },
];

const columns = [
  {
    title: () => {
      return <div style={{fontWeight: 'bold'}}>Name</div>;
    },
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: () => {
      return <div style={{fontWeight: 'bold'}}>Help requests</div>;
    },
    dataIndex: 'helpRequests',
    key: 'helpRequests',
  },
  {
    title: () => {
      return <div style={{fontWeight: 'bold'}}>Mandal</div>;
    },
    dataIndex: 'mandal',
    key: 'mandal',
  },
  {
    title: () => {
      return <div style={{fontWeight: 'bold'}}>Note</div>;
    },
    dataIndex: 'note',
    key: 'note',
    render: (note: Note) => (
      <><StarOutlined
        style={{color: note === Note.POSITIVE ? colors.SUCCESS : note === Note.NEGATIVE ? colors.DANGER : undefined}}/> {note}</>
    )
  },
  {
    title: '',
    key: 'link',
    render: (link: string) => (
      <a><EyeOutlined href={link}/></a>
    ),
  },
];

const FarmersList = () => {
  return (
    <>
      <Row style={{padding: "15px 15px 0 15px"}}>
        <Col style={{width: "100%"}}>
          <Row>
            <Col className={"flex-center"} style={{marginRight: "7px"}}>
              <ArrowLeftOutlined/>
            </Col>
            <Col>
              <h1 className={"dashboard-h1"}>
                Farmers
              </h1>
            </Col>
          </Row>
        </Col>
      </Row>
      <Divider style={{margin: "10px 0"}}/>
      <Row style={{padding: "0 35px 0 35px"}}>
        <Col style={{width: "100%"}}>
          <Row style={{padding: "0 0 15px 0"}}>
            <Col style={{padding: "0 10px 0 0"}}>
              <Search placeholder="Search" onSearch={() => {
              }} style={{width: 250}}/>
            </Col>
            <Col style={{padding: "0 10px 0 0"}}>
              <Search placeholder="Mandal" onSearch={() => {
              }} style={{width: 250}}/>
            </Col>
            <Col style={{padding: "0 10px 0 0"}}>
              <Search placeholder="Note" onSearch={() => {
              }} style={{width: 250}}/>
            </Col>
          </Row>
          <Table dataSource={dataSource} columns={columns}/>
        </Col>
      </Row>
    </>
  );
}

export default FarmersList;