import React from 'react';
import {Form, Input, Modal} from 'antd';
import strings from '../../values/strings';
import {Rule} from 'antd/lib/form';

interface CreateHelpRequestModalProps {
  isVisible: boolean,
  setVisible: (value: boolean) => void
}

const CreateHelpRequestModal = (props: CreateHelpRequestModalProps) => {
  const [form] = Form.useForm();

  const requiredCheck: Rule = {
    required: true,
    message: strings.FORM.ERROR.REQUIRED,
  }

  return (
    <Modal title={strings.CREATE_HELP_REQUEST} visible={props.isVisible} onOk={() => {
    }} onCancel={() => props.setVisible(false)}>
      <Form form={form} layout={"vertical"} onFinish={() => {
      }}> {/*TODO*/}
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