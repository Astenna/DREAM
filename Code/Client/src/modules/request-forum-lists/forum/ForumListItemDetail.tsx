import React, {useEffect} from 'react';
import {useParams} from 'react-router';
import {Col, Row} from 'antd';
import strings from '../../../values/strings';
import RequestForumListItemDetailComment from '../generic/RequestForumListItemDetailComment';
import {forumRequests} from '../../../api/requests/forumRequests';
import CreateListItemResponse from '../generic/CreateListItemResponse';
import {useAppSelector} from '../../../store/hooks';
import {selectAuthInfo} from '../../../store/auth/authSlice';
import RequestForumListItemDetailDescription from '../generic/RequestForumListItemDetailDescription';
import ViewHeader from '../../other/ViewHeader';

const ForumListItemDetail = () => {
  const {id} = useParams()
  const requestID: number | undefined = id ? +id : undefined
  const [requestData, load] = forumRequests.useGetFarmerRequestDetail()
  const postComment = forumRequests.usePostComment()
  const authInfo = useAppSelector(selectAuthInfo)
  const deleteComment = forumRequests.useDeleteComment()

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

  const onCommentDelete = (id: number) => {
    deleteComment(id)
      .then(_ => {
        reload()
      })
  }

  return (
    <>
      <ViewHeader title={`Forum: ${requestData?.topic}`}/>
      <RequestForumListItemDetailDescription
        description={requestData?.description}
        createdBy={requestData?.createdByFarmer}
        createdOn={requestData?.createdDate}
      />
      <Row style={{padding: "0 35px 0 35px"}}>
        <Col style={{width: "100%"}}>
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
                  <>
                    <RequestForumListItemDetailComment
                      key={key}
                      createdDate={new Date(item.createdDate)}
                      author={item.createdByFarmer ? item.createdByFarmer : ""}
                      content={item.content}
                      deletable={authInfo?.farmerID === String(item.createdByFarmerId)}
                      onDelete={() => onCommentDelete(item.id)}
                    />
                  </>
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