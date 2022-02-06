import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router';
import {Button, Col, Modal, Row} from 'antd';
import strings from '../../../values/strings';
import {requestRequests} from '../../../api/requests/requestRequests';
import RequestForumListItemDetailComment from '../generic/RequestForumListItemDetailComment';
import {PostHelpRequestAdviceRequest} from '../../../model/api/PostHelpRequestAdvice';
import CreateListItemResponse from '../generic/CreateListItemResponse';
import {useAppSelector} from '../../../store/hooks';
import {selectAuthInfo} from '../../../store/auth/authSlice';
import RequestForumListItemDetailDescription from '../generic/RequestForumListItemDetailDescription';
import ViewHeader from '../../other/ViewHeader';
import FarmersSummary from '../../farmers-summary/FarmersSummary';

const HelpRequestListItemDetail = () => {
  const {id} = useParams()
  const requestID: number | undefined = id ? +id : undefined
  const [requestData, load] = requestRequests.useGetFarmerRequestDetail()
  const postAdvice = requestRequests.usePostRequestAdvice()
  const deleteAdvice = requestRequests.useDeleteAdvice()
  const authInfo = useAppSelector(selectAuthInfo)
  const [farmerDetailModalVisible, setFarmerDetailModalVisible] = useState(false)

  const reload = () => {
    if (requestID) {
      load(requestID)
    }
  }

  useEffect(() => {
    reload()
  }, [requestID])

  const sendAdvice = (formValues: any) => {
    if (requestID) {
      postAdvice(formValues as PostHelpRequestAdviceRequest, requestID)
        .then(_ => {
          reload()
        })
    }
  }

  const onAdviceDelete = (id: number) => {
    deleteAdvice(id)
      .then(_ => {
        reload()
      })
  }

  return (
    <>
      <Modal
        visible={farmerDetailModalVisible}
        onOk={() => setFarmerDetailModalVisible(false)}
        onCancel={() => setFarmerDetailModalVisible(false)}
        width={800}
        footer={[<Button type={"primary"} onClick={() => setFarmerDetailModalVisible(false)}>
          Close
        </Button>]}
      >
        <FarmersSummary farmerID={requestData?.createdById} inModal/>
      </Modal>
      <ViewHeader title={`Help request: ${requestData?.topic}`}/>
      <RequestForumListItemDetailDescription
        description={requestData?.description}
        createdBy={requestData?.createdBy}
        createdOn={requestData?.createdOn}
        onAuthorClick={() => setFarmerDetailModalVisible(true)}
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
          <CreateListItemResponse sendForm={sendAdvice}/>
          <Row>
            <Col style={{margin: "10px 0 0", width: "100%"}}>
              {
                requestData?.helpResponses?.map((item, key) =>
                  <RequestForumListItemDetailComment
                    key={key}
                    createdDate={new Date(item.createdOn)}
                    author={item.createdByFarmer ? item.createdByFarmer :
                      item.createdByAgronomist ? item.createdByAgronomist : ""}
                    authorRole={item.createdByFarmer ? "Farmer" :
                      item.createdByAgronomist ? "Agronomist" : ""}
                    content={item.message}
                    deletable={authInfo?.farmerID === String(item.createdByFarmerId)}
                    onDelete={() => onAdviceDelete(item.id)}
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

export default HelpRequestListItemDetail;