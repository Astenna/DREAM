import {Col, Divider, Input, Pagination, Row} from 'antd';
import React, {useEffect, useState} from 'react';
import strings from '../../../values/strings';
import ViewHeader from '../../other/ViewHeader';
import {GetRequestsResponse} from '../../../model/api/GetRequest';
import {requestRequests} from '../../../api/requests/requestRequests';
import {useAppSelector} from '../../../store/hooks';
import {selectAuthInfo} from '../../../store/auth/authSlice';
import RequestForumListItem from '../generic/RequestForumListItem';
import links from '../../../values/links';

const {Search} = Input


const HelpRequestList = () => {
  const [pageSize, setPageSize] = useState(5)
  const [currentPage, setCurrentPage] = useState(1)
  const [helpRequestListItem, setHelpRequestListItem] = useState<GetRequestsResponse | undefined>([])
  const [allMyRequest, load] = requestRequests.useGetRequestsProvideHelp()
  const farmerID = useAppSelector(selectAuthInfo)?.farmerID

  const reload = () => {
    if (farmerID) {
      load(+farmerID)
    }
  }

  useEffect(() => {
    reload()
  }, [farmerID])

  useEffect(() => {
    setHelpRequestListItem(allMyRequest)
  }, [allMyRequest])

  const searchHelpRequestListItem = (searchString: string) => {
    setHelpRequestListItem(allMyRequest?.filter(m =>
      m.topic.toUpperCase().startsWith(searchString.toUpperCase())))
  }

  return (
    <>
      <ViewHeader title={strings.SIDEBAR.MY_HELP_REQUESTS}/>
      <Row style={{padding: "0 35px 0 35px"}}>
        <Col style={{width: "100%"}}>
          <Row justify={'space-between'}>
            <Col>
              <Search style={{margin: "3px", width: 250}} placeholder="Search by name"
                      onSearch={searchHelpRequestListItem}/>
            </Col>
          </Row>
          <Divider style={{margin: "10px 0"}}/>
          <>
            {
              helpRequestListItem
                ?.slice((currentPage - 1) * pageSize, currentPage * pageSize)
                ?.map((item, key) =>
                  <RequestForumListItem
                    key={key}
                    topic={item.topic}
                    answersCount={item.helpResponsesCount}
                    link={links.DASHBOARD.URL +
                    links.PROVIDE_HELP_DETAIL.URL.replace(':id', String(item.id))}
                    createdDate={new Date(item.createdOn)}
                  />)
            }
          </>
          <Row justify={'end'}>
            <Col>
              <Pagination
                style={{paddingBottom: "15px"}}
                showSizeChanger
                total={helpRequestListItem?.length}
                pageSizeOptions={[5, 10, 20]}
                pageSize={pageSize}
                onChange={(c, s) => {
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