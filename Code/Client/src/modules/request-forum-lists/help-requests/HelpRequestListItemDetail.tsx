import React from 'react';
import {useParams} from 'react-router';
import {Button, Col, Form, Input, Row} from 'antd';
import strings from '../../../values/strings';
import {Rule} from 'antd/lib/form';
import HelpRequestListItemDetailComment from './HelpRequestListItemDetailComment';
import ViewHeader from '../../other/ViewHeader';

export interface HelpRequestListItemDetail {
  author: { surname: string; name: string };
  topic: string;
  description: string;
  advices: {
    author: { role: string; surname: string; name: string };
    createDateTime: Date;
    description: string
  }[];
  id: string;
  createDateTime: Date;
}

const requiredCheck: Rule = {
  required: true,
  message: strings.FORM.ERROR.REQUIRED,
}

const HelpRequestListItemDetail = () => {
  const {stringID} = useParams()
  const id: number = +!stringID

  const helpRequestDetail: HelpRequestListItemDetail = {
    id: "",
    topic: "Lorem ipsum dolor sit amet",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ultrices volutpat quam, in eleifend magna interdum ut. Proin in dignissim eros. Praesent at massa sit amet dolor pulvinar sodales. Quisque pharetra lacus sem, nec facilisis magna efficitur tristique. Donec laoreet hendrerit accumsan. In ac purus pharetra, dictum nulla nec, aliquet risus. Nulla eu fringilla felis, id luctus risus. Maecenas a convallis tellus. Sed et nisi dignissim metus luctus auctor. Curabitur non sodales odio, ac tincidunt ipsum.",
    createDateTime: new Date("2011-10-05T14:48:00.000Z"),
    author: {
      name: "Arun",
      surname: "Ghosh",
    },
    advices: [
      {
        author: {
          name: "Arun",
          surname: "Ghosh",
          role: "Agronomist",
        },
        createDateTime: new Date("2011-10-05T14:48:00.000Z"),
        description: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. "
      },
      {
        author: {
          name: "Arun",
          surname: "Ghosh",
          role: "Agronomist",
        },
        createDateTime: new Date("2011-10-05T14:48:00.000Z"),
        description: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. "
      },
      {
        author: {
          name: "Arun",
          surname: "Ghosh",
          role: "Agronomist",
        },
        createDateTime: new Date("2011-10-05T14:48:00.000Z"),
        description: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. "
      },
    ]
  }

  return (
    <>
      <ViewHeader title={`Help request: ${helpRequestDetail.topic}`}/>
      <Row style={{padding: "0 35px 0 35px"}}>
        <Col style={{width: "100%"}}>
          <Row>
            <Col>
              <p style={{textAlign: 'justify', margin: "20px 0 0 0"}}>
                {helpRequestDetail.description}
              </p>
            </Col>
          </Row>
          <Row justify={'end'}>
            <Col style={{margin: "10px 0 0", display: "flex", flexWrap: "wrap"}}>
              <span className={"dashboard-item-author"}>
                {`${helpRequestDetail.author.name} ${helpRequestDetail.author.surname}`}
              </span>
              <span className={"dashboard-item-attribute-bold"}>&nbsp;|&nbsp;</span>
              <span className={"dashboard-item-attribute-bold"}>
                {helpRequestDetail.createDateTime.toLocaleString()}
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
                onFinish={(value) => console.log(value)}
              >
                <Form.Item
                  name="content"
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
                helpRequestDetail.advices.map((item, key) =>
                  <HelpRequestListItemDetailComment key={key} item={item}/>
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