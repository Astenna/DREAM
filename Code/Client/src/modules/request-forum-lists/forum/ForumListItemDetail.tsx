import React, {useEffect} from 'react';
import {useParams} from 'react-router';
import {Col, Row} from 'antd';
import strings from '../../../values/strings';
import ViewHeader from '../../other/ViewHeader';
import RequestForumListItemDetailComment from '../generic/RequestForumListItemDetailComment';
import {forumRequests} from '../../../api/requests/forumRequests';
import CreateListItemResponse from '../generic/CreateListItemResponse';

const ForumListItemDetail = () => {
  const {id} = useParams()
  const requestID: number | undefined = id ? +id : undefined
  const [requestData, load] = forumRequests.useGetFarmerRequestDetail()
  const postComment = forumRequests.usePostComment()

  const reload = () => {
    if (requestID) {
      load(requestID)
    }
  }

  useEffect(() => {
    reload()
  }, [requestID])

  const sendComment = (formValues: any) => {
    if (requestID) {
      postComment({content: formValues.message}, requestID)
        .then(_ => {
          reload()
        })
    }
  }

  return (
    <>
      <ViewHeader title={`Forum: ${requestData?.topic}`}/>
      <Row style={{padding: "0 35px 0 35px"}}>
        <Col style={{width: "100%"}}>
          <Row>
            <Col>
              <p style={{textAlign: 'justify', margin: "20px 0 0 0"}}>
                {requestData?.description}
              </p>
            </Col>
          </Row>
          <Row justify={'end'}>
            <Col style={{margin: "10px 0 0", display: "flex", flexWrap: "wrap"}}>
              <span className={"dashboard-item-author"}>
                {requestData?.createdByFarmer}
              </span>
              <span className={"dashboard-item-attribute-bold"}>&nbsp;|&nbsp;</span>
              <span className={"dashboard-item-attribute-bold"}>
                {requestData?.createdDate && new Date(requestData.createdDate).toLocaleString()}
              </span>
            </Col>
          </Row>
          <Row justify={'start'}>
            <Col style={{margin: "10px 0 0"}}>
              <h1 className={"dashboard-h1"}>
                {strings.ADVICE}
              </h1>
            </Col>
          </Row>
          <CreateListItemResponse sendForm={sendComment}/>
          <Row>
            <Col style={{margin: "10px 0 0", width: "100%"}}>
              {
                requestData?.comments?.map((item, key) =>
                  <RequestForumListItemDetailComment
                    key={key}
                    createdDate={new Date(item.createdDate)}
                    author={item.createdByFarmer ? item.createdByFarmer : ""}
                    content={item.content}
                    deletable={false}
                  />
                )
              }
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default ForumListItemDetail;