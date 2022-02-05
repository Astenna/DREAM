import {Button, Col, Divider, Input, Pagination, Row} from 'antd';
import React, {useState} from 'react';
import HelpRequestListItem, {HelpRequestListItemProps} from './HelpRequestListItem';
import strings from '../../values/strings';
import CreateHelpRequestModal from './CreateHelpRequestModal';
import ViewHeader from '../other/ViewHeader';

const {Search} = Input

let allHelpRequestListItems: HelpRequestListItemProps[] = [
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
  {
    id: "1",
    title: "sdfsdf Lorem ipsum blah blah blah blah blah",
    commentCount: 1,
    lastCommentDate: new Date("2011-10-05"),
    createDateTime: new Date("2011-10-05T14:48:00.000Z"),
    author: {
      name: "Grzegorz",
      surname: "Grzegoski",
    }
  },
  {
    id: "1",
    title: "aaaaasdfsdf Lorem ipsum blah blah blah blah blah",
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
// allHelpRequestListItems =
//   allHelpRequestListItems.reduce((p: HelpRequestListItemProps[], c) =>
//     p.concat(Array(70).fill(c)), [])

const HelpRequestList = () => {
  const [pageSize, setPageSize] = useState(5)
  const [isCreateHelpRequestModalVisible, setCreateHelpRequestModalVisible] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [helpRequestListItem, setHelpRequestListItem] = useState(allHelpRequestListItems)

  const searchHelpRequestListItem = (searchString: string) => {
    setHelpRequestListItem(allHelpRequestListItems.filter(m =>
      m.title.toUpperCase().startsWith(searchString.toUpperCase())))
  }

  return (
    <>
      <CreateHelpRequestModal isVisible={isCreateHelpRequestModalVisible}
                              setVisible={setCreateHelpRequestModalVisible}/>
      <ViewHeader title={strings.SIDEBAR.MY_HELP_REQUESTS}/>
      <Row style={{padding: "0 35px 0 35px"}}>
        <Col style={{width: "100%"}}>
          <Row justify={'space-between'}>
            <Col>
              <Search style={{margin: "3px", width: 250}} placeholder="Search by name"
                      onSearch={searchHelpRequestListItem}/>
            </Col>
            <Col>
              <Button style={{margin: "3px"}} type={"primary"} onClick={() => setCreateHelpRequestModalVisible(true)}>
                {strings.CREATE_HELP_REQUEST}
              </Button>
            </Col>
          </Row>
          <Divider style={{margin: "10px 0"}}/>
          <>
            {
              helpRequestListItem
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
                total={helpRequestListItem.length}
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