import React, {useState} from 'react';
import {Form, Input, Modal} from 'antd';
import strings from '../../../values/strings';
import RemindPasswordModal from '../remind-password/RemindPasswordModal';
import {LockOutlined, MailOutlined} from '@ant-design/icons';
import {useLogin} from './loginModalHooks';
import {PostAccountLoginRequest} from '../../../model/api/PostAccountLogin';

/**
 * Incoming properties managing visibility of current modal dialog.
 */
interface LogInModalProps {
  isVisible: boolean,
  setVisible: (value: boolean) => void
}

/**
 * Modal dialog responsible for handling log in process.
 * Can open modal dialog responsible for password reminding.
 */
const LogInModal = (props: LogInModalProps) => {
  const [form] = Form.useForm();
  const [isRemindPasswordVisible, setRemindPasswordVisible] = useState(false);
  const [login, loading] = useLogin(props.setVisible);

  const sendLogInForm = (loginForm: any) =>
    login(loginForm as PostAccountLoginRequest)

  const cancelLogInForm = () => {
    props.setVisible(false)
  }
  const openRemindPasswordModal = () => {
    props.setVisible(false);
    setRemindPasswordVisible(true);
  }

  return (
    <>
      <RemindPasswordModal isVisible={isRemindPasswordVisible} setVisible={setRemindPasswordVisible}/>
      <Modal
        confirmLoading={loading}
        title={strings.LOG_IN}
        visible={props.isVisible}
        onOk={form.submit}
        onCancel={cancelLogInForm}
        okText={strings.SUBMIT}
      >
        <Form form={form} layout={"vertical"} onFinish={sendLogInForm}>
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                required: true,
                message: strings.FORM.ERROR.EMAIL_INCORRECT_FORMAT,
              },
            ]}
          >
            <Input
              type={"email"}
              placeholder={strings.FORM.LABEL.EMAIL}
              prefix={<MailOutlined/>}
              size={"large"}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: strings.FORM.ERROR.REQUIRED,
              },
            ]}
          >
            <Input.Password
              placeholder={strings.FORM.LABEL.PASSWORD}
              prefix={<LockOutlined/>}
              size={"large"}
            />
          </Form.Item>
        </Form>
        {/*<Row>*/}
        {/*  <Col span={24} style={{display: 'flex', justifyContent: 'flex-end'}}>*/}
        {/*    <Link to={"#"} onClick={openRemindPasswordModal}>*/}
        {/*      Forgot password?*/}
        {/*    </Link>*/}
        {/*  </Col>*/}
        {/*</Row>*/}
      </Modal>
    </>
  );
};

export default LogInModal;