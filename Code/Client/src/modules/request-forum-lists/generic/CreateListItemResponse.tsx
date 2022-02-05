import React from 'react';
import {Button, Col, Form, Input, Row} from 'antd';
import strings from '../../../values/strings';
import {Rule} from 'antd/lib/form';

const requiredCheck: Rule = {
  required: true,
  message: strings.FORM.ERROR.REQUIRED,
}

const CreateListItemResponse = (props: { sendForm: (formValues: any) => void }) => {
  return (
    <Row justify={'start'}>
      <Col style={{margin: "10px 0 0", width: "100%"}}>
        <Form
          name={"provideAdvice"}
          onFinish={props.sendForm}
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
  );
};

export default CreateListItemResponse;