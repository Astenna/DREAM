import {EyeOutlined, StarOutlined} from '@ant-design/icons';
import {Col, Input, Row, Select, Table} from 'antd';

import React, {useEffect, useState} from 'react';
import colors from "../../values/colors";
import {Note} from "../../model/Note";
import {useParams} from 'react-router';
import ViewHeader from '../other/ViewHeader';
import {farmerRequests} from '../../api/requests/farmerRequests';

const {Search} = Input
const {Option} = Select;

const dataSource = [
  {
    farmerNameAndSurname: 'Json Rajesh',
    helpRequestsCount: 32,
    farmMandalName: 'Mavala',
    currentNote: Note.POSITIVE
  },
  {
    farmerNameAndSurname: 'Sam Smith',
    helpRequestsCount: 21,
    farmMandalName: 'Mavala',
    currentNote: Note.NEGATIVE
  },
  {
    farmerNameAndSurname: 'Luke Skywalker',
    helpRequestsCount: 48,
    farmMandalName: 'Mavala',
    currentNote: Note.NEUTRAL
  },
];

const columns = [
  {
    title: () => {
      return <div style={{fontWeight: 'bold'}}>Name</div>;
    },
    dataIndex: 'farmerNameAndSurname',
    key: 'farmerNameAndSurname'
  },
  {
    title: () => {
      return <div style={{fontWeight: 'bold'}}>Help requests</div>;
    },
    dataIndex: 'helpRequestsCount',
    key: 'helpRequestsCount',
  },
  {
    title: () => {
      return <div style={{fontWeight: 'bold'}}>Mandal</div>;
    },
    dataIndex: 'farmMandalName',
    key: 'farmMandalName',
  },
  {
    title: () => {
      return <div style={{fontWeight: 'bold'}}>Note</div>;
    },
    dataIndex: 'currentNote',
    key: 'currentNote',
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
  const [nameSearch, setNameSearch] = useState<string>()
  const [mandalSearch, setMandalSearch] = useState<string>()
  const [noteSelect, setNoteSelect] = useState<string>()
  const {type} = useParams<string>()
  const [farmers] = farmerRequests.useGetFarmer()

  const getViewFarmers = () => {
    let viewFarmers = farmers
      ?.filter(f => f.farmerNameAndSurname.toUpperCase().startsWith(nameSearch ? nameSearch.toUpperCase() : ""))
      ?.filter(f => f.farmMandalName.toUpperCase().startsWith(mandalSearch ? mandalSearch.toUpperCase() : ""))
    if (noteSelect) {
      viewFarmers = viewFarmers?.filter(f => f.currentNote === noteSelect)
    }
    return viewFarmers
  }

  useEffect(() => {
    switch (type) {
      case "positive":
        setNoteSelect("Positive");
        break;
      case "negative":
        setNoteSelect("Negative");
        break;
    }
  }, [])

  return (
    <>
      <ViewHeader title={"Farmer"}/>
      <Row style={{padding: "0 35px 0 35px"}}>
        <Col style={{width: "100%"}}>
          <Row style={{padding: "0 0 15px 0"}}>
            <Col style={{padding: "0 10px 0 0"}}>
              <Search placeholder="Search" onSearch={setNameSearch} style={{width: 250}}/>
            </Col>
            <Col style={{padding: "0 10px 0 0"}}>
              <Search placeholder="Mandal" onSearch={setMandalSearch} style={{width: 250}}/>
            </Col>
            <Col style={{padding: "0 10px 0 0"}}>
              <Select
                style={{width: "170px"}}
                onChange={setNoteSelect}
                value={noteSelect}
                allowClear
              >
                <Option value={"Negative"}>Negative</Option>)
                <Option value={"Neutral"}>Neutral</Option>)
                <Option value={"Positive"}>Positive</Option>)
              </Select>
            </Col>
          </Row>
          <Table dataSource={getViewFarmers()} columns={columns}/>
        </Col>
      </Row>
    </>
  );
}

export default FarmersList;