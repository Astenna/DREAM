import React from 'react';
import {Col, Form, Input, Modal, Row} from 'antd';
import strings from '../../values/strings';
import {MailOutlined} from '@ant-design/icons';

/**
 * Incoming properties managing visibility of current modal dialog.
 */
interface RemindPasswordModalProps {
  isVisible: boolean,
  setVisible: (value: boolean) => void
}

/**
 * Model dialog allowing password reminding.
 */
const RemindPasswordModal = (props: RemindPasswordModalProps) => {
  const [form] = Form.useForm();
  const sendRemindPasswordForm = (email: string) => {
    console.log(email)
    props.setVisible(false)
  }
  const cancelRemindPasswordForm = () => {
    props.setVisible(false)
  }

  return (
    <>
      <Modal
        title={strings.REMIND_PASSWORD}
        visible={props.isVisible}
        onOk={form.submit}
        onCancel={cancelRemindPasswordForm}
        okText={strings.SUBMIT}
      >
        <Row>
          <Col span={24}>
            <p>{strings.FORM.LABEL.REMIND_PASSWORD}</p>
          </Col>
        </Row>
        <Form form={form} layout={"vertical"} onFinish={v => sendRemindPasswordForm(v.email)}>
          <Form.Item
            name="email"
            rules={[{
              type: "email",
              required: true,
              message: strings.FORM.ERROR.EMAIL_INCORRECT_FORMAT,
            }]}
          >
            <Input
              type={"email"}
              placeholder={strings.FORM.LABEL.EMAIL}
              prefix={<MailOutlined/>}
              size={"large"}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default RemindPasswordModal;