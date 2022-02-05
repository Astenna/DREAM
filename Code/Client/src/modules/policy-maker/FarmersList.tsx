import {EyeOutlined, StarOutlined} from '@ant-design/icons';
import {Col, Input, Row, Select, Table} from 'antd';

import React, {useEffect, useState} from 'react';
import colors from "../../values/colors";
import {Note} from "../../model/Note";
import {useParams} from 'react-router';
import ViewHeader from '../other/ViewHeader';
import {farmerRequests} from '../../api/requests/farmerRequests';
import links from '../../values/links';
import {FarmerNote} from '../../model/FarmerNote';

const {Search} = Input
const {Option} = Select;

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
    title: 'Action',
    dataIndex: 'link',
    key: 'link',
    render: (link: string) => (
      <a href={link}><EyeOutlined/></a>
    ),
  },
];

const FarmersList = () => {
  const [nameSearch, setNameSearch] = useState<string>()
  const [mandalSearch, setMandalSearch] = useState<string>()
  const [noteSelect, setNoteSelect] = useState<FarmerNote>()
  const {type} = useParams<string>()
  const [farmers] = farmerRequests.useGetFarmerOnRender()

  const getViewFarmers = () => {
    let viewFarmers: any = farmers
      ?.filter(f => f.farmerNameAndSurname.toUpperCase().startsWith(nameSearch ? nameSearch.toUpperCase() : ""))
      ?.filter(f => f.farmMandalName.toUpperCase().startsWith(mandalSearch ? mandalSearch.toUpperCase() : ""))
    if (noteSelect) {
      viewFarmers = viewFarmers?.filter((f: any) => f.currentNote === noteSelect)
    }
    viewFarmers = viewFarmers?.map((f: any) => ({
      ...f,
      link: links.DASHBOARD.URL + links.FARMERS_FARMER.URL + `/${f.id}`
    }))
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