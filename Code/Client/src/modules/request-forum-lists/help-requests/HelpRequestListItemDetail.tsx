import React, {useEffect} from 'react';
import {useParams} from 'react-router';
import {Button, Col, Form, Input, Row} from 'antd';
import strings from '../../../values/strings';
import ViewHeader from '../../other/ViewHeader';
import {requestRequests} from '../../../api/requests/requestRequests';
import RequestForumListItemDetailComment from '../generic/RequestForumListItemDetailComment';
import {Rule} from 'antd/lib/form';
import {PostHelpRequestAdviceRequest} from '../../../model/api/PostHelpRequestAdvice';

const requiredCheck: Rule = {
  required: true,
  message: strings.FORM.ERROR.REQUIRED,
}

const HelpRequestListItemDetail = () => {
  const {id} = useParams()
  const requestID: number | undefined = id ? +id : undefined
  const [requestData, load] = requestRequests.useGetFarmerRequestDetail()
  const postAdvice = requestRequests.usePostRequestAdvice()

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

  return (
    <>
      <ViewHeader title={`Help request: ${requestData?.topic}`}/>
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
                {requestData?.createdBy}
              </span>
              <span className={"dashboard-item-attribute-bold"}>&nbsp;|&nbsp;</span>
              <span className={"dashboard-item-attribute-bold"}>
                {requestData?.createdOn && new Date(requestData.createdOn).toLocaleString()}
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
          <Row justify={'start'}>
            <Col style={{margin: "10px 0 0", width: "100%"}}>
              <Form
                name={"provideAdvice"}
                onFinish={sendAdvice}
              >
                <Form.Item
                  name="message"
                  rules={[requiredCheck]}
                  style={{marginBottom: "10px"}}
                >
                  <Input.TextArea placeholder={strings.FORM.LABEL.MESSAGE_CONTENT}/>
                </Form.Item>
                <Form.Item
                  name="submit"
                >
                  <div style={{display: "flex", justifyContent: "flex-end"}}>
                    <Button type="primary" htmlType="submit">
                      {strings.SUBMIT}
                    </Button>
                  </div>
                </Form.Item>
              </Form>
            </Col>
          </Row>
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

export default HelpRequestListItemDetail;