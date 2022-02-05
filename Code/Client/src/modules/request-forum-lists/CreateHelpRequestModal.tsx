import React from 'react';
import {Form, Input, Modal} from 'antd';
import strings from '../../values/strings';
import {Rule} from 'antd/lib/form';
import {requestRequests} from '../../api/requests/requestRequests';
import {PostHelpRequestRequest} from '../../model/api/PostHelpRequest';

interface CreateHelpRequestModalProps {
  isVisible: boolean,
  setVisible: (value: boolean) => void,
  reloadCallback: () => void,
}

const CreateHelpRequestModal = (props: CreateHelpRequestModalProps) => {
  const [form] = Form.useForm();
  const postRequest = requestRequests.usePostProductionData()

  const requiredCheck: Rule = {
    required: true,
    message: strings.FORM.ERROR.REQUIRED,
  }

  const sendForm = (formValues: any) => {
    postRequest(formValues as PostHelpRequestRequest).then(_ => {
      props.setVisible(false)
      props.reloadCallback()
    })
  }

  return (
    <Modal
      title={strings.CREATE_HELP_REQUEST}
      visible={props.isVisible}
      onOk={form.submit}
      onCancel={() => props.setVisible(false)}>
      <Form
        form={form}
        layout={"vertical"}
        onFinish={(formValues) => sendForm(formValues)}>
        <Form.Item
          name="topic"
          rules={[requiredCheck]}
        >
          <Input
            placeholder={strings.FORM.LABEL.TOPIC}
          />
        </Form.Item>
        <Form.Item
          name="description"
          rules={[requiredCheck]}
        >
          <Input.TextArea
            placeholder={strings.FORM.LABEL.DESCRIPTION}
            style={{minHeight: "200px"}}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateHelpRequestModal;