import React from 'react';
import {Alert, Form, Input, Modal, notification} from 'antd';
import {LockOutlined} from '@ant-design/icons';
import strings from '../../values/strings';
import {authRequests} from '../../api/requests/authRequests';
import {useAppSelector} from '../../store/hooks';
import {selectAuthInfo} from '../../store/auth/authSlice';
import {useLogout} from '../../api/logoutHooks';

/**
 * Incoming properties managing visibility of current modal dialog.
 */
interface DeleteAccountProps {
  isVisible: boolean,
  setVisible: (value: boolean) => void
}

const DeleteAccountModal = (props: DeleteAccountProps) => {
  const [form] = Form.useForm();
  const deleteAccount = authRequests.useDeleteAccount();
  const authInfo = useAppSelector(selectAuthInfo);
  const logout = useLogout();


  const sendLogInForm = (deleteForm: any) => {
    deleteAccount({
      email: authInfo.email ? authInfo.email : "",
      password: deleteForm.password
    }, +!authInfo.userID)
      .then(_ => {
        props.setVisible(false)
        notification['info']({message: strings.INFO.ACCOUNT_DELETED})
        logout()
      })
  }

  const cancelLogInForm = () => {
    props.setVisible(false)
  }

  return (
    <>
      <Modal
        title={strings.DELETE_ACCOUNT}
        visible={props.isVisible}
        onOk={form.submit}
        onCancel={cancelLogInForm}
        okText={strings.SUBMIT}
      >
        <Alert
          message={strings.WARNING.DELETE_ACCOUNT} type="warning"
          showIcon style={{marginBottom: "10px"}}
        />
        <Form form={form} layout={"vertical"} onFinish={sendLogInForm}>
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
      </Modal>
    </>
  );
};

export default DeleteAccountModal;