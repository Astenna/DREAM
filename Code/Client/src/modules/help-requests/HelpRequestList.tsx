import {ArrowLeftOutlined} from '@ant-design/icons';
import {Col, Divider, Input, Pagination, Row} from 'antd';
import React, {useState} from 'react';
import HelpRequestListItem, {HelpRequestListItemProps} from './HelpRequestListItem';

const {Search} = Input

let helpRequestListItems: HelpRequestListItemProps[] = [
  {
    id: "1",
    title: "Lorem ipsum blah blah blah blah blah",
    commentCount: 1,
    lastCommentDate: new Date("2011-10-05"),
    createDateTime: new Date("2011-10-05T14:48:00.000Z"),
    author: {
      name: "Grzegorz",
      surname: "Grzegoski",
    }
  },
]

// dummy values TODO
helpRequestListItems =
  helpRequestListItems.reduce((p: HelpRequestListItemProps[], c) =>
    p.concat(Array(70).fill(c)), [])

const HelpRequestList = () => {
  const [pageSize, setPageSize] = useState(5)
  const [currentPage, setCurrentPage] = useState(1)

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
                My help requests
              </h1>
            </Col>
          </Row>
        </Col>
      </Row>
      <Divider style={{margin: "10px 0"}}/>
      <Row style={{padding: "0 35px 0 35px"}}>
        <Col style={{width: "100%"}}>
          <Row>
            <Col>
              <Search placeholder="Search by name" onSearch={() => {
              }} style={{width: 250}}/>
            </Col>
          </Row>
          <Divider style={{margin: "10px 0"}}/>
          <>
            {
              helpRequestListItems
                .slice((currentPage - 1) * pageSize, currentPage * pageSize)
                .map((item, key) =>
                  <HelpRequestListItem key={key} item={item}/>)
            }
          </>
          <Row justify={'end'}>
            <Col>
              <Pagination
                style={{paddingBottom: "15px"}}
                showSizeChanger
                total={helpRequestListItems.length}
                pageSizeOptions={[5, 10, 20]}
                pageSize={pageSize}
                onChange={(c, s) => {
                  console.log(s, c)
                  setCurrentPage(c)
                  setPageSize(s)
                }}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default HelpRequestList;