import {Button, Col, Divider, Input, Pagination, Row} from 'antd';
import React, {useEffect, useState} from 'react';
import strings from '../../../values/strings';
import ViewHeader from '../../other/ViewHeader';
import RequestForumListItem from '../generic/RequestForumListItem';
import links from '../../../values/links';
import {forumRequests} from '../../../api/requests/forumRequests';
import {GetForumThreadResponse} from '../../../model/api/GetForumThread';
import CreateListItem from '../generic/CreateListItem';
import {PostHelpRequestRequest} from '../../../model/api/PostHelpRequest';

const {Search} = Input

const ForumList = () => {
  const [pageSize, setPageSize] = useState(5)
  const [isCreateModalVisible, setCreateModalVisible] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [listItem, setListItem] = useState<GetForumThreadResponse | undefined>([])
  const [forumThreads, reload] = forumRequests.useGetForum()
  const postRequest = forumRequests.usePostForum()

  useEffect(() => {
    setListItem(forumThreads)
  }, [forumThreads])

  const searchHelpRequestListItem = (searchString: string) => {
    setListItem(forumThreads?.filter(m =>
      m.topic.toUpperCase().startsWith(searchString.toUpperCase())))
  }

  return (
    <>
      <CreateListItem
        isVisible={isCreateModalVisible}
        setVisible={setCreateModalVisible}
        title={strings.CREATE_FORUM}
        onFormSubmit={(formValues) => {
          postRequest(formValues as PostHelpRequestRequest).then(_ => {
            setCreateModalVisible(false)
            reload()
          })
        }}
      />
      <ViewHeader title={strings.SIDEBAR.FORUM}/>
      <Row style={{padding: "0 35px 0 35px"}}>
        <Col style={{width: "100%"}}>
          <Row justify={'space-between'}>
            <Col>
              <Search style={{margin: "3px", width: 250}} placeholder="Search by name"
                      onSearch={searchHelpRequestListItem}/>
            </Col>
            <Col>
              <Button style={{margin: "3px"}} type={"primary"} onClick={() => setCreateModalVisible(true)}>
                {strings.CREATE_FORUM}
              </Button>
            </Col>
          </Row>
          <Divider style={{margin: "10px 0"}}/>
          <>
            {
              listItem
                ?.slice((currentPage - 1) * pageSize, currentPage * pageSize)
                ?.map((item, key) =>
                  <RequestForumListItem
                    key={key}
                    topic={item.topic}
                    answersCount={item.commentsCount}
                    link={links.DASHBOARD.URL +
                    links.FORUM_DETAIL.URL.replace(':id', String(item.id))}
                    createdDate={new Date(item.createdDate)}
                  />)
            }
          </>
          <Row justify={'end'}>
            <Col>
              <Pagination
                style={{paddingBottom: "15px"}}
                showSizeChanger
                total={listItem?.length}
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

export default ForumList;