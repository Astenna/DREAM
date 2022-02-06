import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router';
import {Button, Col, Modal, Row} from 'antd';
import strings from '../../../values/strings';
import {requestRequests} from '../../../api/requests/requestRequests';
import RequestForumListItemDetailComment from '../generic/RequestForumListItemDetailComment';
import RequestForumListItemDetailDescription from '../generic/RequestForumListItemDetailDescription';
import ViewHeader from '../../other/ViewHeader';
import {DeleteOutlined} from '@ant-design/icons';

const MyHelpRequestListItemDetail = () => {
  const {id} = useParams()
  const requestID: number | undefined = id ? +id : undefined
  const [requestData, load] = requestRequests.useGetFarmerRequestDetail()
  const deleteRequest = requestRequests.useDeleteRequest()
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (requestID) {
      load(requestID)
    }
  }, [requestID])

  const onDelete = () => {
    if (requestID) {
      deleteRequest(requestID)
        .then(_ => navigate(-1))
    }
  }

  return (
    <>
      <Modal
        visible={deleteModalVisible}
        onOk={() => onDelete()}
        onCancel={() => setDeleteModalVisible(false)}
        okType={"danger"}
      >
        <p>
          {strings.CONFIRM_DELETION}
        </p>
      </Modal>
      <ViewHeader
        title={`Help request: ${requestData?.topic}`}
        custom={
          <Button
            shape="circle" icon={<DeleteOutlined/>}
            onClick={() => setDeleteModalVisible(true)}
          />
        }
      />
      <RequestForumListItemDetailDescription
        description={requestData?.description}
        createdBy={requestData?.createdBy}
        createdOn={requestData?.createdOn}
      />
      <Row style={{padding: "0 35px 0 35px"}}>
        <Col style={{width: "100%"}}>
          {
            !!requestData?.helpResponses?.length && (requestData.helpResponses.length > 0) &&
            <Row justify={'start'}>
                <Col style={{margin: "10px 0 0"}}>
                    <h1 className={"dashboard-h1"}>
                      {strings.ADVICE}
                    </h1>
                </Col>
            </Row>
          }
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

export default MyHelpRequestListItemDetail;